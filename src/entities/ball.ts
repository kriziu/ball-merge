import * as PIXI from 'pixi.js';
import Matter from 'matter-js';
import { v4 as uuidv4 } from 'uuid';

import { GameObject } from './game-object';

export class Ball extends GameObject {
  private graphics: PIXI.Graphics;
  private body: Matter.Body;
  private radius: number = 20;

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
      restitution: 0.8,
      friction: 0.005,
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
    Matter.Composite.remove(this.engine.world, this.body);
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
    this.graphics
      .clear()
      .circle(0, 0, this.radius)
      .fill({ color: this.color })
      .scale.set(this.scale);
  }
}