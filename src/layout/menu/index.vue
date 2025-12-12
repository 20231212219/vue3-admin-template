<template>
  <template v-for="(item, index) in menuList" :key="index">
    <!-- 没有子路由 -->
    <template v-if="!item.children">
      <el-menu-item v-if="!item.meta.hidden" :index="item.path" @click="goRoute">
        <el-icon>
          <component :is="item.meta.icon"></component>
        </el-icon>
        <template #title>
          <span>{{ item.meta.title }}</span>
        </template>
      </el-menu-item>
    </template>
    <!-- 只有一个子路由 -->
    <template v-if="item.children && item.children.length == 1">
      <el-menu-item
        :index="item.children[0].path"
        v-if="!item.children[0].meta.hidden"
        @click="goRoute"
      >
        <el-icon>
          <component :is="item.children[0].meta.icon"></component>
        </el-icon>
        <template #title>
          <span>{{ item.children[0].meta.title }}</span>
        </template>
      </el-menu-item>
    </template>
    <!-- 有多个子路由 -->
    <el-sub-menu :index="item.path" v-if="item.children && item.children.length > 1">
      <template #title>
        <el-icon>
          <component :is="item.meta.icon"></component>
        </el-icon>
        <span>{{ item.meta.title }}</span>
      </template>
      <Menu :menuList="item.children"></Menu>
    </el-sub-menu>
  </template>
</template>
<script setup lang="ts">
// 引入路由跳转
import { useRouter } from 'vue-router'
// 获取父组件传递过来的菜单数据
defineProps(['menuList'])
const $router = useRouter()
// 点击菜单的方法
const goRoute = (vc: any) => {
  $router.push(vc.index)
}
</script>
<script lang="ts">
export default {
  name: 'Menu',
}
</script>
<style scoped></style>
