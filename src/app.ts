import { buildLogger } from "./plugins/logger.pluggin";
import { findHeroByID } from "./services/hero.service";

const hero = findHeroByID(2);

console.log(hero?.name ?? "Hero not found!!");

const logger = buildLogger('app.js')

logger.error("Hubo un error en el servidor")
