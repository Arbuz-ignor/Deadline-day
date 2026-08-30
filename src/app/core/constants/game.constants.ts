import { DealStatus } from '../models/deal.model';
import { PlayerPosition, PlayerTrait } from '../models/player.model';

export const clubLogoUrls: Readonly<Record<string, string>> = {
  'AC Milan': 'assets/clubs/ac-milan.png',
  'Al Nassr': 'assets/clubs/al-nassr.png',
  'Arsenal': 'assets/clubs/arsenal.png',
  'Barcelona': 'assets/clubs/barcelona.png',
  'Bayern Munich': 'assets/clubs/bayern-munich.png',
  'Fenerbahçe': 'assets/clubs/fenerbahce.png',
  'Galatasaray': 'assets/clubs/galatasaray.png',
  'Lille': 'assets/clubs/lille.png',
  'Liverpool': 'assets/clubs/liverpool.png',
  'Manchester City': 'assets/clubs/manchester-city.png',
  'Manchester United': 'assets/clubs/manchester-united.png',
  'Newcastle United': 'assets/clubs/newcastle.png',
  'Paris Saint-Germain': 'assets/clubs/paris-saint-germain.png',
  'Real Madrid': 'assets/clubs/real-madrid.png',
  'Rosario Central': 'assets/clubs/rosario-central.png',
  'Santos': 'assets/clubs/santos.png',
  'Tottenham': 'assets/clubs/tottenham.png',
};

export const playerPositionLabels: Record<PlayerPosition, string> = {
  нападающий: 'Нападающий',
  вингер: 'Вингер',
  полузащитник: 'Полузащитник',
};

export const playerTraitLabels: Record<PlayerTrait, string> = {
  difficultNegotiations: 'Сложные переговоры',
  rivalPlayer: 'Игрок соперника',
  wantsToJoin: 'Хочет перейти',
  conflictProne: 'Конфликтный',
  inconsistent: 'Нестабильный',
  injuryProne: 'Травмитичный',
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
  awaitingRetry: 'Повторное предложение',
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
