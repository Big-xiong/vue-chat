import axios from 'axios'
import store from '@/store'
import router from '@/router'
import { Message } from 'element-ui'

const baseUrl = process.env.VUE_APP_BASE_URL
const service = axios.create({
    baseURL: baseUrl
})
const IS_PRO = process.env.NODE_ENV === 'production'

const switchUrl = ['https://aichatv7.com', 'https://aichatv8.com', 'https://aichatv9.com', 'https://aichatv6.com']

let numberOfErrors = 0
let nowUrl = 'https://aichatv7.com'

// 拦截
service.interceptors.request.use(config => {
    if (IS_PRO && numberOfErrors > 0){
      numberOfErrors = 0
      const index = switchUrl.findIndex(i => i === nowUrl)
      nowUrl = switchUrl[index+1]
      config.baseURL = nowUrl
    }
    // 重写路径
    const { baseURL, url } = config
    const path = url.replace(baseURL, '')
    if (path.startsWith('/index')) {
        // /index/update 上传接口
        config.url = `${baseURL}${path}`
    } else {
        config.url = `${baseURL}/api${path}`
    }

    // 设置token
    if (sessionStorageCompatible.getItem('token')) {
        config.headers.token = sessionStorageCompatible.getItem('token')
    }
    if (sessionStorageCompatible.getItem('serverToken')) {
        config.headers.KfToken = sessionStorageCompatible.getItem('serverToken')
    }

    // 参数去空
    if (config.data) {
        for (var k in config.data) {
            if (config.data[k] === undefined || config.data[k] === null) {
                delete config.data[k]
            }
        }
    }
    if (config.params) {
        for (var k in config.params) {
            if (config.params[k] === undefined || config.params[k] === null) {
                delete config.params[k]
            }
        }
    }
    return config
})

service.interceptors.response.use(response => {
    const { code, msg } = response.data
    if (code === -6) {
        Message.error(msg)
        store.commit('auth/setToken', '')
        store.commit('auth/setSeller', null)
        router.replace('/login/seller')
    } else if (code === -7) {
        const { seller_code } = store.state.auth.server
        Message.error(msg)
        store.commit('auth/setServerToken', '')
        store.commit('auth/setServer', null)
        if (seller_code) {
            router.replace(`/login/server/${seller_code}`)
        }
    }
    return response.data
}, err => {
  // 当响应异常时做一些处理 切换请求地址
  numberOfErrors++
  if (err.config.url.indexOf('/service/getChatLogs')!==-1) {
    Message.error('因网络波动，无法加载该对话的历史消息，请刷新工作台后重试')
  }else{
    Message.error('因网络波动，造成了请求失败，请您重新操作')
  }
  return Promise.resolve(err);
})

export default service
