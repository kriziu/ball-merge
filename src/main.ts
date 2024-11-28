import * as PIXI from 'pixi.js';

import Matter from 'matter-js';

import { GAME_BACKGROUND_COLOR } from './config/game.config';
import { GameScene } from './game/scenes/game-scene';

(async () => {
  const app = new PIXI.Application();
  // @ts-expect-error PixiJS Devtools
  globalThis.__PIXI_APP__ = app;
  const engine = Matter.Engine.create();

  await app.init({ background: GAME_BACKGROUND_COLOR, resizeTo: window, antialias: true });
  document.body.appendChild(app.canvas);

  app.ticker.add((ticker) => {
    Matter.Engine.update(engine, ticker.deltaMS);
  });

  new GameScene(app, engine);
})();
