<script setup>
import { computed } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '../../store/auth'
import './Home.css'

const router = useRouter()
const authStore = useAuthStore()

const user = computed(() => authStore.user)
const userRoles = computed(() => authStore.userRoles)
const hasAdminRole = computed(() => authStore.hasRole('ADMIN'))
const hasManagerRole = computed(() => authStore.hasRole('STORE_MANAGER'))

const handleLogout = async () => {
  await authStore.logout()
}

const handleMainClick = () => {
  router.push('/main')
}

const navigateToAdmin = () => {
  router.push('/admin')
}

const navigateToManager = () => {
  router.push('/manager')
}
</script>

<template>
  <div class="home-container">
    <h1>Witaj, {{ user?.email }}!</h1>

    <div class="user-info" v-if="user">
      <h2>Informacje o użytkowniku</h2>
      <p><strong>Email:</strong> {{ user.email }}</p>
      <p><strong>Role:</strong> {{ userRoles.join(', ') || 'Brak ról' }}</p>

      <div v-if="hasAdminRole">
        <button @click="navigateToAdmin">Panel Administratora</button>
      </div>

      <div v-if="hasManagerRole">
        <button @click="navigateToManager">Panel Managera</button>
      </div>
    </div>

    <button class="logout-button" @click="handleLogout">
      Wyloguj
    </button>
    <button class="logout-button" @click="handleMainClick">
      Main
    </button>
  </div>
</template>
