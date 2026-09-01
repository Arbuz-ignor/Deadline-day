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
  createDealTransition,
  openRetryTransition,
  processDueOfferResponses,
  resolveOfferTransition,
  submitFirstOfferTransition,
  submitRetryTransition,
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
    return this.applyTransition((state) => createDealTransition(state, player.id, now));
  }

  submitFirstOffer(dealId: string, payload: OfferPayload, now = Date.now()): boolean {
    return this.applyTransition((state) => submitFirstOfferTransition(state, dealId, payload, now));
  }

  openRetry(dealId: string, now = Date.now()): boolean {
    return this.applyTransition((state) => openRetryTransition(state, dealId, now));
  }

  submitRetry(dealId: string, payload: OfferPayload, now = Date.now()): boolean {
    return this.applyTransition((state) => submitRetryTransition(state, dealId, payload, now));
  }

  resolveOffer(dealId: string, attempt: 1 | 2, resolvedAt = Date.now()): boolean {
    return this.applyTransition((state) =>
      resolveOfferTransition(state, dealId, attempt, resolvedAt),
    );
  }

  tick(now: number): void {
    this.stateSignal.update((state) => processDueOfferResponses(state, now));
  }

  private applyTransition(transition: (state: GameState) => GameState | null): boolean {
    const nextState = transition(this.state());

    if (!nextState) {
      return false;
    }

    this.stateSignal.set(nextState);
    return true;
  }
}
