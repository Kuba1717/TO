<template>
  <div>
    <Header/>
    <div class="offer-page-container">
      <div class="offer-container">
        <p class="offer-title">Szczegóły oferty</p>

        <div class="offer-details">
          <h2>Tytuł oferty</h2>
          <p>Cena: 61 900 PLN</p>
          <p>Lokalizacja: Warszawa, Ursynów</p>
          <p>Rok: 2018</p>
          <p>Przebieg: 188 000 km</p>
        </div>

        <button class="offer-button" @click="navigateToBook">
          Umów jazdę próbną
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import { useRouter } from 'vue-router'
import Header from '../../components/Header/Header.vue'
import './Offer.css'

export default {
  name: 'Offer',
  setup() {
    const router = useRouter()

    const navigateToBook = () => {
      router.push('/book')
    }

    return {
      navigateToBook
    }
  }
}
</script>

<style src="./Offer.css"></style>
