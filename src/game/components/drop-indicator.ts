import * as PIXI from 'pixi.js';

import { Entity } from '~/core/abstract/entity';
import { GameConfig } from '~/types/game.types';

export class DropIndicator extends Entity {
  private linesContainer = new PIXI.Container();
  // private indicatorLines: PIXI.Graphics[] = [];
  private distanceBetweenLines: number;
  private x = -1000;

  constructor(
    protected app: PIXI.Application,
    private container: PIXI.Container,
    private config: GameConfig,
  ) {
    super(app);

    this.distanceBetweenLines = this.config.size / this.config.dropIndicatorLinesCount;
    this.prepareIndicatorLines();
  }

  setX(x: number): void {
    this.x = x;
  }

  update(): void {
    this.linesContainer.position.set(this.x, 0);

    // this.indicatorLines.forEach((line) => {
    //   line.position.set(0, );
    // });
  }

  private prepareIndicatorLines(): void {
    Array.from({ length: this.config.dropIndicatorLinesCount }).map((_, index) =>
      this.createIndicatorLine(index * this.distanceBetweenLines),
    );

    this.container.addChild(this.linesContainer);
  }

  private createIndicatorLine(offsetY: number): PIXI.Graphics {
    const line = new PIXI.Graphics();
    line
      .moveTo(0, offsetY)
      .lineTo(0, offsetY + this.distanceBetweenLines / 2)
      .stroke({ color: 0xffffff, width: 4 });
    this.linesContainer.addChild(line);

    return line;
  }
}
