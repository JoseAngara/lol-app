import { useState } from 'react';
import "./styles.scss";
import ChampionSelector from "./components/ChampionSelector";

function App() {
  let [search, setSearch] = useState("");
  return (
    <div>
      <input type="text" value={search} onChange={(event) => setSearch(event.target.value)} />
      <ChampionSelector search={search} />
    </div>
  );
}

export default App;
