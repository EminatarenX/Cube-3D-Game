import "./index.css";
import { Camera } from "./core/camera";
import { renderer } from "./core/renderer";
import { Router } from "./routes/setup";
import { GAME, MAIN_MENU } from "./pages";

const router = new Router();
router.setup(MAIN_MENU);
export const cameraClass = new Camera();

const playbutton = document.getElementById("play-button");
playbutton?.addEventListener("click", () => {
  router.setup(GAME);
});

window.addEventListener("resize", () => {
  // camera.aspect = window.innerWidth / window.innerHeight;
  // camera.updateProjectionMatrix();
  // renderer.setSize(window.innerWidth, window.innerHeight);
});
