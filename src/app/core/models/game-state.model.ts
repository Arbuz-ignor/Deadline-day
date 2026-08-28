import type { Deal } from './deal.model';
import type { Player } from './player.model';

export interface GameState {
  players: Player[];
  deals: Deal[];

  selectedPlayerId: string | null;
  selectedDealId: string | null;
}
