<template>
    <header class="flex flex-col items-center justify-start w-full text-white border-curve --pokemon-bg">
        <div class="relative flex flex-col items-center h-60 --container-pokemon">
            <slot />
            <img
                :src="this.dataset.image"
                :alt="this.dataset.name"
                class="absolute h-60 bottom-0"
                style="transform: translateY(25%)"
            />
            <div class="flex flex-row justify-between items-center w-full">
                <h1 class="font-bold text-3xl capitalize">
                    {{ this.dataset.name }}
                </h1>
                <p class="font-semibold">#{{ this.dataset.number }}</p>
            </div>
        </div>
    </header>
</template>

<script>
export default {
    name: 'ScreenHeaderPokemon',
    props: {
        dataset: {
            id: {
                type: Number,
                requered: true,
            },
            name: {
                type: String,
                requered: true,
            },
            image: {
                type: String,
                requered: true,
            },
            style: {
                background: {
                    type: String,
                    requered: false,
                    default: 'var(--pokemon-type-background);',
                },
            },
        },
    },
};
</script>

<style></style>
