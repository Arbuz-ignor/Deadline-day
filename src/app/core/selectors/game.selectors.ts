import type { Deal } from '../models/deal.model';
import type { GameState } from '../models/game-state.model';
import type { Player } from '../models/player.model';

import { clubLogoUrls } from '../constants/game.constants';
import type { OfferModalData } from '../models/game-view.model';

export function getActiveDeals(state: GameState): Deal[] {
  return state.deals.filter(
    (deal) =>
      deal.status !== 'cancelled' &&
      deal.status !== 'completed' &&
      !(deal.status === 'rejected' && deal.attemptCount === 2),
  );
}

export function getPendingOfferResponseCount(state: GameState): number {
  return state.pendingTasks.filter((task) => task.type === 'offerResponse').length;
}

export function getSelectedDeal(
  deals: readonly Deal[],
  selectedDealId: string | null,
): Deal | null {
  const selectedDeal = deals.find((deal) => deal.id === selectedDealId);

  return selectedDeal ?? deals[0] ?? null;
}

export function getSelectedPlayer(state: GameState, selectedDeal: Deal | null): Player | null {
  if (!selectedDeal) {
    return null;
  }

  return state.players.find((player) => player.id === selectedDeal.playerId) ?? null;
}

export function getSelectedPlayerById(
  players: Player[],
  selectedPlayerID: string | null,
): Player | null {
  if (!selectedPlayerID) {
    return null;
  }
  return players.find((player) => player.id === selectedPlayerID) ?? null;
}

export function getOfferModalData(state: GameState, dealId: string): OfferModalData | null {
  const deal = state.deals.find((item) => item.id === dealId);

  if (!deal) {
    return null;
  }

  const player = state.players.find((item) => item.id === deal.playerId);

  if (!player) {
    return null;
  }

  const playerView = {
    id: player.id,
    name: player.name,
    photoUrl: player.photoUrl,
    position: player.position,
    club: player.club,
    estimatedValue: player.estimatedValue,
    currentWeeklyWage: player.currentWeeklyWage,
    contractYearsLeft: player.contractYearsLeft,
  };

  const base = {
    dealId: deal.id,
    player: playerView,
    clubLogoUrl: clubLogoUrls[player.club] ?? 'assets/clubs/manchester-city.png',
  };

  if (deal.status === 'prepared' && deal.attemptCount === 0) {
    return {
      ...base,
      mode: 'first',
      previousOffer: null,
    };
  }

  if (
    deal.status === 'awaitingRetry' &&
    deal.attemptCount === 1 &&
    deal.transferFee !== null &&
    deal.weeklyWage !== null
  ) {
    return {
      ...base,
      mode: 'retry',
      previousOffer: {
        transferFee: deal.transferFee,
        weeklyWage: deal.weeklyWage,
      },
    };
  }

  return null;
}
