import { defineStore } from 'pinia'
import axios from 'axios'
import router from '../router'

const apiClient = axios.create({
    baseURL: 'http://localhost:8080',
    headers: {
        'Content-Type': 'application/json'
    }
})

export const useAuthStore = defineStore('auth', {
    state: () => ({
        user: JSON.parse(localStorage.getItem('user')) || null,
        accessToken: localStorage.getItem('accessToken') || null,
        refreshToken: localStorage.getItem('refreshToken') || null,
        loading: false,
        error: null
    }),

    getters: {
        isAuthenticated: (state) => {
            if (!state.accessToken || !state.user) return false

            try {
                const payload = state.accessToken.split('.')[1]
                const decoded = JSON.parse(atob(payload))
                const currentTime = Math.floor(Date.now() / 1000)

                if (decoded.exp < currentTime) {
                    return false
                }

                return true
            } catch (error) {
                return false
            }
        },
        userRoles: (state) => state.user?.roles || []
    },

    actions: {
        async register(username, email, password) {
            this.loading = true
            this.error = null

            try {
                const response = await apiClient.post('/api/auth/register', {
                    username,
                    email,
                    password
                })

                router.push('/login')
                return response.data
            } catch (error) {
                this.error = error.response?.data?.message || 'Registration failed'
                throw error
            } finally {
                this.loading = false
            }
        },

        async login(email, password) {
            this.loading = true
            this.error = null

            try {
                const response = await apiClient.post('/api/auth/login', {
                    email,
                    password
                })

                this.accessToken = response.data.accessToken
                this.refreshToken = response.data.refreshToken

                localStorage.setItem('accessToken', this.accessToken)
                localStorage.setItem('refreshToken', this.refreshToken)

                await this.getUserInfo()

                await router.push('/main')
            } catch (error) {
                this.error = error.response?.data?.message || 'Login failed'
                throw error
            } finally {
                this.loading = false
            }
        },

        async logout() {
            try {
                if (this.refreshToken) {
                    await apiClient.post('/api/auth/logout', {
                        email: this.user?.email,
                        accessToken: this.accessToken,
                        refreshToken: this.refreshToken
                    }, {
                        headers: {
                            Authorization: `Bearer ${this.accessToken}`
                        }
                    })
                }
            } catch (error) {
                console.error('Logout error:', error)
            } finally {
                this.clearAuth()
                await router.push('/main')
            }
        },

        async refreshToken() {
            try {
                const response = await apiClient.post('/api/auth/refresh', {
                    refreshToken: this.refreshToken
                })

                this.accessToken = response.data.accessToken
                this.refreshToken = response.data.refreshToken

                localStorage.setItem('accessToken', this.accessToken)
                localStorage.setItem('refreshToken', this.refreshToken)

                await this.getUserInfo()

                return response.data
            } catch (error) {
                this.clearAuth()
                throw error
            }
        },

        getUserInfo() {
            if (!this.accessToken) return null

            try {
                const payload = this.accessToken.split('.')[1]
                const decoded = JSON.parse(atob(payload))

                this.user = {
                    email: decoded.sub,
                    roles: decoded.roles || [],
                    exp: decoded.exp
                }

                localStorage.setItem('user', JSON.stringify(this.user))
            } catch (error) {
                console.error('Error decoding token:', error)
                this.clearAuth()
            }
        },

        clearAuth() {
            this.user = null
            this.accessToken = null
            this.refreshToken = null

            localStorage.removeItem('user')
            localStorage.removeItem('accessToken')
            localStorage.removeItem('refreshToken')
        },

        hasRole(role) {
            return this.userRoles.includes(role)
        },

        checkTokenExpiration() {
            if (!this.isAuthenticated) {
                this.clearAuth()
            }
        }
    }
})
