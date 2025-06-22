import { createRouter, createWebHistory } from 'vue-router'
import { useAuthStore } from '../store/auth'
import { watch } from 'vue'

const routes = [
    { path: '/', redirect: '/main', name: 'RootRedirect' },
    {
        path: '/login',
        name: 'Login',
        component: () => import('../pages/Login/Login.vue'),
        meta: { requiresAuth: false, guest: true }
    },
    {
        path: '/register',
        name: 'Register',
        component: () => import('../pages/Register/Register.vue'),
        meta: { requiresAuth: false, guest: true }
    },
    {
        path: '/main',
        name: 'Main',
        component: () => import('../pages/Main/Main.vue'),
        meta: { requiresAuth: false }
    },
    {
        path: '/home',
        name: 'Home',
        component: () => import('../pages/Home/Home.vue'),
        meta: { requiresAuth: true }
    },
    {
        path: '/book/:id',
        name: 'Book',
        component: () => import('../pages/Book/Book.vue'),
        meta: { requiresAuth: true }
    },
    {
        path: '/offer/:id',
        name: 'Offer',
        component: () => import('../pages/Offer/Offer.vue'),
        meta: { requiresAuth: false }
    },
    {
        path: '/profile',
        name: 'Profile',
        component: () => import('../pages/Profile/Profile.vue'),
        meta: { requiresAuth: true }
    },
    {
        path: '/history',
        name: 'History',
        component: () => import('../pages/History/History.vue'),
        meta: { requiresAuth: true }
    },
    {
        path: '/success/:id',
        name: 'Success',
        component: () => import('../pages/Success/Success.vue'),
        meta: { requiresAuth: true }
    },
    {
        path: '/addOffer',
        name: 'AddOffer',
        component: () => import('../pages/AddOffer/AddOffer.vue'),
        meta: { requiresAuth: true }
    },
    {
        path: '/unauthorized',
        name: 'Unauthorized',
        component: () => import('../components/Router/Unauthorized.vue'),
        meta: { requiresAuth: false }
    },
    {
        path: '/admin',
        name: 'Admin',
        component: () => import('../pages/Admin/Admin.vue'),
        meta: { requiresAuth: true, roles: ['ADMIN'] }
    },
    {
        path: '/manager',
        name: 'Manager',
        component: () => import('../pages/Manager/Manager.vue'),
        meta: { requiresAuth: true, roles: ['STORE_MANAGER'] }
    },
    {
        path: '/:pathMatch(.*)*',
        name: 'NotFound',
        component: () => import('../components/Router/NotFound.vue'),
        meta: { requiresAuth: false }
    }
]

const router = createRouter({
    history: createWebHistory(),
    routes
})

let authWatcher = null

router.beforeEach((to, from, next) => {
    const authStore = useAuthStore()
    const isAuthenticated = authStore.isAuthenticated

    if (to.meta.requiresAuth && !isAuthenticated) {
        return next({ name: 'Login' })
    }

    if (to.meta.guest && isAuthenticated) {
        return next({ name: 'Main' })
    }

    if (to.meta.roles && to.meta.roles.length > 0) {
        const hasRequiredRole = to.meta.roles.some(role => authStore.hasRole(role))
        if (!hasRequiredRole) {
            return next({ name: 'Unauthorized' })
        }
    }

    next()
})

router.afterEach((to) => {
    const authStore = useAuthStore()

    if (authWatcher) {
        authWatcher()
    }

    if (to.meta.requiresAuth) {
        authWatcher = watch(
            () => authStore.isAuthenticated,
            (isAuthenticated) => {
                if (!isAuthenticated) {
                    router.push({ name: 'Login' })
                }
            },
            { immediate: false }
        )
    }
})

export default router
