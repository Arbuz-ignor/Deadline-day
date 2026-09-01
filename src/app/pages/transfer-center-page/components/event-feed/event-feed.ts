import { Component, input } from '@angular/core';

@Component({
  selector: 'app-event-feed',
  imports: [],
  templateUrl: './event-feed.html',
  styleUrl: './event-feed.scss',
})
export class EventFeed {
  readonly hasDeals = input(false);
}
