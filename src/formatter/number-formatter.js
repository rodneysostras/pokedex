export function threeNumberFormatter(value) {
    return `${'000'.substr(value.toString().length)}${value}`;
}

export default {
    threeNumberFormatter,
};
