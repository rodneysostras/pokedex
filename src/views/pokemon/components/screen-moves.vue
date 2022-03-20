<template>
    <Container title="Moves" layout="move">
        <ul class="relative flex flex-row justify-between flex-wrap pb-6">
            <li
                class="w-1/2 font-semibold text-center capitalize"
                :key="`${idx}-${item.move.name}`"
                v-for="(item, idx) in this.movesSimples"
            >
                {{ item.move.name }}
            </li>
            <li class="absolute bottom-0 h-12 w-full pt-5 text-center text-white rounded-b-xl show-more">
                <button type="button" class="font-bold uppercase" @click="this.onDisplayModal(true)">show more</button>
            </li>
        </ul>
        <div class="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full" v-show="this.modal">
            <div class="relative sm:top-20 w-full sm:w-3/4 mx-auto pt-5 border shadow-lg rounded-md bg-white">
                <h3 class="font-bold text-lg text-center leading-6 uppercase">Moves</h3>
                <div class="mt-2 px-2 py-3">
                    <ul class="relative flex flex-row justify-center flex-wrap pb-6">
                        <li
                            class="w-1/2 sm:w-52 p-1 font-semibold text-center capitalize"
                            :key="`${idx}-${item.move.name}`"
                            v-for="(item, idx) in this.movesFull"
                        >
                            <span class="inline-block w-full p-1 bg-gray-100">{{ item.move.name }}</span>
                        </li>
                    </ul>
                </div>
                <div class="flex items-center px-4 py-3">
                    <button
                        id="ok-btn"
                        class="w-full sm:w-96 mx-auto px-4 py-2 font-medium text-white text-base rounded-md shadow-sm --pokemon-bg"
                        @click="this.onDisplayModal(false)"
                    >
                        OK
                    </button>
                </div>
            </div>
        </div>
    </Container>
</template>

<script>
import Container from './container';
export default {
    name: 'ScreenMove',
    components: {
        Container,
    },
    props: {
        dataset: {
            type: Array,
            requered: false,
        },
    },
    data() {
        return {
            modal: false,
        };
    },
    methods: {
        onDisplayModal(value) {
            this.modal = value;
        },
    },
    computed: {
        movesSimples() {
            const list = [...this.dataset];
            return this.dataset.length ? list.splice(0, 6) : [];
        },
        movesFull() {
            return this.dataset;
        },
    },
};
</script>

<style>
.show-more {
    background: linear-gradient(to top, var(--pokemon-color) 0%, var(--pokemon-color) 60%, rgba(96, 165, 250, 0) 100%);
}
</style>
