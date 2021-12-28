<template>
    <ul id="pokemon-list" class="relative flex flex-row flex-wrap justify-center items-center w-full gap-3 px-2">
        <li
            :data-index-number="idx"
            :data-id="`${pokemon.datasheet.id}-${pokemon.datasheet.name}`"
            :key="`${pokemon.datasheet.id}-${pokemon.datasheet.name}`"
            v-for="(pokemon, idx) in this.onChange"
            class="w-full sm:w-72 h-28"
        >
            <CardPokemon :dataset="pokemon" />
        </li>
        <li class="absolute w-full bottom-20" id="--end-list--"></li>
    </ul>
</template>

<script>
import CardPokemon from '@/components/shared/pokemon/card';
export default {
    name: 'ListPokemon',
    components: {
        CardPokemon,
    },
    props: {
        onChange: {
            type: Array,
            requered: true,
        },
        onChangeHandle: {
            type: Function,
            required: false,
        },
    },
    data() {
        return {
            observer: undefined,
            finished: undefined,
        };
    },
    mounted() {
        const obs = document.getElementById('--end-list--');

        const exitViewportObs = () => {
            if (this.finished) return;

            const bounding = obs.getBoundingClientRect();

            if (window.innerHeight > bounding.bottom) {
                this.finished = Promise.all([this.onChangeHandle()])
                    .then((v) => (this.finished = v[0]))
                    .then(() => setTimeout(() => exitViewportObs(), 1500));
            }
        };

        window.onresize = () => exitViewportObs();

        if (true === 'IntersectionObserver' in window) {
            this.observer = new IntersectionObserver(() => exitViewportObs());
            this.observer.observe(obs);
        } else {
            // unsupported browsers 'IntersectionObserver'
            window.onscroll = () => exitViewportObs();
            exitViewportObs();
        }
    },
};
</script>

<style></style>
