import request from '@/utils/request'

export function getServerList(params) {
  return request({
    url: '/api/Kfindex',
    params
  })
}

export function addServer(data) {
  return request({
    url: '/api/addKeFu',
    method: 'post',
    data
  })
}

export function deleteServer(data) {
  return request({
    url: '/api/delKeFu',
    method: 'post',
    data
  })
}

export function serverHandler(handlerType, data) {
  return request({
    url: `/api/${handlerType}KeFu`,
    method: 'post',
    data
  })
}

export function offlineServer(data) {
  return request({
    url: '/api/offlineKefu',
    method: 'post',
    data
  })
}

export function judgeSameName(params) {
  return request({
    url: '/api/findSellerKeFu',
    params
  })
}

