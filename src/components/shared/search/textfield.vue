<template>
    <div class="flex border-2 rounded-xl overflow-hidden">
        <input
            type="text"
            class="flex-1 px-4 py-2"
            :placeholder="$t('field.search')"
            :id="this.id"
            :name="this.name"
            :value="this.value"
        />
        <button type="submit" class="flex items-center justify-center px-4 border-l">
            <svg viewBox="0 0 24 24" class="h-6 w-6 text-yellow-400">
                <use href="@/assets/img/search.svg#svg" width="100%" height="100%" />
            </svg>
        </button>
    </div>
</template>

<script>
export default {
    name: 'SearchTextField',
    props: {
        id: {
            type: String,
            requered: true,
        },
        name: {
            type: String,
            requered: true,
        },
        value: {
            type: String,
            requered: false,
        },
    },
};
</script>

<style></style>
