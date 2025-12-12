<template>
  <div class="layout_container">
    <!-- 左侧菜单 -->
    <div class="layout_slider">
      <Logo></Logo>
      <!-- 展示菜单 -->
      <!-- 滚动组件 -->
      <el-scrollbar class="scrollbar">
        <!-- 菜单组件 -->
        <el-menu
          :default-active="$route.path"
          background-color="#001529"
          text-color="white"
          :collapse="LatOutSettingStore.fold"
        >
          <Menu :menuList="userStore.menuRoutes"></Menu>
        </el-menu>
      </el-scrollbar>
    </div>
    <!-- 顶部导航 -->
    <div class="layout_tabbar" :class="{ fold: LatOutSettingStore.fold ? true : false }">
      <Tabbar></Tabbar>
    </div>
    <!-- 主要内容区域 -->
    <div class="layout_main" :class="{ fold: LatOutSettingStore.fold ? true : false }">
      <Main></Main>
    </div>
  </div>
</template>

<script setup lang="ts">
// 引入顶部导航组件
// 引入内容展示区域
import Main from './main/index.vue'
// 引入路由对象
import { useRouter } from 'vue-router'
// 获取layout仓库配置
import useLayOutSettingStore from '@/store//modules/setting'
import Tabbar from './tabbar/index.vue'
// 引入左边菜单logo组件
import Logo from './logo/index.vue'
// 引入menu组件
import Menu from './menu/index.vue'
// 获取用户相关的小仓库
import useUserStore from '@/store//modules/user'
const userStore = useUserStore()

const LatOutSettingStore = useLayOutSettingStore()
const $router = useRouter()
</script>

<script lang="ts">
export default {
  name: 'Layout',
}
</script>

<style scoped lang="scss">
.layout_container {
  width: 100%;
  height: 100vh;
  .layout_slider {
    color: white;
    width: $base-menu-width;
    height: 100vh;
    background: $base-menu-background;
    transition: all 0.3s;
    .scrollbar {
      width: 100%;
      height: calc(100vh - $base-menu-logo-height);
      .el-menu {
        border-right: none;
      }
    }
  }
  .layout_tabbar {
    position: fixed;
    width: calc(100% - $base-menu-width);
    height: $base-tabbar-height;
    top: 0;
    transition: all 0.3s;
    left: $base-menu-width;
    background-image: linear-gradient(
      to right,
      rgb(232, 223, 223),
      rgb(201, 178, 178),
      rgb(197, 165, 165)
    );
    &.fold {
      width: calc(100vw - $base-menu-min-width);
      left: $base-menu-min-width;
    }
  }
  .layout_main {
    position: absolute;
    width: calc(100% - $base-menu-width);
    height: calc(100vh - $base-tabbar-height);
    top: $base-tabbar-height;
    left: $base-menu-width;
    padding: 20px;
    overflow: auto;
    transition: all 0.3s;
    &.fold {
      width: calc(100vw - $base-menu-min-width);
      left: $base-menu-min-width;
    }
  }
}
</style>
