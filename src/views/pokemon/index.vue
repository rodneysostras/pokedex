<template>
    <Container class="min-h-full w-full styled-pokemon">
        <ScreenHeader :dataset="this.pokemon"><ScreenNav /></ScreenHeader>
        <ScreenTypes :dataset="this.types" />
        <ScreenAesthetic :dataset="this.aesthetic" />
        <div class="grid-layout">
            <ScreenEvolution :dataset="this.pokemon_evolution">
                <p class="text-sm text-gray-400" v-show="this.error_pokemon_evolution">
                    {{ this.$t(`message.not-there-evolution`) }}
                </p>
                <LoadingPokeball v-show="!this.pokemon_evolution.length && !this.error_pokemon_evolution" />
            </ScreenEvolution>
            <ScreenStats :dataset="this.stats">
                <LoadingPokeball v-show="!this.stats.length" />
            </ScreenStats>
            <ScreenAbout :text="this.about">
                <LoadingPokeball v-show="!this.pokemon_species.description" />
            </ScreenAbout>
            <ScreenGameIndices :dataset="this.game_indices">
                <LoadingPokeball v-show="this.loading && !this.game_indices.length" />
            </ScreenGameIndices>
            <ScreenSprites :dataset="this.sprites">
                <LoadingPokeball v-show="this.loading && !this.sprites.length" />
            </ScreenSprites>
            <ScreenMoves :dataset="this.moves" />
        </div>
        <BoxError :text="this.error_pokemon && this.$t(`error.${this.error_pokemon.status}`)" />
        <LoadingSpinner v-show="this.loading" />
    </Container>
</template>

<script>
import PokeApiServices from '@/services/pokeapi-services';
import { pokeApiPokemonFormatter, pokeApiEvolutionChainFormatter, pokeApiEspeciesFormatter } from '@/formatter/pokeapi';

import BoxError from '@/components/shared/box/error';
import Container from '@/components/shared/container';
import LoadingSpinner from '@/components/shared/loading-spinner';
import LoadingPokeball from '@/components/shared/loading/pokeball';
import ScreenAbout from './components/screen-about';
import ScreenAesthetic from './components/screen-aesthetic';
import ScreenEvolution from './components/screen-evolution';
import ScreenGameIndices from './components/screen-game-indices';
import ScreenHeader from './components/screen-header';
import ScreenMoves from './components/screen-moves';
import ScreenNav from './components/screen-nav';
import ScreenSprites from './components/screen-sprites';
import ScreenTypes from './components/screen-types';
import ScreenStats from './components/screen-stats';

export default {
    name: 'Pokemon',
    components: {
        BoxError,
        Container,
        LoadingSpinner,
        LoadingPokeball,
        ScreenAbout,
        ScreenAesthetic,
        ScreenEvolution,
        ScreenGameIndices,
        ScreenHeader,
        ScreenMoves,
        ScreenNav,
        ScreenSprites,
        ScreenTypes,
        ScreenStats,
    },
    data() {
        return {
            loading: true,
            error_pokemon: undefined,
            error_pokemon_evolution: undefined,
            pokemon: {},
            pokemon_evolution: [],
            pokemon_species: {},
        };
    },
    methods: {
        async setPokemon(identifier) {
            return await PokeApiServices.getPokemonByName(identifier)
                .then((p) => (this.pokemon = pokeApiPokemonFormatter(p)))
                .catch((err) => {
                    this.loading = false;
                    this.error_pokemon = err?.status || err;
                });
        },
        async setPokemonSpecies() {
            return await PokeApiServices.getEspeciesByPokemonName(this.pokemon.id)
                .then((e) => (this.pokemon_species = pokeApiEspeciesFormatter(e)))
                .catch((err) => (this.error_pokemon = err?.status || err));
        },
        async setPokemonEvolution() {
            return await PokeApiServices.getEvolutionChain(this.pokemon_species.evolution_chain_id)
                .then((e) => (this.pokemon_evolution = pokeApiEvolutionChainFormatter(e)))
                .catch((err) => (this.error_pokemon_evolution = err?.status || err));
        },
    },
    watch: {
        $route(to) {
            if (to.params.identifier) {
                this.setPokemon(to.params.identifier);
            }
        },
    },
    computed: {
        types() {
            return this.pokemon.types || [];
        },
        aesthetic() {
            const { height, weight } = this.pokemon;

            return this.pokemon_species.genus
                ? { species: this.pokemon_species.genus, height, weight }
                : { species: '-', height: height || 0, weight: weight || 0 };
        },
        stats() {
            return this.pokemon.stats || [];
        },
        game_indices() {
            return this.pokemon.game_indices || [];
        },
        about() {
            return this.pokemon_species.description || '';
        },
        sprites() {
            return this.pokemon.sprites || [];
        },
        moves() {
            return this.pokemon.moves || [];
        },
        color() {
            return this.pokemon.style ? this.pokemon.style.color : '#fff';
        },
        background() {
            return this.pokemon.style ? this.pokemon.style.background : '#0000001f';
        },
    },
    mounted() {
        window.scrollTo(0, 0);

        const identifier = this.$route.params.identifier;

        this.setPokemon(identifier)
            .then(() => this.setPokemonSpecies())
            .then(() => this.setPokemonEvolution())
            .then(() => (this.loading = false));
    },
};
</script>

<style>
.styled-pokemon {
    --pokemon-color: v-bind('color');
    --pokemon-background: v-bind('background');
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

.grid-layout {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(384px, 1fr));
    gap: 1rem;
    width: 100%;
}

@media screen and (min-width: 764px) {
    .grid-layout-about {
        order: 1;
    }
    .grid-layout-evolution {
        order: 2;
    }
    .grid-layout-stats {
        order: 3;
    }
    .grid-layout-move {
        order: 4;
    }
    .grid-layout-sprites {
        order: 5;
    }
    .grid-layout-game {
        order: 6;
    }
}
</style>
