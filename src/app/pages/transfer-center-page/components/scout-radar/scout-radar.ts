import { Component, computed, input } from '@angular/core';

import type { PlayerStats } from '../../../../core/models/player.model';

@Component({
  selector: 'app-scout-radar',
  templateUrl: './scout-radar.html',
  styleUrl: './scout-radar.scss',
})
export class ScoutRadar {
  readonly playerName = input.required<string>();
  readonly stats = input.required<PlayerStats>();

  readonly scaleSegments = [0, 1, 2] as const;

  readonly statRows = computed(() => {
    const stats = this.stats();

    return [
      { label: 'ПЕРЕДАЧИ', level: stats.passing },
      { label: 'УДАР', level: stats.shooting },
      { label: 'ТЕХНИКА', level: stats.technique },
      { label: 'ФИЗИКА', level: stats.physical },
      { label: 'ЗАЩИТА', level: stats.defending },
    ] as const;
  });
}
