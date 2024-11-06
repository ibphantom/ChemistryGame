import * as THREE from 'three';
import { Atom } from './Atom';

export class Bond extends THREE.Mesh {
  public atom1: Atom;
  public atom2: Atom;
  public bondType: 'single' | 'double' | 'triple';

  constructor(atom1: Atom, atom2: Atom, bondType: 'single' | 'double' | 'triple' = 'single') {
    const bondLength = atom1.position.distanceTo(atom2.position);
    const geometry = new THREE.CylinderGeometry(0.1, 0.1, bondLength, 8);
    const material = new THREE.MeshPhongMaterial({ color: 0xaaaaaa });
    super(geometry, material);

    this.atom1 = atom1;
    this.atom2 = atom2;
    this.bondType = bondType;

    // Position the bond between the two atoms
    this.position.copy(atom1.position).lerp(atom2.position, 0.5);
    this.lookAt(atom2.position);

    // Adjust bond appearance based on bond type
    this.updateBondAppearance();
  }

  private updateBondAppearance() {
    // Adjust the bond's geometry or material based on bond type
    switch (this.bondType) {
      case 'double':
        // Modify geometry or add additional cylinders for double bond
        break;
      case 'triple':
        // Modify geometry or add additional cylinders for triple bond
        break;
      default:
        // Single bond appearance
        break;
    }
  }
}
