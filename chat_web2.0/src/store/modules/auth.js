
import { sellerLogin, sellerLogout, getSellerKf,serverLogin, serverLogout } from '@/api/auth.js'

const state = {
    seller: sessionStorageCompatible.getItem('seller') ? JSON.parse(sessionStorageCompatible.getItem('seller')) : {},
    server: sessionStorageCompatible.getItem('server') ? JSON.parse(sessionStorageCompatible.getItem('server')) : {},
    serverToken: sessionStorageCompatible.getItem('serverToken') || '',
    token: sessionStorageCompatible.getItem('token') || ''
}

const mutations = {
    setToken (state, token) {
        state.token = token
        sessionStorageCompatible.setItem('token', token)
    },
    setServerToken (state, token) {
        state.serverToken = token
        sessionStorageCompatible.setItem('serverToken', token)
    },
    setSeller (state, seller) {
        if (seller) {
            state.seller = seller
            sessionStorageCompatible.setItem('seller', JSON.stringify(seller))
        } else {
            state.seller = {}
            sessionStorageCompatible.removeItem('seller')
        }
    },
    setServer (state, server) {
        if (server) {
            state.server = server
            sessionStorageCompatible.setItem('server', JSON.stringify(server))
        } else {
            state.server = {}
            sessionStorageCompatible.removeItem('server')
        }
    }
}

const actions = {
    async sellerLogin (context, params) {
        const result = await sellerLogin(params)
        // if (result.code === 0) {
        //     context.commit('setToken', result.token)
        //     context.commit('setSeller', result.data)
        // }
        return result
    },
    async sellerLogout (context) {
        const result = await sellerLogout()
        if (result.code === 0) {
            context.commit('setToken', '')
            context.commit('setSeller', null)
            localStorageCompatible.removeItem('sessionRecordFilter')
        }
        return result
    },
    async serverLogin (context, params) {
        const result = await serverLogin(params)
        // if (result.code === 0) {
        //     context.commit('setServer', result.data)
        //     context.commit('setServerToken', result.KfToken)
        // }
        return result
    },
    async sellerServerLogin (context, params) {
        const result = await getSellerKf(params)
        if (result.code === 0) {
            context.commit('setServer', result.data)
            context.commit('setServerToken', result.KfToken)
        }
        return result
    },
    async serverLogout ({ commit, state }) {
        const { seller_code: sellerCode, kefu_code: kefuCode } = state.server
        const result = await serverLogout({ sellerCode, kefuCode })
        if (result.code === 0) {
            commit('setServer', null)
            commit('setServerToken', '')
        }
        return result
    }
}

export default {
    namespaced: true,
    state,
    mutations,
    actions
}
