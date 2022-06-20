import { useState } from 'react';
import "./styles.scss";
import ChampionSelector from "./components/ChampionSelector";
import StatsGraph from "./components/StatsGraph"

function App() {
  let [search, setSearch] = useState("");
  let [champions, setChampions] = useState([]);

  const handleClick = (event) => {
    setChampions([...champions, event.target.key])
  }

  return (
    <div>
      <input type="text" value={search} onChange={(event) => setSearch(event.target.value)} />
      <ChampionSelector search={search} />
      <StatsGraph searchedChampions={champions} stat="effectivehparmor" />
      <StatsGraph searchedChampions={champions} stat="attackdamage" />
    </div>
  );
}

export default App;
