import { useContext, useState, useEffect } from "react";
import LanguageContext from "../context/LanguageContext";
import ChampionContext from "../context/ChampionContext";
import championsPerLane from "../lol-info/12.11.1/data/champion_lane.json";
import championsPerRole from "../lol-info/12.11.1/data/champion_role.json";

export default function ChampionSearchBar({ champions, inputId, setFilteredChampions }) {
    const language = useContext(LanguageContext)['app_language']['championTab']['championSearchBar'];
    const ChampionInfo = useContext(ChampionContext);
    const [searchTerm, setSearchTerm] = useState("");

    const filters = {
        all: (champion) => { return true },
        free: (champion) => {
            return ChampionInfo.freeChampions.some(key => key === champion.key)
        },
        favorites: (champion) => {
            return ChampionInfo.favoriteChampions.some(key => key === champion.key)
        },
        lane: (lane) => {
            return (champion) => championsPerLane[lane].some(key => key === champion.key);
        },
        role: (role) => {
            return (champion) => championsPerRole[role].some(key => key === champion.key);
        }
    }
    const [currentFilter, setCurrentFilter] = useState(() => filters.all);

    const onChange = (event) => {
        setSearchTerm(event.target.value);
    }

    useEffect(() => {
        const filteredChampions = champions.filter(
            currentFilter
        ).filter(
            champion => champion.name.toLowerCase().includes(searchTerm.toLowerCase())
        );
        setFilteredChampions(filteredChampions);
    }, [searchTerm, currentFilter, champions, setFilteredChampions]);

    return (
        <div>
            <h1>{language.header}</h1>
            <input
                type="text"
                name="championSearcher"
                id={inputId}
                placeholder={language.placeholder}
                onChange={onChange}
            />
            <ul>
                <li onClick={() => setCurrentFilter(() => filters.all)}>{language.filteroptions.all}</li>
                <li onClick={() => setCurrentFilter(() => filters.free)}>{language.filteroptions.free}</li>
                <li onClick={() => setCurrentFilter(() => filters.favorites)}>{language.filteroptions.favorites}</li>
                <li>
                    <ul>
                        {Object.keys(language.filteroptions.laneoptions).map(lane =>
                            <li key={lane} onClick={() => setCurrentFilter(() => filters.lane(lane))}>
                                {language.filteroptions.laneoptions[lane]}
                            </li>)
                        }
                    </ul>
                </li>
            </ul>
        </div>
    );
}