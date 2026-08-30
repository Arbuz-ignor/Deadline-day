import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class NotificationService {
  private readonly messageSignal = signal<string | null>(null);
  readonly message = this.messageSignal.asReadonly();

  private timer: ReturnType<typeof setTimeout> | null = null;

  show(message: string, duration = 2500): void {
    if (this.timer) {
      clearTimeout(this.timer);
    }

    this.messageSignal.set(message);

    this.timer = setTimeout(() => {
      this.messageSignal.set(null);
      this.timer = null;
    }, duration);
  }
}
