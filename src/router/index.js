import { createRouter, createWebHistory } from 'vue-router';
import HomeView from '@/views/home';
import PokemonView from '@/views/pokemon';
import SearchView from '@/views/search';

const routes = [
    {
        path: '/',
        name: 'home',
        component: HomeView,
    },
    {
        path: '/pokemon/:identifier',
        name: 'pokemon',
        component: PokemonView,
    },
    {
        path: '/search/:endpoint/:identifier',
        name: 'search',
        component: SearchView,
    },
];

const router = createRouter({
    history: createWebHistory(process.env.BASE_URL),
    routes,
});

export default router;
