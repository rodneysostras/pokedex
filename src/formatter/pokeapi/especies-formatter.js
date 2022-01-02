import extractIdFromUrlPokeApi from '@/utils/extract-id-pokeapi';

export function pokeApiEspeciesFormatter({ id, name, form_descriptions, genera, habitat, varieties, evolution_chain }) {
    const description =
        form_descriptions.filter((item) => item.language.name === 'en').map((item) => item.description)[0] || '';
    const genus =
        genera
            .filter((item) => item.language.name === 'en')
            .map((item) => item.genus.replace('Pokémon', '').trim())[0] || '-';

    const evolution_chain_id = extractIdFromUrlPokeApi(evolution_chain.url);

    return { id, name, description, genus, habitat: habitat.name, varieties, evolution_chain_id };
}

export default pokeApiEspeciesFormatter;
