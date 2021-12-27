<template>
    <div class="flex items-center justify-center p-8">
        <div
            class="flex flex-row items-center justify-center gap-3 h-12 px-7 py-2 rounded-xl"
            :style="`background-color: ${this.color}`"
        >
            <div class="animate-spin rounded-full h-6 w-6 border-b-2 border-white"></div>
            <span class="font-bold text-white">{{ this.text || this.default_text }}</span>
        </div>
    </div>
</template>

<script>
export default {
    name: 'BoxLoadingSpinner',
    props: {
        color: {
            type: String,
            requered: false,
            default: '#60a5fa',
        },
        text: {
            type: String,
            requered: false,
            default: undefined,
        },
    },
    data() {
        return {
            default_text: this.$t('message.loading'),
        };
    },
};
</script>

<style></style>
