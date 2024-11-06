import * as THREE from 'three';

interface ElementData {
  atomicNumber: number;
  symbol: string;
  name: string;
  color: string;
  radius: number;
  valency: number;
}

export class Atom extends THREE.Mesh {
  public elementData: ElementData;

  constructor(elementData: ElementData) {
    const geometry = new THREE.SphereGeometry(elementData.radius, 32, 32);
    const material = new THREE.MeshPhongMaterial({ color: elementData.color });
    super(geometry, material);

    this.elementData = elementData;
    this.name = elementData.name;
    this.userData = {
      valency: elementData.valency,
      atomicNumber: elementData.atomicNumber,
      symbol: elementData.symbol
    };
  }

  highlight() {
    (this.material as THREE.MeshPhongMaterial).emissive.setHex(0x333333);
  }

  unhighlight() {
    (this.material as THREE.MeshPhongMaterial).emissive.setHex(0x000000);
  }
}
