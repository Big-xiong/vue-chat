import request from '@/utils/request'

export function getSysConfig(params) {
  return request({
    url: '/api/getSysConfig',
    params
  })
}

export function editRobotInfo(data) {
  return request({
    url: '/api/robotedits',
    method: 'post',
    data
  })
}

export function getKnowledgeList(params) {
  return request({
    url: '/api/robotindex',
    params
  })
}

export function knowledgeHandler(url, data) {
  return request({
    url,
    method: 'post',
    data
  })
}

export function deleteKnowledge(data) {
  return request({
    url: '/api/delKnowledge',
    method: 'post',
    data
  })
}

export function submitKnowledge(data) {
  return request({
    url: '/api/AllAddKnowledge',
    method: 'post',
    data
  })
}

export function exportKnowledge(data) {
  return request({
    url: '/api/exportrobot',
    method: 'post',
    data
  })
}

export function getQuestionList(data) {
  return request({
    url: '/api/question',
    method: 'post',
    data
  })
}

export function questionHander(url, data) {
  return request({
    url,
    method: 'post',
    data
  })
}

export function deleteQuestion(data) {
  return request({
    url: '/api/delNoQuestion',
    method: 'post',
    data
  })
}

export function batchDeleteQuestion(data) {
  return request({
    url: '/api/delAllQuestion',
    method: 'post',
    data
  })
}

export function deleteResolvedQuestion(data) {
  return request({
    url: '/api/delstateQuestion',
    method: 'post',
    data
  })
}
