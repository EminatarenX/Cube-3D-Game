import * as THREE from 'three';


const ParticleWorker = new Worker(new URL('/src/workers/gen-particles.worker.ts', import.meta.url))

export class Environment  extends THREE.Object3D {
    private particles!: THREE.Points;
    constructor() {
        super();
        this.createParticles()
    }

    createParticles() {
        const particleCount = 1000; 

        ParticleWorker.postMessage({particleCount})

        ParticleWorker.onmessage = (e: MessageEvent) => {
            const { positions, colors } = e.data

            const particlesGeometry = new THREE.BufferGeometry();
            particlesGeometry.setAttribute('position', new THREE.Float32BufferAttribute(positions, 3));
            particlesGeometry.setAttribute('color', new THREE.Float32BufferAttribute(colors, 3));

            const particlesMaterial = new THREE.PointsMaterial({
                size: 0.5,
                vertexColors: true,
                transparent: true,
                opacity: 0.5,
                blending: THREE.AdditiveBlending
            });

            this.particles = new THREE.Points(particlesGeometry, particlesMaterial);
            this.add(this.particles);

        }
        
    }

    // Método para actualizar las partículas según el movimiento del cubo
    updateParticles(cubeSpeed: number) {
        const positions = this.particles.geometry.attributes.position.array;

        for (let i = 0; i < positions.length; i += 3) {
            // Mover las partículas en función de la velocidad del cubo
            positions[i + 2] += cubeSpeed * 0.1; // Modificar la coordenada Z para simular movimiento hacia adelante

            // Si la partícula sale del campo de visión, reposicionarla al frente
            if (positions[i + 2] > 100) {
                positions[i + 2] = -100;
            }
        }

        this.particles.geometry.attributes.position.needsUpdate = true;
    }

    
    

}