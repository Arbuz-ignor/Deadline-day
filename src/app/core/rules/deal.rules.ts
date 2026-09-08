import type { Deal } from '../models/deal.model';
import type { Player } from '../models/player.model';

export type OfferRejectionReason = 'fee' | 'wage' | 'both';

export type OfferResolution =
  | { readonly accepted: true; readonly reason: null }
  | { readonly accepted: false; readonly reason: OfferRejectionReason };

const firstOfferDurationsMs = {
  default: 15_000,
  wantsToJoin: 9_000,
  difficultNegotiations: 24_000,
} as const;

const retryOfferDurationsMs = {
  default: 24_000,
  wantsToJoin: 15_000,
  difficultNegotiations: 36_000,
} as const;

export function calculateOfferDecision(deal: Deal, player: Player): OfferResolution {
  const feeAccepted = deal.transferFee !== null && deal.transferFee >= player.minimumTransferFee;
  const wageAccepted = deal.weeklyWage !== null && deal.weeklyWage >= player.minimumWeeklyWage;

  if (feeAccepted && wageAccepted) {
    return { accepted: true, reason: null };
  }

  if (!feeAccepted && !wageAccepted) {
    return { accepted: false, reason: 'both' };
  }

  return { accepted: false, reason: feeAccepted ? 'wage' : 'fee' };
}

export function getOfferResponseDurationMs(player: Player, attempt: 1 | 2): number {
  const durations = attempt === 1 ? firstOfferDurationsMs : retryOfferDurationsMs;

  if (player.traits.includes('difficultNegotiations')) {
    return durations.difficultNegotiations;
  }

  if (player.traits.includes('wantsToJoin')) {
    return durations.wantsToJoin;
  }

  return durations.default;
}
