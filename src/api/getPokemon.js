const axios = require("axios");

async function getPokemon(name) {
  try {
    const response = await axios.get(`https://pokeapi.co/api/v2/pokemon/${name}`);
    return response;
  } catch (error) {
    return error;
  }
}

export default getPokemon;