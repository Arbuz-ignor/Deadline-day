import { DealStatus } from '../models/deal.model';
import { PlayerPosition, PlayerTrait } from '../models/player.model';

export const playerPositionLabels: Record<PlayerPosition, string> = {
  нападающий: 'Нападающий',
  вингер: 'Вингер',
  полузащитник: 'Полузащитник',
};

export const playerTraitLabels: Record<PlayerTrait, string> = {
  difficultNegotiations: 'Сложные переговоры',
  rivalPlayer: 'Игрок соперника',
  wantsToJoin: 'Хочет перейти',
  conflictProne: 'Конфликтный игрок',
  inconsistent: 'Нестабильный игок',
  injuryProne: 'Склонен к травмам',
};

export const dealStageOrder: readonly DealStatus[] = [
  'prepared',
  'awaitingResponse',
  'accepted',
  'medicalInProgress',
  'medicalDecisionRequired',
  'completed',
];

export const dealStageLabels: Record<DealStatus, string> = {
  prepared: 'Подготовка',
  awaitingResponse: 'Ожидание',
  rejected: 'Отклонено',
  accepted: 'Принято',
  medicalInProgress: 'Медосмотр',
  medicalDecisionRequired: 'Ждет решения',
  completed: 'Завершено',
  cancelled: 'Отменено',
};

export function formatTransferFee(value: number | null): string {
  if (value === null) {
    return '—';
  }

  const millions = value / 1_000_000;
  const formattedValue = Number.isInteger(millions) ? millions : millions.toFixed(1);

  return `€${formattedValue}M`;
}
