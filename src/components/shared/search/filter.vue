<template>
    <ul class="flex flex-row justify-center max-w-xl w-auto mx-auto font-semibold text-gray-400">
        <li>
            <input type="radio" id="all" name="type" value="all" v-model="this.actived" class="hidden" />
            <router-link
                to="/"
                :class="['inline-block p-4 cursor-pointer capitalize', { 'text-yellow-400': actived === 'all' }]"
                @click="() => (this.actived = 'all')"
                >{{ this.$t('field.all') }}</router-link
            >
        </li>
        <li :key="idx" v-for="(item, idx) in filter">
            <input
                type="radio"
                :id="item.value"
                name="type"
                :value="item.value"
                v-model="this.actived"
                class="hidden peer"
            />
            <label :for="item.value" class="inline-block p-4 cursor-pointer capitalize">
                {{ item.text }}
            </label>
        </li>
    </ul>
</template>

<script>
export default {
    name: 'SearchFilter',
    props: {
        active: {
            type: String,
            requered: false,
        },
    },
    data() {
        return {
            actived: '',
            filter: [
                { text: this.$t('field.pokemon'), value: 'pokemon' },
                { text: this.$t('field.id'), value: 'id' },
                { text: this.$t('field.type'), value: 'type' },
                // { text: this.$t('field.species'), value: 'species' },
            ],
        };
    },
    mounted() {
        this.actived = this.active;
    },
};
</script>

<style>
.peer:checked + label {
    @apply text-yellow-400;
}
</style>
