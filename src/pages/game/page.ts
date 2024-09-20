import { GAME } from "..";
import { Camera } from "../../core/camera";
import { renderer } from "../../core/renderer";
import { scene } from "../../core/scene";
import { Cube } from "../../core/cube";
import { Plane } from "../../core/plane";
import { Environment } from "../../core/environment";
import { Spike } from "../../core/spike";
import { useGame } from "./useGame";

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

    const spikeCount = 50;
    const spikes: Spike[] = [];

    let positionX = 100;
    for (let i = 0; i < spikeCount; i++) {
      const spike = new Spike();
      spike.position.x = positionX * Math.random();

      scene.add(spike);

      spikes.push(spike);

      positionX += 2;
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
