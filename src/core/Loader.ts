import * as THREE from 'three';

export class Loader {
  private loadingManager: THREE.LoadingManager;
  private textureLoader: THREE.TextureLoader;
  private gltfLoader: any; // If using GLTFLoader

  constructor() {
    this.loadingManager = new THREE.LoadingManager();
    this.textureLoader = new THREE.TextureLoader(this.loadingManager);
    // Initialize other loaders as needed
    // For example, GLTFLoader
    // this.gltfLoader = new GLTFLoader(this.loadingManager);
  }

  loadTexture(url: string): Promise<THREE.Texture> {
    return new Promise((resolve, reject) => {
      this.textureLoader.load(
        url,
        texture => resolve(texture),
        undefined,
        err => reject(err)
      );
    });
  }

  // Example method to load a GLTF model
  /*
  loadModel(url: string): Promise<THREE.Group> {
    return new Promise((resolve, reject) => {
      this.gltfLoader.load(
        url,
        gltf => resolve(gltf.scene),
        undefined,
        err => reject(err)
      );
    });
  }
  */
}
