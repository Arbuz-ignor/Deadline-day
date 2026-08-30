import { computed, Injectable, signal } from '@angular/core';

import { initialGameState } from '../data/initial-game-state';
import type { GameState } from '../models/game-state.model';
import {
  getActiveDeals,
  getSelectedDeal,
  getSelectedPlayer,
  getSelectedPlayerById,
} from '../selectors/game.selectors';
import { Player } from '../models/player.model';
import { Deal } from '../models/deal.model';

@Injectable({
  providedIn: 'root',
})
export class GameStore {
  private readonly stateSignal = signal<GameState>(initialGameState);
  readonly state = this.stateSignal.asReadonly();

  readonly activeDeals = computed(() => getActiveDeals(this.state()));
  readonly selectedDeal = computed(() =>
    getSelectedDeal(this.activeDeals(), this.state().selectedDealId),
  );
  readonly selectedPlayer = computed(() => getSelectedPlayer(this.state(), this.selectedDeal()));
  readonly selectedPlayerById = computed(() =>
    getSelectedPlayerById(this.state().players, this.state().selectedPlayerId),
  );

  selectDeal(dealId: string): void {
    const dealExists = this.activeDeals().some((deal) => deal.id === dealId);
    if (!dealExists) {
      return;
    }

    this.stateSignal.update((state) => ({
      ...state,
      selectedDealId: dealId,
    }));
  }

  selectPlayer(playerId: string): void {
    this.stateSignal.update((state) => ({
      ...state,
      selectedPlayerId: playerId,
    }));
  }

  createDeal(player: Player): boolean {
    const alreadyActive = this.state().deals.some(
      (deal) =>
        deal.playerId === player.id && deal.status !== 'cancelled' && deal.status !== 'completed',
    );

    if (alreadyActive) {
      return false;
    }

    const deal: Deal = {
      id: `deal-${player.id}`,
      playerId: player.id,
      status: 'prepared',
      attemptCount: 0,
      transferFee: player.minimumTransferFee,
      weeklyWage: player.currentWeeklyWage,
      scoutStatus: 'notAvailable',
      medicalRiskRevealed: false,
      medicalRiskAccepted: false,
      createdAt: Date.now(),
      updatedAt: Date.now(),
      completedAt: null,
    };

    this.stateSignal.update((state) => ({
      ...state,
      deals: [...state.deals, deal],
      selectedDealId: deal.id,
    }));

    return true;
  }
}
