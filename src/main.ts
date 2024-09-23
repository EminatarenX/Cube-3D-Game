import "./index.css";
import { Camera } from "./core/camera";
import { router } from "./routes/setup";
import { GAME, MAIN_MENU } from "./pages";
import { deadmau5 } from "./core/audio";

router.setup(MAIN_MENU);
export const cameraClass = new Camera();

const playbutton = document.getElementById("play-button");
playbutton?.addEventListener("click", () => {
  deadmau5.play();
  router.setup(GAME);
});
