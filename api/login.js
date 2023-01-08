import { $requst } from '../utils/request'

// 登录相关接口
// 获取当前用户信息
export const getUserInfo = () => {
  console.log('获取用户信息');
  return $requst({
    url: '/api/base/getUserInfo',
    method: 'GET'
  })
}