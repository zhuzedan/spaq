import { $requst } from '../utils/request'
var app = getApp();
// 检查点分页查询
export const getCheckPointPage = (current,name,streetOrgCode,categoryCode,userLatitude,userLongitude) => {
  return $requst({
    url: '/api/app-check/queryCheckPointPage',
    method: 'GET',
    data: {
      current: current,
      pageSize: app.globalData.pageSize,
      name: name || '',
      streetOrgCode: streetOrgCode || '',
      categoryCode: categoryCode || '',
      userLatitude: userLatitude || '',
      userLongitude: userLongitude || ''
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
// 查询检查项
export const getCheckItem = (categoryCode,orgCode) => {
  return $requst({
    url: '/api/app-check/queryCheckItem',
    method: 'GET',
    data: {
      categoryCode: categoryCode,
      orgCode:orgCode
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
// 新增报告表单基础信息
export const insertReportForm = (checkPointId,checkPointNAddress,checkPointName,connectName,connectTel) => {
  return $requst({
    url: '/api/app-check/insertReportForm',
    method: 'POST',
    data: {
      checkPointId: checkPointId,
      checkPointNAddress:checkPointNAddress,
      checkPointName:checkPointName,
      connectName: connectName,
      connectTel: connectTel,
      userId: app.globalData.getUserInfo.userId
    }
  })
}
// 新增图片上传
export const insertReportPhoto = (photoId,photoTypeName,picAdd,reportFormId,sort) => {
  return $requst({
    url: '/api/app-check/insertReportPhoto',
    method: 'POST',
    data: {
      photoId: photoId,
      photoTypeName:photoTypeName,
      picAdd:picAdd,
      reportFormId: reportFormId,
      sort: sort
    }
  })
}