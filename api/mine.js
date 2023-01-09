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