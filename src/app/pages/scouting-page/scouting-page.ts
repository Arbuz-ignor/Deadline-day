import { Component, inject } from '@angular/core';

import { GameHeader } from '../../components/game-header/game-header';
import { ScoutingCandidates } from './components/scouting-candidates/scouting-candidates';
import { ScoutingPlayer } from './components/scouting-player/scouting-player';
import { GameStore } from '../../core/state/game.store';
import { NotificationService } from '../../core/services/notification.service';
import { Player } from '../../core/models/player.model';

@Component({
  selector: 'app-scouting-page',
  imports: [GameHeader, ScoutingCandidates, ScoutingPlayer],
  templateUrl: './scouting-page.html',
  styleUrl: './scouting-page.scss',
})
export class ScoutingPage {
  readonly gameStore = inject(GameStore);
  readonly notification = inject(NotificationService);

  startDeal(player: Player): void {
    const created = this.gameStore.createDeal(player);

    if (!created) {
      return;
    }

    this.notification.show(`${player.name} добавлен в переговоры`);
  }
}
