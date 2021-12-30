<template>
    <section class="flex flex-row justify-around py-4 --container-pokemon --pokemon-color">
        <div class="text-center">
            <p class="h-7 font-bold text-lg">{{ this.dataset.species }}</p>
            <h3 class="text-sm text-gray-400">species</h3>
        </div>
        <VerticalDivider />
        <div class="text-center">
            <p class="h-7 font-bold text-lg">
                {{ this.heightFormat }}<span class="text-sm text-gray-400 pl-1">m</span>
            </p>
            <h3 class="text-sm text-gray-400">Height</h3>
        </div>
        <VerticalDivider />
        <div class="text-center">
            <p class="h-7 font-bold text-lg">
                {{ this.weightFormat }}<span class="text-sm text-gray-400 pl-1">kg</span>
            </p>
            <h3 class="text-sm text-gray-400">Weight</h3>
        </div>
    </section>
</template>

<script>
import VerticalDivider from './vertical-divider';
export default {
    name: 'ScreenAesthicPokemon',
    props: {
        dataset: {
            species: {
                type: String,
                requered: true,
                default: '-',
            },
            height: {
                type: Number,
                requered: true,
                default: 0,
            },
            weight: {
                type: Number,
                requered: true,
                default: 0,
            },
        },
    },
    components: {
        VerticalDivider,
    },
    computed: {
        weightFormat() {
            // hectograms to kilograms
            return (this.dataset.weight * 0.1).toFixed(1);
        },
        heightFormat() {
            // decimetres to metre
            return (this.dataset.height * 0.1).toFixed(2);
        },
    },
};
</script>

<style></style>
