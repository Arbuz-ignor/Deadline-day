interface PendingTaskBase {
  readonly id: string;
  readonly dealId: string;
  readonly createdAt: number;
  readonly completesAt: number;
}

export interface OfferResponseTask extends PendingTaskBase {
  readonly type: 'offerResponse';
  readonly attempt: 1 | 2;
}

export interface ScoutReportTask extends PendingTaskBase {
  readonly type: 'scoutReport';
}

export interface MedicalTask extends PendingTaskBase {
  readonly type: 'medical';
}

export type PendingTask = OfferResponseTask | ScoutReportTask | MedicalTask;
