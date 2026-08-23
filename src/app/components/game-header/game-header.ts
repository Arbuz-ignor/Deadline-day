import { Component, input } from '@angular/core';

@Component({
  selector: 'app-game-header',
  imports: [],
  templateUrl: './game-header.html',
  styleUrl: './game-header.scss',
})
export class GameHeader {
  readonly day = input.required<string>();
  readonly pageTitle = input.required<string>();
  readonly wageBudget = input.required<string>();
  readonly transferBudget = input.required<string>();
  readonly timeLeft = input.required<string>();
}