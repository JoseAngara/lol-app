import { createContext } from "react";

let freeChampions = ["86", "104", "887", "43", "141", "61", "421", "16", "134", "48", "77", "711", "106", "62", "101", "154"];
let favoriteChampions = ["104", "421", "48", "62", "113", "121"];

const ChampionContext = createContext({ freeChampions, favoriteChampions });

export default ChampionContext;