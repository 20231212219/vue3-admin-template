<template>
  <!-- 登录页面容器，包含左侧空白列与右侧登录表单列 -->
  <div class="login_container" :style="{ backgroundImage: `url(${settingStore.loginBg})` }">
    <el-row>
      <!-- 左侧占位列（大屏幕显示为空），用于页面布局平衡 -->
      <el-col :span="12" :xs="0"></el-col>
      <!-- 右侧登录表单列：在小屏幕下占满宽度 -->
      <el-col :span="12" :xs="24">
        <!-- 登录表单容器 -->
        <el-form class="login_form" :model="loginForm" :rules="rules" ref="loginForms">
          <!-- 页面主标题 -->
          <h1>Hello</h1>
          <!-- 副标题/欢迎语 -->
          <h2>欢迎使用后台管理系统</h2>
          <!-- 用户名输入项：使用 Element Plus 输入组件，前缀图标为 User -->
          <el-form-item prop="username">
            <el-input :prefix-icon="User" v-model="loginForm.username"></el-input>
          </el-form-item>
          <!-- 密码输入项：使用锁图标并展示密码切换按钮 -->
          <el-form-item prop="password">
            <el-input
              type="password"
              :prefix-icon="Lock"
              show-password
              v-model="loginForm.password"
            ></el-input>
          </el-form-item>
          <!-- 提交按钮：点击触发 login 方法 -->
          <el-form-item>
            <el-button
              type="primary"
              size="default"
              class="login_btn"
              @click="login"
              :loading="loading"
              >登录</el-button
            >
          </el-form-item>
        </el-form>
      </el-col>
    </el-row>
  </div>
</template>

<script setup lang="ts">
/* 导入 Element Plus 图标组件：Lock 和 User */
import { Lock, User } from '@element-plus/icons-vue'
/* Vue 响应式 API */
import { reactive, ref } from 'vue'
/* 引入用户相关的 Pinia 小仓库（处理登录等） */
import useUserStore from '@/store/modules/user'
import useLayOutSettingStore from '@/store/modules/setting'
/* Vue Router 的组合式钩子，用于路由跳转 */
import { useRouter, useRoute } from 'vue-router'
/* Element Plus 的通知组件，用于提示登录结果 */
import { ElNotification } from 'element-plus'
// 引入获取当前时间的函数
import { getTime } from '@/utils/time'

const validatorUserName = (rule: any, value: any, callback: any) => {
  if (value.length >= 5) {
    callback()
  } else {
    callback(new Error('用户名长度至少5位'))
  }
}
const validatorPassword = (rule: any, value: any, callback: any) => {
  if (value.length >= 6) {
    callback()
  } else {
    callback(new Error('密码长度至少6位'))
  }
}
const loading = ref(false)
/* 创建用户仓库实例，后续调用登录方法 */
const useStore = useUserStore()
const settingStore = useLayOutSettingStore()
/* 获取路由实例以便登录后跳转 */
const $router = useRouter()
const $route = useRoute()
// 获取表单实例以便进行表单验证
const loginForms = ref()
/* 登录表单的响应式数据，包含 username 和 password 字段 */
const loginForm = reactive({
  username: 'admin',
  password: '111111',
})
//定义表单校验需要配置对象
const rules = {
  username: [
    // { required: true, min: 6, max: 10, message: '用户名长度在6-10个字符', trigger: 'change' },
    { trigger: 'change', validator: validatorUserName },
  ],
  password: [
    // { required: true, min: 6, max: 12, message: '密码长度在6-12个字符', trigger: 'change' },
    { trigger: 'change', validator: validatorPassword },
  ],
}
/* 登录方法：调用仓库的异步登录方法，成功则跳转并提示，失败则提示错误 */
const login = async () => {
  // 保证全部表单校验通过再发请求
  await loginForms.value.validate()
  // 加载效果
  loading.value = true
  try {
    /* 调用小仓库的 userLogin 方法（假定会抛出异常或返回失败以触发 catch） */
    await useStore.userLogin(loginForm)
    /* 登录成功后跳转到首页 */
    // 判断是否有query参数redirect，有则跳转到对应页面，没有则跳转到首页
    const redirect = $route.query.redirect as string
    $router.push(redirect ? redirect : '/')
    /* 显示成功通知 */
    ElNotification({
      type: 'success',
      message: '登录成功',
      title: `Hi,${getTime()}好`,
    })
    loading.value = false
  } catch (error) {
    loading.value = false
    /* 登录失败时显示错误通知 */
    ElNotification({
      type: 'error',
      message: (error as Error).message,
    })
  }
}
</script>

<style scoped lang="scss">
/* 页面整体容器样式：全屏背景图 */
.login_container {
  width: 100%;
  height: 100vh;
  /* 背景图片，覆盖铺满 */
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  .login_form {
    /* 表单位置与宽度 */
    position: relative;
    width: 70%;
    top: 30vh;
    /* 表单背景图（局部美化） */
    background: url('@/assets/images/login_form.png') no-repeat;
    padding: 40px;
    h1 {
      /* 主标题样式：白色、大字号 */
      color: white;
      font-size: 40px;
    }
    h2 {
      /* 副标题样式 */
      font-size: 20px;
      color: white;
      margin: 20px 0;
    }
    .login_btn {
      /* 登录按钮宽度铺满表单项 */
      width: 100%;
    }
  }
}
</style>
