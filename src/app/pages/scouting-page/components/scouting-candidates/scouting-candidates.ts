import { Component, input, output } from '@angular/core';
import { Player } from '../../../../core/models/player.model';
import { formatTransferFee } from '../../../../core/constants/game.constants';
@Component({
  selector: 'app-scouting-candidates',
  imports: [],
  templateUrl: './scouting-candidates.html',
  styleUrl: './scouting-candidates.scss',
})
export class ScoutingCandidates {
  readonly players = input.required<readonly Player[]>();
  readonly selectPlayer = output<string>();

  readonly formatMillions = formatTransferFee;
}
