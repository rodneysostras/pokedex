<template>
    <Container>
        <ScreenTitle>
            <ScreenSearch :onSubmit="this.onSubmitSearch" :value="this.search">
                <SearchFilter :active="this.endpoint" />
            </ScreenSearch>
        </ScreenTitle>
        <section class="flex-1">
            <ListPokemon :onChange="this.pokemons" :onChangeHandle="this.lazyPokemonsDisplay" />
            <LoadingSpinner v-show="this.loading" />
            <BoxError :text="this.error && this.$t(`error.${this.error.status}`)" />
        </section>
    </Container>
</template>

<script>
import ApiPokemon from '@/services/api-pokemon';

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
            this.error = error.status || error;
        },
        onSubmitSearch({ endpoint, identifier }) {
            this.search = identifier;
            this.endpoint = endpoint;

            this.$router.replace(`/search/${endpoint}/${identifier}`);

            this.setPokemons();
        },
        async lazyPokemonsDisplay() {
            if (this.error) return;
            if (!this.lazy.length) return;

            this.loading = true;

            const pokemonDefiner = (pokemon) => (this.pokemons = this.pokemons.concat(pokemon));

            const promise = async () => {
                const END_LIST = this.offset + this.limit;

                this.lazy.slice(this.offset, END_LIST).forEach(({ datasheet }) => {
                    ApiPokemon.getByName(datasheet.name).then(pokemonDefiner);
                });

                this.offset = END_LIST;
                return this.offset > this.lazy.length;
            };

            return promise().then(this.stopLoadingAndContinue).catch(this.stopLoadingAndShowError);
        },
        async setPokemons() {
            this.loading = true;
            this.pokemons = [];
            this.lazy = [];
            this.offset = 0;
            this.limit = ApiPokemon.DEFAULT_LIMIT;
            this.error = undefined;

            const pokemonDefiner = (pokemon) => (this.pokemons = [pokemon]);

            const promise_error = () => new Promise(({ reject }) => reject({ status: '404' }));

            const types_search = {
                all: () => ApiPokemon.getByName(this.search).then(pokemonDefiner),
                id: () => ApiPokemon.getByName(parseInt(this.search) || 0).then(pokemonDefiner),
                pokemon: () => ApiPokemon.getByName(this.search).then(pokemonDefiner),
                type: () => ApiPokemon.getLazyByType(this.search).then((pokemons) => (this.lazy = pokemons)),
            };

            const promise = types_search[this.endpoint] || promise_error;

            return promise()
                .then(this.stopLoadingAndContinue)
                .then(() => this.lazyPokemonsDisplay())
                .catch(this.stopLoadingAndShowError);
        },
    },
    mounted() {
        this.setPokemons();
    },
    created() {
        this.endpoint = this.$route.params.endpoint;
        this.search = this.$route.params.identifier;
    },
};
</script>

<style></style>
