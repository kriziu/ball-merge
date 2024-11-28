import * as PIXI from 'pixi.js';

import { Ball } from '../objects/ball';
import { GameConfig } from '~/types/game.types';

export class BallsInfo {
  private container = new PIXI.Container();

  constructor(
    protected app: PIXI.Application,
    private config: GameConfig,
  ) {
    this.drawAllBallVariants();
  }

  getContainer(): PIXI.Container {
    return this.container;
  }

  private drawAllBallVariants(): void {
    this.config.ballVariants.forEach((variant, index) => {
      const scale = this.getBallScale(index);
      const x = this.getBallX(index);

      const ball = new Ball(this.app, this.config, variant.color, scale, x, true);

      this.container.addChild(ball.getDisplayObject());
    });
  }

  private getBallX(index: number): number {
    let x = this.config.ballRadius + this.config.ballRadius * index;

    for (let i = 0; i < index; i++) {
      x += this.config.ballRadius * 2 * this.getBallScale(i);
    }

    return x;
  }

  private getBallScale(index: number): number {
    return 1 + this.config.ballVariants[index].scale / 20;
  }
}
