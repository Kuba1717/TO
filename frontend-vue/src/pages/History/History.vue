<template>
  <div>
    <Header />
    <div class="history-page-container">
      <div class="history-container">
        <p class="history-title">Historia jazd próbnych</p>
        <div class="history-vertical-container">
          <div class="history-offer-card">
            <div class="history-offer-horizontal-container">
              <img src="" alt="" />
              <div class="history-offer-vertical-container">
                <h3 class="history-offer-title">Tytuł oferty</h3>
                <p class="history-offer-text">
                  Status:<br />
                  W trakcie<br />
                  Data umówienia się na jazdę próbną:<br />
                  05.03.2025<br />
                  Data jazdy próbnej:<br />
                  05.03.2025 godz. 18:45
                </p>
              </div>
              <p class="history-offer-price">61 900 PLN</p>
            </div>
          </div>
          <div class="history-offer-card">
            <div class="history-offer-horizontal-container">
              <img src="" alt="" />
              <div class="history-offer-vertical-container">
                <h3 class="history-offer-title">Tytuł oferty</h3>
                <p class="history-offer-text">
                  Status:<br />
                  W trakcie<br />
                  Data umówienia się na jazdę próbną:<br />
                  05.03.2025<br />
                  Data jazdy próbnej:<br />
                  05.03.2025 godz. 18:45
                </p>
              </div>
              <p class="history-offer-price">61 900 PLN</p>
            </div>
          </div>
          <div class="pagination">
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
    </div>
  </div>
</template>

<script setup>
import Header from '../../components/Header/Header.vue'
import { ref } from 'vue'

const totalPages = 3
const currentPage = ref(1)

function handlePageChange(page) {
  currentPage.value = page
}
</script>

<style src="./History.css"></style>
