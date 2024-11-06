import * as THREE from 'three';
import { Renderer } from './Renderer';
import { SceneManager } from './SceneManager';
import { PhysicsEngine } from '@/helpers/PhysicsEngine';

export class Game {
  private canvas: HTMLCanvasElement;
  private renderer: Renderer;
  private sceneManager: SceneManager;
  private physicsEngine: PhysicsEngine;

  constructor(canvas: HTMLCanvasElement) {
    this.canvas = canvas;
    this.renderer = new Renderer(canvas);
    this.sceneManager = new SceneManager();
    this.physicsEngine = new PhysicsEngine();
  }

  start() {
    this.init();
    this.animate();
  }

  private init() {
    // Initialize scene, camera, lights, etc.
    this.sceneManager.initScene();
    // Start physics engine
    this.physicsEngine.start();
  }

  private animate = () => {
    requestAnimationFrame(this.animate);
    // Update physics
    this.physicsEngine.update();
    // Render the scene
    this.renderer.render(this.sceneManager.scene, this.sceneManager.camera);
  };
}
