<template>
    <router-view />
    <Footer />
</template>

<script>
import Footer from './components/layout/Footer.vue';
export default {
    name: 'App',
    components: {
        Footer,
    },
};
</script>

<style></style>
