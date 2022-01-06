import { configureStore } from "@reduxjs/toolkit";
import pokemonListReducer from "../features/pokemon/pokemonListSlice";
import myPokemonListReducer from "../features/pokemon/myPokemonListSlice";
import catchModalReducer from "../features/pokemon/catchModalSlice";
import catchingStateReducer from "../features/pokemon/catchingStateSlice";
import catchingResultReducer from "../features/pokemon/catchingResultSlice";
import thunk from 'redux-thunk';

export default configureStore({
  reducer: {
    pokemonList: pokemonListReducer,
    myPokemonList: myPokemonListReducer,
    catchModal: catchModalReducer,
    catchingState: catchingStateReducer,
    catchingResult: catchingResultReducer
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(thunk),
});
