// src/components/Atom.ts

import * as THREE from 'three';
import { Loader } from '@/core/Loader';

interface ElementData {
  atomicNumber: number;
  symbol: string;
  name: string;
  color: string;
  radius: number;
  valency: number;
}

export class Atom extends THREE.Group {
  public elementData: ElementData;
  private loader: Loader;

  constructor(elementData: ElementData) {
    super();
    this.elementData = elementData;
    this.loader = new Loader();
    this.name = elementData.name;
    this.userData = {
      valency: elementData.valency,
      atomicNumber: elementData.atomicNumber,
      symbol: elementData.symbol,
    };

    this.init();
  }

  async init() {
    const modelPath = `/assets/models/atoms/${this.elementData.symbol.toLowerCase()}.glb`;

    try {
      const model = await this.loader.loadModel(modelPath);
      this.add(model);
    } catch {
      // If model loading fails, use a placeholder sphere
      const geometry = new THREE.SphereGeometry(this.elementData.radius, 32, 32);
      const material = new THREE.MeshPhongMaterial({ color: this.elementData.color });
      const placeholder = new THREE.Mesh(geometry, material);
      this.add(placeholder);
    }
  }

  highlight() {
    this.traverse((child) => {
      if (child instanceof THREE.Mesh) {
        (child.material as THREE.MeshPhongMaterial).emissive.setHex(0x333333);
      }
    });
  }

  unhighlight() {
    this.traverse((child) => {
      if (child instanceof THREE.Mesh) {
        (child.material as THREE.MeshPhongMaterial).emissive.setHex(0x000000);
      }
    });
  }
}
