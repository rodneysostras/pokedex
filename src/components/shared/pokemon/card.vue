<template>
    <router-link
        :to="`/pokemon/${this.dataset.name}`"
        class="relative inline-block w-full h-full px-3 bg-white shadow-lg rounded-lg overflow-hidden"
    >
        <div class="flex-1 flex flex-col justify-center h-full w-full">
            <h2 class="font-bold text-3xl whitespace-nowrap capitalize" :style="`color: ${this.dataset.style.color}`">
                {{ this.dataset.name }}
            </h2>
            <ul>
                <li class="flex flex-row items-center gap-1">
                    <img :src="this.dataset.types[0].icon" alt="" class="h-4" />
                    <span class="font-semibold text-gray-400 capitalize">{{ this.dataset.types[0].name }}</span>
                </li>
            </ul>
            <span class="text-sm font-semibold text-gray-300">#{{ this.dataset.number }}</span>
        </div>
        <img :src="this.dataset.image" :alt="`'pokemon '${this.dataset.name}`" class="absolute top-0 right-0 h-32" />
    </router-link>
</template>

<script>
export default {
    name: 'CardPokemon',
    props: {
        dataset: {
            type: Object,
            requered: true,
        },
    },
};
</script>

<style></style>
