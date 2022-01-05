import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import PokemonList from "./components/PokemonList";
import PokemonDetail from "./components/PokemonDetail";
import MyPokemonList from "./components/MyPokemonList";
import { getList } from "./features/pokemon/pokemonListSlice";
import { useEffect } from "react";
import { useDispatch } from "react-redux";

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getList(100, 0));
  }, []);

  return (
    <div className="App">
      <Router>
        <div>
          <nav>
            <ul>
              <li>
                <Link to="/">Pokemon List</Link>
              </li>
              <li>
                <Link to="/mypokemon">My Pokemon</Link>
              </li>
            </ul>
          </nav>
          <Routes>
            <Route path="/" exact element={<PokemonList />} />
            <Route path="/pokemon/:id" exact element={<PokemonDetail />} />
            <Route path="/mypokemon" exact element={<MyPokemonList />} />
          </Routes>
        </div>
      </Router>
    </div>
  );
}

export default App;
