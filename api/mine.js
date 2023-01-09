import { $requst } from '../utils/request'
var app = getApp();
// 新增检查点
export const insertCheckPoint = (name,businessType,categoryCode,areaOrgCode,streetOrgCode,address,connectName,connectTel,latitude,longitude) => {
  return $requst({
    url: '/api/app-my/appInsertCheckPoint',
    method: 'POST',
    data: {
      name: name,
      businessType: businessType,
      categoryCode: categoryCode,
      areaOrgCode: areaOrgCode,
      streetOrgCode: streetOrgCode,
      address: address,
      connectName: connectName,
      connectTel: connectTel,
      checkPersonId: app.globalData.getUserInfo.userId,
      latitude: latitude,
      longitude: longitude,
    }
  })
}
// 查询检查点审核记录
export const getCheckPointExamine = (current,pointName,categoryCode,status) => {
  return $requst({
    url: '/api/app-my/queryCheckPointExaminePage?checkPersonId='+app.globalData.getUserInfo.userId+'&current='+current+'&pageSize='+app.globalData.pageSize+'&pointName='+pointName+'&categoryCode=' +categoryCode+ '&status=' + status,
    method: 'POST'
  })
}
