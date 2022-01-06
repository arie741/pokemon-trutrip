import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
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
import { clear } from "./features/pokemon/catchingResultSlice"
import { v4 as uuidv4 } from 'uuid';

Modal.setAppElement("#root");

function App() {
  const dispatch = useDispatch();
  const modalIsOpen = useSelector((state) => state.catchModal.value);
  const isCatching = useSelector((state) => state.catchingState.value);
  const catchingResult = useSelector((state) => state.catchingResult.value);
  const [nameForm, setNameForm] = useState('');
  const [result, setResult] = useState([]);

  function closeModal() {
    dispatch(close());
  }

  useEffect(() => {
    dispatch(getList(100, 0));
  }, []);

  useEffect(() => {
    if (catchingResult.length != 0) {
      setResult(catchingResult);
    }
  }, [catchingResult]);

  useEffect(() => {
    dispatch(get())
  }, [])

  function handleSubmit(event) {
    dispatch(add({api_id: result[1], name: nameForm, id: uuidv4()}))
    dispatch(close())
    dispatch(clear())
    setResult([])
    event.preventDefault();
  }

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
            <Route path="/mypokemon/:id" exact element={<MyPokemonDetail />} />
          </Routes>
        </div>
      </Router>
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        contentLabel="Catch Modal"
      >
        <button onClick={closeModal}>close</button>
        <div>{isCatching ? "catching..." : "not catching..."}</div>
        <div>
          {(!isCatching && result.length != 0) && (
            <div>
              {result[0] ? (
                <div>
                  Success!
                  <form onSubmit={handleSubmit}>
                    Name your pokemon:
                    <input type="text" onChange={(event) => setNameForm(event.target.value)}/>
                    <input type="submit" value="Enter" />
                  </form>
                </div>
              ) : (
                "Fail!"
              )}
            </div>
          )}
        </div>
      </Modal>
    </div>
  );
}

export default App;
