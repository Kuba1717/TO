<template>
  <div>
    <h1>Panel Managera</h1>
    <p>Ta strona jest dostępna tylko dla użytkowników z rolą STORE_MANAGER.</p>
    <button @click="goBack">Powrót</button>
  </div>
</template>

<script>
import { useRouter } from 'vue-router'

export default {
  name: 'Manager',
  setup() {
    const router = useRouter()

    const goBack = () => {
      router.push('/home')
    }

    return {
      goBack
    }
  }
}
</script>
