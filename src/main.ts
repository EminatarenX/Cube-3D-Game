import "./index.css";
import { Camera } from "./core/camera";
import { router } from "./routes/setup";
import { GAME, MAIN_MENU } from "./pages";

router.setup(MAIN_MENU);
export const cameraClass = new Camera();

const playbutton = document.getElementById("play-button");
playbutton?.addEventListener("click", () => {
  router.setup(GAME);
});

export function mainMenu() {
  router.setup(MAIN_MENU);
}
