// src/core/Game.ts

import * as THREE from 'three';
import { Renderer } from './Renderer';
import { SceneManager } from './SceneManager';
import { PhysicsEngine } from '@/helpers/PhysicsEngine';
import { Atom } from '@/components/Atom';
import { Molecule } from '@/components/Molecule';
import elementsData from '@/data/elements.json';

export class Game {
  private canvas: HTMLCanvasElement;
  private renderer: Renderer;
  private sceneManager: SceneManager;
  private physicsEngine: PhysicsEngine;
  private molecules: Molecule[] = [];

  constructor(canvas: HTMLCanvasElement) {
    this.canvas = canvas;
    this.renderer = new Renderer(canvas);
    this.sceneManager = new SceneManager();
    this.physicsEngine = new PhysicsEngine();

    // Example: Add a molecule to the scene
    this.addMolecule();
  }

  start() {
    this.init();
    this.animate();
  }

  private init() {
    this.sceneManager.initScene();
    this.physicsEngine.start();
  }

  private animate = () => {
    requestAnimationFrame(this.animate);
    this.physicsEngine.update();
    this.renderer.render(this.sceneManager.scene, this.sceneManager.camera);
  };

  private async addMolecule() {
    const molecule = new Molecule();

    // Example: Create a water molecule (H2O)
    const hydrogenData = elementsData.find((el) => el.symbol === 'H');
    const oxygenData = elementsData.find((el) => el.symbol === 'O');

    if (hydrogenData && oxygenData) {
      const oxygen = new Atom(oxygenData);
      await oxygen.init();
      oxygen.position.set(0, 0, 0);
      molecule.addAtom(oxygen);

      const hydrogen1 = new Atom(hydrogenData);
      await hydrogen1.init();
      hydrogen1.position.set(1, 0, 0);
      molecule.addAtom(hydrogen1);

      const hydrogen2 = new Atom(hydrogenData);
      await hydrogen2.init();
      hydrogen2.position.set(-1, 0, 0);
      molecule.addAtom(hydrogen2);

      molecule.addBond(oxygen, hydrogen1);
      molecule.addBond(oxygen, hydrogen2);

      this.sceneManager.scene.add(molecule);
      this.molecules.push(molecule);
    }
  }
}
