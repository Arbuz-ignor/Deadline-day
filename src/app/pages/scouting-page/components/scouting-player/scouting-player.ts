import { Component, input, output } from '@angular/core';
import { Player } from '../../../../core/models/player.model';
import { Deal } from '../../../../core/models/deal.model';

@Component({
  selector: 'app-scouting-player',
  imports: [],
  templateUrl: './scouting-player.html',
  styleUrl: './scouting-player.scss',
})
export class ScoutingPlayer {
  readonly player = input.required<Player>();
  readonly deal = output<Deal>();
}
