export function extractIdPokemonFromUrlPokeApi(url) {
    return /\/([\d]+)\//gm.exec(url)[1] || 0;
}

export default extractIdPokemonFromUrlPokeApi;
