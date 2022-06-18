import './styles.scss';

import championInfo from './lol-info/12.11.1/data/es_MX/champion';
import ChampionSelector from './components/ChampionSelector'

function importAllImages(r) {
  let images = {};
  r.keys().forEach((item, index) => {
    images[item.replace('./', '')] = r(item);
  });
  return images;
}

function App() {
  let championImages = importAllImages(require.context('./lol-info/img/champion/tiles/70px', false, /\.(png|jpe?g|svg)$/));
  return ( < ChampionSelector className="ChampionSelector" champions = {
    championInfo.data
  } championImages = {
    championImages
  } />
  );
}

export default App;