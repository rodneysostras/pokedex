<template>
    <section class="flex flex-col items-center justify-center --container-pokemon --pokemon-color">
        <header class="w-full" v-if="this.title">
            <h2 class="w-full pt-4 pb-2 font-bold text-center text-xl capitalize">{{ this.title }}</h2>
        </header>
        <slot />
    </section>
</template>

<script>
export default {
    name: 'ContainerPokemon',
    props: {
        title: {
            type: String,
            requered: false,
        },
    },
};
</script>

<style></style>
