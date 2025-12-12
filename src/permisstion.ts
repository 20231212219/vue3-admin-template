// 路由鉴权,项目中需要实现路由鉴权功能,访问权限的控制
import router from '@/router'
import nprogress from 'nprogress'
import setting from './setting'
// 引入进度条样式
import 'nprogress/nprogress.css'
nprogress.configure({ showSpinner: false })
// 获取用户相关的小仓库内部token数据,去判断用户是否登录成功(在组价外部使用必须先引入大仓库)
import useUserStore from '@/store//modules/user'
import pinia from './store'
const userStore = useUserStore(pinia)
// 全局前置守卫
router.beforeEach(async (to: any, from: any, next: any) => {
  nprogress.start()
  const token = userStore.token
  // 获取用户名字
  const username = userStore.username
  // 如果有token,说明用户登录成功
  if (token) {
    // 用户已登录
    // 如果用户访问的是登录页面,直接跳转到首页
    if (to.path === '/login') {
      next({ path: '/' })
    } else {
      // 有用户信息
      if (username) {
        next()
      } else {
        // 没有用户信息,派发action进行获取用户信息后在放行
        try {
          // 获取用户信息
          await userStore.userInfo()
          next()
        } catch (error) {
          // token失效获取不到用户信息
          await userStore.userLogout()
          next({ path: '/login', query: { redirect: to.path } })
        }
      }
    }
  } else {
    // 用户未登录
    // 如果用户访问的是登录页面,直接放行
    if (to.path === '/login') {
      next()
    } else {
      // 如果用户访问的不是登录页面,跳转到登录页面
      next({ path: '/login', query: { redirect: to.fullPath } })
    }
  }
})
// 全局后置守卫
router.afterEach((to: any, from: any) => {
  document.title = `${setting.title} - ${to.meta.title}`
  nprogress.done()
})
