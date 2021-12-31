<template>
    <Container :title="this.$t('field.stats')" layout="stats">
        <div class="flex flex-col justify-evenly items-center w-full">
            <slot />
            <div class="flex flex-row items-center w-full" :key="item.stat.name" v-for="item in this.dataset">
                <p class="w-14 pr-2 font-semibold text-right uppercase">{{ this.abbreviateStats(item.stat.name) }}</p>
                <span class="w-12 text-center" style="border-left: 1px solid currentcolor">{{ item.base_stat }}</span>
                <div class="w-full h-2 ml-2 bg-gray-200 rounded-xl overflow-hidden">
                    <div class="h-2 rounded-xl --pokemon-bg" :style="`width: ${(item.base_stat * 100) / 150}%`"></div>
                </div>
            </div>
        </div>
    </Container>
</template>

<script>
import Container from './container';
export default {
    name: 'ScreenStatsPokemon',
    components: {
        Container,
    },
    props: {
        dataset: {
            type: Array,
            requered: true,
        },
    },
    methods: {
        abbreviateStats(stat) {
            const stats_abrv = {
                hp: 'hp',
                attack: 'atk',
                defense: 'dfs',
                'special-attack': 'stk',
                'special-defense': 'sdf',
                speed: 'spd',
            };

            return stats_abrv[stat] || '?';
        },
    },
};
</script>

<style></style>
