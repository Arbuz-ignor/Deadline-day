import { Component, computed, input, output } from '@angular/core';

import type { PlayerStats } from '../../../../core/models/player.model';
import { requestScoutReportState } from '@core/state/deal.transitions';
import { ScoutStatus } from '@core/models/deal.model';

@Component({
  selector: 'app-scout-radar',
  templateUrl: './scout-radar.html',
  styleUrl: './scout-radar.scss',
})
export class ScoutRadar {
  readonly playerName = input.required<string>();
  readonly stats = input.required<PlayerStats>();
  readonly dealId = input.required<string>();
  readonly reportRequested = output<string>();
  readonly scoutStatus = input.required<ScoutStatus>();

  openStats(): void {
    this.reportRequested.emit(this.dealId());
  }

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
