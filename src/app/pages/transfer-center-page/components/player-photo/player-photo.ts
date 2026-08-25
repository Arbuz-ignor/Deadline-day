import { Component, input } from '@angular/core';
import type { Player } from '../../../../core/models/player.model';

@Component({
  selector: 'app-player-photo',
  templateUrl: './player-photo.html',
  styleUrl: './player-photo.scss',
})
export class PlayerPhoto {
  readonly player = input.required<Player>();
}