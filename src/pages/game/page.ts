import { GAME } from "..";
import { Camera } from "../../core/camera";
import { renderer } from "../../core/renderer";
import { scene } from "../../core/scene";
import { Cube } from "../../core/cube";
import { Plane } from "../../core/plane";
import { Environment } from "../../core/environment";
import { Spike } from "../../core/spike";
import { useGame } from "./useGame";

const genSpikes = new Worker(new URL('/src/workers/gen-spikes.ts', import.meta.url)) 
const { gameOver } = useGame();

export const game = {
  name: GAME,
  component: `
    <section id="game-section" class="w-full h-screen flex items-center justify-center">
      
    </section>
  `,
  init: () => {
    let time = 0;
    const camera = new Camera();
    const cube = new Cube();
    const plane = new Plane(1000, 100);
    const environment = new Environment();
    plane.setPosition(cube);
    const section = document.querySelector("#game-section");
    scene.add(cube);
    scene.add(plane);
    scene.add(environment);
    window.addEventListener("keydown", (event) => cube.handleJump(event));
    window.addEventListener('click', () => cube.handleJumpClick());
    window.addEventListener("resize", () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    });
    

    const spikeCount = 350;
    const spikes: Spike[] = [];

    let range = 1000;
    genSpikes.postMessage({
     range, spikeNumber: spikeCount
    })
    genSpikes.onmessage = (event) => {
      const { spikes: spikesData } = event.data
      spikesData.forEach( (data: { position: { x: number}}) => {
        const spike = new Spike();
        spike.position.x = data.position.x;
        scene.add(spike);
        spikes.push(spike)
      })
    }

    function animate() {
      camera.target(cube.position);
      if (section) {
        section.innerHTML = `<button class="absolute z-10 text-white text-xl top-10 right-10">Jumps ${cube.getTotalJumps()}</button>`;
      }
      cube.saltar();
      cube.accelerate();
      cube.checkCollision(spikes);
      camera.target(cube.position);

      if (!cube.getAlive()) {
        if (section) {
          gameOver(section, cube, time);
          time = time;
        }
        // gameOver(section, cube, time);
        // time = time
      } else {
        time += 1 / 60;
      }

      renderer.render(scene, camera);
    }
    renderer.setAnimationLoop(animate);
  },
};
