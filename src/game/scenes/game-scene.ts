import * as PIXI from 'pixi.js';

import Matter from 'matter-js';

import { BallsInfo } from '../components/balls-info';
import { BallsManager } from '../managers/balls-manager';
import { Scene } from '~/core/abstract/scene';
import { Boundaries } from '~/game/objects/boundaries';
import { GameConfig } from '~/types/game.types';

export class GameScene extends Scene {
  protected container: PIXI.Container;

  constructor(
    protected app: PIXI.Application,
    private engine: Matter.Engine,
    private config: GameConfig,
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
    new Boundaries(this.engine, this.config, this.container);
    new BallsManager(this.app, this.engine, this.config, this.container);

    this.setupBallsInfo();
  }

  private setupBallsInfo(): void {
    const ballsInfoContainer = new BallsInfo(this.app, this.config).getContainer();

    ballsInfoContainer.pivot.set(ballsInfoContainer.width / 2, ballsInfoContainer.height / 2);
    ballsInfoContainer.position.set(this.config.size / 2, this.config.size + 100);

    this.container.addChild(ballsInfoContainer);
  }

  private calculateOffset(): { x: number; y: number } {
    const offsetX = this.app.screen.width - this.config.size;
    const offsetY = this.app.screen.height - this.config.size;

    return {
      x: offsetX / 2,
      y: offsetY / 2,
    };
  }
}
