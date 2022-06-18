export default function ChampionSelector( {
  className, champions, championImages
}) {
  return (
    <> < ul className = {
      className
    } >
    {
      Object.keys(champions).map(champion => < ChampionTile champion = {
        champions[champion]} championImages = {
        championImages
      } / >)} < /ul > < / >
  );
}

  const ChampionTile = ({
    champion, championImages
  }) => {
    return ( < li > < img src = {
      championImages[champion.id + '_0.jpg']} alt = {
      champion.name
    } / >
      <span>{
        champion.name
      }</span> < /li >
    )
  }