import * as PIXI from 'pixi.js';

export abstract class Entity {
  constructor(protected app: PIXI.Application) {
    this.app.ticker.add(this.update.bind(this));
  }

  abstract update(ticker: PIXI.Ticker): void;
}
