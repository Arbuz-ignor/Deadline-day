export type GameEventType =
  | 'info'
  | 'success'
  | 'warning'
  | 'error';

export interface GameEvent {
  readonly id: string;
  readonly dealId: string | null;
  readonly time: string;
  readonly message: string;
  readonly type: GameEventType;
}