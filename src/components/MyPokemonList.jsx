import { useSelector } from "react-redux";
import PokemonItem from "./PokemonItem";

function MyPokemonList() {
  const myPokemonList = useSelector((state) => state.myPokemonList.value);

  return (
    <div>
      {myPokemonList.length != 0 ? (
        myPokemonList.map((item, index) => (
          <PokemonItem
            key={index}
            pokemonId={item.id}
            name={item.name}
            owned={true}
          />
        ))
      ) : (
        <div>You got no pokemon, go catch some!</div>
      )}
    </div>
  );
}

export default MyPokemonList;
