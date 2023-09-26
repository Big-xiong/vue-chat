import request from '@/utils/request'

export function getQuestionList(params) {
  return request({
    url: '/api/getquestions',
    params
  })
}

export function questionHandler(url, data) {
  return request({
    url,
    method: 'post',
    data
  })
}

export function deleteQuestion(data) {
  return request({
    url: '/api/delQuestion',
    method: 'post',
    data
  })
}

export function batchDeleteQuestion(data) {
  return request({
    url: '/api/delAllQuestions',
    method: 'post',
    data
  })
}
export function getCateList(params) {
  return request({
    url: '/api/indexquestcate',
    params
  })
}
export function Questcateadd(data) {
  return request({
    url: '/api/Questcateadd',
    method: 'post',
    data
  })
}
export function questcatedit(data) {
  return request({
    url: '/api/questcatedit',
    method: 'post',
    data
  })
}
export function handleCate(url, data) {
  return request({
    url,
    method: 'post',
    data
  })
}
export function questcatedel(data) {
  return request({
    url: '/api/questcatedel',
    method: 'post',
    data
  })
}
