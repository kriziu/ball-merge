import * as PIXI from 'pixi.js';

import Matter from 'matter-js';

import { Ball } from '../objects/ball';
import { BALL_RADIUS, BALL_VARIANTS } from '~/config/game.config';

export class BallsInfo {
  private container = new PIXI.Container();

  constructor(
    private app: PIXI.Application,
    private engine: Matter.Engine,
  ) {
    this.drawAllBallVariants();
  }

  getContainer(): PIXI.Container {
    return this.container;
  }

  private drawAllBallVariants(): void {
    BALL_VARIANTS.forEach((variant, index) => {
      const scale = this.getBallScale(index);
      const x = this.getBallX(index);

      const ball = new Ball(this.app, this.engine, variant.color, scale, x, true);

      this.container.addChild(ball.getDisplayObject());
    });
  }

  private getBallX(index: number): number {
    let x = BALL_RADIUS + BALL_RADIUS * index;

    for (let i = 0; i < index; i++) {
      x += BALL_RADIUS * 2 * this.getBallScale(i);
    }

    return x;
  }

  private getBallScale(index: number): number {
    return 1 + BALL_VARIANTS[index].scale / 20;
  }
}
