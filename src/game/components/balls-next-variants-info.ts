import * as PIXI from 'pixi.js';

import Matter from 'matter-js';

import { Ball } from '../objects/ball';
import { BallVariant, GameConfig } from '~/types/game.types';

export class BallsNextVariantsInfo {
  private container = new PIXI.Container();
  private currentBalls = new Set<Ball>();

  constructor(
    protected app: PIXI.Application,
    private engine: Matter.Engine,
    private config: GameConfig,
  ) {}

  getContainer(): PIXI.Container {
    return this.container;
  }

  drawNextBallVariants(ballVariants: BallVariant[]): void {
    this.currentBalls.forEach((ball) => {
      ball.destroy();
    });
    this.currentBalls.clear();

    ballVariants.forEach((variant, index) => {
      const scale = this.getBallScale(variant.scale);
      const x = this.getBallX(index);

      const ball = new Ball(this.app, this.engine, this.config, variant.color, scale, x, true);

      this.container.addChild(ball.getDisplayObject());
      this.currentBalls.add(ball);
    });
  }

  private getBallX(index: number): number {
    let x = this.config.ballRadius + this.config.ballRadius * index;

    for (let i = 0; i < index; i++) {
      x += this.config.ballRadius * 2.5;
    }

    return x;
  }

  private getBallScale(scale: number): number {
    return 1 + scale / 5;
  }
}
