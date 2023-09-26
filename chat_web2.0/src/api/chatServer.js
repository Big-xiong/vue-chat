import store from '@/store'
import request from '@/utils/request'

export function getSellerInfo(params) {
  return request({
    url: '/service/getSysConfig',
    params
  })
}

export function changeServerStatus(data) {
  return request({
    url: '/service/changeUserStatus',
    method: 'post',
    data
  })
}

/**
 * 获取 访客列表
 * @param {*} url
 * @param {*} params
 * @returns
 */

export function getCustomerList(url, params) {
  if (url === '/service/getisNowServiceList') {
    // 当前会话访客
    Object.assign(params, { ...store.state?.chatServer?.sessionConfig })
  }

  return request({
    url,
    params
  })
}

export function getChatList(params) {
  return request({
    url: '/service/getChatLogs',
    params
  })
}

export function getCustomerDetail(params) {
  return request({
    url: '/service/getCustomerInfo',
    params
  })
}

export function addBlockList(data) {
  return request({
    url: '/service/joinBlackList',
    method: 'post',
    data
  })
}

export function updateCustomer(data) {
  return request({
    url: '/service/updateCustomerInfos',
    method: 'post',
    data
  })
}

export function updateCustomerName(data) {
  return request({
    url: '/service/updateCustomerName',
    method: 'post',
    data
  })
}

export function getServerGroup(data) {
  return request({
    url: '/service/reLink',
    method: 'post',
    data
  })
}

export function getDailyWordList(params) {
  return request({
    url: '/Service/wordsIndex',
    params
  })
}
export function getDailyWordListCustom(params) {
  return request({
    url: '/service/indexwordscustom',
    params
  })
}

export function getPlatformList() {
  return request({
    url: '/Service/getPlatformList'
  })
}

export function getPlatformServerList(params) {
  return request({
    url: '/Service/getSellerPlatformkefu',
    params
  })
}

export function getCustomEmojiList(params) {
  return request({
    url: '/service/getEmoList',
    params
  })
}

/**
 * 会话设置
 * @param sort 访客列表排序方式
 * @param retain 对话结束 访客是否保留
 */
export function setSessionConfigAPI(data) {
  return request({
    url: '/Service/KfSessionSet',
    method: 'post',
    data
  })
}

/**
 * 清除 已离线访客
 */
export function cleanSessionAPI() {
  return request({
    url: '/Service/cleanSession'
  })
}

export function delemo(data) {
  return request({
    url: '/Service/delemo',
    method: 'post',
    data
  })
}

/**
 * 获取欢迎语
 */
 export function getHelloWorld() {
    return request({
      url: '/service/kfgetkefuinfo'
    })
}
/**
 * 编辑欢迎语
 */
 export function setHelloWorld(data) {
    return request({
      url: '/service/kfhellword',
      method: 'post',
      data
    })
}
/**
 * 编辑提示音
 */
 export function setKfsound(data) {
    return request({
      url: '/service/kfsound',
      method: 'post',
      data
    })
}
