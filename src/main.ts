import * as PIXI from 'pixi.js';

import { BallsContainer } from './entities/balls-container';
import { Ball } from './entities/ball';
import Matter from 'matter-js';

const app = new PIXI.Application();
const engine = Matter.Engine.create();

await app.init({ background: 0x000000, resizeTo: window });
document.body.appendChild(app.canvas);

app.ticker.add((ticker) => {
  Matter.Engine.update(engine, ticker.deltaMS);
});

const ballsContainer = new BallsContainer(app, engine);

ballsContainer.addBall(new Ball(app, 0xeb2a2a, 1));
ballsContainer.addBall(new Ball(app, 0x2aeb37, 2));
ballsContainer.addBall(new Ball(app, 0x2aebeb, 4));
ballsContainer.addBall(new Ball(app, 0x2a2aeb, 8));
