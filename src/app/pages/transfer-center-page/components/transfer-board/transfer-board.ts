import { Component, computed, input, output } from '@angular/core';
import type { Deal } from '../../../../core/models/deal.model';
import type { Player } from '../../../../core/models/player.model';
import {
  dealStageLabels,
  formatTime,
  formatTransferFee,
  playerPositionLabels,
} from '../../../../core/constants/game.constants';
@Component({
  selector: 'app-transfer-board',
  imports: [],
  templateUrl: './transfer-board.html',
  styleUrl: './transfer-board.scss',
})
export class TransferBoard {
  readonly deals = input.required<readonly Deal[]>();
  readonly players = input.required<readonly Player[]>();
  readonly selectedDealId = input.required<string | null>();
  readonly dealSelected = output<string>();

  readonly rows = computed(() =>
    this.deals().map((deal) => {
      const player = this.players().find((item) => item.id === deal.playerId);

      return {
        id: deal.id,
        playerName: player?.name ?? 'Неизвестный игрок',
        playerPhotoUrl: player?.photoUrl ?? '',
        positionLabel: player ? playerPositionLabels[player.position] : '',
        transferFeeLabel: formatTransferFee(deal.transferFee),
        weeklyWageLabel: deal.weeklyWage === null ? '—' : `€${deal.weeklyWage / 1_000}тыс`,
        status: deal.status,
        stageLabel: dealStageLabels[deal.status],
        updatedAtLabel: formatTime(deal.updatedAt),
      };
    }),
  );
}
