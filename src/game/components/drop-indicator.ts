import * as PIXI from 'pixi.js';

import { Entity } from '~/core/abstract/entity';
import { GameConfig } from '~/types/game.types';

export class DropIndicator extends Entity {
  private linesContainer = new PIXI.Container();
  private lines: {
    graphics: PIXI.Graphics;
    offsetY: number;
  }[] = [];
  private distanceBetweenLines: number;
  private x = -1000;
  private lineMovement = 0;

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
    this.lineMovement += 1;
    if (this.lineMovement > this.distanceBetweenLines) {
      this.lineMovement = 0;
    }

    this.linesContainer.position.set(this.x, 0);

    this.lines.forEach((line) => {
      this.drawLine(line.graphics, line.offsetY);
    });
  }

  private prepareIndicatorLines(): void {
    this.lines = Array.from({ length: this.config.dropIndicatorLinesCount }).map((_, index) => ({
      graphics: this.createLineGraphics(index * this.distanceBetweenLines),
      offsetY: index * this.distanceBetweenLines,
    }));

    this.container.addChild(this.linesContainer);
  }

  private createLineGraphics(offsetY: number): PIXI.Graphics {
    const line = new PIXI.Graphics();
    this.linesContainer.addChild(line);

    this.drawLine(line, offsetY);

    return line;
  }

  private drawLine(graphics: PIXI.Graphics, offsetY: number): void {
    if (this.lineMovement > this.distanceBetweenLines / 2) {
      const startDistance = this.lineMovement - this.distanceBetweenLines / 2;
      graphics
        .clear()
        .moveTo(0, offsetY)
        .lineTo(0, offsetY + startDistance)
        .moveTo(0, offsetY + this.lineMovement)
        .lineTo(0, offsetY + this.distanceBetweenLines);
    } else {
      graphics
        .clear()
        .moveTo(0, offsetY + this.lineMovement)
        .lineTo(0, offsetY + this.lineMovement + this.distanceBetweenLines / 2);
    }

    graphics.stroke({
      color: this.config.dropIndicatorLineStrokeColor,
      width: this.config.dropIndicatorLineStrokeWidth,
    });
  }
}
