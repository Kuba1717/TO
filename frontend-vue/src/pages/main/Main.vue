<template>
  <div>
    <Header />
    <div class="main-horizontal-container">

    </div>
  </div>
</template>

<script>
import Header from "../../components/Header/Header.vue";

export default {
  name: 'Main',
  components: {
    Header

  }
}
</script>

<style scoped>
.main-horizontal-container {
  display: flex;
  flex-direction: row;
  margin: 20px auto;
  width: 100%;
}
</style>
