import { Component, computed, input } from '@angular/core';
import type { Deal } from '../../../../core/models/deal.model';
import type { Player } from '../../../../core/models/player.model';
@Component({
  selector: 'app-active-deal-card',
  imports: [],
  templateUrl: './active-deal-card.html',
  styleUrl: './active-deal-card.scss',
})
export class ActiveDealCard {
  readonly player = input.required<Player>();
  readonly deal = input.required<Deal>();
}
