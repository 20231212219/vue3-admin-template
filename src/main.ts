import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import zhCn from 'element-plus/dist/locale/zh-cn.mjs'
import { createApp } from 'vue'
import { createPinia } from 'pinia'
import 'virtual:svg-icons-register'
import App from './App.vue'

const app = createApp(App)
app.use(ElementPlus, {
  locale: zhCn,
})
app.use(createPinia())
// 引入自定义插件对象:注册项目全局组件
import gloablComponent from './components/index'
app.use(gloablComponent)
// 引入全局样式
import '@/styles/index.scss'
import axios from 'axios'
console.log('---发送请求---')
axios({
  url: '/api/user/login',
  method: 'post',
  data: {
    username: 'admin',
    password: '111111',
  },
})
app.mount('#app')
