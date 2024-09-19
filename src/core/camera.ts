import * as THREE from "three";

export class Camera extends THREE.PerspectiveCamera {
  private initialPosition = true;

  constructor() {
    super(50, window.innerWidth / window.innerHeight, 0.1, 1000);
    this.position.z = 10;
  }

  setInitialPosition() {
    if (this.initialPosition) {
      this.position.x += 0.4 / 150;
      this.position.y += 0.5 / 3 / 150;
      this.position.z -= (1 * 8) / 150;
      if (this.position.z <= 1) {
        this.initialPosition = false;
      }
    }
  }
}
