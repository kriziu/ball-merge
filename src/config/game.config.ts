import { BallVariant } from '~/types/game.types';

export const GAME_BACKGROUND_COLOR = 0x000000;
export const GAME_SIZE = 1000;
export const BALL_RADIUS = 20;
export const BOUNDARY_STROKE_WIDTH = 4;
export const BOUNDARY_STROKE_COLOR = 0xffffff;

export const BALL_VARIANTS: BallVariant[] = [
  { color: 0xeb2a2a, scale: 1 },
  { color: 0x2aeb37, scale: 1.5 },
  { color: 0x2a6deb, scale: 2 },
];
