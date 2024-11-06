// src/core/Loader.ts

import * as THREE from 'three';

export class Loader {
  private textureLoader = new THREE.TextureLoader();
  private gltfLoader = new THREE.GLTFLoader();

  loadTexture(path: string): Promise<THREE.Texture> {
    return new Promise((resolve) => {
      this.textureLoader.load(
        path,
        (texture) => resolve(texture),
        undefined,
        () => {
          // Asset not found, use a placeholder texture
          const placeholder = new THREE.MeshBasicMaterial({ color: 0xcccccc });
          const texture = new THREE.Texture();
          texture.image = placeholder;
          texture.needsUpdate = true;
          resolve(texture);
        }
      );
    });
  }

  loadModel(path: string): Promise<THREE.Group> {
    return new Promise((resolve) => {
      this.gltfLoader.load(
        path,
        (gltf) => resolve(gltf.scene),
        undefined,
        () => {
          // Asset not found, use a placeholder geometry
          const geometry = new THREE.BoxGeometry(1, 1, 1);
          const material = new THREE.MeshBasicMaterial({ color: 0xff0000 });
          const placeholder = new THREE.Mesh(geometry, material);
          const group = new THREE.Group();
          group.add(placeholder);
          resolve(group);
        }
      );
    });
  }
}
