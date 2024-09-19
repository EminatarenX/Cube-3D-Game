import { renderer } from "../core/renderer";
import { GAME, MAIN_MENU } from "../pages"
import { routes } from "./routes"


export class Router {
    setup(page: string){
        page= GAME
        switch( page ) {
            case MAIN_MENU: 
              document.body.innerHTML = routes[MAIN_MENU].component
              break;
            case GAME: 
                document.body.innerHTML = routes[GAME].component
                document.body.appendChild(renderer.domElement)
                if(routes[GAME]?.init) {
                    routes[GAME].init()
                }
                break;
            default:
                break;
          }
    }
}
