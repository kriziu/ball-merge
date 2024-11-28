import * as PIXI from 'pixi.js';

import Matter from 'matter-js';

import { BallsInfo } from '../components/balls-info';
import { BallsManager } from '../managers/balls-manager';
import { GAME_SIZE } from '~/config/game.config';
import { Scene } from '~/core/abstract/scene';
import { Boundaries } from '~/game/objects/boundaries';

export class GameScene extends Scene {
  protected container: PIXI.Container;

  constructor(
    protected app: PIXI.Application,
    protected engine: Matter.Engine,
  ) {
    super(app);

    this.container = new PIXI.Container();
    this.app.stage.addChild(this.container);

    this.prepareScene();
  }

  update(): void {
    const offset = this.calculateOffset();
    this.container.position.set(offset.x, offset.y);
  }

  private prepareScene() {
    new Boundaries(this.engine, this.container);
    new BallsManager(this.app, this.engine, this.container);

    this.setupBallsInfo();
  }

  private setupBallsInfo(): void {
    const ballsInfoContainer = new BallsInfo(this.app, this.engine).getContainer();
    ballsInfoContainer.pivot.set(ballsInfoContainer.width / 2, ballsInfoContainer.height / 2);
    ballsInfoContainer.position.set(GAME_SIZE / 2, GAME_SIZE + 100);
    this.container.addChild(ballsInfoContainer);
  }

  private calculateOffset(): { x: number; y: number } {
    const offsetX = this.app.screen.width - GAME_SIZE;
    const offsetY = this.app.screen.height - GAME_SIZE;

    return {
      x: offsetX / 2,
      y: offsetY / 2,
    };
  }
}
