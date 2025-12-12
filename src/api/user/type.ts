//登录接口需要携带参数ts类型
export interface LoginFormData {
  username: string
  password: string
}
// 定义全部接口返回数据都有ts类型
export interface ResponseData {
  code: number
  message: string
  ok: boolean
}

//登录接口返回数据ts类型
export interface loginResponseData extends ResponseData {
  data: string
}

//获取用户信息返回数据ts类型
export interface userInfoReponseData extends ResponseData {
  data: {
    routes: string[]
    roles: string[]
    buttons: string[]
    name: string
    avatar: string
  }
}
