import * as PIXI from 'pixi.js';

import Matter from 'matter-js';

import { BallsManager } from './balls-manager';
import { Ball } from '../objects/ball';
import { BALL_VARIANTS } from '~/config/game.config';
import { BallVariant } from '~/types/game.types';

export class BallsCollisionsManager {
  constructor(
    private app: PIXI.Application,
    private engine: Matter.Engine,
    private ballsManager: BallsManager,
  ) {
    this.setupCollisionDetection();
  }

  private setupCollisionDetection(): void {
    Matter.Events.on(this.engine, 'collisionStart', (event) => {
      event.pairs.forEach((pair) => {
        const ballA = this.findBallByBody(pair.bodyA);
        const ballB = this.findBallByBody(pair.bodyB);

        if (ballA && ballB) {
          this.handleBallCollision(ballA, ballB);
        }
      });
    });
  }

  private findBallByBody(body: Matter.Body): Ball | undefined {
    return Array.from(this.ballsManager.getBalls().values()).find(
      (ball) => ball.getBody() === body,
    );
  }

  private handleBallCollision(ballA: Ball, ballB: Ball): void {
    const paramsA = ballA.getParams();
    const paramsB = ballB.getParams();

    if (paramsA.scale === paramsB.scale) {
      const nextVariant = this.getNextVariant(paramsA.scale);
      if (!nextVariant) {
        this.ballsManager.removeBall(ballA);
        this.ballsManager.removeBall(ballB);
        return;
      }

      const ballABody = ballA.getBody();
      const ballBBody = ballB.getBody();

      const position = {
        x: (ballABody.position.x + ballBBody.position.x) / 2,
        y: (ballABody.position.y + ballBBody.position.y) / 2,
      };
      const velocity = {
        x: (ballABody.velocity.x + ballBBody.velocity.x) / 2,
        y: (ballABody.velocity.y + ballBBody.velocity.y) / 2,
      };
      const angle = (ballABody.angle + ballBBody.angle) / 2;
      const angularVelocity = (ballABody.angularVelocity + ballBBody.angularVelocity) / 2;

      this.ballsManager.removeBall(ballA);
      this.ballsManager.removeBall(ballB);

      const newBall = new Ball(
        this.app,
        this.engine,
        nextVariant.color,
        nextVariant.scale,
        position.x,
      );
      Matter.Body.setPosition(newBall.getBody(), position);
      Matter.Body.setVelocity(newBall.getBody(), velocity);
      Matter.Body.setAngle(newBall.getBody(), angle);
      Matter.Body.setAngularVelocity(newBall.getBody(), angularVelocity);
      this.ballsManager.addBall(newBall);
    }
  }

  private getNextVariant(currentScale: number): BallVariant | null {
    const currentIndex = BALL_VARIANTS.findIndex((variant) => variant.scale === currentScale);
    return BALL_VARIANTS[currentIndex + 1] ?? null;
  }
}
