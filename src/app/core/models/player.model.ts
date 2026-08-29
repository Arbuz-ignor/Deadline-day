export type PlayerPosition = 'нападающий' | 'вингер' | 'полузащитник';

export type StatLevel = 'плохо' | 'средне' | 'хорошо';

export type PlayerTrait =
  | 'difficultNegotiations'
  | 'rivalPlayer'
  | 'wantsToJoin'
  | 'conflictProne'
  | 'inconsistent'
  | 'injuryProne';

export interface PlayerStats {
  passing: StatLevel;
  technique: StatLevel;
  shooting: StatLevel;
  defending: StatLevel;
  physical: StatLevel;
}

export type StatKey = keyof PlayerStats;

export interface Player {
  id: string;
  name: string;
  photoUrl: string;

  age: number;
  nationality: string;
  club: string;
  position: PlayerPosition;

  stats: PlayerStats;
  traits: PlayerTrait[];

  contractYearsLeft: number;

  currentWeeklyWage: number;
  minimumWeeklyWage: number;

  estimatedValue: number;
  minimumTransferFee: number;
}
