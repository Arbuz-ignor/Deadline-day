import { Component, computed, inject } from '@angular/core';
import { GameHeader } from '../../components/game-header/game-header';
import { ActiveDealCard } from './components/active-deal-card/active-deal-card';
import { PlayerPhoto } from './components/player-photo/player-photo';
import { ScoutRadar } from './components/scout-radar/scout-radar';
import { TransferBoard } from './components/transfer-board/transfer-board';
import { EventFeed } from './components/event-feed/event-feed';
import { GameStore } from '../../core/state/game.store';
import { Dialog } from '@angular/cdk/dialog';
import { getOfferModalData } from '../../core/selectors/game.selectors';
import { OfferPayload } from '../../core/models/deal.model';
import { OfferModal } from './components/offer-modal/offer-modal';
import { OfferModalData } from '../../core/models/game-view.model';
@Component({
  selector: 'app-transfer-center-page',
  imports: [GameHeader, ActiveDealCard, PlayerPhoto, ScoutRadar, TransferBoard, EventFeed],
  templateUrl: './transfer-center-page.html',
  styleUrl: './transfer-center-page.scss',
})
export class TransferCenterPage {
  readonly gameStore = inject(GameStore);

  private readonly dialog = inject(Dialog);

  readonly selectedDealContent = computed(() => {
    const deal = this.gameStore.selectedDeal();
    const player = this.gameStore.selectedPlayer();

    if (!deal || !player) {
      return [];
    }

    return [{ deal, player }];
  });

  openOfferModal(dealId: string): void {
    const modalData = getOfferModalData(this.gameStore.state(), dealId);

    if (!modalData) {
      return;
    }

    const dialogRef = this.dialog.open<OfferPayload, OfferModalData>(OfferModal, {
      data: modalData,
      hasBackdrop: true,
      disableClose: false,
      maxWidth: 'calc(100vw - 32px)',
    });

    dialogRef.closed.subscribe((offer) => {
      if (!offer) {
        return;
      }

      console.log('ПРедложение', offer);
    });
  }
}
