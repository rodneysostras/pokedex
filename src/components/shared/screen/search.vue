<template>
    <form action="#" autocomplete="off" @submit.prevent="this.onSubmitSearch">
        <SearchTextField id="search" name="search" :value="this.value" />
        <slot />
    </form>
</template>

<script>
import SearchTextField from '@/components/shared/search/textfield';
export default {
    name: 'ScreenSearch',
    props: {
        value: {
            type: String,
            requered: false,
        },
        onSubmit: {
            type: Function,
            requered: true,
        },
    },
    components: {
        SearchTextField,
    },
    methods: {
        onSubmitSearch({ target }) {
            const form = new FormData(target);
            const identifier = form.get('search');
            let endpoint = form.get('type');

            if (endpoint) {
                endpoint = endpoint === 'all' ? 'pokemon' : endpoint;
            } else {
                endpoint = 'pokemon';
            }

            this.onSubmit({ endpoint, identifier });
        },
    },
};
</script>

<style></style>
