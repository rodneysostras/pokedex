<template>
    <ul id="pokemon-list" class="flex flex-row flex-wrap justify-center items-center gap-3 px-2">
        <li
            :data-id="`${pokemon.datasheet.id}-${pokemon.datasheet.name}`"
            :key="`${pokemon.datasheet.id}-${pokemon.datasheet.name}`"
            v-for="pokemon in this.onChange"
            class="w-full sm:w-72 h-28"
        >
            <CardPokemon :dataset="pokemon" />
        </li>
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
            promise: undefined,
        };
    },
    methods: {
        onFullScreen() {
            if (this.promise) return;

            const el = document.documentElement;

            const hasScroll = el.scrollHeight > window.innerHeight;
            const bottomOfWindow =
                el.scrollTop + window.innerHeight >= el.offsetHeight - (window.innerHeight * 30) / 100;

            if (!hasScroll || bottomOfWindow) {
                this.promise = Promise.all([this.onChangeHandle()]).then(() => {
                    this.promise = undefined;
                    if (!hasScroll) setTimeout(() => this.onFullScreen(), 2000);
                });
            }
        },
    },
    mounted() {
        window.onscroll = () => this.onFullScreen();
        window.onresize = () => this.onFullScreen();

        this.onFullScreen();
    },
};
</script>

<style></style>
