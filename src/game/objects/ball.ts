import * as PIXI from 'pixi.js';

import Matter from 'matter-js';
import { v4 as uuidv4 } from 'uuid';

import { BALL_RADIUS, BALL_STROKE_WIDTH } from '~/config/game.config';
import { GameObject } from '~/core/abstract/game-object';
import { darkenColor } from '~/utils/darken-color';

export class Ball extends GameObject {
  private graphics: PIXI.Graphics;
  private body: Matter.Body;
  private radius: number = BALL_RADIUS;
  private strokeWidth: number = BALL_STROKE_WIDTH;

  readonly id: string = uuidv4();

  constructor(
    protected app: PIXI.Application,
    protected engine: Matter.Engine,
    private color: number,
    private scale: number = 1,
    x: number,
    isStatic = false,
  ) {
    super(app);

    this.graphics = new PIXI.Graphics({ x });
    this.body = Matter.Bodies.circle(isStatic ? -1000 : x, 0, this.radius * scale, {
      restitution: 0.4,
      friction: 0.007,
      mass: scale,
    });
    Matter.Body.setStatic(this.body, isStatic);

    this.draw();
  }

  update(): void {
    if (!this.body.isStatic) {
      this.graphics.position.set(this.body.position.x, this.body.position.y);
      this.graphics.rotation = this.body.angle;
    }
  }

  destroy(): void {
    this.graphics.destroy();
  }

  getBody(): Matter.Body {
    return this.body;
  }

  getDisplayObject(): PIXI.Graphics {
    return this.graphics;
  }

  getParams(): { color: number; scale: number; isStatic: boolean } {
    return {
      color: this.color,
      scale: this.scale,
      isStatic: this.body.isStatic,
    };
  }

  private draw(): void {
    const strokeColor = darkenColor(this.color);

    this.graphics
      .clear()
      .circle(0, 0, this.radius - this.strokeWidth / this.scale / 2)
      .fill({ color: this.color })
      .stroke({ color: strokeColor, width: this.strokeWidth / this.scale })
      .scale.set(this.scale);
  }
}
