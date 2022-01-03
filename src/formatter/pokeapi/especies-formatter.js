import extractIdFromUrlPokeApi from '@/utils/extract-id-pokeapi';

export function pokeApiEspeciesFormatter({
    form_descriptions,
    flavor_text_entries,
    genera,
    evolution_chain,
    ...others
}) {
    const flavor_text =
        flavor_text_entries
            .filter((item) => item.language.name === 'en')
            .map((item) => item.flavor_text.replace('\n', ''))[0] || null;
    const description =
        form_descriptions
            .filter((item) => item.language.name === 'en')
            .map((item) => item.description.replace('\n', ''))[0] || null;
    const genus =
        genera
            .filter((item) => item.language.name === 'en')
            .map((item) => item.genus.replace('Pokémon', '').trim())[0] || '-';

    const evolution_chain_id = extractIdFromUrlPokeApi(evolution_chain.url);

    return { ...others, description: description || flavor_text, genus, evolution_chain_id };
}

export default pokeApiEspeciesFormatter;
