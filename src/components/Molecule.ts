// src/components/Molecule.ts

import * as THREE from 'three';
import { Atom } from './Atom';
import { Bond } from './Bond';

export class Molecule extends THREE.Group {
  public atoms: Atom[] = [];
  public bonds: Bond[] = [];

  constructor() {
    super();
  }

  addAtom(atom: Atom) {
    this.atoms.push(atom);
    this.add(atom);
  }

  addBond(atom1: Atom, atom2: Atom) {
    const bond = new Bond(atom1, atom2);
    this.bonds.push(bond);
    this.add(bond);
  }

  removeAtom(atom: Atom) {
    // Remove bonds associated with the atom
    this.bonds = this.bonds.filter((bond) => {
      if (bond.atom1 === atom || bond.atom2 === atom) {
        this.remove(bond);
        return false;
      }
      return true;
    });

    // Remove the atom
    this.atoms = this.atoms.filter((a) => a !== atom);
    this.remove(atom);
  }

  getFormula(): string {
    const elementCounts: { [key: string]: number } = {};
    this.atoms.forEach((atom) => {
      const symbol = atom.elementData.symbol;
      elementCounts[symbol] = (elementCounts[symbol] || 0) + 1;
    });

    // Generate molecular formula
    let formula = '';
    for (const symbol in elementCounts) {
      formula += symbol + (elementCounts[symbol] > 1 ? elementCounts[symbol] : '');
    }

    return formula;
  }
}
