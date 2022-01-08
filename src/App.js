import { BrowserRouter as Router, Routes, Route, Link, NavLink } from "react-router-dom";
import PokemonList from "./components/PokemonList";
import PokemonDetail from "./components/PokemonDetail";
import MyPokemonList from "./components/MyPokemonList";
import MyPokemonDetail from "./components/MyPokemonDetail";
import { getList } from "./features/pokemon/pokemonListSlice";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { get } from "./features/pokemon/myPokemonListSlice";
import CatchModal from "./components/CatchModal";

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getList(100, 0));
  }, []);

  useEffect(() => {
    dispatch(get());
  }, []);

  return (
    <div className="App">
      <Router>
        <div>
          <nav className="navbar navbar-expand-lg navbar-light bg-light">
            <div className="container">
              <button
                className="navbar-toggler"
                type="button"
                data-bs-toggle="collapse"
                data-bs-target="#navbarNavDropdown"
                aria-controls="navbarNavDropdown"
                aria-expanded="false"
                aria-label="Toggle navigation"
              >
                <span className="navbar-toggler-icon"></span>
              </button>
              <div className="collapse navbar-collapse" id="navbarNavDropdown">
                <ul className="navbar-nav">
                  <li className="nav-item">
                    <NavLink
                      className="nav-link"
                      to="/"
                    >
                      <b>Pokemon</b>
                    </NavLink>
                  </li>
                  <li className="nav-item">
                    <NavLink className="nav-link" to="/mypokemon">
                      <b>My Pokemon</b>
                    </NavLink>
                  </li>
                </ul>
              </div>
            </div>
          </nav>
          <Routes>
            <Route path="/" exact element={<PokemonList />} />
            <Route path="/pokemon/:id" exact element={<PokemonDetail />} />
            <Route path="/mypokemon" exact element={<MyPokemonList />} />
            <Route path="/mypokemon/:id" exact element={<MyPokemonDetail />} />
          </Routes>
        </div>
      </Router>
      <CatchModal/>
      
    </div>
  );
}

export default App;
