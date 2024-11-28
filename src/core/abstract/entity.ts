import * as PIXI from 'pixi.js';

export abstract class Entity {
  private bindedUpdate: (ticker: PIXI.Ticker) => void;

  constructor(protected app: PIXI.Application) {
    this.bindedUpdate = this.update.bind(this);
    this.app.ticker.add(this.bindedUpdate);
  }

  abstract update(ticker: PIXI.Ticker): void;

  destroy(): void {
    this.app.ticker.remove(this.bindedUpdate);
  }
}
