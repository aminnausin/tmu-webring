import { createRouter, createWebHistory, type NavigationGuardNext, type RouteLocationNormalizedGeneric } from 'vue-router';

import HomeView from '@/views/HomeView.vue';
import nProgress from 'nprogress';

interface RouteMeta {
    title?: string;
    protected?: boolean;
    redirect?: string;
    guestOnly?: boolean;
}

export const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        {
            path: '/',
            name: 'home',
            component: HomeView,
        },
        {
            path: '/login',
            name: 'login',
            component: () => import('@/views/LoginView.vue'),
            meta: { guestOnly: true },
        },
        {
            path: '/recovery',
            name: 'recovery',
            component: () => import('@/views/RecoveryView.vue'),
            meta: { guestOnly: true },
        },
        {
            path: '/register',
            name: 'register',
            component: () => import('@/views/RegisterView.vue'),
            meta: { guestOnly: true },
        },
        {
            path: '/reset-password/:token',
            name: 'reset-password',
            component: () => import('@/views/ResetPasswordView.vue'),
            meta: { guestOnly: true },
        },
        {
            path: '/admin',
            name: 'admin',
            component: () => import('@/views/MapView.vue'),
            meta: { protected: true },
        },
        {
            path: '/map',
            name: 'map',
            // route level code-splitting
            // this generates a separate chunk (About.[hash].js) for this route
            // which is lazy-loaded when the route is visited.
            component: () => import('@/views/MapView.vue'),
        },
    ],
});

const redirectAfterLogin = async (to: RouteLocationNormalizedGeneric, next: NavigationGuardNext, meta: RouteMeta) => {
    // const authStore = useAuthStore();

    // if (await authStore.fetchUser()) {
    // Logged in -> user and page is protected
    // next();
    // return;
    // }

    // Not logged in -> no user and page is protected

    // If a redirect is specified and no user is present, don't prompt login
    if (meta.redirect) {
        return next({ path: meta.redirect });
    }

    // Otherwise prompt login
    next({
        name: 'login',
        query: {
            redirect: to.fullPath,
        },
    });
};

router.beforeEach(async (to, from, next) => {
    const meta = to.meta as RouteMeta;

    nProgress.start();

    // // If going to a route that isnt included in the list, set the page title to the route title
    if (to?.name && ['logout', 'root', 'home'].indexOf(to.name.toString()) === -1) {
        document.title = meta.title ?? to.name?.toString(); // Update Page Title
    }

    // // Block logged in users if the route is guest-only
    // if (to.meta.guestOnly) {
    //     return redirectGuest(next);
    // }

    // If going to 'login' and no redirect was specified, but the previous path had a value, navigate to login with a redirect to the previous page
    if (to.name === 'login' && !to.query.redirect && from.fullPath !== '/') {
        return next({
            name: 'login',
            query: { redirect: from.fullPath },
        });
    }

    const isProtected = to.matched.some((r) => r.meta?.protected);

    // Proceed to next route if unprotected
    if (!isProtected) {
        return next();
    }

    // If the route is protected, check auth
    return redirectAfterLogin(to, next, meta);
});

router.afterEach((to) => {
    nProgress.done(true);

    // // Scroll to top on every spa page load
    // if (to?.name === 'home') return;

    // const root = document.getElementById('root');
    // root?.scrollIntoView();
});

export default router;
