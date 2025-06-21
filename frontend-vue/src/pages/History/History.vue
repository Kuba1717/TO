<script setup>
import { ref, onMounted, computed } from 'vue'
import { useAuthStore } from '../../store/auth'
import Header from '../../components/Header/Header.vue'
import api from '../../services/api'
import './History.css'

import dayjs from 'dayjs'
import utc from 'dayjs/plugin/utc'
dayjs.extend(utc)

const authStore = useAuthStore()
const user = computed(() => authStore.user)

const appointments  = ref([])
const loading       = ref(true)
const currentPage   = ref(1)
const itemsPerPage  = 2

const fetchAppointments = async () => {
  try {
    const { data } = await api.get(`/appointment/user/${encodeURIComponent(user.value.email)}`)

    const detailed = await Promise.all(
        data.map(async (a) => {
          const { data: ann } = await api.get(`/announcement/with-images/${a.announcementId}`)
          return { ...a, announcement: ann }
        })
    )
    appointments.value = detailed
  } catch (e) {
    console.error('Błąd pobierania historii jazd próbnych:', e)
  } finally {
    loading.value = false
  }
}

const totalPages = computed(() => Math.ceil(appointments.value.length / itemsPerPage))
const indexOfLast = computed(() => currentPage.value * itemsPerPage)
const indexOfFirst = computed(() => indexOfLast.value - itemsPerPage)
const currentAppointments = computed(() =>
    appointments.value.slice(indexOfFirst.value, indexOfLast.value)
)

const handlePageChange = (p) => { currentPage.value = p }

onMounted(fetchAppointments)
</script>

<template>
  <Header />
  <div class="history-page-container">
    <div class="history-container">
      <p class="history-title">Historia jazd próbnych</p>

      <div class="history-vertical-container">
        <p v-if="loading">Ładowanie...</p>

        <div v-else>
          <div
              v-for="appt in currentAppointments"
              :key="appt.id"
              class="history-offer-card"
          >
            <div class="history-offer-horizontal-container">
              <img :src="appt.announcement.imageUrls?.[0]" alt="Ogłoszenie" />

              <div class="history-offer-vertical-container">
                <h3 class="history-offer-title">{{ appt.announcement.name }}</h3>

                <p class="history-offer-text">
                  Status: <br />
                  {{ appt.status }} <br />
                  Data jazdy: <br />
                  {{ dayjs(appt.appointmentDate).utc().local().format('DD.MM.YYYY') }} <br />
                  Godzina: {{ dayjs(appt.appointmentDate).utc().local().format('HH:mm') }}
                </p>
              </div>

              <p class="history-offer-price">
                {{ appt.announcement.price?.toLocaleString() }} PLN
              </p>
            </div>
          </div>
        </div>
      </div>

      <div v-if="!loading && totalPages > 1" class="pagination">
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
  </div>
</template>
