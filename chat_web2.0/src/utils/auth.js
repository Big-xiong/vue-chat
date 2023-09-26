
import store from '@/store'

const TokenKey = 'token'

export function getToken () {
    return sessionStorageCompatible.getItem(TokenKey)
}

export function setToken (token) {
    return sessionStorageCompatible.setItem(TokenKey, token)
}

export function removeToken () {
    return sessionStorageCompatible.removeItem(TokenKey)
}

export function isSellerLogin () {
    return Object.keys(store.state.auth.seller).length
}

export function isServerLogin () {
    return Object.keys(store.state.auth.server).length
}
