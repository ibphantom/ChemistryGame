// src/helpers/PhysicsEngine.ts

import PhysicsWorker from '@/workers/PhysicsWorker.worker.ts?worker';

export class PhysicsEngine {
  private worker: Worker;

  constructor() {
    this.worker = new PhysicsWorker();
    this.worker.onmessage = this.onWorkerMessage;
  }

  start() {
    this.init();
  }

  init() {
    this.worker.postMessage({ action: 'init' });
  }

  update() {
    this.worker.postMessage({ action: 'update' });
  }

  private onWorkerMessage = (event: MessageEvent) => {
    const data = event.data;
    // Handle data from worker
  };
}
