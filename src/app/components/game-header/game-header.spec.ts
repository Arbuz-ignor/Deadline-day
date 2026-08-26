import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GameHeader } from './game-header';

describe('GameHeader', () => {
  let component: GameHeader;
  let fixture: ComponentFixture<GameHeader>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GameHeader],
    }).compileComponents();

    fixture = TestBed.createComponent(GameHeader);
    component = fixture.componentInstance;
    fixture.componentRef.setInput('day', 'Понедельник · 10 августа');
    fixture.componentRef.setInput('pageTitle', 'Трансферный центр');
    fixture.componentRef.setInput('wageBudget', '€118ТЫС');
    fixture.componentRef.setInput('transferBudget', '€118M');
    fixture.componentRef.setInput('timeLeft', '05:47:09');
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
