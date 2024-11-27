import * as PIXI from 'pixi.js';

import Matter from 'matter-js';

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

    new Boundaries(engine, this.container);
    new BallsManager(app, engine, this.container);
  }

  update(): void {
    const offset = this.calculateOffset();
    this.container.position.set(offset.x, offset.y);
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
