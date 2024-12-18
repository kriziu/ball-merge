import * as PIXI from 'pixi.js';

import Matter from 'matter-js';
import { v4 as uuidv4 } from 'uuid';

import { GameObject } from '~/core/abstract/game-object';
import { GameConfig } from '~/types/game.types';
import { darkenColor } from '~/utils/darken-color';

export class Ball extends GameObject {
  private graphics: PIXI.Graphics;
  private body: Matter.Body;

  readonly id: string = uuidv4();

  constructor(
    protected app: PIXI.Application,
    private engine: Matter.Engine,
    private config: GameConfig,
    private color: number,
    private scale: number,
    x: number,
    isStatic = false,
  ) {
    super(app);

    this.graphics = new PIXI.Graphics({ x });
    this.body = Matter.Bodies.circle(isStatic ? -10000 : x, 0, this.config.ballRadius * scale, {
      restitution: 0.4,
      friction: 0.007,
      mass: scale,
    });
    Matter.Body.setStatic(this.body, isStatic);
    Matter.Composite.add(this.engine.world, this.body);

    this.draw();
  }

  update(): void {
    if (this.body.isStatic || this.graphics.destroyed) return;

    this.graphics.position.set(this.body.position.x, this.body.position.y);
    this.graphics.rotation = this.body.angle;
  }

  destroy(): void {
    super.destroy();

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
    const strokeColor = darkenColor(this.color);

    this.graphics
      .clear()
      .circle(0, 0, this.config.ballRadius - this.config.ballStrokeWidth / this.scale / 2)
      .fill({ color: this.color })
      .stroke({ color: strokeColor, width: this.config.ballStrokeWidth / this.scale })
      .scale.set(this.scale);
  }
}
