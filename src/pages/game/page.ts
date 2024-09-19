import { GAME } from "..";
import { Camera } from "../../core/camera";
import { renderer } from "../../core/renderer";
import { scene } from "../../core/scene";
import { Light } from "../../core/light";
import { Cube } from "../../entities/cube";
import { Plane } from "../../core/plane";

export const game = {
  name: GAME,
  component: `
    <section id="game-section" class="w-full h-screen ">
      
    </section>
  `,
  init: () => {
    let time = 0
    const camera = new Camera()
    const cube = new Cube();
    const plane = new Plane(30,100)
    plane.setPosition(cube)
    const section = document.querySelector("#game-section");
    scene.add(cube);
    scene.add(plane)
    window.addEventListener("keydown", (event) => cube.handleJump(event));
    
    function animate() {
      plane.position.x -= 0.1 
      camera.setInitialPosition()
      if (section) {
        section.innerHTML = `<button class="absolute z-10 text-white text-xl top-10 right-10">Jumps ${cube.getTotalJumps()}</button>`;
      }
      cube.saltar();
      renderer.render(scene, camera);
    }
    renderer.setAnimationLoop(animate);
  },
};
