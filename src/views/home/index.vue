<template>
    <Container>
        <ScreenTitle>
            <ScreenSearch :onSubmit="(e) => this.onSubmitSearch(e)">
                <SearchFilter active="all" />
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
            offset: 0,
            limit: ApiPokemon.DEFAULT_LIMIT,
            error: undefined,
        };
    },
    methods: {
        onSubmitSearch({ endpoint, identifier }) {
            this.$router.push(`/search/${endpoint}/${identifier}`);
        },
        lazyPokemons() {
            if (this.error) return;

            this.loading = true;

            const promise = ApiPokemon.getPokemonList(this.offset, this.limit).then((pokemons) => {
                this.offset += this.limit;
                this.pokemons = this.pokemons.concat(pokemons);
            });

            return Promise.all([promise])
                .then((v) => {
                    setTimeout(() => (this.loading = false), 2000);
                    return v[0];
                })
                .catch(({ status }) => {
                    this.loading = false;
                    this.error = { status };
                });
        },
    },
};
</script>
