import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip } from "recharts";
import ChampionStats from '../lol-info/12.11.1/data/champion_stats.json';

export default function StatsGraph({ searchedChampions, stat }) {
    let champions = [];
    for (let champion of Object.keys(ChampionStats)) champions.push(ChampionStats[champion]);

    let filteredChampions = [];
    if (searchedChampions.length !== 0) {
        filteredChampions = champions.filter(champion => searchedChampions
            .some(name => name.toLowerCase() === champion.name.toLowerCase()));
    } else {
        filteredChampions = champions;
    }

    let data = [];
    for (let level = 1; level <= 6; level++) {
        let levelData = { name: `Lvl ${level}` };
        for (let champion of filteredChampions) {
            levelData[champion.name] = champion[`${stat}tolevel6`][level - 1];
        }
        data.push(levelData);
    }

    return (
        <LineChart width={340} height={250} data={data} >
            <XAxis dataKey="name" />
            <YAxis />
            <CartesianGrid stroke="#CCC" />
            {filteredChampions.map(champion => {
                return (
                    <Line type="monotone"
                    dataKey={champion.name}
                    stroke={`#${Math.floor(Math.random() * 16777215).toString(16)}`} />);
            })}
            <Tooltip itemSorter={item => -item.value} />
        </LineChart>
    );
}