<template>
  <div>
    <Header/>
    <div class="success-page-container">
      <div class="success-container">
        <p class="success-title">
          Sukces!
        </p>
        <p class="success-text">
          Udało Ci się złożyć zamówienie. <br/>
          Twoje auto będzie gotowe: <br/>
          17.03.2025 godz 18:45.
        </p>
        <p class="success-thanks-text">
          Dziękujemy za zakupy!
        </p>
        <button class="success-button">
          OK
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import Header from '../../components/Header/Header.vue'
</script>

<style src="Success.css"></style>
