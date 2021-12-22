export const API_ENDPOINT = (process.env.VUE_APP_API_ENDPOINT || '').trim();

if (!API_ENDPOINT) throw new Error('Please provide an API_ENDPOINT');
