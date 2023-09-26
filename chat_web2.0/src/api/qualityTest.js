import request from '@/utils/request'

export function qualitySwitchHandler(data) {
  return request({
    url: '/api/isquality',
    method: 'post',
    data
  })
}

export function getPlatformQuality(data) {
  return request({
    url: '/api/getAllQualitylisy',
    method: 'post',
    data
  })
}

export function deletePlatformQuality(data) {
  return request({
    url: '/api/delQualityStatus',
    method: 'post',
    data
  })
}

export function setQualityPlatform(data) {
  return request({
    url: '/api/setQualityStatus',
    method: 'post',
    data
  })
}

export function addQualityIndex(data) {
  return request({
    url: '/api/addQuality',
    method: 'post',
    data
  })
}

export function updateQualityIndex(data) {
  return request({
    url: '/api/updateQuality',
    method: 'post',
    data
  })
}

export function deleteQualityIndex(data) {
  return request({
    url: '/api/delQuality',
    method: 'post',
    data
  })
}

export function getQualityList() {
  return request({
    url: '/api/getQualityInfo'
  })
}

export function getScheduleTable() {
  return request({
    url: '/api/getsellerestList'
  })
}

export function addScheduleServer(data) {
  return request({
    url: '/api/addRest',
    method: 'post',
    data
  })
}

export function editScheduleServer(data) {
  return request({
    url: '/api/updaterest',
    method: 'post',
    data
  })
}

export function deleteScheduleTable(data) {
  return request({
    url: '/api/delwatch',
    method: 'post',
    data
  })
}

export function deleteScheduleServer(data) {
  return request({
    url: '/api/delrest',
    method: 'post',
    data
  })
}

export function updateScheduleName(data) {
  return request({
    url: '/api/updateWatch',
    method: 'post',
    data
  })
}

export function addScheduleTable(data) {
  return request({
    url: '/api/insertwatch',
    method: 'post',
    data
  })
}

export function submitScheduleOrder(data) {
  return request({
    url: '/api/updateWatchsort',
    method: 'post',
    data
  })
}

export function getKeywords(params) {
  return request({
    url: '/api/getkeyworkslist',
    method: 'get',
    params
  })
}

export function getkeydelworks(data) {
  return request({
    url: '/api/getkeydelworks',
    method: 'post',
    data
  })
}
export function saveKeywords(data) {
  return request({
    url: '/api/addkeyword',
    method: 'post',
    data
  })
}

export function getPlatformServerList(params) {
  return request({
    url: '/api/getdomianKF',
    method: 'get',
    params
  })
}

export function getQualityReport(params) {
  return request({
    url: '/api/kfgroupindex',
    method: 'get',
    params
  })
}

export function getServerReport(params) {
  return request({
    url: '/api/kefureport',
    method: 'get',
    params
  })
}

export function getLoginRecord(params) {
  return request({
    url: '/api/getloginLogList',
    method: 'get',
    params
  })
}

export function getOvertimeRecord(params) {
  return request({
    url: '/api/gettimeoutList',
    method: 'get',
    params
  })
}

export function getCheckRecord(params) {
  return request({
    url: '/api/getQualitycheck',
    method: 'get',
    params
  })
}

export function getEvaluateRecord(params) {
  return request({
    url: '/api/getKfprise',
    method: 'get',
    params
  })
}

export function getkefuNO(params) {
  return request({
    url: '/api/getkefuNO',
    method: 'get',
    params
  })
}

export function getSellerInfo() {
  return request({
    url: '/api/getsellerinfos'
  })
}

export function exporquality(params) {
  return request({
    url: '/api/exporquality',
    method: 'get',
    params
  })
}

// 获取抽查信息
export function getCheckInfo(params) {
  return request({
    url: '/api/getcheckInfo',
    method: 'get',
    params
  })
}
// 发起抽查
export function addQualitycheck(data) {
  return request({
    url: '/api/addQualitycheck',
    method: 'post',
    data
  })
}
// 编辑抽查
export function updateQualitycheck(data) {
  return request({
    url: '/api/updateQualitycheck',
    method: 'post',
    data
  })
}
