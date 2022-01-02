<template>
    <Container :title="this.$t('field.sprites')" layout="sprites">
        <div class="w-full">
            <template :key="item.name" v-for="(item, idx) in this.dataset">
                <input
                    type="radio"
                    name="slides"
                    :id="`slide-${idx}`"
                    :value="`slide-${idx}`"
                    class="peer hidden"
                    :checked="idx === 0"
                />
                <div class="relative h-32 w-full select-none fade">
                    <div class="absolute top-0 left-0">{{ `${idx + 1} / ${this.datasize}` }}</div>
                    <img :src="item.value" alt="" class="max-h-20 h-full mx-auto" />
                    <span class="absolute bottom-2 w-full font-semibold text-sm text-center uppercase">{{
                        this.formatterText(item.name)
                    }}</span>
                    <label class="absolute top-1/3 left-0 text-3xl cursor-pointer" :for="`slide-${idx - 1}`"
                        >&#10094;</label
                    >
                    <label class="absolute top-1/3 right-0 text-3xl cursor-pointer" :for="`slide-${idx + 1}`"
                        >&#10095;</label
                    >
                </div>
            </template>
        </div>
    </Container>
</template>

<script>
import Container from './container';
export default {
    name: 'ScreenSprites',
    components: {
        Container,
    },
    props: {
        dataset: {
            type: Array,
            requered: true,
        },
    },
    computed: {
        datasize() {
            return this.dataset.length;
        },
    },
    methods: {
        formatterText(txt) {
            return txt.replaceAll('_', ' ');
        },
    },
};
</script>

<style>
.peer + div {
    display: none;
}

.peer:checked + div {
    display: block;
}

.fade {
    -webkit-animation-name: fade;
    -webkit-animation-duration: 1.5s;
    animation-name: fade;
    animation-duration: 1.5s;
}

@-webkit-keyframes fade {
    from {
        opacity: 0.4;
    }
    to {
        opacity: 1;
    }
}

@keyframes fade {
    from {
        opacity: 0.4;
    }
    to {
        opacity: 1;
    }
}
</style>
