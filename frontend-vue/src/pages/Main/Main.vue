<script setup>
import Header from '../../components/Header/Header.vue';
import Filter from '../../components/Filter/Filter.vue';
import OfferList from '../../components/OfferList/OfferList.vue';
import './Main.css'

</script>

<template>
  <div>
    <Header/>
    <div class="main-horizontal-container">
      <Filter/>
      <OfferList/>
    </div>
  </div>
</template>



