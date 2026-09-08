import { computed, Injectable, signal } from '@angular/core';

import { initialGameState } from '../data/initial-game-state';
import type { OfferPayload } from '../models/deal.model';
import type { GameState } from '../models/game-state.model';
import type { Player } from '../models/player.model';
import {
  getActiveDeals,
  getPendingOfferResponseCount,
  getSelectedDeal,
  getSelectedPlayer,
  getSelectedPlayerById,
} from '../selectors/game.selectors';
import {
  cancelDealState,
  completeDueTasks,
  createDealState,
  requestScoutReportState,
  submitFirstOfferState,
  submitRetryOfferState,
} from './deal.transitions';

@Injectable({
  providedIn: 'root',
})
export class GameStore {
  private readonly stateSignal = signal<GameState>(initialGameState);
  readonly state = this.stateSignal.asReadonly();

  readonly activeDeals = computed(() => getActiveDeals(this.state()));
  readonly selectedDeal = computed(() =>
    getSelectedDeal(this.state().deals, this.state().selectedDealId),
  );
  readonly selectedPlayer = computed(() => getSelectedPlayer(this.state(), this.selectedDeal()));
  readonly selectedPlayerById = computed(() =>
    getSelectedPlayerById(this.state().players, this.state().selectedPlayerId),
  );
  readonly pendingOfferResponseCount = computed(() => getPendingOfferResponseCount(this.state()));

  selectDeal(dealId: string): void {
    const dealExists = this.state().deals.some((deal) => deal.id === dealId);
    if (!dealExists) {
      return;
    }

    this.stateSignal.update((state) => ({ ...state, selectedDealId: dealId }));
  }

  selectPlayer(playerId: string): void {
    if (!this.state().players.some((player) => player.id === playerId)) {
      return;
    }

    this.stateSignal.update((state) => ({ ...state, selectedPlayerId: playerId }));
  }

  createDeal(player: Player, now = Date.now()): boolean {
    return this.applyStateChange((state) => createDealState(state, player.id, now));
  }

  submitFirstOffer(dealId: string, payload: OfferPayload, now = Date.now()): boolean {
    return this.applyStateChange((state) => submitFirstOfferState(state, dealId, payload, now));
  }

  submitRetryOffer(dealId: string, payload: OfferPayload, now = Date.now()): boolean {
    return this.applyStateChange((state) => submitRetryOfferState(state, dealId, payload, now));
  }

  requestScoutReport(dealId: string, resolvedAt = Date.now()): boolean {
    return this.applyStateChange((state) => requestScoutReportState(state, dealId, resolvedAt));
  }

  cancelDeal(dealId: string, now = Date.now()) {
    return this.applyStateChange((state) => cancelDealState(dealId, state, now));
  }

  tick(now: number): void {
    this.stateSignal.update((state) => completeDueTasks(state, now));
  }

  private applyStateChange(stateChange: (state: GameState) => GameState | null): boolean {
    const nextState = stateChange(this.state());

    if (!nextState) {
      return false;
    }

    this.stateSignal.set(nextState);
    return true;
  }
}
