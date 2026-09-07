export type DealStatus =
  | 'prepared'
  | 'awaitingResponse'
  | 'rejected'
  | 'accepted'
  | 'medicalInProgress'
  | 'medicalDecisionRequired'
  | 'completed'
  | 'cancelled';

export type ScoutStatus = 'notAvailable' | 'available' | 'inProgress' | 'ready';

export interface OfferPayload {
  readonly transferFee: number;
  readonly weeklyWage: number;
}

export interface Deal {
  id: string;
  playerId: string;

  status: DealStatus;
  attemptCount: 0 | 1 | 2;

  transferFee: number | null;
  weeklyWage: number | null;

  scoutStatus: ScoutStatus;

  medicalRiskRevealed: boolean;
  medicalRiskAccepted: boolean;

  createdAt: number;
  updatedAt: number;
  completedAt: number | null;
}
