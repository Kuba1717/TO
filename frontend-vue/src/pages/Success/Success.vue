<script setup>
import { useRoute, useRouter } from 'vue-router'
import Header from '../../components/Header/Header.vue'
import './Success.css'

const route = useRoute()
const router = useRouter()

const appointmentDate = route.query.date || ''
</script>

<template>
  <Header />
  <div class="success-page-container">
    <div class="success-container">
      <p class="success-title">Sukces!</p>
      <p class="success-text">
        Udało Ci się umówić jazdę próbną<br />
        Termin:<br /><br />
        {{ appointmentDate || 'brak danych' }}
      </p>
      <p class="success-thanks-text">
        Dziękujemy za skorzystanie z naszych usług!
      </p>
      <button class="success-button" @click="router.push('/main')">OK</button>
    </div>
  </div>
</template>
