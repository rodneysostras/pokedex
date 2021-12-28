<template>
    <ul id="pokemon-list" class="relative flex flex-row flex-wrap justify-center items-center w-full gap-3 px-2">
        <li
            :data-id="idx"
            :key="`${pokemon.id}-${pokemon.name}`"
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
    watch: {
        onChange: {
            handler() {
                this.finished = undefined;
            },
        },
    },
    mounted() {
        const obs = document.getElementById('--end-list--');

        const exitViewportObs = () => {
            if (this.finished) return;

            const bounding = obs.getBoundingClientRect();

            if (window.innerHeight > bounding.bottom) {
                this.finished = this.onChangeHandle().then((v) => {
                    this.finished = v;
                    setTimeout(() => exitViewportObs(), 1500);
                });
            }
        };

        window.onresize = () => exitViewportObs();

        if (true === 'IntersectionObserver' in window) {
            const observer = new IntersectionObserver(() => exitViewportObs());
            observer.observe(obs);
        } else {
            // unsupported browsers 'IntersectionObserver'
            window.onscroll = () => exitViewportObs();
            exitViewportObs();
        }
    },
};
</script>

<style></style>
