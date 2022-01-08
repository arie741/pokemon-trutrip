import { useParams } from "react-router-dom";
import getPokemon from "../api/getPokemon";
import { useEffect, useState } from "react";
import catchPokemon from "../functions/catchPokemon";
import { catching, notCatching } from "../features/pokemon/catchingStateSlice"
import { useDispatch, useSelector } from "react-redux";
import { success, fail, clear } from "../features/pokemon/catchingResultSlice";
import { open } from "../features/pokemon/catchModalSlice";

function PokemonDetail() {
  let { id } = useParams();
  let [pokemon, setPokemon] = useState();
  let isCatching = useSelector((state) => state.catchingState.value);
  let dispatch = useDispatch();

  useEffect(() => {
    getPokemon(id).then((data) => setPokemon(data.data));
  }, []);

  function handleCatch() {
    dispatch(open());
    dispatch(clear())
    dispatch(catching());
  }

  useEffect(() => {
    if (isCatching) {
      setTimeout(() => {
        let catchValue = catchPokemon();
        if(catchValue){
          dispatch(success(id))
        } else {
          dispatch(fail(id))
        }
        dispatch(clear())
        dispatch(notCatching());
      }, 2000);
    }
  }, [isCatching])

  return (
    <div className="container pt-4">
      {pokemon && (
        <div>
          <h1 className="text-capitalize mb-3">{pokemon.name}</h1>
          <button className="btn btn-success" onClick={() => handleCatch()}>
            Catch
          </button>
          <h4 className="mt-5">Types</h4>
          <ul>
            {pokemon.types.map((item, index) => (
              <li key={index}>{item.type.name} </li>
            ))}
          </ul>
          <h4>Moves</h4>
          <ul>
            {pokemon.moves.map((item, index) => (
              <li key={index}>{item.move.name}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

export default PokemonDetail;
