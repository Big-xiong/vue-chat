import { isNil } from 'lodash'
import { getLanguage } from '@/lang/index.js'

const state = {
    ws: null,
    wsMsg: {},
    serverStatus: '',
    currentCustomer: [],
    customerDetail: {},
    activeCustomer: {},
    activeSession: '',
    activePlatform: '',
    withdraw: '',
    activeState: '', // 1弹层访客 0都是固定
    platformList: [],
    platformIndex: 0,
    chatLang: 'close',
    clientLang: 'close',
    platformOfflineCustomerList: [],
    platformLastTime: [],
    sessionConfig: (() => {
        let sessionConfig = { sort: 0, retain: 0 }

        if (localStorageCompatible.getItem('sessionConfig')) { sessionConfig = JSON.parse(localStorageCompatible.getItem('sessionConfig')) }

        return sessionConfig
    })()
}

const getters = {
    activeSessionType (state) {
        const { activeSession } = state
        if (activeSession) {
            const arr = activeSession.split('-')
            return arr.length === 1 ? arr[0] : arr[arr.length - 1]
        } else {
            return ''
        }
    },
    layerPlatform (state) {
        const { platformList } = state
        const target = platformList.find((platform) => platform.state === 1)
        return target ? target.domain_title : ''
    },
    offlineCustomerList (state) {
        const { platformOfflineCustomerList, platformIndex } = state
        const offlineCustomerList = platformOfflineCustomerList[platformIndex]
        return offlineCustomerList || []
    },
    lastTime (state) {
        const { platformLastTime, platformIndex } = state
        const lastTime = platformLastTime[platformIndex]
        return lastTime || []
    }
}

const mutations = {
    setWS (state, ws) {
        state.ws = ws
    },
    setWsMsg (state, wsMsg) {
        state.wsMsg = wsMsg
    },
    setActiveSession (state, session) {
        const { activePlatform } = state
        state.activeSession = `${activePlatform}-${session}`
    },
    setServerStatus (state, serverStatus) {
        state.serverStatus = serverStatus
    },
    setActivePlatform (state, activePlatform) {
        state.activePlatform = activePlatform
    },
    setActiveWithdraw (state, withdraw) {
        state.withdraw = withdraw
    },
    setActiveState (state, activeState) {
        state.activeState = activeState
    },
    setPlatformList (state, platformList) {
        state.platformList = platformList || []
    },
    setActiveCustomer (state, customer) {
        state.activeCustomer = customer
    },
    setCurrentCustomer (state, customer) {
        state.currentCustomer = customer
    },
    setCustomerDetail (state, customerDetail) {
        state.customerDetail = customerDetail
    },
    setPlatformIndex (state, index) {
        state.platformIndex = index
    },
    setIdentityInGroup (state, status) {
        // 在群组中 0 邀请方 1 被邀请
        state.activeCustomer.Beinvited = status
    },
    setCustomerInGroup (state) {
        state.activeCustomer.inGroup = true
    },
    removeClosedCustomer (state, customer) {
        const { customer_id } = customer
        const { platformOfflineCustomerList, platformIndex } = state
        const offlineCustomerList = platformOfflineCustomerList[platformIndex]
        if (offlineCustomerList) {
            const index = offlineCustomerList.findIndex(offlineCustomer => offlineCustomer.customer_id === customer_id)
            if (index !== -1) {
                offlineCustomerList.splice(index, 1)
            }
        }
    },
    setOfflineCustomerList (state, customer) {
        const { search_engines, customer_id } = customer
        const { platformOfflineCustomerList, platformList } = state
        const platformIndex = platformList.findIndex(platform => platform.domain_title === search_engines)
        if (platformIndex !== -1) {
            const offlineCustomerList = platformOfflineCustomerList[platformIndex]
            if (offlineCustomerList) {
                const index = offlineCustomerList.findIndex(offlineCustomer => offlineCustomer.customer_id === customer_id)
                if (index === -1) {
                    customer.offline = true
                    offlineCustomerList.push(customer)
                } else {
                    customer.offline = true
                    offlineCustomerList.splice(index, 1, customer)
                }
            }
        }
    },
    setLastTime (state, customer) {
        const { search_engines, customer_id } = customer
        const { platformLastTime, platformList } = state
        const platformIndex = platformList.findIndex(platform => platform.domain_title === search_engines)
        if (platformIndex !== -1) {
            const lastTime = platformLastTime[platformIndex]
            if (lastTime) {
                const index = lastTime.findIndex(v => v.customer_id === customer_id)
                if (index === -1) {
                    lastTime.push(customer)
                } else {
                    lastTime.splice(index, 1, customer)
                }
            }
        }
    },
    initPlatformLastTime (state, length) {
        const result = []
        for (let i = 1; i <= length; i++) {
            result.push([])
        }
        state.platformLastTime = result
    },
    initPlatformOfflineCustomerList (state, length) {
        const result = []
        for (let i = 1; i <= length; i++) {
            result.push([])
        }
        state.platformOfflineCustomerList = result
    },
    setSessionConfig (state, data) {
        if (!data) return

        const { sort, retain } = data

        if (!isNil(sort)) state.sessionConfig.sort = sort
        if (!isNil(retain)) state.sessionConfig.retain = retain

        localStorageCompatible.setItem('sessionConfig', JSON.stringify(state.sessionConfig))
    },
    setChatLang (state, data) {
        const langMap = {
            close: 'close',
            zh: 'zh-cn',
            en: 'en',
            vi: 'vi',
            th: 'th',
            es: 'es',
            pt: 'pt',
            ms: 'ms'
        }
        state.chatLang = langMap[data]
    },
    setClientLang (state, data) {
      const langMap = {
          close: 'close',
          zh: 'zh-cn',
          en: 'en',
          vi: 'vi',
          th: 'th',
          es: 'es',
          pt: 'pt',
          ms: 'ms'
      }
      state.clientLang = langMap[data]
  }
}

