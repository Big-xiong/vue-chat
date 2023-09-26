import request from '@/utils/request'

export function leaveMessage (data) {
    return request({
        url: '/auth/leaveMsg',
        method: 'post',
        data
    })
}

export function sendToRobot (data) {
    return request({
        url: '/auth/service',
        method: 'post',
        data
    })
}

export function getDomainInfo (params) {
    return request({
        url: '/api/getSellerDomain',
        params
    })
}

export function getServerInfo (params) {
    return request({
        url: '/api/getKeFuInfoByCode',
        params
    })
}

export function getPlatformInfo (params) {
    return request({
        url: '/auth/chat',
        timeout: 5000,
        params
    })
}

export function getChatList (params) {
    return request({
        url: '/auth/getChatLog',
        params
    })
}

export function confirmPraise (data) {
    return request({
        url: '/auth/praises',
        method: 'post',
        data
    })
}

export function getRequestIp (data) {
  return request({
    url: '/auth/getRequestIp',
    method: 'post',
    data
  })
}
