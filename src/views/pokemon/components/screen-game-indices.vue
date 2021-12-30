<template>
    <Container :title="this.$t('field.game-present')">
        <slot />
        <ul class="flex flex-row items-center justify-center flex-wrap gap-2 w-full text-white">
            <li
                :class="`flex flex-row items-center p-1 rounded-md shadow-md ${item.version.name}`"
                :key="item.version.name"
                v-for="item in this.dataset"
            >
                <svg viewBox="0 0 24 24" class="h-6 w-6 opacity-30">
                    <use href="@/assets/img/pokeball.svg#svg" fill="#fff" width="100%" height="100%" />
                </svg>
                <span class="px-1 font-semibold text-sm uppercase">
                    {{ item.version.name }}
                </span>
            </li>
            <p class="text-sm text-gray-400" v-show="!this.dataset.length">
                {{ this.$t(`message.not-game-present`) }}
            </p>
        </ul>
    </Container>
</template>

<script>
import Container from './container';

export default {
    name: 'ScreenGameIndices',
    components: {
        Container,
    },
    props: {
        dataset: {
            type: Array,
            requered: true,
        },
    },
    data() {
        return {
            pokeballsvg: require('@/assets/img/pokeball.svg'),
        };
    },
};
</script>

<style>
.red {
    background-color: #ff574d;
}

.blue {
    background-color: #61cdff;
}
.yellow {
    background-color: #f7df69;
}

.gold {
    background-color: #e7bd42;
}

.silver {
    background-color: #b5b5bd;
}

.crystal {
    background-color: #d1ebea;
}

.ruby {
    background-color: #e71837;
}
.sapphire {
    background-color: #297bc1;
}

.emerald {
    background-color: #006d5f;
}

.firered {
    background-color: #f86f29;
}

.leafgreen {
    background-color: #49b675;
}

.diamond {
    background-color: #dddcdc;
}

.pearl {
    background-color: #d1d2dc;
}

.platinum {
    background-color: #b8b7b2;
}

.heartgold {
    background-color: #e4c64a;
}

.soulsilver {
    background-color: #e3e5e4;
}

.black {
    background-color: #2d2d2d;
}

.black-2 {
    background-color: #404046;
}

.white {
    color: #4e5155;
    background-color: #f5f1e4;
}

.white-2 {
    color: #4e5155;
    background-color: #f3f0e6;
}

.omega-ruby {
    background-color: #d22d46;
}

.alpha-sapphire {
    background-color: #1a5897;
}
</style>
