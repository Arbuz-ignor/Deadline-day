import { Component, computed, input, output } from '@angular/core';
import { Club } from '../../../../core/models/club.model';
import { Deal } from '../../../../core/models/deal.model';
import { Player } from '../../../../core/models/player.model';
import {
  dealStageLabels,
  dealStageProgress,
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
  readonly clubs = input.required<readonly Club[]>();

  readonly dealSelected = output<string>();

  readonly rows = computed(() =>
    this.deals().map((deal) => {
      const player = this.players().find((item) => item.id === deal.playerId);

      const club = this.clubs().find((item) => item.id === player?.currentClubId);

      return {
        id: deal.id,
        playerName: player?.name ?? 'Неизвестный игрок',
        playerPhotoUrl: player?.photoUrl ?? '',
        playerDescription: player
          ? `${playerPositionLabels[player.position]} · ${club?.name ?? 'Без клуба'}`
          : '',
        transferFeeLabel: formatTransferFee(deal.transferFee),
        stageLabel: dealStageLabels[deal.stage],
        progress: dealStageProgress[deal.stage],
        updatedAtLabel: deal.updatedAt,
      };
    }),
  );
}
