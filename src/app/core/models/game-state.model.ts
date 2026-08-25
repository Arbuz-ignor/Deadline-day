import type { Club } from './club.model';
import type { Deal } from './deal.model';
import type { GameEvent } from './game-event.model';
import type { Player } from './player.model';

export interface GameState {
  readonly players: readonly Player[];
  readonly clubs: readonly Club[];
  readonly deals: readonly Deal[];
  readonly events: readonly GameEvent[];
  readonly selectedDealId: string | null;
  readonly transferBudget: number;
  readonly salaryBudget: number;
  readonly currentTime: string;
  readonly deadline: string;
}