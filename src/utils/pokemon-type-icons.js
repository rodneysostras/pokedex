import { POKEMON_TYPE_ICONS, POKEMON_TYPE_UNDEFINED } from '@/constants/pokemon-type-icons';

export function getIconTypeByPokemonType(type) {
    return POKEMON_TYPE_ICONS[type] || POKEMON_TYPE_UNDEFINED;
}

export default {
    getIconTypeByPokemonType,
};
