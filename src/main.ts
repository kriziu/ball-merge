import * as PIXI from 'pixi.js';

import { GameContainer } from './entities/game-container';
import Matter from 'matter-js';
import { BallsManager } from './entities/balls-manager';

const app = new PIXI.Application();
const engine = Matter.Engine.create();

await app.init({ background: 0x000000, resizeTo: window });
document.body.appendChild(app.canvas);

app.ticker.add((ticker) => {
  Matter.Engine.update(engine, ticker.deltaMS);
});

const gameContainer = new GameContainer(app, engine);
new BallsManager(app, engine, gameContainer);
