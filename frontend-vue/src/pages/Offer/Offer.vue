<script setup>
import { ref, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useAuthStore } from '../../store/auth'
import Header from '../../components/Header/Header.vue'
import VueFeather from 'vue-feather'
import { Carousel, Slide, Navigation } from 'vue3-carousel'
import 'vue3-carousel/dist/carousel.css'
import api from '../../services/api'
import './Offer.css'

const route = useRoute()
const router = useRouter()
const authStore = useAuthStore()
const offer = ref(null)

const fetchOffer = async () => {
  try {
    const response = await api.get(`/announcement/with-images/${route.params.id}`)
    offer.value = response.data
  } catch (err) {
    console.error('Błąd pobierania oferty:', err)
  }
}

const navigateToBook = () => {
  router.push(`/book/${offer.value.id}`)
}

onMounted(() => {
  fetchOffer()
})
</script>

<template>
  <div class="offer-page-container" v-if="offer">
    <Header />
    <div class="offer-horizontal-container">
      <div class="offer-vertical-container">
        <div class="offer-img-container">
          <Carousel :items-to-show="1" :wrap-around="false" :mouse-drag="true">
            <Slide v-for="(src, idx) in (offer.imageUrls || [])" :key="idx">
              <img
                  :src="src"
                  :alt="`Zdjęcie ${idx + 1}`"
                  class="offer-image"
              />
            </Slide>

            <template #addons>
              <Navigation />
            </template>
          </Carousel>
        </div>

        <div class="offer-description-container">
          <div class="offer-horizontal-container">
            <vue-feather type="search" class="loupe-icon" size="32"></vue-feather>
            <p class="offer-description-title">Opis</p>
          </div>
          <p class="offer-description-text">
            {{ offer.description }}
          </p>
        </div>
      </div>

      <div class="offer-panel-container">
        <p class="offer-panel-title">{{ offer.name }}</p>
        <p class="offer-panel-price">
          {{ offer.price ? `${offer.price.toLocaleString()} PLN` : 'Cena nie podana' }}
        </p>

        <div class="offer-buy-button" @click="navigateToBook">
          <vue-feather type="credit-card" class="buy-icon" size="43"></vue-feather>
        </div>
        <div class="offer-contact-button">
          <vue-feather type="phone" class="contact-icon" size="40"></vue-feather>
        </div>

        <div class="offer-information-container">
          <p class="offer-information-title">Informacje</p>
          <p class="offer-information-text">
            <span v-if="offer.vehicle?.productionYear">* {{ offer.vehicle.productionYear }}<br/></span>
            <span v-if="offer.vehicle?.mileage">* {{ offer.vehicle.mileage.toLocaleString() }} km<br/></span>
            <span v-if="offer.vehicle?.fuelType">* {{ offer.vehicle.fuelType }}<br/></span>
            <span v-if="offer.vehicle?.engineCapacity">* {{ offer.vehicle.engineCapacity }} cm³<br/></span>
            <span v-if="offer.vehicle?.power">* {{ offer.vehicle.power }} KM<br/></span>
          </p>
        </div>
      </div>
    </div>
  </div>
  <div v-else>Ładowanie oferty...</div>
</template>
