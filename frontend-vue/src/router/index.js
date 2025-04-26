import { createRouter, createWebHistory } from 'vue-router'
import { useAuthStore } from '../store/auth'

const routes = [
    { path: '/', redirect: '/login' },
    {
        path: '/login',
        component: () => import('../pages/Login/Login.vue'),
        meta: { requiresAuth: false }
    },
    {
        path: '/register',
        component: () => import('../pages/Register/Register.vue'),
        meta: { requiresAuth: false }
    },
    {
        path: '/main',
        component: () => import('../pages/Main/Main.vue'),
        meta: { requiresAuth: false }
    },
    {
        path: '/home',
        component: () => import('../pages/Home/Home.vue'),
        meta: { requiresAuth: true }
    },
    {
        path: '/admin',
        component: () => import('../pages/Admin/Admin.vue'),
        meta: { requiresAuth: true, roles: ['ADMIN'] }
    },
    {
        path: '/manager',
        component: () => import('../pages/Manager/Manager.vue'),
        meta: { requiresAuth: true, roles: ['STORE_MANAGER'] }
    },
    { path: '/:pathMatch(.*)*', redirect: '/login' }
]

const router = createRouter({
    history: createWebHistory(),
    routes
})

router.beforeEach((to, from, next) => {
    const authStore = useAuthStore()
    const isAuthenticated = authStore.isAuthenticated
    const requiresAuth = to.matched.some(record => record.meta.requiresAuth)
    const requiredRoles = to.meta.roles

    if (requiresAuth) {
        if (!isAuthenticated) {
            next('/login')
        } else if (requiredRoles && !requiredRoles.some(role => authStore.hasRole(role))) {
            next('/home')
        } else {
            next()
        }
    } else {
        if (isAuthenticated && (to.path === '/login' || to.path === '/register')) {
            next('/home')
        } else {
            next()
        }
    }
})

export default router
