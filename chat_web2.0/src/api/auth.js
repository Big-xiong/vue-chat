import request from '@/utils/request'

export function sellerLogin(data) {
  return request({
    url: '/auth/doLogin',
    method: 'post',
    data
  })
}

export function sellerLogout() {
  return request({
    url: '/api/sellerloginOut'
  })
}
export function getSellerKf(data) {
    return request({
      url: '/api/getsellerkf',
      method: 'post',
      data
    })
  }
export function serverLogin(data) {
  return request({
    url: '/auth/login',
    method: 'post',
    data
  })
}

export function serverLogout(data) {
  return request({
    url: '/auth/loginOut',
    method: 'post',
    data
  })
}

export function editPassword(data) {
  return request({
    url: '/api/editPwd',
    method: 'post',
    data
  })
}

export function getSellerInfo(data) {
  return request({
    url: '/index/user/index',
    method: 'post',
    data
  })
}

export function sendEmailVeriCode(data) {
  return request({
    url: '/index/seller/email',
    method: 'post',
    data
  })
}

export function resetPassword(data) {
  return request({
    url: '/index/seller/repwd',
    method: 'post',
    data
  })
}

export function getLoginPic(data) {
  return request({
    url: '/Auth/getpic',
    method: 'post',
    data
  })
}

//更新秘钥
export function isKfInfosecret(data) {
  return request({
    url: '/service/isKfInfosecret',
    method: 'post',
    data
  })
}
//获取谷歌验证器的秘钥和二维码图片链接
export function getGoogle(data) {
  return request({
    url: '/auth/getgoole',
    method: 'post',
    data
  })
}
//谷歌验证
export function checkGoogle(data) {
  return request({
    url: '/auth/checkgoole',
    method: 'post',
    data
  })
}
