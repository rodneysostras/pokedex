import { API_ENDPOINT } from '../settings';

export class ApiService {
    constructor(apiEndpoint){
        this.fetch = axios.create({
            baseURL: apiEndpoint,
            timeout: 1000,
        });
    }
    async getPokemonByName(name) {
        return new Promise((resolve, reject) => {
            this.fetch.get(`ability/${name}`).then(({data}) => resolve(data)).catch((error) => reject(error));
        });
    }
}

export default new ApiService(API_ENDPOINT);