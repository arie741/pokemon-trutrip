import { Link } from "react-router-dom";

function PokemonItem({ name, pokemonId, owned = false }) {
  return owned ? (
    <Link to={`/mypokemon/${pokemonId}`}>
      <div className="card my-2">
        <div className="card-body"><b className="text-capitalize">{name}</b></div>
      </div>
    </Link>
  ) : (
    <Link to={`/pokemon/${pokemonId}`}>
      <div className="card my-2">
        <div className="card-body"><b className="text-capitalize">{name}</b></div>
      </div>
    </Link>
  );
}

export default PokemonItem;
