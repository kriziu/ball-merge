export interface BallVariant {
  color: number;
  scale: number;
}

export interface GameConfig {
  size: number;
  backgroundColor: number;
  ballRadius: number;
  ballStrokeWidth: number;
  ballVariants: BallVariant[];
  ballVariantsRandomIndexLimit: number;
  boundaryStrokeWidth: number;
  boundaryStrokeColor: number;
  dropIndicatorLinesCount: number;
}
