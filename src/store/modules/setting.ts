// 小仓库:layout组件相关配置仓库
import { defineStore } from 'pinia'
import setting from '@/setting'
// @ts-ignore
import defaultBg from '@/assets/images/background.jpg'

const useLayOutSettingStore = defineStore('SettingStore', {
  state: () => {
    return {
      fold: false, //用户控制菜单折叠还是收起
      refsh: false, //控制刷新
      // 主题配置
      title: setting.title,
      logo: setting.logo,
      logoHidden: setting.logoHidden,
      // 数据大屏背景图
      dataScreenBg: '', // 默认背景图路径
      // 登录页背景图
      loginBg: defaultBg,
    }
  },
})
export default useLayOutSettingStore
