import * as PIXI from 'pixi.js';

import Matter from 'matter-js';

import { GameContainer } from '~/core/engine/game-container';
import { BallsManager } from '~/game/managers/balls-manager';

const app = new PIXI.Application();
const engine = Matter.Engine.create();

await app.init({ background: 0x000000, resizeTo: window });
document.body.appendChild(app.canvas);

app.ticker.add((ticker) => {
  Matter.Engine.update(engine, ticker.deltaMS);
});

const gameContainer = new GameContainer(app, engine);
new BallsManager(app, engine, gameContainer);
