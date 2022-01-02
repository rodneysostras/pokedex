export const API_ENDPOINT_POKEAPI = (process.env.VUE_APP_API_ENDPOINT_POKEAPI || '').trim();

if (!API_ENDPOINT_POKEAPI) throw new Error('Please provide an API_ENDPOINT');
