import * as PIXI from 'pixi.js';

import Matter from 'matter-js';

import {
  BALL_RADIUS,
  BOUNDARY_STROKE_COLOR,
  BOUNDARY_STROKE_WIDTH,
  GAME_BACKGROUND_COLOR,
  GAME_SIZE,
} from '~/config/game.config';

export class Boundaries {
  private graphics = new PIXI.Graphics();
  private walls: Matter.Body[] = [];

  constructor(
    private engine: Matter.Engine,
    private container: PIXI.Container,
    private size: number = GAME_SIZE,
    // We do this to make sure the ball can't get stuck in the wall
    private wallWidth: number = BALL_RADIUS,
    private strokeWidth: number = BOUNDARY_STROKE_WIDTH,
    private strokeColor: number = BOUNDARY_STROKE_COLOR,
  ) {
    this.container.addChild(this.graphics);
    this.createPhysicsBoundaries();
    this.draw();
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
    this.walls = [bottomWall, leftWall, rightWall];

    Matter.Composite.add(this.engine.world, this.walls);
  }

  private draw(): void {
    this.graphics
      .clear()
      .rect(
        -this.strokeWidth / 2,
        -this.strokeWidth / 2,
        this.size + this.strokeWidth,
        this.size + this.strokeWidth,
      )
      .fill({ color: GAME_BACKGROUND_COLOR })
      .moveTo(-this.strokeWidth / 2, -this.strokeWidth / 2)
      .lineTo(-this.strokeWidth / 2, this.size + this.strokeWidth / 2)
      .lineTo(this.size + this.strokeWidth / 2, this.size + this.strokeWidth / 2)
      .lineTo(this.size + this.strokeWidth / 2, -this.strokeWidth / 2)
      .stroke({
        width: this.strokeWidth,
        color: this.strokeColor,
      });
  }
}
