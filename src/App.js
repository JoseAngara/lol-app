import { useState } from 'react';
import "./styles.scss";
import ChampionSelector from "./components/ChampionSelector";
import StatsGraph from "./components/StatsGraph"

function App() {
  let [search, setSearch] = useState("");
  let [champions, setChampions] = useState(["Wukong", "Darius", "Mordekaiser", "Maestro Yi", "Kha'Zix", "Miss Fortune", "Vayne", "Ashe"]);

  const handleClick = (event) => {
    setChampions([...champions, event.target.key])
  }

  return (
    <div>
      <input type="text" value={search} onChange={(event) => setSearch(event.target.value)} />
      <ChampionSelector search={search} />
      <StatsGraph searchedChampions={champions} stat="effectivehparmor" initialLevel={1} finalLevel={12} />
      <StatsGraph searchedChampions={champions} stat="attackdamage" initialLevel={1} finalLevel={12} />
    </div>
  );
}

export default App;
