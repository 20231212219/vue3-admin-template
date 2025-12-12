import SvgIcon from './SvgIcon/index.vue'
import Pagination from './Pagination/index.vue'
const allGlobalComponents = { SvgIcon, Pagination }
export default {
  install(app: App) {
    Object.keys(allGlobalComponents).forEach((key: string) => {
      app.component(key, allGlobalComponents[key])
    })
  },
}
