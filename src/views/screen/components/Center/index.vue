<template>
  <div class="center-container">
    <div class="map">
      <Map></Map>
    </div>
    <div class="line">
      <Line></Line>
    </div>
  </div>
</template>

<script setup lang="ts">
import Map from '../Map/index.vue'
import Line from '../Line/index.vue'
</script>

<style scoped lang="scss">
.center-container {
  display: flex;
  flex-direction: column;
  height: 100%;

  .map {
    flex: 4;
  }

  .line {
    flex: 1;
  }
}
</style>
