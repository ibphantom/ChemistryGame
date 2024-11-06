import * as CANNON from 'cannon-es';

self.addEventListener('message', event => {
  const data = event.data;
  // Initialize physics world
  const world = new CANNON.World();
  world.gravity.set(0, -9.82, 0);

  // Perform physics simulation steps
  world.step(1 / 60);

  // Post updated physics data back to the main thread
  self.postMessage({ /* physics data */ });
});
