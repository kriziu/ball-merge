export interface BallVariant {
  color: number;
  scale: number;
}

export interface GameConfig {
  minTopOffset: number;
  size: number;
  backgroundColor: number;
  ballRadius: number;
  ballStrokeWidth: number;
  ballDropDelay: number;
  ballVariants: BallVariant[];
  ballVariantsRandomIndexLimit: number;
  ballNextVariantsDisplayCount: number;
  boundaryStrokeWidth: number;
  boundaryStrokeColor: number;
  dropIndicatorLinesCount: number;
  dropIndicatorLineStrokeWidth: number;
  dropIndicatorLineStrokeColor: number;
}
