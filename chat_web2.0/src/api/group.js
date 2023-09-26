import request from '@/utils/request'

export function getGroupList(data) {
  return request({
    url: '/api/groupindex',
    method: 'post',
    data
  })
}

export function groupHandler(url, data) {
  return request({
    url,
    method: 'post',
    data
  })
}

export function deleteGroup(params) {
  return request({
    url: '/api/delGroup',
    method: 'get',
    params
  })
}
