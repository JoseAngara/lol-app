import { useState, createContext} from 'react';
import "./styles.scss";
import ChampionFinder from './components/ChampionFinder';
import LanguageContext from './context/LanguageContext';

function App() {
  return (
    <div>
        <ChampionFinder />
    </div>
  );
}

export default App;
