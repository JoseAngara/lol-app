
export default function ChampionSelector({ champions, favoriteChampions, freeChampions }) {
  function importAllImages(r) {
    let images = {};
    r.keys().forEach((item) => {
      images[item.replace('./', '')] = r(item);
    });
    return images;
  }

  function showChampionInfo(key) {
    return key;
  }

  let championImages = importAllImages(
    require.context('../lol-info/img/champion/tiles/140px', false, /\.(png|jpe?g|svg)$/)
  );

  return (
    <div className="ChampionSelector container">
      <ul className="ChampionSelector__list">
        {champions.map(champion => {
          return (
            <ChampionTile
              key={(champion.key).toString()}
              name={champion.name}
              image={championImages[champion.image]}
              favorite={favoriteChampions.some(championKey => championKey === champion.key)}
              free={freeChampions.some(championKey => championKey === champion.key)}
              onClick={() => showChampionInfo(champion.key)}
            />);
        })}
      </ul>
    </div>
  );
}

const ChampionTile = ({ name, image, favorite, free, onClick }) => {
  const getClasses = (favorite, free) => {
    let classes = ["ChampionSelector__tile"];
    if (favorite) classes.push("ChampionSelector__tile--favorite");
    if (free) classes.push("ChampionSelector__tile--free");

    return classes.join(" ");
  };
  return (
    <li className={getClasses(favorite, free)} onClick={onClick}>
      <img src={image} alt={name} srcSet="" />
      <span>{name.toUpperCase()}</span>
    </li>
  );
};