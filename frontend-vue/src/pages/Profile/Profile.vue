<script setup>
import { ref, onMounted, computed } from 'vue'
import { useAuthStore } from '../../store/auth'
import Header from '../../components/Header/Header.vue'
import api from '../../services/api'
import './Profile.css'
import VueFeather from "vue-feather";

const authStore = useAuthStore()
const user = computed(() => authStore.user)
const profileData = ref(null)
const error = ref(null)
const isEditing = ref(false)
const formData = ref({
  firstName: '',
  lastName: '',
  phoneNumber: '',
  email: ''
})

const fetchProfileData = async () => {
  if (!user.value) return

  try {
    const response = await api.get(`/user/${user.value.email}`)
    profileData.value = response.data
    formData.value = {
      firstName: response.data.firstName || '',
      lastName: response.data.lastName || '',
      phoneNumber: response.data.phoneNumber || '',
      email: response.data.email
    }
  } catch (err) {
    error.value = 'Nie udało się pobrać danych użytkownika.'
    console.error(err)
  }
}

const handleInputChange = (field, value) => {
  formData.value[field] = value
}

const handleEditClick = async () => {
  if (!isEditing.value) {
    isEditing.value = true
  } else {
    try {
      await api.put(`/user/${user.value.email}`, formData.value)
      profileData.value = { ...profileData.value, ...formData.value }
      isEditing.value = false
    } catch (err) {
      error.value = 'Nie udało się zaktualizować danych.'
      console.error(err)
    }
  }
}

onMounted(() => {
  fetchProfileData()
})
</script>

<template>
  <div v-if="error">{{ error }}</div>
  <div v-else-if="!profileData">Ładowanie danych...</div>
  <div v-else>
    <Header />
    <div class="profile-page-container">

      <div class="profile-container">

        <div class="profile-horizontal-container">
          <p class="profile-title">Dane <br /> użytkownika</p>
          <vue-feather type="credit-card" class="id-icon" size="64"></vue-feather>

        </div>

        <p class="profile-category-text">E-mail:</p>
        <p class="profile-data-text">{{ profileData.email }}</p>

        <p class="profile-category-text">Numer telefonu:</p>
        <input
            v-if="isEditing"
            type="text"
            :value="formData.phoneNumber"
            @input="handleInputChange('phoneNumber', $event.target.value)"
            class="profile-input"
        />
        <p v-else class="profile-data-text">{{ profileData.phoneNumber || 'Uzupełnij dane' }}</p>

        <p class="profile-category-text">Imię:</p>
        <input
            v-if="isEditing"
            type="text"
            :value="formData.firstName"
            @input="handleInputChange('firstName', $event.target.value)"
            class="profile-input"
        />
        <p v-else class="profile-data-text">{{ profileData.firstName || 'Uzupełnij dane' }}</p>

        <p class="profile-category-text">Nazwisko:</p>
        <input
            v-if="isEditing"
            type="text"
            :value="formData.lastName"
            @input="handleInputChange('lastName', $event.target.value)"
            class="profile-input"
        />
        <p v-else class="profile-data-text">{{ profileData.lastName || 'Uzupełnij dane' }}</p>

        <button class="profile-edit-button" @click="handleEditClick">
          {{ isEditing ? 'Zapisz' : 'Edytuj' }}
        </button>
      </div>
    </div>
  </div>
</template>
