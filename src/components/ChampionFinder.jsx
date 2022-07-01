import { useContext, useState } from "react";
import LanguageContext from "../context/LanguageContext";
import ChampionSelector from "./ChampionSelector";
import ChampionContext from "../context/ChampionContext";
import ChampionSearchBar from "./ChampionSearchBar";


export default function ChampionFinder() {
    let champions = useContext(LanguageContext)['champion_thumbnails'];
    const {freeChampions, favoriteChampions} = useContext(ChampionContext);

    const [filteredChampions, setFilteredChampions] = useState(champions);

    return (
        <div>
            <ChampionSearchBar
                champions={champions}
                inputId="championFinderInput"
                setFilteredChampions={setFilteredChampions}
            />
            <ChampionSelector
                champions={filteredChampions}
                favoriteChampions={favoriteChampions}
                freeChampions={freeChampions}
            />
        </div>
    );
}