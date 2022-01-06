import { Link } from "react-router-dom";

function PokemonItem({name, pokemonId, owned = false}) {
  return owned ?  <Link to={`/mypokemon/${pokemonId}`}><div>{name}</div></Link> : <Link to={`/pokemon/${pokemonId}`}><div>{name}</div></Link>;
}

export default PokemonItem;
