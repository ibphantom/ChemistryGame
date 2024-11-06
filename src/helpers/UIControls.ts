import * as THREE from 'three';
import { Atom } from '@/components/Atom';
import { Molecule } from '@/components/Molecule';
import { SceneManager } from '@/core/SceneManager';

export class UIControls {
  private sceneManager: SceneManager;
  private raycaster: THREE.Raycaster;
  private mouse: THREE.Vector2;
  private selectedObject: THREE.Object3D | null = null;

  constructor(sceneManager: SceneManager) {
    this.sceneManager = sceneManager;
    this.raycaster = new THREE.Raycaster();
    this.mouse = new THREE.Vector2();

    window.addEventListener('click', this.onClick);
  }

  private onClick = (event: MouseEvent) => {
    event.preventDefault();

    // Calculate mouse position in normalized device coordinates
    this.mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
    this.mouse.y = - (event.clientY / window.innerHeight) * 2 + 1;

    // Update the raycaster
    this.raycaster.setFromCamera(this.mouse, this.sceneManager.camera);

    // Calculate objects intersecting the ray
    const intersects = this.raycaster.intersectObjects(this.sceneManager.scene.children, true);

    if (intersects.length > 0) {
      const object = intersects[0].object;
      if (object instanceof Atom || object.parent instanceof Molecule) {
        this.selectObject(object);
      }
    } else {
      this.deselectObject();
    }
  };

  private selectObject(object: THREE.Object3D) {
    if (this.selectedObject) {
      this.deselectObject();
    }
    this.selectedObject = object;
    // Highlight the selected object
    if (object instanceof Atom) {
      object.highlight();
    }
  }

  private deselectObject() {
    if (this.selectedObject && this.selectedObject instanceof Atom) {
      this.selectedObject.unhighlight();
    }
    this.selectedObject = null;
  }
}
