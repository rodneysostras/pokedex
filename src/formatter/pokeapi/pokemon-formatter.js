import { getColorsTypeByPokemonsType } from '@/utils/pokemon-type-colors';
import { getIconTypeByPokemonType } from '@/utils/pokemon-type-icons';
import { threeNumberFormatter } from '@/formatter/number-formatter';

import { pokeApiAllSpritesFormatter } from './all-sprites-formatter';

export function pokeApiPokemonFormatter(pokemon) {
    const { id, name, sprites, height, weight, stats, moves, types, game_indices } = pokemon;

    const image = sprites.other['official-artwork'].front_default || sprites.front_default;
    const { color, background } = getColorsTypeByPokemonsType(types[0].type.name);

    return {
        id,
        number: threeNumberFormatter(id),
        name,
        image,
        height,
        weight,
        stats,
        sprites: pokeApiAllSpritesFormatter(sprites),
        moves,
        game_indices,
        types: types.map(({ type }) => ({
            color,
            background,
            name: type.name,
            icon: getIconTypeByPokemonType(type.name),
        })),
        style: { color, background },
    };
}

export default pokeApiPokemonFormatter;
