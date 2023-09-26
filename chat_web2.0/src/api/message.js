import request from '@/utils/request'

export function getMessageList(params) {
  return request({
    url: '/api/leave',
    params
  })
}

export function deleteMessage(data) {
  return request({
    url: '/api/delMsg',
    method: 'post',
    data
  })
}

export function readMessage(data) {
  return request({
    url: '/api/readMsg',
    method: 'post',
    data
  })
}

export function readAllMessage(data) {
  return request({
    url: '/api/readAll',
    method: 'post',
    data
  })
}

export function getUnreadMessage() {
  return request({
    url: '/api/leaveIndex'
  })
}
