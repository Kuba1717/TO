<template>
  <div>
    <div class="login-container">
      <p class="hello-word">Witaj!</p>
      <p class="login-word">Zaloguj się</p>

      <div v-if="error" style="color: red; margin-bottom: 10px;">{{ error }}</div>

      <p class="email-word">E-mail</p>
      <input
          class="email-input-data"
          type="email"
          v-model="email"
      />

      <p class="email-word">Hasło</p>
      <input
          class="password-input-data"
          type="password"
          v-model="password"
      />

      <button
          class="login-button"
          @click="handleLogin"
          :disabled="loading"
      >
        {{ loading ? 'Logowanie...' : 'Zaloguj' }}
      </button>

      <button
          class="nav-register-button"
          @click="navigateToRegister"
      >
        Nie masz konta? Zarejestruj się
      </button>
    </div>
  </div>
</template>

<script>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '../../store/auth'
import './Login.css'

export default {
  name: 'Login',
  setup() {
    const router = useRouter()
    const authStore = useAuthStore()

    const email = ref('')
    const password = ref('')
    const error = ref('')
    const loading = ref(false)

    const handleLogin = async () => {
      if (!email.value || !password.value) {
        error.value = 'Proszę wypełnić wszystkie pola'
        return
      }

      loading.value = true
      try {
        await authStore.login(email.value, password.value)
      } catch (err) {
        error.value = err.response?.data?.message || 'Błąd logowania'
      } finally {
        loading.value = false
      }
    }

    const navigateToRegister = () => {
      router.push('/register')
    }

    return {
      email,
      password,
      error,
      loading,
      handleLogin,
      navigateToRegister
    }
  }
}
</script>
