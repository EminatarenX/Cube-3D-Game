import * as THREE from "three";
import { Cube } from "./cube";

export class Plane extends THREE.Object3D {
  private geometry: THREE.PlaneGeometry
  constructor(width: number, height: number) {
    
    super();
    this.geometry = new THREE.PlaneGeometry(width, height, 100,100);
    const material = new THREE.MeshBasicMaterial({
      color: '#1A1A1A',
      side: THREE.DoubleSide,
      wireframe: true,
      
    });

    this.add(new THREE.Mesh(this.geometry, material));
    
    this.rotation.x = Math.PI / 2;
    
  }

  getSize() {
    return {
      width: this.geometry.parameters.width,
      height: this.geometry.parameters.height
    }
  }


  setPosition (cube: Cube) {
    this.position.set(
        cube.position.x - cube.getDimensions().x / 2,
        cube.position.y - cube.getDimensions().y / 2,
        0
    )
  }

}
