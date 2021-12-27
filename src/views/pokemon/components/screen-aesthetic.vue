<template>
    <section class="flex flex-row justify-around py-4 --container-pokemon --pokemon-color">
        <div class="text-center">
            <p class="font-bold text-lg">Shadow</p>
            <h3 class="text-sm text-gray-400">species</h3>
        </div>
        <VerticalDivider />
        <div class="text-center">
            <p class="font-bold text-lg">{{ this.dataset.height }}</p>
            <h3 class="text-sm text-gray-400">Height</h3>
        </div>
        <VerticalDivider />
        <div class="text-center">
            <p class="font-bold text-lg">{{ this.weightFormat }} lbs</p>
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
            height: {
                type: Number,
                requered: true,
            },
            weight: {
                type: Number,
                requered: true,
            },
        },
    },
    components: {
        VerticalDivider,
    },
    computed: {
        weightFormat() {
            return (this.dataset.weight / 4.5359237).toPrecision(3);
        },
    },
};
</script>

<style></style>
