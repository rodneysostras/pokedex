export function pokeApiAllSpritesFormatter(sprites) {
    let result = [];

    const handlerSprites = (obj, prefix = '') => {
        Object.entries(obj).forEach(([key, value]) => {
            if (typeof value === 'object' && value !== null) {
                handlerSprites(value, `${key}_`);
            } else if (value !== null) {
                result.push({ name: `${prefix}${key}`, value });
            }
        });
    };

    handlerSprites(sprites);

    return result;
}

export default pokeApiAllSpritesFormatter;
