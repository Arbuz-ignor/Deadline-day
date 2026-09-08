import type { Deal, OfferPayload } from '../models/deal.model';
import type { GameState } from '../models/game-state.model';
import type { OfferResponseTask, ScoutReportTask } from '../models/pending-task.model';
import type { Player } from '../models/player.model';
import { calculateOfferDecision, getOfferResponseDurationMs } from '../rules/deal.rules';
import {
  getActiveDeals,
  getDealById,
  getPendingOfferResponseCount,
} from '../selectors/game.selectors';

const maxActiveDeals = 5;
const maxPendingOfferResponses = 3;

export function createDealState(state: GameState, playerId: string, now: number): GameState | null {
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
    scoutStatus: 'absent',
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

export function submitFirstOfferState(
  state: GameState,
  dealId: string,
  payload: OfferPayload,
  now: number,
): GameState | null {
  return submitOfferForAttempt(state, dealId, payload, 1, now);
}

export function submitRetryOfferState(
  state: GameState,
  dealId: string,
  payload: OfferPayload,
  now: number,
): GameState | null {
  return submitOfferForAttempt(state, dealId, payload, 2, now);
}

function submitOfferForAttempt(
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

  const task = createPendingOfferResponse(deal, player, attempt, now);

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

function createPendingOfferResponse(
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

function createPendingScoutReport(dealId: string, now: number): ScoutReportTask {
  return {
    id: `scout-response-${dealId}`,
    dealId: dealId,
    type: 'scoutReport',
    createdAt: now,
    completesAt: now + 30000,
  };
}

export function requestScoutReportState(state: GameState, dealId: string, now: number): GameState {
  const taskScout = createPendingScoutReport(dealId, now);
  return {
    ...state,
    deals: state.deals.map((deal) =>
      deal.id === dealId
        ? {
            ...deal,
            scoutStatus: 'inProgress',
            updatedAt: now,
          }
        : deal,
    ),
    pendingTasks: [...state.pendingTasks, taskScout],
  };
}

export function completeDueTasks(state: GameState, now: number): GameState {
  const dueTasks = state.pendingTasks
    .filter((task) => task.completesAt <= now)
    .sort((left, right) => left.completesAt - right.completesAt);

  let newState = state;

  for (const task of dueTasks) {
    const deal = getDealById(newState, task.dealId);
    const player = deal ? newState.players.find((item) => item.id === deal.playerId) : undefined;

    const pendingTasks = newState.pendingTasks.filter((item) => item.id !== task.id);

    if (!deal || !player) {
      newState = {
        ...newState,
        pendingTasks,
      };

      continue;
    }

    if (task.type === 'offerResponse') {
      if (deal.status !== 'awaitingResponse' || deal.attemptCount !== task.attempt) {
        newState = {
          ...newState,
          pendingTasks,
        };

        continue;
      }

      const resolution = calculateOfferDecision(deal, player);

      newState = {
        ...newState,
        deals: newState.deals.map((item) =>
          item.id === deal.id
            ? {
                ...item,
                status: resolution.accepted ? 'accepted' : 'rejected',
                updatedAt: task.completesAt,
              }
            : item,
        ),
        pendingTasks,
      };

      continue;
    }

    if (task.type === 'scoutReport') {
      newState = {
        ...newState,
        deals: newState.deals.map((item) =>
          item.id === deal.id
            ? {
                ...item,
                scoutStatus: 'ready',
                updatedAt: task.completesAt,
              }
            : item,
        ),
        pendingTasks,
      };
    }
  }

  return newState;
}

export function cancelDealState(dealId: string, state: GameState, now: number): GameState | null {
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
