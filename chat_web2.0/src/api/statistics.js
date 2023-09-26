import request from '@/utils/request'

export function getServerEvaluateList(params) {
  return request({
    url: '/api/praise',
    params
  })
}

export function getOverallEvaluateList(params) {
  return request({
    url: '/api/praiseAll',
    params
  })
}

export function getVisitorList(params) {
  return request({
    url: '/api/indexService',
    params
  })
}

export function getVisitorRegionList(params) {
  return request({
    url: '/api/area',
    params
  })
}
