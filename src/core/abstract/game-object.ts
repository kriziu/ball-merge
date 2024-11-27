import * as PIXI from 'pixi.js';

import Matter from 'matter-js';

import { Entity } from './entity';

export abstract class GameObject extends Entity {
  abstract getDisplayObject(): PIXI.Container;
  abstract getBody(): Matter.Body;
  abstract destroy(): void;
}
