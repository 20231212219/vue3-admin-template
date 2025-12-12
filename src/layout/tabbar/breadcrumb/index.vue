<template>
  <!-- 顶部左边内容：折叠按钮 + 面包屑 -->
  <el-icon style="margin-right: 10px" @click="changeIcon">
    <component :is="LatOutSettingStore.fold ? 'Fold' : 'Expand'"></component>
  </el-icon>
  <!-- 面包屑导航 -->
  <el-breadcrumb separator-icon="ArrowRight">
    <!-- 面包屑动态展示路由名字与标题 -->
    <el-breadcrumb-item
      v-for="(item, index) in $route.matched"
      :key="index"
      v-show="item.meta.title"
      :to="item.path"
    >
      <!-- 图标 -->
      <el-icon><component :is="item.meta.icon"></component></el-icon>
      <!-- 面包屑导航标题 -->
      <span style="margin: 0px, 2px">{{ item.meta.title }}</span>
    </el-breadcrumb-item>
  </el-breadcrumb>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import useLayOutSettingStore from '@/store//modules/setting'
import { useRoute } from 'vue-router'
const $route = useRoute()
// 获取layout配置相关的仓库
const LatOutSettingStore = useLayOutSettingStore()

// 点击图标方法
const changeIcon = () => {
  LatOutSettingStore.fold = !LatOutSettingStore.fold
}
</script>
<script lang="ts">
export default {
  name: 'Breadcrumb',
}
</script>

<style scoped></style>
