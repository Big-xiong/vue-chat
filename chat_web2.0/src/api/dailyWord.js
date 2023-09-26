import request from '@/utils/request'

export function getDailyWordList(params) {
  return request({
    url: '/api/wordsIndex',
    params
  })
}

export function deleteDailyWord(data) {
  return request({
    url: '/api/delWord',
    method: 'post',
    data
  })
}

export function dailyWordHandler(url, data) {
  return request({
    url,
    method: 'post',
    data
  })
}

export function getWordTypeList(params) {
  return request({
    url: '/api/indexwords',
    params
  })
}

export function wordTypeHandler(url, data) {
  return request({
    url,
    method: 'post',
    data
  })
}

export function deleteDailyType(data) {
  return request({
    url: '/api/wordsdel',
    method: 'post',
    data
  })
}

// 自定义分类的

// 获取分类列表
export function getWordTypeListCustom(params) {
  return request({
    url: '/service/customindexwords',
    params
  })
}
// 分类新增编辑
export function wordTypeHandlerCustom(url, data) {
  return request({
    url,
    method: 'post',
    data
  })
}
// 删除分类
export function deleteDailyTypeCustom(data) {
  return request({
    url: '/service/delcustom',
    method: 'post',
    data
  })
}

// 获取常用语列表
export function getDailyWordListCustom(params) {
  return request({
    url: '/service/indexwordscustom',
    params
  })
}
// 删除常用语
export function deleteDailyWordCustom(data) {
  return request({
    url: '/service/delWordcustom',
    method: 'post',
    data
  })
}
// 新增编辑常用语
export function dailyWordHandlerCustom(url, data) {
  return request({
    url,
    method: 'post',
    data
  })
}
