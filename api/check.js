import { $requst } from '../utils/request'
var app = getApp();
// 检查点分页查询
export const getCheckPointPage = (current) => {
  return $requst({
    url: '/api/app-check/queryCheckPointPage',
    method: 'GET',
    data: {
      current: current,
      pageSize: app.globalData.pageSize
    }
  })
}