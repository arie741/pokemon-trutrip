import { createSlice } from "@reduxjs/toolkit";

export const myPokemonListSLice = createSlice({
  name: "myPokemonList",
  initialState: {
    value: [],
  },
  reducers: {
    get: (state) => {
      let currentStorage = localStorage.getItem('myPokemonList') ? JSON.parse(localStorage.getItem('myPokemonList')).data : [];
      state.value = currentStorage;
    },
    add: (state, action) => {
      state.value.push(action.payload);
      localStorage.setItem('myPokemonList', JSON.stringify({data: state.value}));
    },
    release: (state, action) => {
      let newState = state.value.filter(item => item.id !== action.payload)
      state.value = newState;
      localStorage.setItem('myPokemonList', JSON.stringify({data: state.value}));
    },
  },
});

// Action creators are generated for each case reducer function
export const { get, add, release } = myPokemonListSLice.actions;

export default myPokemonListSLice.reducer;
