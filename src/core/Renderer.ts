import * as THREE from 'three';

export class Renderer extends THREE.WebGLRenderer {
  constructor(canvas: HTMLCanvasElement) {
    super({ canvas, antialias: true });
    this.setSize(window.innerWidth, window.innerHeight);
    window.addEventListener('resize', this.onWindowResize);
  }

  private onWindowResize = () => {
    this.setSize(window.innerWidth, window.innerHeight);
  };
}
