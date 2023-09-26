import request from '@/utils/request'

export function getBlackList(params) {
  return request({
    url: '/api/Blacklist',
    params
  })
}

export function deleteBlackList(params) {
  return request({
    url: '/api/delBlacklist',
    params
  })
}
