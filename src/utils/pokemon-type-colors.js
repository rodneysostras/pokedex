import { POKEMON_TYPE_COLORS, POKEMON_TYPE_BACKGOUNDS } from '@/constants/pokemon-type-colors';

export function getColorTypeByPokemonType(type) {
    return POKEMON_TYPE_COLORS[type.toLowerCase()] || '#000';
}

export function getBackgroundTypeByPokemonType(type) {
    return POKEMON_TYPE_BACKGOUNDS[type.toLowerCase()] || '#fff';
}

export function getColorsTypeByPokemonsType(type) {
    return {
        color: getColorTypeByPokemonType(type),
        background: getBackgroundTypeByPokemonType(type),
    };
}

export default {
    getColorsTypeByPokemonsType,
    getColorTypeByPokemonType,
    getBackgroundTypeByPokemonType,
};
