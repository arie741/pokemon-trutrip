const axios = require("axios");

async function getPokemonList(limit, offset) {
  try {
    const response = await axios.get(`https://pokeapi.co/api/v2/pokemon?limit=${limit}&offset=${offset}`);
    return response;
  } catch (error) {
    return error;
  }
}

export default getPokemonList;