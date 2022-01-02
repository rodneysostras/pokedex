<template>
    <Container>
        <ScreenTitle>
            <ScreenSearch :onSubmit="(e) => this.onSubmitSearch(e)">
                <SearchFilter active="all" />
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
            offset: ApiParams.API_DEFAULT_OFFSET,
            limit: ApiParams.API_DEFAULT_LIMIT,
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
        async showPokemonsLazyMode() {
            if (this.error) return;

            this.loading = true;

            return await PokeApiServices.getPokemonsInDetail(this.offset, this.limit)
                .then(({ count, results }) => {
                    this.offset += this.limit;
                    this.totalPokemons = count;
                    this.pokemons = this.pokemons.concat(results);
                })
                .then(this.stopLoadingAndContinue)
                .catch(this.stopLoadingAndShowError);
        },
    },
    mounted() {
        window.scrollTo(0, 0);
    },
};
</script>
