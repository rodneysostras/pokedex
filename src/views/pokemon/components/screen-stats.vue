<template>
    <section class="flex flex-col items-center justify-center --container-pokemon --pokemon-color">
        <header class="w-full">
            <h2 class="w-full pt-4 pb-2 font-bold text-center text-xl">Base Stats</h2>
        </header>
        <div class="flex flex-col justify-evenly w-full">
            <div class="flex flex-row items-center" :key="item.stat.name" v-for="item in this.dataset">
                <p class="w-12 pr-2 font-semibold text-right uppercase">{{ this.abbreviateStats(item.stat.name) }}</p>
                <span class="w-12 text-center" style="border-left: 1px solid currentcolor">{{ item.base_stat }}</span>
                <div class="w-full h-2 ml-2 bg-gray-200 rounded-xl overflow-hidden">
                    <div class="h-2 rounded-xl --pokemon-bg" :style="`width: ${(item.base_stat * 100) / 150}%`"></div>
                </div>
            </div>
        </div>
    </section>
</template>

<script>
export default {
    name: 'ScreenStatsPokemon',
    props: {
        dataset: {
            type: Object,
            requered: true,
        },
    },
    methods: {
        abbreviateStats(stat) {
            const stats = {
                hp: 'hp',
                attack: 'atk',
                defense: 'dfs',
                'special-attack': 'stk',
                'special-defense': 'sdf',
                speed: 'spd',
            };

            return stats[stat] || '?';
        },
    },
};
</script>

<style></style>
