<template>
    <div class="flex items-center justify-center p-8" v-show="this.text">
        <div class="flex flex-row items-center justify-center gap-3 h-12 px-7 py-2 rounded-xl bg-blue-400">
            <svg class="h-8 w-12">
                <use href="@/assets/img/not.svg#svg" />
            </svg>
            <span class="font-bold text-white">{{ this.text }}</span>
        </div>
    </div>
</template>

<script>
export default {
    name: 'BoxError',
    props: {
        text: {
            type: String,
            requered: false,
        },
    },
};
</script>

<style></style>
