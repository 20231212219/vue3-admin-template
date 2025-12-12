<template>
  <!-- 顶部右边内容：刷新、全屏、设置、用户头像 -->
  <el-button size="small" icon="Refresh" circle @click="updateRefsh" />
  <el-button size="small" icon="FullScreen" circle @click="fullScreen" />
  <el-button size="small" icon="Setting" circle @click="openSetting" />
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

  <!-- 抽屉组件:用于主题设置 -->
  <el-drawer v-model="drawer" title="主题设置" size="300px" :append-to-body="true">
    <el-form>
      <el-form-item label="主题颜色">
        <el-color-picker
          @change="setColor"
          v-model="color"
          size="small"
          show-alpha
          :predefine="predefineColors"
        />
      </el-form-item>
      <el-form-item label="暗黑模式">
        <el-switch
          @change="changeDark"
          v-model="dark"
          class="mt-2"
          style="margin-left: 24px"
          inline-prompt
          active-icon="MoonNight"
          inactive-icon="Sunny"
        />
      </el-form-item>
    </el-form>
  </el-drawer>
</template>

<script setup lang="ts">
import { ref } from 'vue'
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

// 收集开关的数据
const dark = ref<boolean>(false)
// 颜色组件的数据
const color = ref('#409EFF')
const drawer = ref(false)

const predefineColors = ref([
  '#ff4500',
  '#ff8c00',
  '#ffd700',
  '#90ee90',
  '#00ced1',
  '#1e90ff',
  '#c71585',
  'rgba(255, 69, 0, 0.68)',
  'rgb(255, 120, 0)',
  'hsv(51, 100, 98)',
  'hsva(120, 40, 94, 0.5)',
  'hsl(181, 100%, 37%)',
  'hsla(209, 100%, 56%, 0.73)',
  '#c7158577',
])

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

// 打开设置抽屉
const openSetting = () => {
  drawer.value = true
}

// switch开关的change事件进行暗黑模式的切换
const changeDark = () => {
  // 获取HTML根节点
  let html = document.documentElement
  // 判断HTML标签是否有类名dark
  dark.value ? (html.className = 'dark') : (html.className = '')
}

// 主题颜色的设置
const setColor = () => {
  // 通知js修改根节点的样式对象的属性与属性值
  const html = document.documentElement
  html.style.setProperty('--el-color-primary', color.value)
  // 循环设置 lighter 颜色
  // --el-color-primary-light-3
  // --el-color-primary-light-5
  // --el-color-primary-light-7
  // --el-color-primary-light-8
  // --el-color-primary-light-9
  // --el-color-primary-dark-2
  html.style.setProperty('--el-color-primary-light-3', getLightColor(color.value, 0.3))
  html.style.setProperty('--el-color-primary-light-5', getLightColor(color.value, 0.5))
  html.style.setProperty('--el-color-primary-light-7', getLightColor(color.value, 0.7))
  html.style.setProperty('--el-color-primary-light-8', getLightColor(color.value, 0.8))
  html.style.setProperty('--el-color-primary-light-9', getLightColor(color.value, 0.9))
  html.style.setProperty('--el-color-primary-dark-2', getDarkColor(color.value, 0.2))
}

// 颜色计算辅助函数
const getLightColor = (color: string, level: number) => {
  let rgb = hexToRgb(color)
  for (let i = 0; i < 3; i++) {
    rgb[i] = Math.floor((255 - rgb[i]) * level + rgb[i])
  }
  return rgbToHex(rgb[0], rgb[1], rgb[2])
}

const getDarkColor = (color: string, level: number) => {
  let rgb = hexToRgb(color)
  for (let i = 0; i < 3; i++) {
    rgb[i] = Math.floor(rgb[i] * (1 - level))
  }
  return rgbToHex(rgb[0], rgb[1], rgb[2])
}

const hexToRgb = (str: string) => {
  let hexs: any = ''
  let reg = /^\#?[0-9A-Fa-f]{6}$/
  if (!reg.test(str)) return alert('输入错误的hex')
  str = str.replace('#', '')
  hexs = str.match(/../g)
  for (let i = 0; i < 3; i++) hexs[i] = parseInt(hexs[i], 16)
  return hexs
}

const rgbToHex = (r: any, g: any, b: any) => {
  let hexs = [r.toString(16), g.toString(16), b.toString(16)]
  for (let i = 0; i < 3; i++) {
    if (hexs[i].length == 1) hexs[i] = '0' + hexs[i]
  }
  return '#' + hexs.join('')
}
</script>
<script lang="ts">
export default {
  name: 'Setting',
}
</script>

<style scoped></style>
