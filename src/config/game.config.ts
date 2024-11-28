import { BallVariant, GameConfig } from '~/types/game.types';

export const GAME_BACKGROUND_COLOR = 0x1f1f1b;
export const GAME_SIZE = 1000;

export const BALL_RADIUS = 20;
export const BALL_STROKE_WIDTH = 6;
export const BALL_VARIANTS: BallVariant[] = [
  { color: 0x00ffff, scale: 1 }, // Cyan
  { color: 0xff1493, scale: 1.3 }, // Deep Pink
  { color: 0x4169e1, scale: 2 }, // Royal Blue
  { color: 0xff4500, scale: 2.5 }, // Orange Red
  { color: 0xffd700, scale: 3 }, // Gold
  { color: 0x9932cc, scale: 4 }, // Dark Orchid
  { color: 0x32cd32, scale: 6 }, // Lime Green
  { color: 0xff6347, scale: 7.5 }, // Tomato
  { color: 0xff0066, scale: 9 }, // Hot Pink
  { color: 0xf6f6ef, scale: 11 }, // Creamy white
];
export const BALL_VARIANTS_LIMIT = 5;

export const BOUNDARY_STROKE_WIDTH = 10;
export const BOUNDARY_STROKE_COLOR = 0xffffff;

export const DROP_INDICATOR_LINES_COUNT = 8;
export const DROP_INDICATOR_LINE_STROKE_WIDTH = 6;
export const DROP_INDICATOR_LINE_STROKE_COLOR = 0x6d676e;

export const GAME_CONFIG: GameConfig = {
  size: GAME_SIZE,
  backgroundColor: GAME_BACKGROUND_COLOR,
  ballRadius: BALL_RADIUS,
  ballStrokeWidth: BALL_STROKE_WIDTH,
  ballVariants: BALL_VARIANTS,
  ballVariantsRandomIndexLimit: BALL_VARIANTS_LIMIT,
  boundaryStrokeWidth: BOUNDARY_STROKE_WIDTH,
  boundaryStrokeColor: BOUNDARY_STROKE_COLOR,
  dropIndicatorLinesCount: DROP_INDICATOR_LINES_COUNT,
  dropIndicatorLineStrokeWidth: DROP_INDICATOR_LINE_STROKE_WIDTH,
  dropIndicatorLineStrokeColor: DROP_INDICATOR_LINE_STROKE_COLOR,
};
