import request from '@/utils/request'

export function getParamsList(params) {
  return request({
    url: '/api/indexParams',
    params
  })
}

export function getUsableParams() {
  return request({
    url: '/api/default_params'
  })
}

export function paramsHandler(url, data) {
  return request({
    url,
    method: 'post',
    data
  })
}

export function invokeParams() {
  return request({
    url: '/api/setCurrentParams'
  })
}

export function deleteParams(data) {
  return request({
    url: '/api/delParams',
    method: 'post',
    data
  })
}

