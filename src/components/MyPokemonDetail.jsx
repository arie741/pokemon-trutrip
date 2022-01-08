import { useParams, useNavigate  } from "react-router-dom";
import { useSelector } from "react-redux";
import getPokemon from "../api/getPokemon";
import { useEffect, useState } from "react";
import { release } from "../features/pokemon/myPokemonListSlice";
import { useDispatch } from "react-redux";

function MyPokemonDetail() {
  let { id } = useParams();
  let dispatch = useDispatch();
  let navigate = useNavigate();
  let myPokemonList = useSelector((state) => state.myPokemonList.value);
  let myPokemon = myPokemonList.find((item) => item.id === id);
  let [apiPokemon, setApiPokemon] = useState();

  useEffect(() => {
    getPokemon(myPokemon.api_id).then((data) => setApiPokemon(data.data));
  }, []);

  function releaseHandle() {
    dispatch(release(myPokemon.id));
    navigate("/myPokemon");
  }

  return (
    <div className="container pt-4">
      <h1 className="text-capitalize">{myPokemon.name}</h1>
      <div className="mb-3 text-capitalize">
      {apiPokemon?.name}
      </div>
      <button className="btn btn-danger" onClick={() => releaseHandle()}>
        Release
      </button>
      <h4 className="mt-5">Types</h4>
      <ul>
        {apiPokemon?.types.map((item, index) => (
          <li key={index}>{item.type.name} </li>
        ))}
      </ul>
      <h4>Moves</h4>
      <ul>
        {apiPokemon?.moves.map((item, index) => (
          <li key={index}>{item.move.name}</li>
        ))}
      </ul>
    </div>
  );
}

export default MyPokemonDetail;
