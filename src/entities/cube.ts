import * as THREE from "three";

export class Cube extends THREE.Object3D {
  private jump = {
    duration: 1,
    active: false,
    height: 0.1 * 3,
    time: 0,
    total: 0,
  };
  private width = 1;
  private height = 1;
  private depth = 1;
  private initialPosition = false;

  

  constructor() {
    super();
    const geometry = new THREE.BoxGeometry(1, 1, 1);
    const material = new THREE.MeshBasicMaterial({
      color: "white",
      wireframe: true,
    });



    const mesh = new THREE.Mesh(geometry, material);
    this.add(mesh);

    this.scale.set(0.1, 0.1, 0.1);
  }

  getDimensions() {
      return {
        x: this.scale.x,
        y: this.scale.y,
        z: this.scale.z,
      };
  }

  isJumping() {
    return this.jump.active;
  }

  getTotalJumps() {
    return this.jump.total;
  }

  setInitialPosition() {
    if (this.scale.y < 1) {
      this.initialPosition = true;
      let y = this.scale.y + 0.006;
      let x = this.scale.x + 0.006;
      let z = this.scale.z + 0.006;
      this.scale.set(x, y, z);
    } else {
      this.initialPosition = false;
    }

    this.position.set(0, 0, 0);
  }

  setJump() {
    if (!this.jump.active) {
      this.jump.active = true;
      this.jump.total += 1;
    } else {
      this.jump.active = false;
    }
  }

  saltar() {
    if (this.jump.active) {
      this.jump.time += 0.016 * 2;
      const t = (this.jump.time % this.jump.duration) / this.jump.duration;
      const y = Math.sin(t * Math.PI) * this.jump.height;
      const rotate = Math.PI * t;
      this.rotation.z = -rotate + 0.07;
      this.position.y = y;
      if (this.jump.time > 1) {
        this.setJump();
        this.jump.time = 0;
      }
    }
  }

  handleJump(event: KeyboardEvent) {
    if (event.code === "Space") {
      if (!this.isJumping() && !this.initialPosition) {
        this.setJump();
      }
    }
  }
}
