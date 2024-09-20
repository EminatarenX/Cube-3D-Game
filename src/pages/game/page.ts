import { GAME, MAIN_MENU } from "..";
import { Camera } from "../../core/camera";
import { renderer } from "../../core/renderer";
import { scene } from "../../core/scene";
import { Cube } from "../../core/cube";
import { Plane } from "../../core/plane";
import { Environment } from "../../core/environment";
import { Spike } from "../../core/spike";
import { router } from "../../routes/setup";

export const game = {
  name: GAME,
  component: `
    <section id="game-section" class="w-full h-screen flex items-center justify-center">
      
    </section>
  `,
  init: () => {
    let time= 0
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

    

    const gameOver = () => {
      localStorage.setItem('record', JSON.stringify({totalJumps: cube.getTotalJumps(), time: time.toFixed(2)}))
      
      if (section) {
        section.innerHTML = `
         <div class=" relative bg-sky-600 rounded hover:bg-teal-500 text-6xl text-white font-bold p-6 shadow-2xl shadow-sky-700 z-30 flex items-center flex-col gap-3" id="play-button">
          <h3 class="text-white text-center">GAME OVER</h3>
          <span class="text-white text-xl">Jumps ${cube.getTotalJumps()}</span>
           <span class="text-white text-xl">Time: ${time.toFixed(2)}</span>
          <button class="text-xl p-3 hover:scale-110  rounded bg-sky-700"  id="go-menu">Volver al menu</button>
        </div>
        `;

        const button = document.getElementById("go-menu");
        button?.addEventListener("click", () => {
          router.setup(MAIN_MENU);
        });
      }
    };

    const spikeCount = 10;
    const spikes: Spike[] = [];

    let positionX = 2;
    let positionY = 0;
    for (let i = 0; i < spikeCount; i++) {
      const spike = new Spike();
      spike.position.x = positionX;
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
        gameOver();
        time = time
      }else {
        time += 1/60
      }

      renderer.render(scene, camera);
    }
    renderer.setAnimationLoop(animate);
  },
};
