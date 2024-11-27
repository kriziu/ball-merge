import * as PIXI from 'pixi.js';

import Matter from 'matter-js';

import { Entity } from '~/core/abstract/entity';
import { GameObject } from '~/core/abstract/game-object';

export class GameContainer extends Entity {
  readonly size = 1000;
  readonly strokeWidth = 4;
  readonly wallWidth = 100;
  readonly strokeColor = 0xffffff;

  private container = new PIXI.Container();
  private graphics = new PIXI.Graphics();
  private offset: { x: number; y: number } = { x: 0, y: 0 };

  constructor(
    protected app: PIXI.Application,
    protected engine: Matter.Engine,
  ) {
    super(app);

    this.container.addChild(this.graphics);
    this.app.stage.addChild(this.container);

    this.createPhysicsBoundaries();
    this.calculateAndDrawBoundaries();
  }

  update(): void {
    this.calculateAndDrawBoundaries();
  }

  addObject(object: GameObject): void {
    this.container.addChild(object.getDisplayObject());
    Matter.Composite.add(this.engine.world, object.getBody());
  }

  removeObject(object: GameObject): void {
    this.container.removeChild(object.getDisplayObject());
    Matter.Composite.remove(this.engine.world, object.getBody());
  }

  getContainer(): PIXI.Container {
    return this.container;
  }

  private createPhysicsBoundaries(): void {
    const bottomWall = Matter.Bodies.rectangle(
      this.size / 2,
      this.size + this.wallWidth / 2,
      this.size,
      this.wallWidth,
      {
        isStatic: true,
      },
    );
    const leftWall = Matter.Bodies.rectangle(
      -this.wallWidth / 2,
      this.size / 2,
      this.wallWidth,
      this.size,
      {
        isStatic: true,
      },
    );
    const rightWall = Matter.Bodies.rectangle(
      this.size + this.wallWidth / 2,
      this.size / 2,
      this.wallWidth,
      this.size,
      {
        isStatic: true,
      },
    );
    const walls = [bottomWall, leftWall, rightWall];

    Matter.Composite.add(this.engine.world, walls);
  }

  private calculateAndDrawBoundaries(): void {
    const calculatedOffset = this.calculateOffset();
    if (this.offset.x === calculatedOffset.x && this.offset.y === calculatedOffset.y) {
      return;
    }

    this.offset = calculatedOffset;
    this.container.position.set(this.offset.x, this.offset.y);

    this.drawBoundaries();
  }

  private drawBoundaries(): void {
    this.graphics
      .clear()
      .rect(0, 0, this.size, this.size)
      .fill({ color: 0x000000 })
      .moveTo(0, 0)
      .lineTo(0, this.size)
      .lineTo(this.size, this.size)
      .lineTo(this.size, 0)
      .stroke({
        width: this.strokeWidth,
        color: this.strokeColor,
      });
  }

  private calculateOffset(): { x: number; y: number } {
    const offsetX = this.app.screen.width - this.size;
    const offsetY = this.app.screen.height - this.size;

    return {
      x: offsetX / 2,
      y: offsetY / 2,
    };
  }
}
