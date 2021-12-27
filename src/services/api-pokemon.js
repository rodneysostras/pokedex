import axios from 'axios';

import { API_ENDPOINT } from '../settings';

const DEFAULT_LIMIT = 20;
const DEFAULT_OFFSET = 0;

const POKEMON_TYPES_COLOR = {
    bug: '#8CB230',
    dark: '#58575F',
    dragon: '#0F6AC0',
    electric: '#EED535',
    fairy: '#ED6EC7',
    fighting: '#D04164',
    fire: '#FD7D24',
    flying: '#748FC9',
    ghost: '#556AAE',
    grass: '#62B957',
    ground: '#DD7748',
    ice: '#61CEC0',
    normal: '#9DA0AA',
    poison: '#A552CC',
    psychic: '#EA5D60',
    rock: '#BAAB82',
    steel: '#417D9A',
    water: '#4A90DA',
};

const POKEMON_TYPES_BACKGOUND = {
    bug: '#8BD674',
    dark: '#6F6E78',
    dragon: '#7383B9',
    electric: '#F2CB55',
    fairy: '#EBA8C3',
    fighting: '#EB4971',
    fire: '#FFA756',
    flying: '#83A2E3',
    ghost: '#8571BE',
    grass: '#8BBE8A',
    ground: '#F78551',
    ice: '#91D8DF',
    normal: '#B5B9C4',
    poison: '#9F6E97',
    psychic: '#FF6568',
    rock: '#D4C294',
    steel: '#4C91B2',
    water: '#58ABF6',
};

function formatterID(id) {
    return `${'000'.substr(id.toString().length)}${id}`;
}

function getStyle(type) {
    let icon;

    try {
        icon = require(`@/assets/img/pokemon-types/${type}.svg`);
    } catch (error) {
        icon = require('@/assets/img/interrogation.svg');
    }

    return {
        icon,
        color: POKEMON_TYPES_COLOR[type] || '#000',
        background: POKEMON_TYPES_BACKGOUND[type] || '#fff',
    };
}

export class ApiService {
    constructor(apiEndpoint) {
        this.DEFAULT_OFFSET = DEFAULT_OFFSET;
        this.DEFAULT_LIMIT = DEFAULT_LIMIT;
        this.service = axios.create({
            baseURL: apiEndpoint,
            timeout: 3000,
        });
    }

    async request(endpoint, params) {
        const TREATED_PARAMS = params || {};
        return new Promise((resolve, reject) => {
            this.service
                .get(endpoint, { params: TREATED_PARAMS })
                .then(({ data }) => resolve(data))
                .catch(({ response }) => reject(response));
        });
    }

    getByName(identifier) {
        return this.request(`/pokemon/${identifier}`).then(
            ({ id, name, sprites, height, weight, stats, moves, types, game_indices }) => {
                const image = sprites.other['official-artwork'].front_default || sprites.front_default;
                const { color, background } = getStyle(types[0].type.name);

                return {
                    datasheet: {
                        id,
                        number: formatterID(id),
                        name,
                        image,
                    },
                    aesthetic: {
                        height,
                        weight,
                    },
                    stats,
                    sprites,
                    moves,
                    game_indices,
                    types: types.map((item) => {
                        return { ...getStyle(item.type.name), name: item.type.name };
                    }),
                    style: {
                        color,
                        background,
                    },
                };
            }
        );
    }

    getLazyByType(identifier) {
        return this.request(`/type/${identifier}`).then(({ pokemon }) => {
            return pokemon.map((v) => {
                return { datasheet: { name: v.pokemon.name } };
            });
        });
    }

    getEvolutionList(identifier) {
        function handlerSpecies({ species, evolves_to, evolution_details }) {
            let pokemons = [{ name: species.name, level: 0 }];

            if (evolution_details.length) {
                pokemons[0].level = evolution_details[0].min_level;
            }

            evolves_to.forEach((evolves) => {
                pokemons = pokemons.concat(handlerSpecies(evolves));
            });

            return pokemons;
        }

        return this.request(`/pokemon-species/${identifier}`).then(({ evolution_chain }) => {
            return this.request(evolution_chain.url).then(({ chain }) => {
                const promises = handlerSpecies(chain).map((specie) => {
                    return this.getByName(specie.name).then(({ datasheet }) => {
                        specie['id'] = datasheet.id;
                        specie['number'] = datasheet.number;
                        specie['image'] = datasheet.image;
                        return specie;
                    });
                });

                return Promise.all(promises);
            });
        });
    }

    getPokemonList(offset, limit) {
        const TREATED_PARAMS = {
            limit: limit || this.DEFAULT_LIMIT,
            offset: offset || this.DEFAULT_OFFSET,
        };
        return this.request('/pokemon', TREATED_PARAMS).then(({ results }) => {
            const promises = results.map(({ name }) => this.getByName(name));
            return Promise.all(promises);
        });
    }
}

export default new ApiService(API_ENDPOINT);