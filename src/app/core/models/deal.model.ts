export type DealStage =
  | 'offer'
  | 'negotiations'
  | 'medical'
  | 'documents'
  | 'registration';

export type DealStatus =
  | 'active'
  | 'completed'
  | 'abandoned'
  | 'failed';

export interface Deal {
  readonly id: string;
  readonly playerId: string;
  readonly destinationClubId: string;
  readonly transferFee: number;
  readonly weeklySalary: number;
  readonly contractYears: number;
  readonly stage: DealStage;
  readonly status: DealStatus;
  readonly updatedAt: string;
}