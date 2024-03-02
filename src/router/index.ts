import {createRouter, createWebHistory} from "vue-router";

const routes = [
    {path: '/', redirect: '/hello'},
    {
        path: '/hello',
        name: '/hello',
        component: () => import("../components/HelloWorld.vue")
    }
]

const router = createRouter({
    history: createWebHistory(),
    routes
});

export default router;
