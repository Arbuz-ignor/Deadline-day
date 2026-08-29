import { Component, computed, input } from '@angular/core';
import type { Deal } from '../../../../core/models/deal.model';
import { PlayerTrait, type Player } from '../../../../core/models/player.model';
import { clubLogoUrls, playerTraitLabels } from '../../../../core/constants/game.constants';
@Component({
  selector: 'app-active-deal-card',
  imports: [],
  templateUrl: './active-deal-card.html',
  styleUrl: './active-deal-card.scss',
})
export class ActiveDealCard {
  readonly player = input.required<Player>();
  readonly deal = input.required<Deal>();

  readonly playerTraitLabel = playerTraitLabels;

  readonly visibleTraits = computed<PlayerTrait[]>(() =>
    this.player().traits.filter(
      (trait) => trait != 'injuryProne' || this.deal().medicalRiskRevealed,
    ),
  );
  readonly clubUrl = computed(
    () => clubLogoUrls[this.player().club] ?? 'assets/clubs/manchester-city.png',
  );
}
