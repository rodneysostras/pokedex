<template>
    <Container :title="this.$t('field.evolution')" layout="evolution">
        <div class="flex flex-row justify-center w-full overflow-hidden overflow-x-auto whitespace-nowrap">
            <slot />
            <template :key="`image-${item.name}`" v-for="item in this.dataset">
                <div class="flex flex-col items-center justify-center text-xs leading-3" v-if="item.level !== 0">
                    <div class="flex flex-col justify-center items-center h-16">
                        <span>{{ item.level === null ? 'Trade' : 'Level' }}</span>
                        <p>{{ item.level }}</p>
                    </div>
                    <VerticalDivider class="flex-1" />
                </div>
                <router-link :to="`/pokemon/${item.name}`" class="flex flex-col justify-center items-center">
                    <img :src="item.image" :alt="`pokemon ${item.name}`" class="h-16 mx-2" />
                    <span class="font-bold text-lg capitalize">{{ item.name }}</span>
                    <p class="text-sm text-gray-400">#{{ item.number }}</p>
                </router-link>
            </template>
        </div>
    </Container>
</template>

<script>
import Container from './container';
import VerticalDivider from './vertical-divider';

export default {
    name: 'ScreenEvolutionPokemon',
    components: {
        Container,
        VerticalDivider,
    },
    props: {
        dataset: {
            type: Array,
            requered: true,
        },
    },
};
</script>

<style></style>
