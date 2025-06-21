<script setup>
import { ref, onMounted, computed, watch } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '../../store/auth'
import api from '../../services/api'
import './OfferList.css'

const props = defineProps({
  filters: Object,
  marks: Array,
  models: Array,
  types: Array
})

const authStore = useAuthStore()
const router = useRouter()
const offers = ref([])
const currentPage = ref(1)
const offersPerPage = 8

const fetchOffers = async () => {
  try {
    const response = await api.get('/announcement/with-images')
    offers.value = response.data
  } catch (error) {
    console.error('Błąd pobierania ogłoszeń:', error)
  }
}

const getModelName = (id) => props.models.find(m => m.id === id)?.name || ''
const getMarkName = (modelId) => {
  const model = props.models.find(m => m.id === modelId)
  return props.marks.find(mark => mark.id === model?.markId)?.name || ''
}
const getTypeName = (id) => props.types.find(t => t.id === id)?.name || ''

const applyFilters = (offers) => {
  return offers.filter((offer) => {
    const v = offer.vehicle || {}
    const markName = getMarkName(v.modelId)
    const modelName = getModelName(v.modelId)
    const typeName = getTypeName(v.typeId)
    return (
        (!props.filters.mark || markName.toLowerCase().includes(props.filters.mark.toLowerCase())) &&
        (!props.filters.model || modelName.toLowerCase().includes(props.filters.model.toLowerCase())) &&
        (!props.filters.type || typeName.toLowerCase().includes(props.filters.type.toLowerCase())) &&
        (!props.filters.productionYear || v.productionYear <= props.filters.productionYear) &&
        (!props.filters.colour || v.colour?.toLowerCase().includes(props.filters.colour.toLowerCase())) &&
        (!props.filters.fuelType || v.fuelType?.toLowerCase().includes(props.filters.fuelType.toLowerCase())) &&
        (!props.filters.engineCapacity || v.engineCapacity <= props.filters.engineCapacity) &&
        (!props.filters.condition || v.condition?.toLowerCase().includes(props.filters.condition.toLowerCase())) &&
        (!props.filters.power || v.power <= props.filters.power) &&
        (!props.filters.mileage || v.mileage <= props.filters.mileage)
    )
  })
}

const filteredOffers = computed(() => applyFilters(offers.value))

const currentOffers = computed(() => {
  const indexOfLastOffer = currentPage.value * offersPerPage
  const indexOfFirstOffer = indexOfLastOffer - offersPerPage
  return filteredOffers.value.slice(indexOfFirstOffer, indexOfLastOffer)
})

const totalPages = computed(() => {
  return Math.ceil(filteredOffers.value.length / offersPerPage)
})

const handlePageChange = (pageNumber) => {
  currentPage.value = pageNumber
}

const navigateToOffer = (offerId) => {
  router.push(`/offer/${offerId}`)
}

watch(() => props.filters, () => {
  currentPage.value = 1
}, { deep: true })

onMounted(() => {
  fetchOffers()
})
</script>

<template>
  <div class="offer-list">
    <div
        v-for="offer in currentOffers"
        :key="offer.id"
        class="offer-card"
        @click="navigateToOffer(offer.id)"
        style="cursor: pointer"
    >
      <div class="offer-list-horizontal-container">
        <a-carousel autoplay :dots="false" class="offer-carousel">
          <div v-for="(img, idx) in (offer.imageUrls || [offer.imageUrl])" :key="idx" class="carousel-slide">
            <img :src="img" :alt="`${offer.name} ${idx + 1}`" />
          </div>
        </a-carousel>

        <div class="offer-list-vertical-container">
          <h3 class="offer-title">{{ offer.name }}</h3>
          <p class="offer-location">
            {{ offer.location }} - {{ new Date(offer.placedDate).toLocaleDateString() }}
          </p>
        </div>

        <p class="offer-price">
          {{ offer.price != null ? `${offer.price.toLocaleString()} PLN` : 'Brak' }}
        </p>
      </div>
    </div>

    <div class="pagination" v-if="totalPages > 1">
      <button
          v-for="page in totalPages"
          :key="page"
          @click="handlePageChange(page)"
          :disabled="page === currentPage"
      >
        {{ page }}
      </button>
    </div>
  </div>
</template>
