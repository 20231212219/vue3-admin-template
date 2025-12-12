<template>
  <div class="tabbar">
    <div class="tabbar-left">
      <Breadcrumb />
    </div>
    <div class="tabbar-right">
      <Setting />
    </div>
  </div>
</template>

<script setup lang="ts">
import Breadcrumb from './breadcrumb/index.vue'
import Setting from './setting/index.vue'
</script>
<script lang="ts">
export default {
  name: 'Tabbar',
}
</script>

<style scoped lang="scss">
.tabbar {
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: space-between;

  .tabbar-left {
    display: flex;
    align-items: center;
    margin-left: 20px;
  }

  .tabbar-right {
    display: flex;
    align-items: center;
    gap: 10px;

    .el-dropdown-link {
      display: flex;
      align-items: center;
      cursor: pointer;
      &:hover {
        color: var(--el-color-primary);
      }
    }
  }
}
</style>
