<template>
    <Container class="min-h-full w-full styled-pokemon">
        <ScreenHeader :dataset="this.pokemon"><ScreenNav /></ScreenHeader>
        <ScreenTypes :dataset="this.types" />
        <ScreenAesthetic :dataset="this.aesthetic" />
        <div class="grid-layout">
            <ScreenEvolution :dataset="this.evolutions">
                <p class="text-sm text-gray-400" v-show="this.error_evolutions">
                    {{ this.$t(`message.not-there-evolution`) }}
                </p>
                <LoadingPokeball v-show="!this.evolutions_chain && !this.error_evolutions" />
            </ScreenEvolution>
            <ScreenStats :dataset="this.stats">
                <LoadingPokeball v-show="!this.stats.length" />
            </ScreenStats>
            <ScreenAbout />
            <ScreenGameIndices :dataset="this.game_indices">
                <LoadingPokeball v-show="this.loading" />
            </ScreenGameIndices>
            <ScreenSprites :dataset="this.sprites" />
            <ScreenMoves />
        </div>
        <BoxError :text="this.error && this.$t(`error.${this.error.status}`)" />
        <LoadingSpinner v-show="this.loading" />
    </Container>
</template>

<script>
import ApiPokemon from '@/services/api-pokemon';

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
            error: undefined,
            error_evolutions: undefined,
            pokemon: {},
            evolutions_chain: {},
        };
    },
    methods: {
        setEvolutions() {
            return this.pokemon
                .getEvolutions()
                .then((e) => (this.evolutions_chain = e))
                .catch(() => (this.error_evolutions = true));
        },
        setPokemon(identifier) {
            return ApiPokemon.getByName(identifier).then((p) => (this.pokemon = p));
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

            return this.evolutions_chain.genus
                ? { species: this.evolutions_chain.genus, height, weight }
                : { species: '-', height: height || 0, weight: weight || 0 };
        },
        evolutions() {
            return this.evolutions_chain.chain || [];
        },
        stats() {
            return this.pokemon.stats || [];
        },
        game_indices() {
            return this.pokemon.game_indices || [];
        },
        sprites() {
            return this.pokemon.sprites || [];
        },
        color() {
            return this.pokemon.style ? this.pokemon.style.color : '#fff';
        },
        background() {
            console.log(this.pokemon);
            return this.pokemon.style ? this.pokemon.style.background : '#0000001f';
        },
    },
    mounted() {
        window.scrollTo(0, 0);

        const identifier = this.$route.params.identifier;

        this.setPokemon(identifier)
            .then(() => this.setEvolutions())
            .then(() => (this.loading = false))
            .catch((error) => {
                this.loading = false;
                this.error = error.status || error;
                console.log('error:', error);
            });
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
    grid:
        'evolution'
        'stats'
        'about'
        'sprites'
        'moves'
        'games';
}
.grid-layout-about {
    grid-area: about;
}
.grid-layout-evolution {
    grid-area: evolution;
}
.grid-layout-sprites {
    grid-area: sprites;
}
.grid-layout-games {
    grid-area: games;
}
.grid-layout-stats {
    grid-area: stats;
}
.grid-layout-moves {
    grid-area: moves;
}
</style>
