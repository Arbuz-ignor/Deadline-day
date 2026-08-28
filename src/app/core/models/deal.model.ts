export type DealStatus =
  | 'prepared'
  | 'awaitingResponse'
  | 'rejected'
  | 'accepted'
  | 'medicalInProgress'
  | 'medicalDecisionRequired'
  | 'completed'
  | 'cancelled';

export type ScoutStatus = 'available' | 'inProgress' | 'ready';

export interface Deal {
  id: string;
  playerId: string;

  status: DealStatus;
  attemptCount: 0 | 1 | 2;

  transferFee: number | null;
  weeklyWage: number | null;

  scoutStatus: ScoutStatus;

  responseCompletesAt: string | null;
  scoutCompletesAt: string | null;
  medicalCompletesAt: string | null;

  medicalRiskRevealed: boolean;
  medicalRiskAccepted: boolean;

  createdAt: string;
  updatedAt: string;
  completedAt: string | null;
  cancelledAt: string | null;
}
