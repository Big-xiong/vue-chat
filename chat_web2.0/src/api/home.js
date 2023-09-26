import request from '@/utils/request'

export function getHomeInfo(params) {
  return request({
    url: '/api/sellerhome',
    params
  })
}

export function getServerList() {
  return request({
    url: '/api/sellerKFOnline'
  })
}
