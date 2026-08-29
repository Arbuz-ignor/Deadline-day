import { Component, computed, input, output } from '@angular/core';
import { Player } from '../../../../core/models/player.model';
import { clubLogoUrls, playerTraitLabels } from '../../../../core/constants/game.constants';

@Component({
  selector: 'app-scouting-player',
  imports: [],
  templateUrl: './scouting-player.html',
  styleUrl: './scouting-player.scss',
})
export class ScoutingPlayer {
  readonly player = input.required<Player>();
  readonly deal = output<Player>();
  readonly playerTraitLabel = playerTraitLabels;
  readonly visibleTraits = computed(() =>
    this.player().traits.filter((trait) => trait !== 'injuryProne'),
  );

  readonly clubLogoUrl = computed(
    () => clubLogoUrls[this.player().club] ?? 'assets/clubs/manchester-city.png',
  );
}
