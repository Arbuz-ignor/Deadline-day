import { Component, computed, inject } from '@angular/core';
import { GameHeader } from '../../components/game-header/game-header';
import { ActiveDealCard } from './components/active-deal-card/active-deal-card';
import { PlayerPhoto } from './components/player-photo/player-photo';
import { ScoutRadar } from './components/scout-radar/scout-radar';
import { TransferBoard } from './components/transfer-board/transfer-board';
import { EventFeed } from './components/event-feed/event-feed';
import { GameStore } from '../../core/state/game.store';
@Component({
  selector: 'app-transfer-center-page',
  imports: [GameHeader, ActiveDealCard, PlayerPhoto, ScoutRadar, TransferBoard, EventFeed],
  templateUrl: './transfer-center-page.html',
  styleUrl: './transfer-center-page.scss',
})
export class TransferCenterPage {
  readonly gameStore = inject(GameStore);
  readonly selectedDealContent = computed(() => {
    const deal = this.gameStore.selectedDeal();
    const player = this.gameStore.selectedPlayer();

    if (!deal || !player) {
      return [];
    }

    return [{ deal, player }];
  });
}
