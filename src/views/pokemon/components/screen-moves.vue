<template>
    <Container title="Moves" layout="move">
        <ul class="relative flex flex-row justify-between flex-wrap pb-6">
            <li class="w-1/2 text-center">Lorem ipsum dolor</li>
            <li class="w-1/2 text-center">Lorem ipsum dolor</li>
            <li class="w-1/2 text-center">Lorem ipsum dolor</li>
            <li class="w-1/2 text-center">Lorem ipsum dolor</li>
            <li class="w-1/2 text-center">Lorem ipsum dolor</li>
            <li class="w-1/2 text-center">Lorem ipsum dolor</li>
            <li class="absolute bottom-0 h-12 w-full font-bold text-center text-white rounded-b-xl show-more uppercase">
                show more
            </li>
        </ul>
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
};
</script>

<style>
.show-more {
    line-height: 3rem;
    background: linear-gradient(to top, var(--pokemon-color) 0%, var(--pokemon-color) 60%, rgba(96, 165, 250, 0) 100%);
}
</style>
