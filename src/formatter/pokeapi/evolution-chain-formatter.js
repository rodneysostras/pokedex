import extractIdPokemonFromUrlPokeApi from '@/utils/extract-id-pokeapi';
import { threeNumberFormatter } from '@/formatter/number-formatter';
import getImageByPokemonID from '@/utils/pokemon-image';

export function pokeApiEvolutionChainFormatter({ chain }) {
    const handleEvolutionType = (details) => {
        switch (details.trigger.name) {
            case 'level-up':
                if (details.min_level) return { trigger: 'level', condition: details.min_level };
                if (details.min_happiness) return { trigger: 'happy', condition: details.min_happiness };
                if (details.min_affection) return { trigger: 'affection', condition: details.min_affection };
                if (details.item) return { trigger: 'use', condition: details.item.name };
                if (details.known_move) return { trigger: 'use', condition: details.known_move.name };
                if (details.held_item) return { trigger: 'use', condition: details.held_item.name };
                return { trigger: 'trade', condition: '' };
            case 'trade':
                return { trigger: 'trade', condition: details.trade_species?.name || '' };
            case 'use-item':
                return { trigger: 'use', condition: details.item?.name || '' };
            default:
                return { trigger: details.trigger.name, condition: '' };
        }
    };

    const handlerEvolutionChain = ({ species, evolves_to, evolution_details }) => {
        const id = extractIdPokemonFromUrlPokeApi(species.url);

        let pokemons = [
            {
                id,
                number: threeNumberFormatter(id),
                name: species.name,
                image: getImageByPokemonID(id),
                evolution: {},
            },
        ];

        if (evolution_details.length) {
            pokemons[0].evolution = handleEvolutionType(evolution_details[0]);
        }

        evolves_to.forEach((evolves) => {
            pokemons = pokemons.concat(handlerEvolutionChain(evolves));
        });
        return pokemons;
    };

    return handlerEvolutionChain(chain);
}

export default pokeApiEvolutionChainFormatter;
