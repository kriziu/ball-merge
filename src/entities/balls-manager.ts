import * as PIXI from 'pixi.js';

import { Ball } from './ball';
import { GameContainer } from './game-container';

export class BallsManager {
  private currentBall: Ball | null = null;
  private balls: Map<string, Ball> = new Map();
  private cursorX = -1000;

  constructor(
    private app: PIXI.Application,
    private engine: Matter.Engine,
    private gameContainer: GameContainer,
  ) {
    this.setupCursorListener();
    this.currentBall = this.generateRandomBall();
  }

  private setupCursorListener(): void {
    this.gameContainer.getContainer().eventMode = 'static';

    this.gameContainer.getContainer().on('pointermove', (event) => {
      if (this.currentBall) {
        const pointerPosition = this.gameContainer.getContainer().toLocal(event);
        this.currentBall.getDisplayObject().x = pointerPosition.x;
        this.cursorX = pointerPosition.x;
      }
    });

    this.gameContainer.getContainer().on('pointerdown', () => {
      this.dropCurrentBall();
    });
  }

  private dropCurrentBall(): void {
    if (!this.currentBall) {
      return;
    }
    this.currentBall.destroy();
    this.gameContainer.removeObject(this.currentBall);

    const currentBallParams = this.currentBall.getParams();
    const ballToDrop = new Ball(
      this.app,
      this.engine,
      currentBallParams.color,
      currentBallParams.scale,
      this.cursorX,
    );

    this.balls.set(ballToDrop.id, ballToDrop);
    this.gameContainer.addObject(ballToDrop);

    this.currentBall = this.generateRandomBall();
  }

  private generateRandomBall(): Ball {
    const newBall = new Ball(this.app, this.engine, 0xeb2a2a, 1, this.cursorX, true);
    this.gameContainer.addObject(newBall);

    return newBall;
  }
}
