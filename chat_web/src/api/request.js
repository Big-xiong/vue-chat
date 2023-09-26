/**
 $ @Author: Elvis
 $ @Date: 2022-07-28 16:36:32
 $ @LastEditors: 简锋 feng.jian@lantaiyuan.com
 $ @LastEditTime: 2022-07-28 16:40:00
 $ @Description: 
 $ @FilePath: \aichat_web\src\api\request.js
 */
import axios from 'axios'
import Qs from 'qs'

import { Message } from 'element-ui';
import { getAccess, removeAccess } from './cache'

/* eslint-disable no-unused-vars */
// console.log(process.env,'process');
export let apiRoot = process.env.VUE_APP_API_BASE

axios.defaults.baseURL = apiRoot
axios.defaults.headers.Accept = 'application/json'
// console.log(axios.defaults,'axios.defaults');
// axios.defaults.withCredentials = true // 允许携带cookie

const goAuth = () => {
    removeAccess()
    let indexPage = `${window.location.origin}`
    window.location.href = indexPage
}

const responseStatus500 = (url, content) => {
    Message.alert(
        `<div style="height: 300px;overflow: scroll">${content} ${url}</div>`,
        '服务器出错',
        {
            dangerouslyUseHTMLString: true,
        }
    ).then(() => {
        // window.location.reload()
    })
}

const responseStatus404 = (url) => {
    Message.alert(`正在全力修复~ <div>tips from ${url}</div>`, '网页出错了', {
        dangerouslyUseHTMLString: true,
    }).then(() => {
        // window.location.reload()
    })
}

axios.interceptors.request.use(
    function (config) {
        // post, put, patch 会把数据放到 body ，所以需要序列化
        const exData = getAccess()
        if (typeof config.data === 'object' && exData !== '') {
            config.data.tk = exData.token
            config.data.t = exData.time
            config.data.customer_id = localStorage.getItem('uid')
            config.data.seller_code = exData.seller
        }
        if (
            config.method === 'post' ||
            config.method === 'put' ||
            config.method === 'patch'
        ) {
            config.transformRequest = [
                function (data, headers) {
                    return Qs.stringify(data)
                },
            ]
        }
        return config
    },
    function (error) {
        return Promise.reject(error)
    }
)

axios.interceptors.response.use(
    function (response) {
        return response.data
    },
    function (error) {
        if (error.response) {
            if (error.response.status === 500) {
                responseStatus500(error.response.config.url, error.response.data)
                return
            } else if (error.response.status === 404) {
                responseStatus404(error.response.config.url)
                return
            } else if (getAccess()) {
                if (error.response.status === 401) {
                    // 授权过期
                    goAuth()
                    console.log('回调后前往授权')
                } else {
                    console.log(error.response)
                }
            }
            return Promise.reject(error.response.data)
        } else if (error.request) {
            return Promise.reject('请求异常情况，错误码：101')
        }
        return Promise.reject(error)
    }
)
export const request = axios
