import * as PIXI from 'pixi.js';

import Matter from 'matter-js';

import { GameConfig } from '~/types/game.types';

export class Boundaries {
  private graphics = new PIXI.Graphics();
  private walls: Matter.Body[] = [];

  constructor(
    private engine: Matter.Engine,
    private config: GameConfig,
    private container: PIXI.Container,
  ) {
    this.container.addChild(this.graphics);
    this.createPhysicsBoundaries();
    this.draw();
  }

  private createPhysicsBoundaries(): void {
    const bottomWall = Matter.Bodies.rectangle(
      this.config.size / 2,
      this.config.size + this.config.boundaryStrokeWidth / 2,
      this.config.size,
      this.config.boundaryStrokeWidth,
      {
        isStatic: true,
      },
    );
    const leftWall = Matter.Bodies.rectangle(
      -this.config.boundaryStrokeWidth / 2,
      this.config.size / 2,
      this.config.boundaryStrokeWidth,
      this.config.size,
      {
        isStatic: true,
      },
    );
    const rightWall = Matter.Bodies.rectangle(
      this.config.size + this.config.boundaryStrokeWidth / 2,
      this.config.size / 2,
      this.config.boundaryStrokeWidth,
      this.config.size,
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
        -this.config.boundaryStrokeWidth / 2,
        -this.config.boundaryStrokeWidth / 2,
        this.config.size + this.config.boundaryStrokeWidth,
        this.config.size + this.config.boundaryStrokeWidth,
      )
      .fill({ color: this.config.backgroundColor })
      .moveTo(-this.config.boundaryStrokeWidth / 2, -this.config.boundaryStrokeWidth / 2)
      .lineTo(
        -this.config.boundaryStrokeWidth / 2,
        this.config.size + this.config.boundaryStrokeWidth / 2,
      )
      .lineTo(
        this.config.size + this.config.boundaryStrokeWidth / 2,
        this.config.size + this.config.boundaryStrokeWidth / 2,
      )
      .lineTo(
        this.config.size + this.config.boundaryStrokeWidth / 2,
        -this.config.boundaryStrokeWidth / 2,
      )
      .stroke({
        width: this.config.boundaryStrokeWidth,
        color: this.config.boundaryStrokeColor,
      });
  }
}
