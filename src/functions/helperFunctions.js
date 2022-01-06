export function parseId(url){
    var id = url.replace('https://pokeapi.co/api/v2/pokemon/', '')
    return id.replace('/', ''); 
}