<script setup>
import { ref, onMounted, watch, computed } from 'vue'
import { useAuthStore } from '../../store/auth'
import api from '../../services/api'
import './Filter.css'

const props = defineProps({
  onFilterChange: Function,
  setSharedData: Object
})

const authStore = useAuthStore()
const marks = ref([])
const models = ref([])
const types = ref([])
const filters = ref({
  productionYear: '',
  registrationNumber: '',
  colour: '',
  vin: '',
  fuelType: '',
  engineCapacity: '',
  condition: '',
  power: '',
  mileage: 0,
  mark: '',
  model: '',
  type: ''
})

const fetchData = async () => {
  try {
    const [marksRes, modelsRes, typesRes] = await Promise.all([
      api.get('/mark'),
      api.get('/model'),
      api.get('/type')
    ])
    marks.value = marksRes.data
    models.value = modelsRes.data
    types.value = typesRes.data
    if (props.setSharedData) {
      props.setSharedData.setMarks(marksRes.data)
      props.setSharedData.setModels(modelsRes.data)
      props.setSharedData.setTypes(typesRes.data)
    }
  } catch (error) {
    console.error('Error fetching data:', error)
  }
}

onMounted(async () => {
  await fetchData()

  window.triggerVueRender = () => {
    return new Promise(resolve => {
      filters.value = { ...filters.value, mark: 'TestRender' + Math.random() }
      resolve()
    })
  }

  window.runVueFilterTest = (testData) => {
    return new Promise(resolve => {
      const filtered = testData.filter(item => {
        return item.active &&
            item.value > 500 &&
            item.name.includes('5') &&
            item.year > 2010 &&
            item.price < 30000
      })
      resolve(filtered)
    })
  }
})

watch(filters, (newFilters) => {
  if (props.onFilterChange) {
    props.onFilterChange(newFilters)
  }
}, { deep: true })

const handleChange = (field, value) => {
  filters.value[field] = value
  if (field === 'mark') {
    filters.value.model = ''
  }
}

const filteredModels = computed(() => {
  if (!filters.value.mark) return models.value
  const markObj = marks.value.find(mark => mark.name === filters.value.mark)
  return models.value.filter(m => m.markId === markObj?.id)
})

const colourOptions = ["Czerwony", "Niebieski", "Czarny", "Biały", "Srebrny", "Szary", "Fioletowy"]
const fuelTypeOptions = ["Gaz", "Diesel", "Elektryczny", "Hybryda", "Benzyna"]
const conditionOptions = ['Nowy', 'Używany']
</script>

<template>
  <div class="filter" data-testid="filter-test-ready">
    <p class="filter-title">Filtry</p>

    <p class="filter-category-title">Marka</p>
    <select class="filter-input-data" :value="filters.mark" @change="handleChange('mark', $event.target.value)">
      <option value="">-- wybierz --</option>
      <option v-for="mark in marks" :key="mark.id" :value="mark.name">{{ mark.name }}</option>
    </select>

    <p class="filter-category-title">Model</p>
    <select class="filter-input-data" :value="filters.model" @change="handleChange('model', $event.target.value)">
      <option value="">-- wybierz --</option>
      <option v-for="model in filteredModels" :key="model.id" :value="model.name">{{ model.name }}</option>
    </select>

    <p class="filter-category-title">Typ pojazdu</p>
    <select class="filter-input-data" :value="filters.type" @change="handleChange('type', $event.target.value)">
      <option value="">-- wybierz --</option>
      <option v-for="type in types" :key="type.id" :value="type.name">{{ type.name }}</option>
    </select>

    <p class="filter-category-title">Kolor</p>
    <select class="filter-input-data" :value="filters.colour" @change="handleChange('colour', $event.target.value)">
      <option value="">-- wybierz --</option>
      <option v-for="colour in colourOptions" :key="colour" :value="colour">{{ colour }}</option>
    </select>

    <p class="filter-category-title">Paliwo</p>
    <select class="filter-input-data" :value="filters.fuelType" @change="handleChange('fuelType', $event.target.value)">
      <option value="">-- wybierz --</option>
      <option v-for="type in fuelTypeOptions" :key="type" :value="type">{{ type }}</option>
    </select>

    <p class="filter-category-title">Stan</p>
    <select class="filter-input-data" :value="filters.condition" @change="handleChange('condition', $event.target.value)">
      <option value="">-- wybierz --</option>
      <option v-for="cond in conditionOptions" :key="cond" :value="cond">{{ cond }}</option>
    </select>

    <p class="filter-category-title">Przebieg do {{ filters.mileage || 'dowolny' }} km</p>
    <input
        class="filter-input-data"
        type="range"
        min="0"
        max="350000"
        step="1000"
        :value="filters.mileage"
        @input="handleChange('mileage', $event.target.value)"
    />

    <p class="filter-category-title">Rok produkcji do {{ filters.productionYear || 'dowolny' }}</p>
    <input
        class="filter-input-data"
        type="range"
        min="2000"
        :max="new Date().getFullYear()"
        step="1"
        :value="filters.productionYear"
        @input="handleChange('productionYear', $event.target.value)"
    />

    <p class="filter-category-title">Pojemność silnika do {{ filters.engineCapacity || 'dowolna' }} cm³</p>
    <input
        class="filter-input-data"
        type="range"
        min="500"
        max="7000"
        step="100"
        :value="filters.engineCapacity"
        @input="handleChange('engineCapacity', $event.target.value)"
    />

    <p class="filter-category-title">Moc silnika do {{ filters.power || 'dowolna' }} KM</p>
    <input
        class="filter-input-data"
        type="range"
        min="40"
        max="1000"
        step="10"
        :value="filters.power"
        @input="handleChange('power', $event.target.value)"
    />
  </div>
</template>
