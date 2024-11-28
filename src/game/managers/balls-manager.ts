import * as PIXI from 'pixi.js';

import Matter from 'matter-js';

import { BallsCollisionsManager } from './balls-collisions-manager';
import { BALL_RADIUS, BALL_VARIANTS, BALL_VARIANTS_LIMIT, GAME_SIZE } from '~/config/game.config';
import { InputManager } from '~/core/input/input-manager';
import { Ball } from '~/game/objects/ball';
import { randomPick } from '~/utils/random-pick';

export class BallsManager {
  private inputManager: InputManager;
  private currentBall: Ball | null = null;
  private balls = new Set<Ball>();
  private cursorX = -1000;

  constructor(
    private app: PIXI.Application,
    private engine: Matter.Engine,
    private container: PIXI.Container,
  ) {
    new BallsCollisionsManager(this.app, this.engine, this);

    this.inputManager = new InputManager(this.container);
    this.setupInputs();

    this.currentBall = this.generateRandomBall();
  }

  getBalls(): Set<Ball> {
    return this.balls;
  }

  addBall(ball: Ball): void {
    this.balls.add(ball);
    this.container.addChild(ball.getDisplayObject());
    Matter.Composite.add(this.engine.world, ball.getBody());
  }

  removeBall(ball: Ball): void {
    this.balls.delete(ball);
    this.container.removeChild(ball.getDisplayObject());
    Matter.Composite.remove(this.engine.world, ball.getBody());
  }

  private setupInputs(): void {
    this.inputManager.onPointerMove((x) => {
      if (this.currentBall) {
        this.cursorX = this.boundX(x);
        this.currentBall.getDisplayObject().x = this.cursorX;
      }
    });

    this.inputManager.onPointerDown(() => {
      this.dropCurrentBall();
    });
  }

  private boundX(x: number, scale?: number): number {
    if (!this.currentBall) {
      return x;
    }

    const ballRadius = (scale ?? this.currentBall.getParams().scale) * BALL_RADIUS;
    return Math.min(Math.max(x, ballRadius), GAME_SIZE - ballRadius);
  }

  private dropCurrentBall(): void {
    if (!this.currentBall) {
      return;
    }

    const currentBallParams = this.currentBall.getParams();
    const ballToDrop = new Ball(
      this.app,
      this.engine,
      currentBallParams.color,
      currentBallParams.scale,
      this.cursorX,
    );

    this.addBall(ballToDrop);
    this.removeBall(this.currentBall);
    this.currentBall = this.generateRandomBall();
  }

  private generateRandomBall(): Ball {
    const randomVariant = randomPick(BALL_VARIANTS, BALL_VARIANTS_LIMIT);

    this.cursorX = this.boundX(this.cursorX, randomVariant.scale);

    const newBall = new Ball(
      this.app,
      this.engine,
      randomVariant.color,
      randomVariant.scale,
      this.cursorX,
      true,
    );
    this.container.addChild(newBall.getDisplayObject());

    return newBall;
  }
}
