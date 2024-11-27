import * as PIXI from 'pixi.js';

export class InputManager {
  constructor(private container: PIXI.Container) {
    this.container.eventMode = 'static';
  }

  onPointerMove(callback: (x: number, y: number) => void): void {
    this.container.on('pointermove', (event) => {
      const position = this.container.toLocal(event);
      callback(position.x, position.y);
    });
  }

  onPointerDown(callback: () => void): void {
    this.container.on('pointerdown', callback);
  }
}
