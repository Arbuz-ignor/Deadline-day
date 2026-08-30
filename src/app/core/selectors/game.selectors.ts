import type { Deal } from '../models/deal.model';
import type { GameState } from '../models/game-state.model';
import type { Player } from '../models/player.model';

export function getActiveDeals(state: GameState): Deal[] {
  return state.deals.filter((deal) => deal.status !== 'cancelled' && deal.status !== 'completed');
}

export function getSelectedDeal(
  activeDeals: readonly Deal[],
  selectedDealId: string | null,
): Deal | null {
  const selectedDeal = activeDeals.find((deal) => deal.id === selectedDealId);

  return selectedDeal ?? activeDeals[0] ?? null;
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
