import * as THREE from "three";

export class Camera extends THREE.PerspectiveCamera {
  private initialPosition = true;

  constructor() {
    super(50, window.innerWidth / window.innerHeight, 0.1, 1000);
    this.position.z = 10;
  }

  getInitialPosition() {
    return this.initialPosition;
  }


  target(position: THREE.Vector3): void {
    
    this.position.set(position.x - 0.5 , position.y + 0.3 , position.z + 1)
    this.lookAt(position);
  }
}
