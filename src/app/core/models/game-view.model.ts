import type { Deal } from './deal.model';
import type { Player } from './player.model';

export type OfferModalPlayer = Pick<
  Player,
  | 'id'
  | 'name'
  | 'photoUrl'
  | 'position'
  | 'club'
  | 'estimatedValue'
  | 'currentWeeklyWage'
  | 'contractYearsLeft'
>;

interface OfferModalDataBase {
  readonly dealId: string;
  readonly player: OfferModalPlayer;
  readonly clubLogoUrl: string;
}

export interface FirstOfferModalData extends OfferModalDataBase {
  readonly mode: 'first';
  readonly previousOffer: null;
}

export interface RetryOfferModalData extends OfferModalDataBase {
  readonly mode: 'retry';
  readonly previousOffer: {
    readonly transferFee: number;
    readonly weeklyWage: number;
  };
}

export type OfferModalData = FirstOfferModalData | RetryOfferModalData;
