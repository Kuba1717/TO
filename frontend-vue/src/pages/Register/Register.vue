<template>
  <div>
    <div class="register-container">
      <p class="join-word">Dołącz!</p>
      <p class="register-word">Zarejestruj się</p>

      <div v-if="error" style="color: red; margin-bottom: 10px;">{{ error }}</div>

      <p class="email-word">Nazwa użytkownika</p>
      <input
          class="email-input-data"
          type="text"
          v-model="username"
      />

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

      <p class="email-word">Powtórz hasło</p>
      <input
          class="repeat-password-input-data"
          type="password"
          v-model="confirmPassword"
      />

      <button
          class="register-button"
          @click="handleRegister"
          :disabled="loading"
      >
        {{ loading ? 'Rejestracja...' : 'Zarejestruj' }}
      </button>

      <button
          class="nav-register-button"
          @click="navigateToLogin"
      >
        Masz już konto? Zaloguj się
      </button>
    </div>
  </div>
</template>

<script>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '../../store/auth'
import './Register.css'

export default {
  name: 'Register',
  setup() {
    const router = useRouter()
    const authStore = useAuthStore()

    const username = ref('')
    const email = ref('')
    const password = ref('')
    const confirmPassword = ref('')
    const error = ref('')
    const loading = ref(false)

    const handleRegister = async () => {
      if (!username.value || !email.value || !password.value || !confirmPassword.value) {
        error.value = 'Proszę wypełnić wszystkie pola'
        return
      }

      if (password.value !== confirmPassword.value) {
        error.value = 'Hasła nie są zgodne'
        return
      }

      loading.value = true
      try {
        await authStore.register(username.value, email.value, password.value)
        router.push('/login')
      } catch (err) {
        error.value = err.response?.data?.message || 'Błąd rejestracji'
      } finally {
        loading.value = false
      }
    }

    const navigateToLogin = () => {
      router.push('/login')
    }

    return {
      username,
      email,
      password,
      confirmPassword,
      error,
      loading,
      handleRegister,
      navigateToLogin
    }
  }
}
</script>