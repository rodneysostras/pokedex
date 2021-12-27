<template>
    <span class="m-1 w-0.5 rounded" :style="`background-color: ${this.color}; opacity: 0.55;`" />
</template>

<script>
export default {
    name: 'VerticalDivider',
    props: {
        color: {
            type: String,
            requered: false,
            default: 'var(--pokemon-color);',
        },
    },
};
</script>

<style></style>
