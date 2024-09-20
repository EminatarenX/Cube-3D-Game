import * as THREE from "three";
import { Spike } from "./spike";

const counter = new Worker(
  new URL("/src/workers/counter.worker.ts", import.meta.url)
);

const calculateJump = new Worker(
  new URL("/src/workers/jump.worker.ts", import.meta.url)
);

export class Cube extends THREE.Object3D {
  private jump = {
    duration: 1,
    active: false,
    height: 0.1 * 3,
    time: 0,
    total: 0,
  };
  private alive: boolean;
  private geometry: THREE.BoxGeometry;

  getAlive() {
    return this.alive;
  }
  constructor() {
    super();
    this.geometry = new THREE.BoxGeometry(1, 1, 1);
    const material = new THREE.MeshBasicMaterial({
      color: "white",
      wireframe: true,
    });

    const mesh = new THREE.Mesh(this.geometry, material);
    this.add(mesh);
    this.alive = true;
    this.scale.set(0.1, 0.1, 0.1);

    counter.onmessage = (event) => {
      this.jump.total = event.data;
    };
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
      // this.initialPosition = true;
      let y = this.scale.y + 0.006;
      let x = this.scale.x + 0.006;
      let z = this.scale.z + 0.006;
      this.scale.set(x, y, z);
    } else {
      // this.initialPosition = false;
    }

    this.position.set(0, 0, 0);
  }

  setJump() {
    if (!this.jump.active) {
      this.jump.active = true;
      // this.jump.total += 1;
      counter.postMessage("startJump");
    } else {
      this.jump.active = false;
    }
  }

  saltar() {
    if (this.jump.active) {
      this.jump.time += 0.016 * 2;
      calculateJump.postMessage({
        jumpTime: this.jump.time,
        jumpDuration: this.jump.duration,
        jumpHeight: this.jump.height,
      });
      calculateJump.onmessage = (e) => {
        const { y, rotate } = e.data;

        this.rotation.z = -rotate + 0.07;
        this.position.y = y;

        if (this.jump.time > 1) {
          this.setJump();
          this.jump.time = 0;
          this.position.y = 0;
        }
      };
    }
  }

  accelerate() {
    if (this.alive) {
      this.position.x += 0.03;
    }
  }

  handleJump(event: KeyboardEvent) {
    if (event.code === "Space") {
      if (!this.isJumping() && this.alive) {
        this.setJump();
      }
    }
  }

  checkCollision(spikes: Spike[]) {
    spikes.forEach((spike) => {
      if (
        +(this.position.x + this.getDimensions().x / 2).toFixed(2) >=
          spike.position.x - this.getDimensions().x / 2 &&
        +(this.position.x - this.getDimensions().x / 2).toFixed(2) <=
          spike.position.x + this.getDimensions().x / 2 &&
        +(this.position.y / 2).toFixed(2) == spike.position.y / 2
      ) {
        this.alive = false;
      }
    });
  }
}
