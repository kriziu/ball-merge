import * as PIXI from 'pixi.js';

import Matter from 'matter-js';

import { BallsCollisionsManager } from './balls-collisions-manager';
import { BallsNextVariantsInfo } from '../components/balls-next-variants-info';
import { DropIndicator } from '../components/drop-indicator';
import { InputManager } from '~/core/input/input-manager';
import { Ball } from '~/game/objects/ball';
import { BallVariant, GameConfig } from '~/types/game.types';
import { randomPick } from '~/utils/random-pick';

export class BallsManager {
  private ballsContainer = new PIXI.Container();
  private inputManager: InputManager;
  private dropIndicator: DropIndicator;
  private ballsNextVariantsInfo: BallsNextVariantsInfo;
  private currentBall: Ball | null = null;
  private nextBallsVariants: BallVariant[] = [];
  private balls = new Set<Ball>();
  private cursorX = -10000;

  constructor(
    protected app: PIXI.Application,
    private engine: Matter.Engine,
    private config: GameConfig,
    private container: PIXI.Container,
  ) {
    new BallsCollisionsManager(this.app, this.engine, this, this.config);

    this.inputManager = new InputManager(this.container);
    this.dropIndicator = new DropIndicator(this.app, this.container, this.config);
    this.ballsNextVariantsInfo = new BallsNextVariantsInfo(this.app, this.engine, this.config);

    this.setupInputs();
    this.initBallsVariants();
    this.currentBall = this.getNextBall();

    this.container.addChild(this.ballsContainer);
    this.container.addChild(this.ballsNextVariantsInfo.getContainer());
  }

  getBalls(): Set<Ball> {
    return this.balls;
  }

  addBall(ball: Ball): void {
    this.balls.add(ball);
    this.ballsContainer.addChild(ball.getDisplayObject());
  }

  removeBall(ball: Ball): void {
    this.balls.delete(ball);
    ball.destroy();
  }

  private setupInputs(): void {
    this.inputManager.onPointerMove((x) => {
      if (this.currentBall) {
        this.cursorX = this.boundX(x);
        this.currentBall.getDisplayObject().x = this.cursorX;
        this.dropIndicator.setX(this.cursorX);
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

    const ballRadius = (scale ?? this.currentBall.getParams().scale) * this.config.ballRadius;
    return Math.min(Math.max(x, ballRadius), this.config.size - ballRadius);
  }

  private dropCurrentBall(): void {
    if (!this.currentBall) {
      return;
    }

    const currentBallParams = this.currentBall.getParams();
    const ballToDrop = new Ball(
      this.app,
      this.engine,
      this.config,
      currentBallParams.color,
      currentBallParams.scale,
      this.cursorX,
    );

    this.addBall(ballToDrop);
    this.removeBall(this.currentBall);
    this.currentBall = this.getNextBall();
  }

  private getNextBall(): Ball {
    const nextVariant = this.getNextBallVariant();

    this.cursorX = this.boundX(this.cursorX, nextVariant.scale);

    const newBall = new Ball(
      this.app,
      this.engine,
      this.config,
      nextVariant.color,
      nextVariant.scale,
      this.cursorX,
      true,
    );
    this.ballsContainer.addChild(newBall.getDisplayObject());
    this.dropIndicator.setX(this.cursorX);

    return newBall;
  }

  private getNextBallVariant(): BallVariant {
    const nextVariant = this.nextBallsVariants.shift();
    this.nextBallsVariants.push(this.getRandomBallVariant());
    this.ballsNextVariantsInfo.drawNextBallVariants(this.nextBallsVariants);

    if (!nextVariant) {
      throw new Error('No next ball variant');
    }

    return nextVariant;
  }

  private initBallsVariants(): void {
    for (let i = 0; i < this.config.ballNextVariantsDisplayCount; i++) {
      this.nextBallsVariants.push(this.getRandomBallVariant());
    }

    this.ballsNextVariantsInfo.drawNextBallVariants(this.nextBallsVariants);

    const nextBallsInfoContainer = this.ballsNextVariantsInfo.getContainer();
    nextBallsInfoContainer.position.set(
      this.config.size - nextBallsInfoContainer.width,
      -this.config.minTopOffset / 2,
    );
  }

  private getRandomBallVariant(): BallVariant {
    return randomPick(this.config.ballVariants, this.config.ballVariantsRandomIndexLimit);
  }
}
