<template>
  <div>
    <h1>Strona Główna (chroniona)</h1>
    <div v-if="user">
      <p>Zalogowany jako: {{ user.email }}</p>
      <p>Role: {{ userRoles.join(', ') }}</p>

      <div v-if="hasAdminRole">
        <button @click="navigateToAdmin">Panel Administratora</button>
      </div>

      <div v-if="hasManagerRole">
        <button @click="navigateToManager">Panel Managera</button>
      </div>
    </div>
    <button @click="handleLogout" :disabled="loading">
      {{ loading ? 'Wylogowywanie...' : 'Wyloguj się' }}
    </button>
  </div>
</template>

<script>
import { computed, ref } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '../../store/auth'

export default {
  name: 'Home',
  setup() {
    const router = useRouter()
    const authStore = useAuthStore()
    const loading = ref(false)

    const user = computed(() => authStore.user)
    const userRoles = computed(() => authStore.userRoles)
    const hasAdminRole = computed(() => authStore.hasRole('ADMIN'))
    const hasManagerRole = computed(() => authStore.hasRole('STORE_MANAGER'))

    const handleLogout = async () => {
      loading.value = true
      try {
        await authStore.logout()
      } finally {
        loading.value = false
      }
    }

    const navigateToAdmin = () => {
      router.push('/admin')
    }

    const navigateToManager = () => {
      router.push('/manager')
    }

    return {
      user,
      userRoles,
      hasAdminRole,
      hasManagerRole,
      loading,
      handleLogout,
      navigateToAdmin,
      navigateToManager
    }
  }
}
</script>
