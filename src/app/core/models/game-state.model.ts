import type { Deal } from './deal.model';
import type { PendingTask } from './pending-task.model';
import type { Player } from './player.model';

export interface GameState {
  players: Player[];
  deals: Deal[];
  pendingTasks: PendingTask[];

  selectedPlayerId: string | null;
  selectedDealId: string | null;
}
