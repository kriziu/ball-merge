import * as PIXI from 'pixi.js';

import { Entity } from './entity';

export abstract class Scene extends Entity {
  protected container = new PIXI.Container();

  constructor(protected app: PIXI.Application) {
    super(app);
    this.app.stage.addChild(this.container);
  }

  abstract update(): void;

  getContainer(): PIXI.Container {
    return this.container;
  }
}
