import { getColorsTypeByPokemonsType } from '@/utils/pokemon-type-colors';
import { getIconTypeByPokemonType } from '@/utils/pokemon-type-icons';
import { threeNumberFormatter } from '@/formatter/number-formatter';
import getImageByPokemonID from '@/utils/pokemon-image';

import { pokeApiAllSpritesFormatter } from './all-sprites-formatter';

export function pokeApiPokemonFormatter({ id, sprites, types, ...others }) {
    return {
        ...others,
        id,
        number: threeNumberFormatter(id),
        image: getImageByPokemonID(id),
        sprites: pokeApiAllSpritesFormatter(sprites),
        types: types.map(({ type }) => ({
            name: type.name,
            icon: getIconTypeByPokemonType(type.name),
            ...getColorsTypeByPokemonsType(type.name),
        })),
        style: getColorsTypeByPokemonsType(types[0].type.name),
    };
}

export default pokeApiPokemonFormatter;
