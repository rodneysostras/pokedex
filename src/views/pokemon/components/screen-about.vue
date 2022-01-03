<template>
    <Container :title="this.$t('field.about')" layout="about">
        <slot />
        <p>{{ this.text }}</p>
    </Container>
</template>

<script>
import Container from './container';

export default {
    name: 'ScreenAbout',
    components: {
        Container
    },
    props: {
        text: {
            type: String,
            requered: true
        }
    }
};
</script>

<style></style>
