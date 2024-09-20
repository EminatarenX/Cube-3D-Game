
import { Cube } from "../../core/cube";

export const useGame = () => {
    const gameOver = (section: Element, cube: Cube, time: number) => {
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
            window.location.reload()
          });
        }

        
      };

      return {
        gameOver
      }
}