import { LineChart, BarChart, Line, Bar, Cell, XAxis, YAxis, CartesianGrid, Tooltip } from "recharts";
import ChampionStats from '../lol-info/12.11.1/data/champion_stats.json';

export default function BasicStatsGraph({ championKeys, stats, initialLevel, finalLevel }) {
    function hslToHex(hue, saturation, lightness) {
        lightness /= 100;
        const a = saturation * Math.min(lightness, 1 - lightness) / 100;
        const f = n => {
          const k = (n + hue / 30) % 12;
          const color = lightness - a * Math.max(Math.min(k - 3, 9 - k, 1), -1);
          return Math.round(255 * color).toString(16).padStart(2, '0');   // convert to Hex and prefix "0" if needed
        };
        return `#${f(0)}${f(8)}${f(4)}`;
    }

    function createStatsObject(stat, initialLevel=1, finalLevel=18) {
        let data = [];
        let yRangeMinimum = 1000;
        let yRangeMaximum = 0;

        if (stat !== "movespeed") {
            for (let level = initialLevel; level <= finalLevel; level++) {
                let levelData = { name: `Lvl ${level}` };
                for (let champion of champions) {
                    levelData[champion.name] = champion.scalatingstats[stat][level - 1];
                    yRangeMaximum = champion.scalatingstats[stat][level - 1] > yRangeMaximum ? champion.scalatingstats[stat][level - 1] : yRangeMaximum;
                    yRangeMinimum = champion.scalatingstats[stat][level - 1] < yRangeMinimum ? champion.scalatingstats[stat][level - 1] : yRangeMinimum;
                }
                data.push(levelData);
            }
        } else {
            yRangeMinimum = 0;
            for (let champion of champions) {
                let championData = { name: champion.name, movespeed: champion.stats.movespeed };
                data.push(championData);
                yRangeMaximum = champion.stats.movespeed > yRangeMaximum ? champion.stats.movespeed : yRangeMaximum;
            }
        }

        return [data, yRangeMinimum, yRangeMaximum];
    }

    function createChart(stats, champions, chartData) {
        let [data, ...domain] = chartData;

        if (stat === "movespeed") {
            return (<BarChart width={340} height={250} data={data} >
                <XAxis dataKey="name" />
                <YAxis domain={domain} />
                <CartesianGrid stroke="#CCC" />
                <Tooltip itemSorter={item => -item.value} />
                <Bar dataKey="movespeed" >
                    {champions.map(champion => {
                        return (
                            <Cell key={champion.key} fill={hslToHex(champion.colorhue, 80, 40)} />
                        )
                    })}
                </Bar>
            </BarChart>);
        } else {
            return (
                <LineChart width={340} height={250} data={data} >
                    <XAxis dataKey="name" />
                    <YAxis domain={domain} />
                    <CartesianGrid stroke="#CCC" />
                    {champions.map(champion => {
                        return (
                            <Line type="monotone"
                                key={`${champion.key}`}
                                dataKey={champion.name}
                                stroke={hslToHex(champion.colorhue, 80, 40)}
                            />);
                    })}
                    <Tooltip itemSorter={item => -item.value} />
                </LineChart>
            );
        }
    }

    let champions = ChampionStats
    .filter(champion => championKeys.some(key => key === champion.key));

    let chartData = createStatsObject(stat, initialLevel, finalLevel);

    return (
        <>
            {createChart(stat, champions, chartData)}
        </>
    );
}