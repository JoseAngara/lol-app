import ChampionThumbnails from '../lol-info/12.11.1/data/es_MX/champion_thumbnails.json';

function importAllImages(r) {
  let images = {};
  r.keys().forEach((item) => {
    images[item.replace('./', '')] = r(item);
  });
  return images;
}

export default function ChampionSelector({ search }) {
  let champions = [];
  for (let champion of Object.keys(ChampionThumbnails)) champions.push(ChampionThumbnails[champion]);

  let filteredChampions = champions.filter(champion => champion.name.toLowerCase().includes(search.toLowerCase()));

  let championImages = importAllImages(
    require.context('../lol-info/img/champion/tiles/140px', false, /\.(png|jpe?g|svg)$/)
  );

  return (
    <div className="ChampionSelector">
      <div className="container">
        <ul>
          {filteredChampions.map(({ name, image }) => <ChampionTile name={name} image={championImages[image]} />)}
        </ul>
      </div>
    </div>
  );
}

const ChampionTile = ({ name, image }) => {
  return (
    <li>
      <img src={image} alt={name} srcSet="" />
      <span>{name.toUpperCase()}</span>{" "}
    </li>
  );
};