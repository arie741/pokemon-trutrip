import { useSelector } from "react-redux";
import PokemonItem from "./PokemonItem";
import { parseId } from "../functions/helperFunctions";

function PokemonList() {
  const pokemonList = useSelector((state) => state.pokemonList.value);
  return (
    <div>
      {pokemonList.map((item, index) => (
        <PokemonItem
          key={index}
          pokemonId={parseId(item.url)}
          name={item.name}
        />
      ))}
    </div>
  );
}

export default PokemonList;
