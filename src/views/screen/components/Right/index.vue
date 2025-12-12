<template>
  <div class="right-container">
    <Rank class="rank"></Rank>
    <Year class="year"></Year>
    <Counter class="counter"></Counter>
  </div>
</template>

<script setup lang="ts">
import Rank from '../Rank/index.vue'
import Year from '../Year/index.vue'
import Counter from '../Counter/index.vue'
</script>

<style scoped lang="scss">
.right-container {
  display: flex;
  flex-direction: column;
  margin-left: 40px;

  .rank {
    flex: 1.5;
  }

  .year {
    flex: 1;
  }

  .counter {
    flex: 1;
  }
}
</style>
