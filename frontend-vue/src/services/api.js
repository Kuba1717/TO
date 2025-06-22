import axios from 'axios'
import { useAuthStore } from '../store/auth'
import router from "../router/index.js"

const api = axios.create({
    baseURL: 'http://localhost:8080',
    headers: {
        'Content-Type': 'application/json'
    }
})

api.interceptors.request.use(
    config => {
        const authStore = useAuthStore()
        if (authStore.accessToken) {
            config.headers.Authorization = `Bearer ${authStore.accessToken}`
        }
        return config
    },
    error => Promise.reject(error)
)

api.interceptors.response.use(
    response => response,
    async error => {
        const originalRequest = error.config

        if (error.response?.status === 401 && !originalRequest._retry) {
            originalRequest._retry = true

            try {
                const authStore = useAuthStore()
                const refreshResponse = await authStore.refreshToken()
                originalRequest.headers.Authorization = `Bearer ${refreshResponse.accessToken}`
                return api(originalRequest)
            } catch (refreshError) {
                const authStore = useAuthStore()
                authStore.clearAuth()
                await router.push('/login')
                return Promise.reject(refreshError)
            }
        }

        return Promise.reject(error)
    }
)

export default api
