import request from '@/utils/request'

export function getPlatformList(params) {
  return request({
    url: '/api/indexdomain',
    params
  })
}

export function deletePlatform(data) {
  return request({
    url: '/api/deldomain',
    method: 'post',
    data
  })
}

export function platformHandler(url, data) {
  return request({
    url,
    method: 'post',
    data
  })
}
