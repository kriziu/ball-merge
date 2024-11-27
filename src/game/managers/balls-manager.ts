import * as PIXI from 'pixi.js';

import Matter from 'matter-js';

import { BALL_VARIANTS } from '~/config/game.config';
import { InputManager } from '~/core/input/input-manager';
import { Ball } from '~/game/objects/ball';
import { randomPick } from '~/utils/random-pick';

export class BallsManager {
  private inputManager: InputManager;
  private currentBall: Ball | null = null;
  private balls: Map<string, Ball> = new Map();
  private cursorX = -1000;

  constructor(
    private app: PIXI.Application,
    private engine: Matter.Engine,
    private container: PIXI.Container,
  ) {
    this.inputManager = new InputManager(this.container);
    this.setupInputs();

    this.currentBall = this.generateRandomBall();
  }

  private setupInputs(): void {
    this.inputManager.onPointerMove((x) => {
      if (this.currentBall) {
        this.currentBall.getDisplayObject().x = x;
        this.cursorX = x;
      }
    });

    this.inputManager.onPointerDown(() => {
      this.dropCurrentBall();
    });
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

  private addBall(ball: Ball): void {
    this.balls.set(ball.id, ball);
    this.container.addChild(ball.getDisplayObject());
    Matter.Composite.add(this.engine.world, ball.getBody());
  }

  private removeBall(ball: Ball): void {
    this.balls.delete(ball.id);
    this.container.removeChild(ball.getDisplayObject());
    Matter.Composite.remove(this.engine.world, ball.getBody());
  }

  private generateRandomBall(): Ball {
    const randomVariant = randomPick(BALL_VARIANTS);

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