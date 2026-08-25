import { DealStage } from '../models/deal.model';
import { PlayerPosition } from '../models/player.model';

export const playerPositionLabels: Record<PlayerPosition, string> = {
  gk: 'Вратарь',
  cb: 'Центральный защитник',
  lb: 'Левый защитник',
  rb: 'Правый защитник',
  dm: 'Опорный полузащитник',
  cm: 'Центральный полузащитник',
  am: 'Атакующий полузащитник',
  lw: 'Левый вингер',
  rw: 'Правый вингер',
  st: 'Нападающий',
};

export const dealStageOrder: readonly DealStage[] = ['offer', 'negotiations', 'medical', 'signing'];

export const dealStageLabels: Record<DealStage, string> = {
  offer: 'Предложение',
  negotiations: 'Переговоры',
  medical: 'Медосмотр',
  signing: 'Подписание',
};

export const dealStageProgress: Record<DealStage, number> = {
  offer: 25,
  negotiations: 50,
  medical: 75,
  signing: 100,
};
