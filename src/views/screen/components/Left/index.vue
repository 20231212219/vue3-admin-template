<template>
  <div class="left-container">
    <Tourist class="tourist"></Tourist>
    <Sex class="sex"></Sex>
    <Age class="age"></Age>
  </div>
</template>

<script setup lang="ts">
import Tourist from '../Tourist/index.vue'
import Sex from '../Sex/index.vue'
import Age from '../Age/index.vue'
</script>

<style scoped lang="scss">
.left-container {
  display: flex;
  flex-direction: column;

  .tourist {
    flex: 1.2;
  }

  .sex {
    flex: 1;
  }

  .age {
    flex: 1;
  }
}
</style>
