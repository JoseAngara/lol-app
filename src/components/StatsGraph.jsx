import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip } from "recharts";
import ChampionStats from '../lol-info/12.11.1/data/champion_stats.json';

export default function StatsGraph({ searchedChampions, stat, initialLevel, finalLevel }) {
    let champions = ChampionStats.filter(champion => searchedChampions
        .some(name => name.toLowerCase() === champion.name.toLowerCase()));;

    let data = [];
    let yRangeMinimum = 1000;
    let yRangeMaximum = 0;
    for (let level = initialLevel; level <= finalLevel; level++) {
        let levelData = { name: `Lvl ${level}` };
        for (let champion of champions) {
            levelData[champion.name] = champion.scalatingstats[stat][level - 1];
            yRangeMaximum = champion.scalatingstats[stat][level - 1] > yRangeMaximum ? champion.scalatingstats[stat][level - 1] : yRangeMaximum;
            yRangeMinimum = champion.scalatingstats[stat][level - 1] < yRangeMinimum ? champion.scalatingstats[stat][level - 1] : yRangeMinimum;
        }
        data.push(levelData);
    }

    return (
        <LineChart width={340} height={250} data={data} >
            <XAxis dataKey="name" />
            <YAxis domain={[yRangeMinimum, yRangeMaximum]} />
            <CartesianGrid stroke="#CCC" />
            {champions.map(champion => {
                return (
                    <Line type="monotone"
                        key={`${champion.key}`}
                        dataKey={champion.name}
                        stroke={`#${Math.floor(Math.random() * 16777215).toString(16)}`} />);
            })}
            <Tooltip itemSorter={item => -item.value} />
        </LineChart>
    );
}