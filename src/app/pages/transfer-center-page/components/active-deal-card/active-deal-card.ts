import { Component, computed, input, output } from '@angular/core';
import type { Deal } from '../../../../core/models/deal.model';
import { PlayerTrait, type Player } from '../../../../core/models/player.model';
import {
  clubLogoUrls,
  playerPositionLabels,
  playerTraitLabels,
} from '../../../../core/constants/game.constants';
@Component({
  selector: 'app-active-deal-card',
  imports: [],
  templateUrl: './active-deal-card.html',
  styleUrl: './active-deal-card.scss',
})
export class ActiveDealCard {
  readonly player = input.required<Player>();
  readonly deal = input.required<Deal>();
  readonly offerRequested = output<string>();
  readonly dealCancel = output<string>();

  readonly playerTraitLabel = playerTraitLabels;
  readonly playerPositionLabel = playerPositionLabels;

  readonly visibleTraits = computed<PlayerTrait[]>(() =>
    this.player().traits.filter(
      (trait) => trait != 'injuryProne' || this.deal().medicalRiskRevealed,
    ),
  );
  readonly clubUrl = computed(
    () => clubLogoUrls[this.player().club] ?? 'assets/clubs/manchester-city.png',
  );

  readonly primaryAction = computed(() => {
    const deal = this.deal();

    if (deal.status === 'prepared') {
      return { label: 'Сделать предложение', disabled: false };
    }

    if (deal.status === 'rejected' && deal.attemptCount === 1) {
      return { label: 'Повторить предложение', disabled: false };
    }

    if (deal.status === 'awaitingResponse') {
      return { label: 'Ожидаем ответ', disabled: true };
    }

    if (deal.status === 'accepted') {
      return { label: 'Предложение принято', disabled: true };
    }

    return { label: 'Переговоры завершены', disabled: true };
  });
}
