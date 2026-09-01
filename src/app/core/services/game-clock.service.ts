import { Injectable, inject } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { interval } from 'rxjs';

import { GameStore } from '../state/game.store';

@Injectable({ providedIn: 'root' })
export class GameClockService {
  private readonly store = inject(GameStore);

  constructor() {
    interval(250)
      .pipe(takeUntilDestroyed())
      .subscribe(() => this.store.tick(Date.now()));
  }
}
