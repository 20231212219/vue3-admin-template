// 用户相关接口
import request from '@/utils/request'
// 引入类型
import type { LoginFormData, loginResponseData, userInfoReponseData } from './type'
// 项目用户相关的请求地址
enum API {
  LOGIN_URL = '/admin/acl/index/login', // 登录
  USERINFO_URL = '/admin/acl/index/info', // 获取用户信息
  LOGOUT_URL = '/admin/acl/index/logout', // 退出登录
}

// 用户登录接口
export const reqLogin = (data: LoginFormData) => {
  return request.post<any, loginResponseData>(API.LOGIN_URL, data)
}
// 获取用户信息接口
export const reqUserInfo = () => {
  return request.get<any, userInfoReponseData>(API.USERINFO_URL)
}
// 退出登录接口
export const reqLogout = () => {
  return request.post<any, any>(API.LOGOUT_URL)
}
