import { createSlice } from '@reduxjs/toolkit'
import getPokemonList from '../../api/getPokemonList'

export const pokemonListSLice = createSlice({
  name: 'pokemonList',
  initialState: {
    value: [],
  },
  reducers: {
    get: (state, action) => {
      state.value = action.payload
    },
  },
})

// Action creators are generated for each case reducer function
export const { get } = pokemonListSLice.actions

export const getList = (limit, offset) => async (dispatch) => {
    let response = await getPokemonList(limit, offset)
    dispatch(get(response.data.results));
  };

export default pokemonListSLice.reducer