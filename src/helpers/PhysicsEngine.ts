// src/helpers/PhysicsEngine.ts

// Import the worker as a module
import PhysicsWorker from '@/workers/PhysicsWorker.worker.ts';

export class PhysicsEngine {
  private worker: Worker;

  constructor() {
    this.worker = new PhysicsWorker();
    this.worker.onmessage = this.onWorkerMessage;
  }

  start() {
    this.init();
    // Additional initialization code if needed
  }

  init() {
    this.worker.postMessage({ action: 'init' });
  }

  update() {
    this.worker.postMessage({ action: 'update' });
  }

  private onWorkerMessage = (event: MessageEvent) => {
    const data = event.data;
    // Update objects in the scene with new physics data
  };
}
