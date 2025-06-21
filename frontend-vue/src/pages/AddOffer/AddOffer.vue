<script setup>
import Header from '../../components/Header/Header.vue'
import VueFeather from 'vue-feather'
import './AddOffer.css'
</script>

<template>
  <div>
    <Header />
    <div class="add-offer-page-container">
      <div class="add-offer-container">
        <p class="add-offer-title">Dodaj ogłoszenie</p>

        <div class="add-offer-horizontal-container">
          <div class="add-offer-vertical-container">
            <p class="add-offer-category-text">Kategoria</p>
            <input class="add-offer-input" />
            <p class="add-offer-category-text">Podkategoria</p>
            <input class="add-offer-input" />
            <p class="add-offer-category-text">Marka</p>
            <input class="add-offer-input" />
            <p class="add-offer-category-text">Model</p>
            <input class="add-offer-input" />
            <p class="add-offer-category-text">Opis</p>
            <textarea class="add-offer-big-input" placeholder="…" />
          </div>

          <div class="add-offer-vertical-container">
            <p class="add-offer-category-text">Cena</p>
            <input class="add-offer-input" />
            <p class="add-offer-category-text">Rok produkcji</p>
            <input class="add-offer-input" />
            <p class="add-offer-category-text">Pojemność silnika</p>
            <input class="add-offer-input" />
            <p class="add-offer-category-text">Paliwo</p>
            <input class="add-offer-input" />
            <p class="add-offer-category-text">Stan techniczny</p>
            <input class="add-offer-input" />
          </div>

          <div class="add-offer-vertical-container">
            <p class="add-offer-category-text">Podgląd</p>
            <img
                src="https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=400"
                alt="Sportowy samochód na drodze"
            />
            <vue-feather type="file-plus" class="add-icon" size="24"></vue-feather>
          </div>
        </div>

        <button class="add-offer-confirm-button">OK</button>
      </div>
    </div>
  </div>
</template>
