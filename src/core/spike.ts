import * as THREE from "three";
export class Spike extends THREE.Object3D {
  private geometry: THREE.ConeGeometry;

  constructor() {
    super();
    this.geometry = new THREE.ConeGeometry(1, 1, 4); // Un cono de base triangular
    const material = new THREE.MeshBasicMaterial({
      color: "#ff0000", // Color rojo
      wireframe: true, // Wireframe para que sea visible en el entorno
    });
    this.rotation.y = Math.PI / 4; // Rotación de 90 grados
    const spikeMesh = new THREE.Mesh(this.geometry, material);
    this.add(spikeMesh);
    this.scale.set(0.1, 0.1, 0.1);
  }

  // Método para crear la geometría de la púa (un cono)
  // Método para posicionar la púa en un lugar específico
  setPosition(x: number, y: number, z: number) {
    this.position.set(x, y, z);
  }

  getDimensions() {
    return {
      height: this.geometry.parameters.height,
      radiusTop: this.geometry.parameters.radiusTop,
      radiusBottom: this.geometry.parameters.radiusBottom,
    };
  }
}
