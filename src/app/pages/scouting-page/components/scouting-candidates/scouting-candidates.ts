import { Component, computed, input, output } from '@angular/core';
import { Player } from '../../../../core/models/player.model';
import { playerTraitLabels } from '../../../../core/constants/game.constants';
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
  readonly formatMillions = (value: number) => `€${value / 1_000_000}М`;
  readonly selectedPlayerId = input<string | null>(null);
}
