<script setup>
import { ref } from 'vue'
import Header from '../../components/Header/Header.vue'
import Filter from '../../components/Filter/Filter.vue'
import OfferList from '../../components/OfferList/OfferList.vue'
import './Main.css'

const filters = ref({})
const marks = ref([])
const models = ref([])
const types = ref([])

const setFilters = (newFilters) => {
  filters.value = newFilters
}

const setSharedData = {
  setMarks: (data) => { marks.value = data },
  setModels: (data) => { models.value = data },
  setTypes: (data) => { types.value = data }
}
</script>

<template>
  <div>
    <Header />
    <div class="main-horizontal-container">
      <Filter :onFilterChange="setFilters" :setSharedData="setSharedData" />
      <OfferList :filters="filters" :marks="marks" :models="models" :types="types" />
    </div>
  </div>
</template>
