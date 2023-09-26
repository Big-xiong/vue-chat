import request from '@/utils/request'

export function uploadImg(data) {
  return request({
    url: '/index/upload/uploadImg',
    method: 'post',
    data
  })
}

export function uploadKfImg(data) {
  return request({
    url: '/index/upload/uploadKfImg',
    method: 'post',
    data
  })
}

// client 上传图片
export function uploadKFile(data) {
  return request({
    url: '/index/upload/uploadFile',
    method: 'post',
    data
  })
}

export function getUseInfo(data) {
  return request({
    url: '/api/howToUse',
    method: 'post',
    data
  })
}

export function getPlatformInfo(params) {
  return request({
    url: '/api/getdomain',
    params
  })
}

export function getPlatformList() {
  return request({
    url: '/api/getDomainLists'
  })
}

export function getPlatformFuzzy(params) {
  return request({
    url: '/api/getBydomainName',
    params
  })
}

export function editPlatformInfo(data) {
  return request({
    url: '/api/editdomian',
    method: 'post',
    data
  })
}

export function uploadVoice(data) {
  return request({
    url: '/index/upload/uploadVoice',
    method: 'post',
    data
  })
}
