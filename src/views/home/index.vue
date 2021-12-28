<template>
    <Container>
        <ScreenTitle>
            <ScreenSearch :onSubmit="(e) => this.onSubmitSearch(e)">
                <SearchFilter active="all" />
            </ScreenSearch>
        </ScreenTitle>
        <section class="flex-1">
            <ListPokemon :onChange="this.pokemons" :onChangeHandle="this.lazyPokemonsDisplay" />
            <LoadingSpinner v-show="this.loading" />
            <BoxError :text="this.error && this.$t(`error.${this.error.status}`)" />
            <p class="w-full p-8 font-semibold text-center text-gray-400">
                {{ `${this.$t('message.total-pokemons')} ${this.pokemons.length} / ${this.totalPokemons}` }}
            </p>
        </section>
    </Container>
</template>

<script>
import ApiPokemon from '@/services/api-pokemon';

import BoxError from '@/components/shared/box/error';
import Container from '@/components/shared/container';
import ListPokemon from '@/components/shared/pokemon/list';
import LoadingSpinner from '@/components/shared/loading-spinner';
import SearchFilter from '@/components/shared/search/filter';
import ScreenTitle from '@/components/shared/screen/title';
import ScreenSearch from '@/components/shared/screen/search';

export default {
    name: 'Home',
    components: {
        BoxError,
        Container,
        ListPokemon,
        LoadingSpinner,
        SearchFilter,
        ScreenTitle,
        ScreenSearch,
    },
    data() {
        return {
            loading: true,
            pokemons: [],
            totalPokemons: 0,
            offset: 0,
            limit: ApiPokemon.DEFAULT_LIMIT,
            error: undefined,
        };
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
            this.$router.push(`/search/${endpoint}/${identifier}`);
        },
        async lazyPokemonsDisplay() {
            if (this.error) return;

            this.loading = true;

            const promise = () =>
                ApiPokemon.getPokemonList(this.offset, this.limit).then(({ count, pokemons }) => {
                    this.offset += this.limit;
                    this.totalPokemons = count;
                    this.pokemons = this.pokemons.concat(pokemons);
                });

            return promise().then(this.stopLoadingAndContinue).catch(this.stopLoadingAndShowError);
        },
    },
    mounted() {
        window.scrollTo(0, 0);
    },
};
</script>
