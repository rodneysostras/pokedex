<template>
    <section class="mt-16 --container-pokemon">
        <ul class="flex flex-row items-center justify-evenly gap-2 w-full">
            <li
                class="px-10 font-semibold text-white rounded-2xl capitalize"
                :style="`background-color:${item.color}`"
                :key="item.name"
                v-for="item in this.dataset"
            >
                {{ item.name }}
            </li>
        </ul>
    </section>
</template>

<script>
export default {
    name: 'ScreenTypes',
    props: {
        dataset: {
            type: Array,
            requered: true,
        },
    },
};
</script>

<style></style>
