import { Component, inject } from '@angular/core';

import { GameHeader } from '../../components/game-header/game-header';
import { ScoutingCandidates } from './components/scouting-candidates/scouting-candidates';
import { ScoutingPlayer } from './components/scouting-player/scouting-player';
import { GameStore } from '../../core/state/game.store';

@Component({
  selector: 'app-scouting-page',
  imports: [GameHeader, ScoutingCandidates, ScoutingPlayer],
  templateUrl: './scouting-page.html',
  styleUrl: './scouting-page.scss',
})
export class ScoutingPage {
  readonly gameStore = inject(GameStore);
}
