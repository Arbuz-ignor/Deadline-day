import { Component, computed, input, output } from '@angular/core';
import { Player } from '../../../../core/models/player.model';
import { formatTransferFee, playerTraitLabels } from '../../../../core/constants/game.constants';
import { getSelectedPlayerById } from '../../../../core/selectors/game.selectors';
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
  readonly selectedPlayerId = input<string | null>(null);
}
