<template>
  <!-- 顶部右边内容：刷新、全屏、设置、用户头像 -->
  <el-button size="small" icon="Refresh" circle @click="updateRefsh" />
  <el-button size="small" icon="FullScreen" circle @click="fullScreen" />
  <el-button size="small" icon="Setting" circle />
  <img
    :src="userStore.avatar"
    style="margin: 0px 10px; width: 24px; height: 24px; border-radius: 50%"
  />
  <!-- 用户头像下拉菜单 -->
  <el-dropdown>
    <span class="el-dropdown-link">
      {{ userStore.username }}
      <el-icon><ArrowDown /></el-icon>
    </span>
    <template #dropdown>
      <el-dropdown-menu>
        <el-dropdown-item @click="logout">退出登录</el-dropdown-item>
      </el-dropdown-menu>
    </template>
  </el-dropdown>
</template>

<script setup lang="ts">
// 引入路由跳转
import { useRouter, useRoute } from 'vue-router'
// 获取用户相关的小仓库
import useUserStore from '@/store//modules/user'
import { ArrowDown } from '@element-plus/icons-vue'
// 获取骨架的小仓库
import useLayOutSettingStore from '@/store//modules/setting'
// 获取路由实例
const $route = useRoute()
const userStore = useUserStore()
const $router = useRouter()
const layoutSettingStore = useLayOutSettingStore()
const updateRefsh = () => {
  layoutSettingStore.refsh = !layoutSettingStore.refsh
}
const fullScreen = () => {
  const full = document.fullscreenElement
  if (!full) {
    document.documentElement.requestFullscreen()
  } else {
    document.exitFullscreen()
  }
}
// 退出登录
const logout = async () => {
  // 1.向服务器发送请求 2.清除本地数据 3.跳转到登录页面
  await userStore.userLogout()
  $router.push({ path: '/login', query: { redirect: $route.path } })
}
</script>
<script lang="ts">
export default {
  name: 'Setting',
}
</script>

<style scoped></style>
