import Loader from "react-loader-spinner";
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
import Modal from "react-modal";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { close } from "../features/pokemon/catchModalSlice";
import { clear } from "../features/pokemon/catchingResultSlice";
import { add } from "../features/pokemon/myPokemonListSlice";
import { v4 as uuidv4 } from "uuid";

if (process.env.NODE_ENV !== 'test') Modal.setAppElement("#root");

function CatchModal() {
  const dispatch = useDispatch();
  const catchingResult = useSelector((state) => state.catchingResult.value);
  const [nameForm, setNameForm] = useState("");
  const [result, setResult] = useState([]);
  const modalIsOpen = useSelector((state) => state.catchModal.value);
  const isCatching = useSelector((state) => state.catchingState.value);

  function closeModal() {
    dispatch(close());
  }

  useEffect(() => {
    if (catchingResult.length !== 0) {
      setResult(catchingResult);
    }
  }, [catchingResult]);

  function handleSubmit(event) {
    dispatch(add({ api_id: result[1], name: nameForm, id: uuidv4() }));
    dispatch(close());
    dispatch(clear());
    setResult([]);
    event.preventDefault();
  }
  return (
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
              <Loader type="Circles" color="#00BFFF" height={100} width={100} />
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
                <div className="alert alert-danger">Catch attempt failed!</div>
              )}
            </div>
          )}
        </div>
      </div>
    </Modal>
  );
}

export default CatchModal;
