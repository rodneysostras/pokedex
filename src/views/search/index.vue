<template>
    <Container>
        <ScreenTitle>
            <ScreenSearch :onSubmit="this.onSubmitSearch" :value="this.search">
                <SearchFilter :active="this.endpoint" />
            </ScreenSearch>
        </ScreenTitle>
        <section class="flex-1">
            <ListPokemon :onChange="this.pokemons" :onChangeHandle="this.lazyPokemons" />
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
        loadPromises(promise) {
            Promise.all(promise)
                .then(() => setTimeout(() => (this.loading = false), 2000))
                .catch(({ status }) => {
                    this.loading = false;
                    this.error = { status };
                });
        },
        onSubmitSearch({ endpoint, identifier }) {
            this.search = identifier;
            this.endpoint = endpoint;

            this.$router.replace(`/search/${endpoint}/${identifier}`);

            this.loadPromises([this.setPokemons()]);
        },
        setPokemons() {
            this.loading = true;
            this.pokemons = [];
            this.error = undefined;

            const fn = (pokemon) => {
                this.pokemons = [pokemon];
            };

            const promise_error = () => new Promise(({ reject }) => reject({ status: '404' }));

            const types_search = {
                all: () => ApiPokemon.getByName(this.search).then(fn),
                id: () => ApiPokemon.getByName(parseInt(this.search) || 0).then(fn),
                pokemon: () => ApiPokemon.getByName(this.search).then(fn),
                type: () =>
                    ApiPokemon.getLazyByType(this.search).then((pokemons) => {
                        this.offset = 0;
                        this.limit =
                            pokemons.length > ApiPokemon.DEFAULT_LIMIT ? ApiPokemon.DEFAULT_LIMIT : pokemons.length;
                        this.lazy = pokemons;
                    }),
            };

            const promise = types_search[this.endpoint] || promise_error;

            this.loadPromises([promise()]);
        },
        lazyPokemons() {
            if (this.error) return;

            this.loading = true;

            const fn = (pokemon) => {
                this.pokemons = this.pokemons.concat(pokemon);
            };

            const promise = () => {
                const END_LIST = this.offset + this.limit;

                this.lazy.slice(this.offset, END_LIST).forEach(({ datasheet }) => {
                    ApiPokemon.getByName(datasheet.name).then(fn);
                });

                this.offset = END_LIST;
            };

            this.loadPromises([promise()]);
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
