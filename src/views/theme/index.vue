<template>
  <el-card class="theme-container" header="系统主题配置">
    <el-form :model="settingStore" label-width="120px" style="width: 600px">
      <el-form-item label="平台名称">
        <el-input v-model="settingStore.title" placeholder="请输入平台名称" />
      </el-form-item>

      <el-form-item label="Logo 图片">
        <!-- 这里为了演示简单，直接使用输入框修改URL，实际项目中可以使用上传组件 -->
        <el-input v-model="settingStore.logo" placeholder="请输入Logo图片URL" />
        <div class="preview" v-if="settingStore.logo" @click="triggerUpload('logo')">
          <img
            :src="settingStore.logo"
            alt="Logo Preview"
            style="max-width: 100px; margin-top: 10px; cursor: pointer"
            title="点击更换图片"
          />
        </div>
      </el-form-item>

      <el-form-item label="显示 Logo">
        <el-switch v-model="settingStore.logoHidden" />
      </el-form-item>

      <el-form-item label="大屏背景图">
        <el-input v-model="settingStore.dataScreenBg" placeholder="请输入大屏背景图URL" />
        <div
          class="preview"
          v-if="settingStore.dataScreenBg"
          @click="triggerUpload('dataScreenBg')"
        >
          <img
            :src="settingStore.dataScreenBg"
            alt="Screen Bg Preview"
            style="max-width: 200px; margin-top: 10px; border: 1px solid #ccc; cursor: pointer"
            title="点击更换图片"
          />
        </div>
      </el-form-item>

      <el-form-item label="登录页背景图">
        <el-input v-model="settingStore.loginBg" placeholder="请输入登录页背景图URL" />
        <div class="preview" v-if="settingStore.loginBg" @click="triggerUpload('loginBg')">
          <img
            :src="settingStore.loginBg"
            alt="Login Bg Preview"
            style="max-width: 200px; margin-top: 10px; border: 1px solid #ccc; cursor: pointer"
            title="点击更换图片"
          />
        </div>
      </el-form-item>

      <el-form-item>
        <el-button type="primary" @click="saveConfig">保存配置</el-button>
        <el-button @click="resetConfig">重置默认</el-button>
      </el-form-item>
    </el-form>

    <!-- Hidden File Inputs -->
    <input
      type="file"
      ref="logoInput"
      style="display: none"
      accept="image/*"
      @change="(e) => handleFileChange(e, 'logo')"
    />
    <input
      type="file"
      ref="screenBgInput"
      style="display: none"
      accept="image/*"
      @change="(e) => handleFileChange(e, 'dataScreenBg')"
    />
    <input
      type="file"
      ref="loginBgInput"
      style="display: none"
      accept="image/*"
      @change="(e) => handleFileChange(e, 'loginBg')"
    />
  </el-card>
</template>

<script setup lang="ts">
import useLayOutSettingStore from '@/store/modules/setting'
import { ElMessage } from 'element-plus'
import setting from '@/setting'
import { ref } from 'vue'
import defaultBg from '@/assets/images/background.jpg'

const settingStore = useLayOutSettingStore()

const logoInput = ref<HTMLInputElement | null>(null)
const screenBgInput = ref<HTMLInputElement | null>(null)
const loginBgInput = ref<HTMLInputElement | null>(null)

const triggerUpload = (type: 'logo' | 'dataScreenBg' | 'loginBg') => {
  if (type === 'logo') logoInput.value?.click()
  if (type === 'dataScreenBg') screenBgInput.value?.click()
  if (type === 'loginBg') loginBgInput.value?.click()
}

const handleFileChange = (event: Event, type: 'logo' | 'dataScreenBg' | 'loginBg') => {
  const input = event.target as HTMLInputElement
  if (input.files && input.files[0]) {
    const file = input.files[0]
    const reader = new FileReader()
    reader.onload = (e) => {
      if (e.target?.result) {
        if (type === 'logo') settingStore.logo = e.target.result as string
        if (type === 'dataScreenBg') settingStore.dataScreenBg = e.target.result as string
        if (type === 'loginBg') settingStore.loginBg = e.target.result as string
        ElMessage.success('图片已更新')
      }
    }
    reader.readAsDataURL(file)
  }
}

const saveConfig = () => {
  // 在实际项目中，这里应该调用后端API保存配置
  // 目前仅更新Pinia状态，刷新页面会重置（除非做了持久化）
  ElMessage.success('配置已更新（仅当前会话有效）')
}

const resetConfig = () => {
  settingStore.title = setting.title
  settingStore.logo = setting.logo
  settingStore.logoHidden = setting.logoHidden
  settingStore.dataScreenBg = ''
  settingStore.loginBg = defaultBg
  ElMessage.info('已重置为默认配置')
}
</script>

<style scoped lang="scss">
.theme-container {
  margin: 20px;
}
</style>
