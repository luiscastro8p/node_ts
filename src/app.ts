import { findHeroByID } from "./services/hero.service";

const hero = findHeroByID(2);

console.log(hero?.name ?? "Hero not found!!");
