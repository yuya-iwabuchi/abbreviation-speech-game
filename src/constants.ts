export enum GameStep {
  INITIAL = 'INITIAL',
  COUNTDOWN = 'COUNTDOWN',
  ANSWERING = 'ANSWERING',
  RESULT = 'RESULT',
  GAME_END = 'GAME_END',
}

export enum RoundState {
  PENDING = 'PENDING',
  ANSWERING = 'ANSWERING',
  CORRECT = 'CORRECT',
  WRONG = 'WRONG',
}

export const BEATS_PER_BLOCK = 4
export const BEAT_MS = 700