const actions = {
    init (context) {
        const { state: { ws }, rootState: { auth: { server } } } = context
        ws?.send(JSON.stringify({
            cmd: 'init',
            data: {
                uid: 'KF_' + server.kefu_code
            }
        }))
    },
    ping (context) {
        const { state: { ws }, rootState: { auth: { server } } } = context
        ws?.send(JSON.stringify({
            cmd: 'kfping',
            data: {
                kfcode: server.kefu_code
            }
        }))
    },
    sendMessage (context, content) {
      const { message, cb, lang } = content
        const { state: { ws, activeCustomer, activePlatform, activeState }, rootState: { auth: { server } }, getters: { layerPlatform, offlineCustomerList } } = context
        const offlineCustomer = offlineCustomerList.filter(item => item.customer_id === activeCustomer.customer_id)
        if( !ws || ws.readyState === WebSocket.CLOSED){
            cb && cb()
        }else{
            ws?.send(JSON.stringify({
                cmd: 'chatMessage',
                data: {
                    type: 1,
                    content: message,
                    seller_code: server.seller_code,
                    from_name: server.kefu_name,
                    from_avatar: server.kefu_avatar,
                    from_id: 'KF_' + server.kefu_code,
                    to_id: activeCustomer.customer_id,
                    to_name: activeCustomer.customer_name,
                    chatNo: 0,
                    platform: activeState === 1 ? layerPlatform : activePlatform,
                    read: offlineCustomer.length ? 3 : 0,
                    lang
                }
            }))
        }
    },
    sendHasRead (context, chatId) {
        const { state: { ws, activeCustomer: { customer_id } }, rootState: { auth: { server } } } = context
        ws?.send(JSON.stringify({
            cmd: 'readMessage',
            data: {
                mid: chatId,
                uid: customer_id,
                kefucode: server.kefu_code
            }
        }))
    },
    revokeMessage (context, chatId) {
        const { state: { ws, activeCustomer }, rootState: { auth: { server } } } = context
        ws?.send(JSON.stringify({
            cmd: 'revokeMessage',
            data: {
                from_name: server.kefu_name,
                from_avatar: server.kefu_avatar,
                from_id: 'KF_' + server.kefu_code,
                to_id: activeCustomer.customer_id,
                to_name: activeCustomer.customer_name,
                msg_id: chatId,
                seller_code: server.seller_code
            }
        }))
    },
    receiveVisitor (context) {
        const { state: { ws, activeCustomer }, rootState: { auth: { server } } } = context
        ws?.send(JSON.stringify({
            cmd: 'linkByKF',
            data: {
                customer_avatar: activeCustomer.customer_avatar,
                customer_id: activeCustomer.customer_id,
                customer_ip: activeCustomer.customer_ip,
                customer_name: activeCustomer.customer_name,
                kefu_avatar: server.kefu_avatar,
                kefu_code: 'KF_' + server.kefu_code,
                kefu_name: server.kefu_name,
                seller_code: server.seller_code
            }
        }))
    },
    transferSession (context, toServer) {
        const { state: { ws, activeCustomer, activePlatform, activeState }, rootState: { auth: { server } }, getters: { layerPlatform } } = context
        ws?.send(JSON.stringify({
            cmd: 'changeGroup',
            data: {
                customer_id: activeCustomer.customer_id,
                customer_name: activeCustomer.customer_name,
                customer_avatar: activeCustomer.customer_avatar,
                customer_ip: activeCustomer.customer_ip,
                from_kefu_id: 'KF_' + server.kefu_code,
                kefu_avatar: toServer.kefu_avatar,
                to_kefu_id: toServer.kefu_code,
                to_kefu_name: toServer.kefu_name,
                seller_code: server.seller_code,
                state: activeState === 2 ? 0 : activeState,
                platform: activeState === 1 ? layerPlatform : activePlatform
            }
        }))
    },
    transferCustomer (context, { toServer, customer }) {
        const { state: { ws, activePlatform, activeState }, rootState: { auth: { server } }, getters: { layerPlatform } } = context
        ws?.send(JSON.stringify({
            cmd: 'changeGroup',
            data: {
                customer_id: customer.customer_id,
                customer_name: customer.customer_name,
                customer_avatar: customer.customer_avatar,
                customer_ip: customer.customer_ip,
                from_kefu_id: 'KF_' + server.kefu_code,
                kefu_avatar: toServer.kefu_avatar,
                to_kefu_id: toServer.kefu_code,
                to_kefu_name: toServer.kefu_name,
                seller_code: server.seller_code,
                state: activeState === 2 ? 0 : activeState,
                platform: activeState === 1 ? layerPlatform : activePlatform
            }
        }))
    },
    closeUser (context, cid) {
        const { state: { ws, activeCustomer }, rootState: { auth: { server } } } = context
        ws?.send(JSON.stringify({
            cmd: 'closeUser',
            data: {
                kefu_code: 'KF_' + server.kefu_code,
                customer_id: cid || activeCustomer.customer_id
            }
        }))
    },
    userInit (context) {
        const { state: { ws }, rootState: { auth: { server } } } = context
        ws?.send(JSON.stringify({
            cmd: 'userInit',
            data: {
                uid: 'KF_' + server.kefu_code
            }
        }))
    },
    offlineServer (context) {
        const { state: { ws, serverStatus }, commit, rootState: { auth: { server } } } = context
        if (serverStatus !== 'offline') {
            ws?.send(JSON.stringify({
                cmd: 'Kfoffline',
                data: {
                    uid: server.kefu_code,
                    sellercode: server.seller_code
                }
            }))
            commit('setServerStatus', 'offline')
            ws?.close()
        }
    },
    onlineServer (context) {
        const { state: { ws }, commit, rootState: { auth: { server } } } = context
        ws?.send(JSON.stringify({
            cmd: 'Kfonline',
            data: {
                uid: server.kefu_code,
                sellercode: server.seller_code
            }
        }))
        commit('setServerStatus', 'online')
    },
    hideServer (context) {
        const { state: { ws }, commit, rootState: { auth: { server } } } = context
        ws?.send(JSON.stringify({
            cmd: 'Kfinvisible',
            data: {
                uid: server.kefu_code,
                sellercode: server.seller_code
            }
        }))
        commit('setServerStatus', 'invisible')
    },
    inviteServer (context, toServer) {
        const { state: { ws, activeCustomer, activePlatform, activeState }, rootState: { auth: { server } }, getters: { layerPlatform } } = context
        ws?.send(JSON.stringify({
            cmd: 'InvitationKf',
            data: {
                timestamp: Date.now(),
                customer_avatar: activeCustomer.customer_avatar,
                customer_id: activeCustomer.customer_id,
                customer_ip: activeCustomer.customer_ip,
                customer_name: activeCustomer.customer_name,
                from_kefu_id: 'KF_' + server.kefu_code,
                from_kefu_name: server.kefu_name,
                kefu_avatar: server.kefu_avatar,
                platform: activeState === 1 ? layerPlatform : activePlatform,
                seller_code: server.seller_code,
                state: activeState === 2 ? 0 : activeState,
                to_kefu_id: toServer.kefu_code,
                to_kefu_name: toServer.kefu_name
            }
        }))
    },
    cancelInvite (context, toServer) {
        const { state: { ws } } = context
        ws?.send(JSON.stringify({
            cmd: 'Disinvite',
            data: {
                to_kefu_id: toServer.kefu_code
            }
        }))
    },
    refuseInvite (context, toServer) {
        const { state: { ws }, rootState: { auth: { server } } } = context
        ws?.send(JSON.stringify({
            cmd: 'closeInvitation',
            data: {
                to_kefu_id: toServer.from_kefu_id.replace('KF_', ''),
                from_kefu_name: server.kefu_name
            }
        }))
    },
    acceptInvitation (context, inviteInfo) {
        const { state: { ws }, rootState: { auth: { server } } } = context
        ws?.send(JSON.stringify({
            cmd: 'changesession',
            data: {
                customer_avatar: inviteInfo.customer.customer_avatar,
                customer_id: inviteInfo.customer.customer_id,
                customer_ip: inviteInfo.customer.customer_ip,
                customer_name: inviteInfo.customer.customer_name,
                from_kefu_id: inviteInfo.from_kefu_id,
                kefu_avatar: inviteInfo.kefu_avatar,
                platform: inviteInfo.customer.platform,
                seller_code: server.seller_code,
                state: inviteInfo.state,
                to_kefu_id: server.kefu_code,
                to_kefu_name: server.kefu_name
            }
        }))
    },
    closeGroupChat (context) {
        const { state: { ws, activeCustomer }, rootState: { auth: { server } } } = context
        ws?.send(JSON.stringify({
            cmd: 'closeInvitationKf',
            data: {
                from_kefu_id: server.kefu_code,
                customer_id: activeCustomer.customer_id
            }
        }))
    },
    closeWs (context) {
        const { state: { ws } } = context
        ws?.close()
    }
}

export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations
}
