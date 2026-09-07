import { Component, computed, input, output } from '@angular/core';
import { Player } from '../../../../core/models/player.model';
import { clubLogoUrls, playerTraitLabels } from '../../../../core/constants/game.constants';
import { Deal } from '../../../../core/models/deal.model';
import { readonly } from '@angular/forms/signals';

@Component({
  selector: 'app-scouting-player',
  imports: [],
  templateUrl: './scouting-player.html',
  styleUrl: './scouting-player.scss',
})
export class ScoutingPlayer {
  readonly player = input.required<Player>();
  readonly deals = input.required<readonly Deal[]>();
  readonly dealRequested = output<Player>();
  readonly countActiveDeals = input.required<number>();
  readonly playerTraitLabel = playerTraitLabels;

  readonly visibleTraits = computed(() =>
    this.player().traits.filter((trait) => trait !== 'injuryProne'),
  );

  readonly clubLogoUrl = computed(
    () => clubLogoUrls[this.player().club] ?? 'assets/clubs/manchester-city.png',
  );

  readonly getDealButtonLabel = computed(() => {
    const deal = this.deals().find((deal) => deal.playerId === this.player().id);

    if (deal && deal.status !== 'cancelled' && deal.status !== 'completed') {
      return 'Переговоры уже идут';
    }

    if (!deal && this.countActiveDeals() >= 5) {
      return 'Максимум игроков';
    }

    if (!deal) {
      return 'Начать переговоры';
    }

    return 'Переговоры завершены';
  });
}
