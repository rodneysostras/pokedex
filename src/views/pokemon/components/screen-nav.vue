<template>
    <nav class="flex flex-row justify-between items-center w-full pt-2">
        <router-link to="/" class="flex flex-row justify-center items-center">
            <svg viewBox="0 0 24 24" class="h-6 w-6">
                <use href="@/assets/img/chevron-left.svg#svg" width="100%" height="100%" />
            </svg>
            <span>Pokédex</span>
        </router-link>
        <div class="flex flex-row justify-center items-center">
            <svg viewBox="0 0 24 24" class="h-6 w-6 hover:text-yellow-400">
                <use href="@/assets/img/star.svg#svg" width="100%" height="100%" />
            </svg>
        </div>
    </nav>
</template>

<script>
export default {
    name: 'ScreenNavPokemon',
};
</script>

<style></style>
