import * as THREE from 'three';

/**
 * A tiny module-level bridge so React DOM buttons (rotate / zoom / reset)
 * can reach the Three.js OrbitControls instance inside the Canvas.
 */
export const controlsBridge = {
  controls: null as any,
  setControls(c: any) {
    this.controls = c;
  },
  autoRotate: false,

  setAutoRotate(v: boolean) {
    this.autoRotate = v;
    if (this.controls) {
      this.controls.autoRotate = v;
    }
  },

  zoom(factor: number) {
    const c = this.controls;
    if (c) {
      const cam = c.object as THREE.PerspectiveCamera;
      const dir = new THREE.Vector3();
      cam.getWorldDirection(dir);
      const current = cam.position.clone().sub(c.target);
      const next = current.clone().multiplyScalar(1 - factor);
      // clamp
      if (next.length() > 1.2 && next.length() < 12) {
        cam.position.copy(c.target.clone().add(next));
      }
      c.update();
    }
  },

  reset() {
    const c = this.controls;
    if (c) {
      const cam = c.object as THREE.PerspectiveCamera;
      cam.position.set(0, 1.1, 4.6);
      c.target.set(0, 1.1, 0);
      c.update();
    }
  },
};
