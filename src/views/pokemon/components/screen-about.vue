<template>
    <Container :title="this.$t('field.about')" layout="about">
        <p>
            {{ $i18n.locale }}
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Cum cupiditate facilis numquam iusto deserunt ut
            maxime tempora cumque sequi repellendus ex accusantium, quo necessitatibus optio nulla error voluptas dolore
            facere!
        </p>
    </Container>
</template>

<script>
import Container from './container';
export default {
    name: 'ScreenAbout',
    components: {
        Container,
    },
};
</script>

<style></style>
