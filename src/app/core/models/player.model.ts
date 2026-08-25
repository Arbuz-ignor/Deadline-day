export type PlayerPosition =
  | 'gk'
  | 'cb'
  | 'lb'
  | 'rb'
  | 'dm'
  | 'cm'
  | 'am'
  | 'lw'
  | 'rw'
  | 'st';

export type PlayerTrait =
  | 'versatile'
  | 'difficultNegotiations'
  | 'rivalPlayer'
  | 'wantsToJoin'
  | 'conflictProne'
  | 'inconsistent';

export interface PlayerStats {
  readonly pace: number;
  readonly vision: number;
  readonly technique: number;
  readonly pressing: number;
  readonly stability: number;
}

export interface Player {
  readonly id: string;
  readonly name: string;
  readonly age: number;
  readonly nationality: string;
  readonly position: PlayerPosition;
  readonly currentClubId: string;
  readonly photoUrl: string;
  readonly traits: readonly PlayerTrait[];
  readonly stats: PlayerStats;
}