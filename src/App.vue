<script setup lang="ts">
const str = '我爱你祖国';
for (let i = 0; i < str.length; i++) {
  console.log(str[i]);
}
</script>

<template>
  <div class="box">
    <h1>我是App</h1>
  </div>
</template>

<style scoped lang="scss">
.box {
  width: 600px;
  height: 400px;
  background: black;
}
h1 {
  color: white;
}
</style>
