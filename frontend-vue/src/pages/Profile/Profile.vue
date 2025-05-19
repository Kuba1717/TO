<template>
  <div>
    <Header/>
    <div class="profile-page-container">
      <div class="profile-container">
        <div class="profile-horizontal-container">
          <p class="profile-title">
            Dane <br/>
            użytkownika
          </p>
          <vue-feather type="credit-card" class="id-icon" size="64"></vue-feather>
        </div>

        <p class="profile-category-text">
          E-mail:
        </p>
        <p class="profile-data-text">
          jankowalski@gmail.com
        </p>
        <p class="profile-category-text">
          Numer telefonu:
        </p>
        <p class="profile-data-text">
          +48 632 435 235
        </p>
        <p class="profile-category-text">
          Imię:
        </p>
        <p class="profile-data-text">
          Jan
        </p>
        <p class="profile-category-text">
          Nazwisko:
        </p>
        <p class="profile-data-text">
          Kowalski
        </p>
        <button class="profile-ok-button">
          OK
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import Header from "../../components/Header/Header.vue";
import VueFeather from 'vue-feather';
import './Profile.css';
</script>

<style src="./Profile.css"></style>
