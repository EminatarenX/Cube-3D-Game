import { game } from "../pages/game/page"
import { landing } from "../pages/landing/page"
import { Route } from "./routes.interface"

export const routes: Record<string, Route> = {
    [landing.name]: {
        name: landing.name,
        component: landing.component
    },
    [game.name]: {
        name: game.name,
        component: game.component,
        init: game.init
    }
}

