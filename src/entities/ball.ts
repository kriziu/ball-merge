import * as PIXI from 'pixi.js';
import Matter from 'matter-js';
import { Entity } from './entity';

export class Ball extends Entity {
  private graphics: PIXI.Graphics;
  private body: Matter.Body;
  private radius: number = 20;

  constructor(
    protected app: PIXI.Application,
    private color: number,
    private scale: number = 1,
  ) {
    super(app);

    this.graphics = new PIXI.Graphics();
    this.body = Matter.Bodies.circle(Math.random() * 500 + 100, 0, this.radius * scale, {
      restitution: 0.8,
      friction: 0.005,
    });

    this.draw();
  }

  update(): void {
    this.graphics.position.set(this.body.position.x, this.body.position.y);
    this.graphics.rotation = this.body.angle;
  }

  getBody(): Matter.Body {
    return this.body;
  }

  getDisplayObject(): PIXI.Graphics {
    return this.graphics;
  }

  private draw(): void {
    this.graphics
      .clear()
      .circle(0, 0, this.radius)
      .fill({ color: this.color })
      .scale.set(this.scale);
  }
}
