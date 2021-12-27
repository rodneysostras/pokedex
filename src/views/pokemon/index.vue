<template>
    <Container class="min-h-full w-full styled-pokemon">
        <ScreenHeader :dataset="this.datasheet"><ScreenNav /></ScreenHeader>
        <ScreenTypes :dataset="this.types" />
        <ScreenAesthetic :dataset="this.aesthetic" />
        <ScreenEvolution :dataset="this.evolution" />
        <ScreenStats :dataset="this.stats" />
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
            datasheet: {
                id: '0',
                number: '#000',
                name: '',
                image: '',
            },
            aesthetic: {
                species: '',
                height: 0,
                weight: 0,
            },
            stats: [],
            types: [],
            evolution: [],
            style: {
                color: '#0000001f',
                background: '#0000001f',
            },
        };
    },
    methods: {
        setPokemon(identifier) {
            this.identifier = identifier;
            Promise.all([this.searchPokemon()])
                .then(() => this.searchEvolution())
                .then(() => (this.loading = false))
                .catch(({ status }) => {
                    this.loading = false;
                    this.error = { status };
                });
        },
        searchPokemon() {
            return ApiPokemon.getByName(this.identifier).then(({ datasheet, aesthetic, stats, types, style }) => {
                this.datasheet = datasheet;
                this.aesthetic = aesthetic;
                this.stats = stats;
                this.types = types;
                this.style = style;
            });
        },
        searchEvolution() {
            return ApiPokemon.getEvolutionList(this.datasheet.id).then((evolution) => (this.evolution = evolution));
        },
    },
    watch: {
        $route(to) {
            this.setPokemon(to.params.identifier);
        },
    },
    mounted() {
        this.setPokemon(this.$route.params.identifier);
    },
};
</script>

<style>
.styled-pokemon {
    --pokemon-color: v-bind('style.color');
    --pokemon-background: v-bind('style.background');
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
