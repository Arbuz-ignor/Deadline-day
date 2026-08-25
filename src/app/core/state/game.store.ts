import { computed, Injectable, signal } from '@angular/core';

import { initialGameState } from '../data/initial-game-state';
import type { GameState } from '../models/game-state.model';
import { getActiveDeals, getSelectedDeal, getSelectedPlayer } from '../selectors/game.selectors';

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
}
