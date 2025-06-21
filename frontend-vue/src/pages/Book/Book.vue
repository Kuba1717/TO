<script setup>
import { ref, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { Checkbox } from 'ant-design-vue'
import dayjs from 'dayjs'
import Header from '../../components/Header/Header.vue'
import api from '../../services/api'
import './Book.css'

const route = useRoute()
const router = useRouter()

const offer = ref(null)

const availableDates = [
  dayjs().startOf('day'),
  dayjs().add(1, 'day').startOf('day'),
  dayjs().add(2, 'day').startOf('day')
]

const availableTimes = ['16:00', '17:00', '18:00']

const selectedDate = ref(null)
const selectedTime = ref(null)

const fmt = (d) => d.format('DD MMMM YYYY')
const fmtRange = (t) => `${t} - ${dayjs(t, 'HH:mm').add(45, 'm').format('HH:mm')}`

const handleConfirm = async () => {
  if (!selectedDate.value || !selectedTime.value) {
    alert('Wybierz datę i godzinę.')
    return
  }
  const [h, m] = selectedTime.value.split(':')
  const appointment = selectedDate.value.hour(+h).minute(+m)

  try {
    await api.post('/appointment', {
      name: 'Jazda próbna',
      status: 'created',
      appointmentDate: appointment.format('YYYY-MM-DDTHH:mm:ss'),
      announcementId: offer.value.id
    })

    await router.push({
      path: `/success/${offer.value.id}`,
      query: { date: appointment.format('DD.MM.YYYY [godz.] HH:mm') }
    })
  } catch {
    alert('Nie udało się umówić wizyty.')
  }
}

const fetchOffer = async () => {
  try {
    const { data } = await api.get(`/announcement/with-images/${route.params.id}`)
    offer.value = data
  } catch {}
}

onMounted(fetchOffer)
</script>

<template>
  <Header />
  <div v-if="offer" class="book-page-container">
    <div class="book-container">
      <p class="book-title">Umów się na jazdę próbną...</p>

      <div class="book-offer-card">
        <div class="book-offer-horizontal-container">
          <img :src="offer.imageUrls?.[0]" alt="">
          <div class="book-offer-vertical-container">
            <h3 class="book-offer-title">{{ offer.name }}</h3>
            <p class="book-offer-location">
              {{ offer.vehicle?.productionYear }} - {{ offer.vehicle?.mileage?.toLocaleString() }} km
            </p>
          </div>
          <p class="book-offer-price">{{ offer.price?.toLocaleString() }} PLN</p>
        </div>
      </div>

      <div class="book-date-horizontal-container">
        <div>
          <p class="book-text">Data:</p>
          <div class="book-checkbox-vertical-container">
            <Checkbox
                v-for="d in availableDates"
                :key="d.valueOf()"
                class="book-checkbox"
                :checked="selectedDate?.isSame(d, 'day')"
                @change="() => (selectedDate = d)"
            >
              {{ fmt(d) }}
            </Checkbox>
          </div>
        </div>

        <div>
          <p class="book-text">Godzina:</p>
          <div class="book-checkbox-vertical-container">
            <Checkbox
                v-for="t in availableTimes"
                :key="t"
                class="book-checkbox"
                :checked="selectedTime === t"
                @change="() => (selectedTime = t)"
            >
              {{ fmtRange(t) }}
            </Checkbox>
          </div>
        </div>
      </div>

      <button class="book-confirm-button" @click="handleConfirm">Potwierdzam</button>
    </div>
  </div>
  <div v-else>Ładowanie danych oferty...</div>
</template>
