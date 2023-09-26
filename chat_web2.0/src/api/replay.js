import request from '@/utils/request'

export function getPlatformList() {
  return request({
    url: '/api/getDomainLists'
  })
}

export function getPlatformInfo(params) {
  return request({
    url: '/api/getdomain',
    params
  })
}

export function getPromoteMessageList(data) {
  return request({
    url: '/api/getmessage',
    method: 'post',
    data
  })
}

export function promoteMessageHandler(url, data) {
  return request({
    url,
    method: 'post',
    data
  })
}

export function deletePromoteMessage(data) {
  return request({
    url: '/api/delMess',
    method: 'post',
    data
  })
}

export function editPlatformInfo(data) {
  return request({
    url: '/api/editdomian',
    method: 'post',
    data
  })
}

