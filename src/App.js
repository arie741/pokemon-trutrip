import { BrowserRouter as Router, Routes, Route, Link, NavLink } from "react-router-dom";
import PokemonList from "./components/PokemonList";
import PokemonDetail from "./components/PokemonDetail";
import MyPokemonList from "./components/MyPokemonList";
import MyPokemonDetail from "./components/MyPokemonDetail";
import { close } from "./features/pokemon/catchModalSlice";
import { getList } from "./features/pokemon/pokemonListSlice";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Modal from "react-modal";
import { get, add } from "./features/pokemon/myPokemonListSlice";
import { clear } from "./features/pokemon/catchingResultSlice";
import { v4 as uuidv4 } from "uuid";
import Loader from "react-loader-spinner";
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";

Modal.setAppElement("#root");

function App() {
  const dispatch = useDispatch();
  const modalIsOpen = useSelector((state) => state.catchModal.value);
  const isCatching = useSelector((state) => state.catchingState.value);
  const catchingResult = useSelector((state) => state.catchingResult.value);
  const [nameForm, setNameForm] = useState("");
  const [result, setResult] = useState([]);

  function closeModal() {
    dispatch(close());
  }

  useEffect(() => {
    dispatch(getList(100, 0));
  }, []);

  useEffect(() => {
    if (catchingResult.length !== 0) {
      setResult(catchingResult);
    }
  }, [catchingResult]);

  useEffect(() => {
    dispatch(get());
  }, []);

  function handleSubmit(event) {
    dispatch(add({ api_id: result[1], name: nameForm, id: uuidv4() }));
    dispatch(close());
    dispatch(clear());
    setResult([]);
    event.preventDefault();
  }

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
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        contentLabel="Catch Modal"
        className=""
      >
        <button
          className="btn-close float-end"
          aria-label="Close"
          onClick={closeModal}
        ></button>
        <div className="pt-4">
          <div>
            {isCatching && (
              <div className="pt-3 mx-auto w-fitcontent">
                <Loader
                  type="Circles"
                  color="#00BFFF"
                  height={100}
                  width={100}
                />
                <div className="text-center mt-2">Catching...</div>
              </div>
            )}
          </div>
          <div>
            {!isCatching && result.length !== 0 && (
              <div className="pt-3">
                {result[0] ? (
                  <div>
                    <div className="alert alert-success">
                      Catch attempt successful!
                    </div>
                    <form onSubmit={handleSubmit}>
                      Name your pokemon:
                      <div className="input-group">
                        <input
                          type="text"
                          className="form-control"
                          onChange={(event) => setNameForm(event.target.value)}
                        />
                        <input
                          className="btn btn-primary"
                          type="submit"
                          value="Enter"
                        />
                      </div>
                    </form>
                  </div>
                ) : (
                  <div className="alert alert-danger">
                    Catch attempt failed!
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </Modal>
    </div>
  );
}

export default App;
