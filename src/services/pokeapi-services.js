import axios from 'axios';

import { API_ENDPOINT_POKEAPI } from '@/settings';
import { API_DEFAULT_LIMIT, API_DEFAULT_OFFSET, API_TIMEOUT } from '@/constants';

export class PokeApiServices {
    constructor(apiEndpoint) {
        this._limit = API_DEFAULT_LIMIT;
        this._offset = API_DEFAULT_OFFSET;
        this._API = axios.create({
            baseURL: apiEndpoint,
            timeout: API_TIMEOUT,
        });
    }

    getApiPaginationLimit() {
        return this._limit;
    }

    getApiPaginationOffset() {
        return this._offset;
    }

    setApiPaginationLimit(value) {
        this._limit = value;
    }

    setApiPaginationOffset(value) {
        this._offset = value;
    }

    async request(endpoint, params = {}) {
        const TREATED_PARAMS = params || { offset: this._offset, limit: this._limit };
        return new Promise((resolve, reject) => {
            this._API
                .get(endpoint, { params: TREATED_PARAMS })
                .then(({ data }) => resolve(data))
                .catch(({ response }) => reject(response));
        });
    }
    async getPokemonByName(identifier) {
        const response = await this.request(`/pokemon/${identifier}`);
        return response;
    }

    async getPokemonsByType(type) {
        const result = await this.request(`/type/${type}`);
        return result;
    }

    async getPokemonsByTypeInDetail(type) {
        const response = await this.getPokemonsByType(type).then(({ pokemon, ...others }) => {
            const promises = pokemon.map(({ name }) => this.getPokemonByName(name));
            return Promise.all(promises).then((pokemons) => ({ ...others, pokemon: pokemons }));
        });
        return response;
    }

    async getEspeciesByPokemonName(identifier) {
        const response = await this.request(`/pokemon-species/${identifier}`);
        return response;
    }

    async getEvolutionChain(identifier) {
        const response = await this.request(`/evolution-chain/${identifier}`);
        return response;
    }

    async getPokemons(offset, limit) {
        const TREATED_PARAMS = {
            offset: offset || this._offset,
            limit: limit || this._limit,
        };
        const response = await this.request('/pokemon', TREATED_PARAMS);
        return response;
    }

    async getPokemonsInDetail(offset, limit) {
        const response = await this.getPokemons(offset, limit).then(({ results, ...others }) => {
            const promises = results.map(({ name }) => this.getPokemonByName(name));
            return Promise.all(promises).then((pokemons) => ({ ...others, results: pokemons }));
        });
        return response;
    }
}

export default new PokeApiServices(API_ENDPOINT_POKEAPI);
