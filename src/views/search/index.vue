<template>
    <Container>
        <ScreenTitle>
            <ScreenSearch :onSubmit="this.onSubmitSearch" :value="this.search">
                <SearchFilter :active="this.endpoint" />
            </ScreenSearch>
        </ScreenTitle>
        <section class="flex-1">
            <ListPokemon :list="this.pokemons" :onChangeHandle="this.showPokemonsLazyMode" />
            <LoadingSpinner v-show="this.loading" />
            <BoxError :text="this.error && this.$t(`error.${this.error.status}`)" />
            <p class="w-full p-8 font-semibold text-center text-gray-400">
                {{ `${this.$t('message.total-pokemons')} ${this.pokemons.length} / ${this.totalPokemons}` }}
            </p>
        </section>
    </Container>
</template>

<script>
import PokeApiServices from '@/services/pokeapi-services';
import ApiParams from '@/constants/api-params';

import Container from '@/components/shared/container';
import SearchFilter from '@/components/shared/search/filter';
import ListPokemon from '@/components/shared/pokemon/list';
import LoadingSpinner from '@/components/shared/loading-spinner';
import BoxError from '@/components/shared/box/error';
import ScreenTitle from '@/components/shared/screen/title';
import ScreenSearch from '@/components/shared/screen/search';

export default {
    name: 'SearchPokemon',
    data() {
        return {
            loading: true,
            pokemons: [],
            lazy: [],
            search: '',
            endpoint: '',
            offset: 0,
            limit: 20,
            error: undefined,
        };
    },
    components: {
        BoxError,
        Container,
        ListPokemon,
        LoadingSpinner,
        SearchFilter,
        ScreenTitle,
        ScreenSearch,
    },
    methods: {
        stopLoadingAndContinue(v) {
            this.loading = false;
            return v;
        },
        stopLoadingAndShowError(error) {
            this.loading = false;
            this.error = error?.status || error;
        },
        onSubmitSearch({ endpoint, identifier }) {
            this.search = identifier;
            this.endpoint = endpoint;

            this.$router.replace(`/search/${endpoint}/${identifier}`);

            this.setPokemons();
        },
        async showPokemonsLazyMode() {
            if (this.error) return;
            if (!this.lazy.length) return;

            this.loading = true;

            const definePokemon = (pokemon) => (this.pokemons = this.pokemons.concat(pokemon));

            const promise = async () => {
                const END_LIST = this.offset + this.limit;

                const pokemonList = this.lazy.slice(this.offset, END_LIST);

                await pokemonList.forEach(async ({ pokemon }) => {
                    await PokeApiServices.getPokemonByName(pokemon.name).then(definePokemon);
                });

                this.offset = END_LIST;
                return this.offset > this.lazy.length;
            };

            return await promise().then(this.stopLoadingAndContinue).catch(this.stopLoadingAndShowError);
        },
        async setPokemons() {
            this.loading = true;
            this.pokemons = [];
            this.lazy = [];
            this.offset = ApiParams.API_DEFAULT_OFFSET;
            this.limit = ApiParams.API_DEFAULT_LIMIT;
            this.error = undefined;

            const pokemonDefiner = (pokemon) => (this.pokemons = [pokemon]);

            const promise_error = () => new Promise(({ reject }) => reject({ status: '404' }));

            const types_search = {
                all: () => PokeApiServices.getPokemonByName(this.search).then(pokemonDefiner),
                id: () => PokeApiServices.getPokemonByName(parseInt(this.search) || 0).then(pokemonDefiner),
                pokemon: () => PokeApiServices.getPokemonByName(this.search).then(pokemonDefiner),
                type: () => PokeApiServices.getPokemonsByType(this.search).then(({ pokemon }) => (this.lazy = pokemon)),
            };

            const promise = types_search[this.endpoint] || promise_error;

            return promise()
                .then(this.stopLoadingAndContinue)
                .then(() => this.showPokemonsLazyMode())
                .catch(this.stopLoadingAndShowError);
        },
    },
    computed: {
        totalPokemons() {
            return this.lazy.length || this.pokemons.length;
        },
    },
    mounted() {
        window.scrollTo(0, 0);

        this.setPokemons();
    },
    created() {
        this.endpoint = this.$route.params.endpoint;
        this.search = this.$route.params.identifier;
    },
};
</script>

<style></style>
