// 创建用户相关的小仓库
import { defineStore } from 'pinia'
// 引入接口
import { reqLogin, reqUserInfo, reqLogout } from '@/api/user'
// 引入类型
import type { LoginFormData, loginResponseData, userInfoReponseData } from '@/api/user/type'
import type { UserState } from './types/type'
import { SET_TOKEN, GET_TOKEN } from '@/utils/token'
// 引入路由(常量路由)
import { constantRoute } from '@/router/routes'
// 引入移除token方法
import { REMOVE_TOKEN } from '@/utils/token'

// 创建用户相关的小仓库
const useUserStore = defineStore('User', {
  // 小仓库存储数据的地方
  state: (): UserState => {
    return {
      token: GET_TOKEN(), // 用户唯一标识token
      menuRoutes: constantRoute, // 菜单路由(根据不同用户返回不同菜单)
      username: '', // 用户名
      avatar: '', // 用户头像
    }
  },
  actions: {
    // 用户登录的方法
    async userLogin(data: LoginFormData) {
      const result: loginResponseData = await reqLogin(data)
      // 登录请求: 成功200 -> 返回token 失败->报错
      if (result.code === 200) {
        this.token = result.data as string
        // 本地存储持久化存储一份
        SET_TOKEN(result.data as string)
        // 能够保证当前async函数返回一个成功的promise
        return 'ok'
      } else {
        return Promise.reject(new Error(result.message))
      }
    },
    // 获取用户信息方法
    async userInfo() {
      // 获取用户信息存储在仓库中
      const result: userInfoReponseData = await reqUserInfo()
      // 如果获取用户信息成功进行存储
      if (result.code === 200) {
        this.username = result.data.name
        this.avatar = result.data.avatar
        return 'ok'
      } else {
        return Promise.reject(new Error(result.message))
      }
    },
    // 退出登录
    async userLogout() {
      const result: any = await reqLogout()
      if (result.code === 200) {
        // 目前没有mock接口
        this.token = ''
        this.username = ''
        this.avatar = ''
        // 清除本地存储
        REMOVE_TOKEN()
        return 'ok'
      } else {
        return Promise.reject(new Error(result.message))
      }
    },
  },
  getters: {},
})
// 对外暴露小仓库
export default useUserStore
