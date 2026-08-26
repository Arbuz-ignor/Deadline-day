import { DealStage } from '../models/deal.model';
import { PlayerPosition } from '../models/player.model';

export const playerPositionLabels: Record<PlayerPosition, string> = {
  gk: 'ВР',
  cb: 'ЦЗ',
  lb: 'ЛЗ',
  rb: 'ПЗ',
  dm: 'ОПЗ',
  cm: 'ЦП',
  am: 'АПЗ',
  lw: 'ЛВ',
  rw: 'ПВ',
  st: 'НАП',
};

export const dealStageOrder: readonly DealStage[] = ['offer', 'negotiations', 'medical', 'signing'];

export const dealStageLabels: Record<DealStage, string> = {
  offer: 'Предложение',
  negotiations: 'Ждём ответ',
  medical: 'Медосмотр',
  signing: 'Подписание',
};

export const dealStageProgress: Record<DealStage, number> = {
  offer: 25,
  negotiations: 50,
  medical: 75,
  signing: 100,
};

export function formatTransferFee(value: number): string {
  const millions = value / 1000000;
  const formattedValue = Number.isInteger(millions) ? millions : millions.toFixed(1);

  return `€${formattedValue}M`;
}
