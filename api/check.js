import { $requst } from '../utils/request'
var app = getApp();
// 检查点分页查询
export const getCheckPointPage = (current,name) => {
  return $requst({
    url: '/api/app-check/queryCheckPointPage',
    method: 'GET',
    data: {
      current: current,
      pageSize: app.globalData.pageSize,
      name: name || ''
    }
  })
}
// 查询单个检查点详情
export const getCheckPointOne = (checkPointId) => {
  return $requst({
    url: '/api/app-check/queryCheckPointOne',
    method: 'GET',
    data: {
      checkPointId: checkPointId
    }
  })
}
// 查询检查表图片类型与名称
export const getCheckPhotoList = (categoryCode,orgCode) => {
  return $requst({
    url: '/api/app-check/queryCheckPhotoList',
    method: 'GET',
    data: {
      categoryCode: categoryCode,
      orgCode:orgCode
    }
  })
}
