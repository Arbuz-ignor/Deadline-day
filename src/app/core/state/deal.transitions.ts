import type { Deal, OfferPayload } from '../models/deal.model';
import type { GameState } from '../models/game-state.model';
import type { OfferResponseTask } from '../models/pending-task.model';
import type { Player } from '../models/player.model';
import { getOfferResponseDurationMs, resolveOffer } from '../rules/deal.rules';
import {
  getActiveDeals,
  getDealById,
  getPendingOfferResponseCount,
} from '../selectors/game.selectors';

const maxActiveDeals = 5;
const maxPendingOfferResponses = 3;

export function createDealTransition(
  state: GameState,
  playerId: string,
  now: number,
): GameState | null {
  const playerExists = state.players.some((player) => player.id === playerId);
  const dealAlreadyExists = state.deals.some((deal) => deal.playerId === playerId);

  if (!playerExists || dealAlreadyExists || getActiveDeals(state).length >= maxActiveDeals) {
    return null;
  }

  const deal: Deal = {
    id: `deal-${playerId}`,
    playerId,
    status: 'prepared',
    attemptCount: 0,
    transferFee: null,
    weeklyWage: null,
    scoutStatus: 'notAvailable',
    medicalRiskRevealed: false,
    medicalRiskAccepted: false,
    createdAt: now,
    updatedAt: now,
    completedAt: null,
  };

  return {
    ...state,
    deals: [...state.deals, deal],
    selectedDealId: deal.id,
  };
}

export function submitFirstOfferTransition(
  state: GameState,
  dealId: string,
  payload: OfferPayload,
  now: number,
): GameState | null {
  return submitOfferTransition(state, dealId, payload, 1, now);
}

export function submitRetryTransition(
  state: GameState,
  dealId: string,
  payload: OfferPayload,
  now: number,
): GameState | null {
  return submitOfferTransition(state, dealId, payload, 2, now);
}

export function resolveOfferTransition(
  state: GameState,
  dealId: string,
  attempt: 1 | 2,
  resolvedAt: number,
): GameState | null {
  const task = state.pendingTasks.find(
    (item): item is OfferResponseTask =>
      item.type === 'offerResponse' && item.dealId === dealId && item.attempt === attempt,
  );

  if (!task || task.completesAt > resolvedAt) {
    return null;
  }

  return resolveOfferResponseTask(state, task, task.completesAt);
}

export function processDueOfferResponses(state: GameState, now: number): GameState {
  const dueTasks = state.pendingTasks
    .filter(
      (task): task is OfferResponseTask => task.type === 'offerResponse' && task.completesAt <= now,
    )
    .sort((left, right) => left.completesAt - right.completesAt || left.id.localeCompare(right.id));

  return dueTasks.reduce(
    (nextState, task) => resolveOfferResponseTask(nextState, task, task.completesAt),
    state,
  );
}

function submitOfferTransition(
  state: GameState,
  dealId: string,
  payload: OfferPayload,
  attempt: 1 | 2,
  now: number,
): GameState | null {
  const deal = state.deals.find((item) => item.id === dealId);
  const player = deal ? state.players.find((item) => item.id === deal.playerId) : undefined;
  const expectedStatus = attempt === 1 ? 'prepared' : 'rejected';
  const expectedAttemptCount = attempt === 1 ? 0 : 1;

  if (
    !deal ||
    !player ||
    deal.status !== expectedStatus ||
    deal.attemptCount !== expectedAttemptCount ||
    !isValidOffer(payload) ||
    getPendingOfferResponseCount(state) >= maxPendingOfferResponses
  ) {
    return null;
  }

  const task = createOfferResponseTask(deal, player, attempt, now);

  return {
    ...state,
    deals: state.deals.map((item) =>
      item.id === dealId
        ? {
            ...item,
            status: 'awaitingResponse',
            attemptCount: attempt,
            transferFee: payload.transferFee,
            weeklyWage: payload.weeklyWage,
            scoutStatus: attempt === 1 ? 'available' : item.scoutStatus,
            updatedAt: now,
          }
        : item,
    ),
    pendingTasks: [...state.pendingTasks, task],
  };
}

function isValidOffer(payload: OfferPayload): boolean {
  return (
    Number.isFinite(payload.transferFee) &&
    Number.isFinite(payload.weeklyWage) &&
    payload.transferFee > 0 &&
    payload.weeklyWage > 0
  );
}

function createOfferResponseTask(
  deal: Deal,
  player: Player,
  attempt: 1 | 2,
  now: number,
): OfferResponseTask {
  return {
    id: `offer-response-${deal.id}-${attempt}`,
    dealId: deal.id,
    type: 'offerResponse',
    attempt,
    createdAt: now,
    completesAt: now + getOfferResponseDurationMs(player, attempt),
  };
}

function resolveOfferResponseTask(
  state: GameState,
  task: OfferResponseTask,
  resolvedAt: number,
): GameState {
  const deal = state.deals.find((item) => item.id === task.dealId);
  const player = deal ? state.players.find((item) => item.id === deal.playerId) : undefined;
  const pendingTasks = state.pendingTasks.filter((item) => item.id !== task.id);

  if (
    !deal ||
    !player ||
    deal.status !== 'awaitingResponse' ||
    deal.attemptCount !== task.attempt
  ) {
    return { ...state, pendingTasks };
  }

  const resolution = resolveOffer(deal, player);

  return {
    ...state,
    deals: state.deals.map((item) =>
      item.id === deal.id
        ? {
            ...item,
            status: resolution.accepted ? 'accepted' : 'rejected',
            updatedAt: resolvedAt,
          }
        : item,
    ),
    pendingTasks,
  };
}

export function cancelDealButton(dealId: string, state: GameState, now: number): GameState | null {
  const dealForCancel = getDealById(state, dealId);
  if (!dealForCancel) {
    return null;
  }
  return {
    ...state,
    deals: state.deals.map((deal) =>
      deal.id === dealForCancel.id ? { ...dealForCancel, status: 'cancelled' } : deal,
    ),
  };
}
