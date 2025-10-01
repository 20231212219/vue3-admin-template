// 导入 Vue 3 的 createApp 函数，用于创建 Vue 应用实例
import { createApp } from 'vue'

// 导入根组件 App.vue
import App from '@/App.vue'

// 导入 Element Plus UI 组件库
import ElementPlus from 'element-plus'
// 导入 Element Plus 的样式文件
import 'element-plus/dist/index.css'
// 导入 Element Plus 的中文语言包
//@ts-ignore
import zhCn from 'element-plus/dist/locale/zh-cn.mjs'

// 注册 SVG 图标系统（需要在创建应用之前导入）
import 'virtual:svg-icons-register'
// 导入 SvgIcon 组件
import SvgIcon from '@/components/SvgIcon/index.vue'

// 创建 Vue 应用实例
const app = createApp(App)

// 全局注册 SvgIcon 组件（在使用其他插件之前注册）
app.component('SvgIcon', SvgIcon)
import gloablComponent from './components/index'
app.use(gloablComponent)

// 全局注册 Element Plus 组件库，并配置为中文语言环境
app.use(ElementPlus, {
  locale: zhCn,
})
import '@/styles/index.scss'
import axios from 'axios'
axios({
  url: '/api/user/login',
  method: 'post',
  data: {
    username: 'admin',
    password: '111111',
  },
})

// 将 Vue 应用挂载到 id 为 'app' 的 DOM 元素上
app.mount('#app')
