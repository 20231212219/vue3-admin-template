import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import zhCn from 'element-plus/dist/locale/zh-cn.mjs'
import { createApp } from 'vue'
import { createPinia } from 'pinia'
import 'virtual:svg-icons-register'
import App from './App.vue'
// 引入全局样式
import '@/styles/index.scss'
import axios from 'axios'
// 引入自定义插件对象:注册项目全局组件
import gloablComponent from './components/index'
// 引入路由
import router from './router/index'
// 引入仓库
import pinia from './store/index'
// 引入路由鉴权
import './permisstion.ts'
const app = createApp(App)
app.use(ElementPlus, {
  locale: zhCn,
})
app.use(pinia)

app.use(gloablComponent)

app.use(router)

app.mount('#app')
