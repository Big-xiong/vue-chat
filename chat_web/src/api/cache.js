import Cache from 'web-storage-cache'
import Cookies from 'js-cookie'

const lsCache = new Cache()
const ssCache = new Cache({ storage: 'sessionStorage' })

// 所有存储键
const KEYS = {
    token: 'basic_token',
    time: 'basic_time',
    seller: 'basic_seller',
    customer: 'basic_customer'
}

/* eslint-disable */
const namespace = (process.env.NODE_ENV === 'production')
    ? (process.env.BUSINESS_ENV == 'prod' ? 'PROD' : 'TEST')
    : 'TEST'
// 为存储键增加命名空间
for (const i in KEYS) {
    if (KEYS.hasOwnProperty(i)) {
        KEYS[i] = `${namespace}:${KEYS[i]}`.toUpperCase()
    }
}
class CommonStorage {
    constructor(type = 'localStorage') {
        this.storage = (type === 'sessionStorage') ? ssCache : lsCache
    }

    save (key, value, exp = null, type = 'localStorage') {
        // 判断是否设置过期选项了
        const options = exp ? { exp: exp } : null
        this.storage.set(key, value, options)
    }

    load (key) {
        return this.storage.get(key)
    }

    remove (key) {
        return this.storage.delete(key)
    }

    clear () {
        return this.storage.clear()
    }

}
export function isSupport () {
    return lsCache.isSupported()
}
export function saveAccess (params, expiredIn) {
    if (params.token) Cookies.set(KEYS.token, params.token, { expires: expiredIn })
    if (params.timeStamp) Cookies.set(KEYS.time, params.timeStamp, { expires: expiredIn })
    if (params.sellerCode) Cookies.set(KEYS.seller, params.sellerCode, { expires: expiredIn })
    if (params.customerId) Cookies.set(KEYS.customer, params.customerId, { expires: expiredIn })
}
export function getAccess () {
    let token = Cookies.get(KEYS.token) || ''
    let time = Cookies.get(KEYS.time) || ''
    let seller = Cookies.get(KEYS.seller) || ''
    let customer = Cookies.get(KEYS.customer) || ''
    return (token || time || seller || customer) ? { token, time, seller, customer } : false
}
export function removeAccess () {
    // lsCache.delete(KEYS.token)
    Cookies.remove(KEYS.token)
    Cookies.remove(KEYS.time)
    Cookies.remove(KEYS.seller)
    Cookies.remove(KEYS.customer)
}

export const lStorage = new CommonStorage()
export const sStorage = new CommonStorage('sessionStorage')

