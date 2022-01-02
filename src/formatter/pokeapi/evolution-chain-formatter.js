import extractIdPokemonFromUrlPokeApi from '@/utils/extract-id-pokeapi';
import { threeNumberFormatter } from '@/formatter/number-formatter';
import getImageByPokemonID from '@/utils/pokemon-image';

export function pokeApiEvolutionChainFormatter({ chain }) {
    const handleEvolutionType = (details) => {
        switch (details.trigger.name) {
            case 'level-up':
                return ['Level', details.min_level];
            case 'trade':
                return ['Trade', details.trade_species?.name || ''];
            case 'use-item':
                return ['Use', details.item.name];
            default:
                return [details.trigger.name, null];
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
            const [trigger, condition] = handleEvolutionType(evolution_details[0]);
            pokemons[0].evolution = { trigger, condition };
        }

        evolves_to.forEach((evolves) => {
            pokemons = pokemons.concat(handlerEvolutionChain(evolves));
        });

        return pokemons;
    };

    return handlerEvolutionChain(chain);
}

export default pokeApiEvolutionChainFormatter;
