import { $requst } from '../utils/request'

// 登录相关接口
// 获取当前用户信息
export const getUserInfo = () => {
  return $requst({
    url: '/api/app-base/queryUserInfo',
    method: 'GET'
  })
}