import * as PIXI from 'pixi.js';

import { GameContainer } from '~/core/engine/game-container';
import { Ball } from '~/game/objects/ball';
import { randomPick } from '~/utils/random-pick';

export class BallsManager {
  static readonly ballVariants = [
    { color: 0xeb2a2a, scale: 1 },
    { color: 0x2aeb37, scale: 1.5 },
    { color: 0x2a6deb, scale: 2 },
  ];

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
    const randomVariant = randomPick(BallsManager.ballVariants);

    const newBall = new Ball(
      this.app,
      this.engine,
      randomVariant.color,
      randomVariant.scale,
      this.cursorX,
      true,
    );
    this.gameContainer.addObject(newBall);

    return newBall;
  }
}
