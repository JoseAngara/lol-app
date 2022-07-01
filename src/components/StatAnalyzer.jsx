import basicStats from '../lol-info/12.11.1/data/es_MX/basic_stats.json';
import { useState } from 'react';
import BasicStatsGraph from './StatsGraph';

export default function StatAnalizer({ currentChampion }) {
    const [basicStats, setBasicStats] = useState([basicStats[0].value]);
    const [customStats, setCustomStats] = useState([customStats[0].value]);
    const [championIds, setChampionIds] = useState([]);

    const handleBasicStatsChange = (event) => {
        if (basicStats.length < 3) {
            setBasicStats([...basicStats, event.target.value]);
        } else {
            let [_, ...restBasicStats] = basicStats;
            setBasicStats([...restBasicStats, event.target.value]);
        }
    };

    const handleCustomStatsChange = (event) => {
        if (customStats.length < 3) {
            setCustomStats([...customStats, event.target.value]);
        } else {
            let [_, ...restCustomStats] = customStats;
            setCustomStats([...restCustomStats, event.target.value]);
        }
    };

    const handleChampionChange = (championId) => {
        return setChampionIds([...championIds, championId]);
    }

    return (
        <div>
            <form>
                {basicStats.map(stat => <StatRadio
                    key={stat.value}
                    statName={stat.name}
                    statValue={stat.value}
                    statDescription={stat.description}
                    onChange={handleBasicStatsChange}
                    checked={basicStats.some(element => element === stat.value)}
                >
                    {stat.name}
                </StatRadio> )}
            </form>
            <BasicStatsGraph championKeys={championIds} stats={basicStats} initialLevel={1} finalLevel={18} />
            <form>
                {customStats.map(stat => <StatRadio
                    key={stat.value}
                    statName={stat.name}
                    statValue={stat.value}
                    statDescription={stat.description}
                    onChange={handleCustomStatsChange}
                    checked={customStats.some(element => element === stat.value)}
                >
                    {stat.name}
                </StatRadio>)}
            </form>
            <CustomStatsGraph championKeys={championIds} stats={customStats} initialLevel={1} finalLevel={18} />
        </div>
    );
}

const StatRadio = ({ statName, statValue, statDescription, onChange, checked, children }) => {
    return (
        <>
            <label htmlFor={statValue}>
                {children}
            </label>
            <input type="radio" name="basicStat" id={statValue} value={statValue} onChange={onChange} checked={checked} />
        </>
    )
}