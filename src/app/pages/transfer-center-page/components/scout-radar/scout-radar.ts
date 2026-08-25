import { Component, input } from '@angular/core';

import { PlayerStats } from '../../../../core/models/player.model';

@Component({
  selector: 'app-scout-radar',
  templateUrl: './scout-radar.html',
  styleUrl: './scout-radar.scss',
})
export class ScoutRadar {
  readonly playerName = input.required<string>();
  readonly stats = input.required<PlayerStats>();
}
