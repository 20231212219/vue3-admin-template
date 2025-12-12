import SvgIcon from './SvgIcon/index.vue'
import Pagination from './Pagination/index.vue'
import Category from './Category/index.vue'
// 引入element-plus提供的区别图标组件
import * as ElementPlusIconsVue from '@element-plus/icons-vue'
const allGlobalComponents = { SvgIcon, Pagination, Category }
export default {
  install(app: App) {
    Object.keys(allGlobalComponents).forEach((key: string) => {
      app.component(key, allGlobalComponents[key])
    })
    // 将element-plus提供图标注册为全局组件
    for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
      app.component(key, component)
    }
  },
}
