<template>
    <Container class="min-h-full w-full styled-pokemon">
        <ScreenHeader :dataset="this.pokemon"><ScreenNav /></ScreenHeader>
        <ScreenTypes :dataset="this.pokemon.types" />
        <ScreenAesthetic :dataset="this.pokemon" />
        <ScreenEvolution :dataset="this.pokemon.evolution" />
        <ScreenStats :dataset="this.pokemon.stats" />
        <BoxError :text="this.error && this.$t(`error.${this.error.status}`)" />
        <LoadingSpinner v-show="this.loading" />
    </Container>
</template>

<script>
import ApiPokemon from '@/services/api-pokemon';

import BoxError from '@/components/shared/box/error';
import Container from '@/components/shared/container';
import LoadingSpinner from '@/components/shared/loading-spinner';
import ScreenAesthetic from './components/screen-aesthetic';
import ScreenEvolution from './components/screen-evolution';
import ScreenHeader from './components/screen-header';
import ScreenNav from './components/screen-nav';
import ScreenTypes from './components/screen-types';
import ScreenStats from './components/screen-stats';

export default {
    name: 'Pokemon',
    components: {
        BoxError,
        ScreenNav,
        Container,
        LoadingSpinner,
        ScreenAesthetic,
        ScreenEvolution,
        ScreenHeader,
        ScreenTypes,
        ScreenStats,
    },
    data() {
        return {
            loading: true,
            error: undefined,
            identifier: '',
            pokemon: {
                id: '0',
                number: '#000',
                name: '',
                image: '',
                species: '',
                height: 0,
                weight: 0,
                stats: [],
                types: [],
                evolution: [],
                style: {
                    color: '#0000001f',
                    background: '#0000001f',
                },
            },
        };
    },
    methods: {
        setPokemon(identifier) {
            this.identifier = identifier;
            Promise.all([this.searchPokemon()])
                .then(() => this.searchEvolution())
                .then(() => (this.loading = false))
                .catch((error) => {
                    this.loading = false;
                    this.error = error.status || error;
                });
        },
        searchPokemon() {
            return ApiPokemon.getByName(this.identifier).then((pokemon) => {
                this.pokemon = pokemon;
            });
        },
        searchEvolution() {
            return ApiPokemon.getEvolutionList(this.pokemon.id).then(
                (evolution) => (this.pokemon.evolution = evolution)
            );
        },
    },
    watch: {
        $route(to) {
            this.setPokemon(to.params.identifier);
        },
    },
    mounted() {
        window.scrollTo(0, 0);

        this.setPokemon(this.$route.params.identifier);
    },
};
</script>

<style>
.styled-pokemon {
    --pokemon-color: v-bind('pokemon.style.color');
    --pokemon-background: v-bind('pokemon.style.background');
}

.--pokemon-color {
    color: var(--pokemon-color);
}

.--pokemon-bg {
    background-color: var(--pokemon-background);
}

.border-curve {
    border-radius: 0% 0% 50% 50% / 0% 0% 20% 20%;
}
</style>
