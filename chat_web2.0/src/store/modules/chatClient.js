
const state = {
    ws: null,
    wsMsg: {},
    platform: {},
    sessionStatus: '',
    transferServer: null,
    uploading: false,
    hasPraised: false,
    firstInitFlag: false,
    praiseVisible: false,
    leaveMsgVisible: false,
    customer: {},
    customerMap: JSON.parse(localStorageCompatible.getItem('customerMap')) || {},
    themeColor: '',
    sp: '',
    serverStatus: '',
    bowserInfo: {},
    serverInfo: {},
    group: '',
    mouseOnEmoji: false,
    inlayer: false,
    mouseOnInput: false,
    inputOverflow: false
}

const mutations = {
    setSP (state, sp) {
        state.sp = sp
    },
    setWS (state, ws) {
        state.ws = ws
    },
    setWsMsg (state, wsMsg) {
        state.wsMsg = wsMsg
    },
    setInlayer (state, inlayer) {
        state.inlayer = inlayer
    },
    setGroup (state, group) {
        state.group = group
    },
    setServerStatus (state, serverStatus) {
        state.serverStatus = serverStatus
    },
    setPlatform (state, platform) {
        const { robotname, robotmessage, robotquest, robotcolse } = platform.domainInfo
        platform.domainInfo.robotname = robotname || '智能客服小美'
        platform.domainInfo.robotquest = robotquest || '不太明白您的问题，不过我正在努力的学习中'
        platform.domainInfo.robotcolse = robotcolse || '智能客服感谢您的使用。下次再见'
        platform.domainInfo.robotmessage = robotmessage || '智能客服为您服务'
        state.platform = platform
    },
    setUploading (state, uploading) {
        state.uploading = uploading
    },
    setHasPraised (state, hasPraised) {
        state.hasPraised = hasPraised
    },
    setServerInfo (state, serverInfo) {
        state.serverInfo = serverInfo || {}
        if (state.inlayer) {
            localStorageCompatible.setItem('cacheServerCode', serverInfo.kefu_code)
        }
    },
    setServerCode (state, serverCode) {
        state.serverInfo.kefu_code = serverCode
    },
    setFirstInitFlag (state, flag) {
        state.firstInitFlag = flag
    },
    setSessionStatus (state, status) {
        state.sessionStatus = status
    },
    setTransferServer (state, transferServer) {
        state.transferServer = transferServer
    },
    initCustomer (state) {
        let exist = false; let customer
        for (const url in state.customerMap) {
            if (url === location.href) {
                exist = true
                customer = state.customerMap[url]
            }
        }
        if (exist) {
            // 访客已存在，复用即可
            state.customer = customer
        } else {
            // 访客不存在，需要创建
            const id = Number(Math.random().toString().substr(3, 4) + Date.now()).toString(36)
            const customer = { id, name: `访客${id}` }
            state.customer = customer
            state.customerMap[location.href] = customer
            localStorageCompatible.setItem('customerMap', JSON.stringify(state.customerMap))
        }
    },
    setThemeColor (state, themeColor) {
        state.themeColor = themeColor
    },
    setPraiseVisible (state, visible) {
        state.praiseVisible = visible
    },
    setLeaveMsgVisible (state, visible) {
        state.leaveMsgVisible = visible
    },
    sendQuestion (state, question) {
        const { ws, serverInfo: { kefu_name, kefu_code }, customer: { id: uid } } = state
        ws?.send(JSON.stringify({
            cmd: 'comQuestion',
            data: {
                uid, kefu_code, kefu_name,
                question_id: question.question_id,
                seller_code: state.platform.domainInfo.seller_code
            }
        }))
    },
    sendToServer (state, content) {
        const { message, chatNo } = content
        const { ws, serverInfo: { kefu_name, kefu_code }, platform: { search_engines, sellerInfo: { seller_code }, type }, customer: { id, name }, bowserInfo: { os } } = state
        ws && ws.send(JSON.stringify({
            cmd: 'chatMessage',
            data: {
                type: 0,
                name,
                from_id: id,
                state: type, // 1弹层 2固定 3自由分配
                from_name: name,
                content: message,
                to_name: kefu_name,
                to_id: `KF_${kefu_code}`,
                seller_code: seller_code,
                platform: search_engines,
                system: `${os.name} ${os.versionName}`,
                chatNo,
                from_avatar: `${process.env.VUE_APP_BASE_URL}/static/common/images/customer.png`
            }
        }))
    },
    sendToTransferServer (state, content) {
        const { ws, transferServer: { kefu_name, kefu_code }, platform: { search_engines, sellerInfo: { seller_code }, type }, customer: { id, name } } = state
        ws && ws.send(JSON.stringify({
            cmd: 'chatMessage',
            data: {
                type: 0,
                name,
                from_id: id,
                state: type,
                from_name: name,
                content: content,
                to_name: kefu_name,
                to_id: kefu_code,
                seller_code: seller_code,
                platform: search_engines,
                from_avatar: `${process.env.VUE_APP_BASE_URL}/static/common/images/customer.png`
            }
        }))
    },
    sendPraise (state, praise) {
        state.ws?.send(JSON.stringify({
            cmd: 'praiseKf',
            data: {
                customer_id: praise.customerId,
                service_log_id: praise.sessionId
            }
        }))
    },
    sendHasRead (state, chatId) {
        const { ws, serverInfo, customer } = state
        ws?.send(JSON.stringify({
            cmd: 'readMessage',
            data: {
                mid: chatId,
                uid: customer.id,
                kefucode: serverInfo.kefu_code
            }
        }))
    },
    directConnect (state) {
        let custom;
        const hrefs = location.href.split('/');
        hrefs.forEach(v => {
            if (v.indexOf('custom_') != -1) {
                custom = v.replace('custom_', '')
            }
        })
        const { group, customer: { id, name }, serverInfo: { kefu_code }, platform: { type, token, nowTime, user_info, search_engines, domainInfo: { domain_id, closemessage, evaluate, hello_word, isevaluate, isextension, ishello, isresponse, kfNo, messstate, no_response, seller_code, domain_name } }, bowserInfo: { os, browser } } = state
        state.ws && state.ws.send(JSON.stringify({
            cmd: 'directLinkKF',
            data: {
                uid: id,
                name,
                tk: token,
                type: type,
                group: group,
                messcontent: '',
                evaluate: evaluate,
                seller: seller_code,
                kefu_code: kefu_code,
                user_info: user_info,
                userinfos: custom,
                kfNo: kfNo.toString(),
                t: nowTime.toString(),
                hellowords: hello_word,
                no_response: no_response,
                ishelloo: ishello.toString(),
                search_engines: search_engines,
                messstate: messstate.toString(),
                closemessage: `${closemessage};`,
                isresponse: isresponse.toString(),
                isevaluate: isevaluate.toString(),
                from_url: domain_name,
                isextension: isextension.toString(),
                avatar: `${process.env.VUE_APP_BASE_URL}/static/common/images/customer.png`,
                system: `${os.name} ${os.versionName}`,
                browser: `${browser.name} ${browser.version}`,
                webname: domain_id
            }
        }))
    },
    setBowserInfo (state, bowserInfo) {
        state.bowserInfo = bowserInfo
    },
    setMouseOnEmoji (state, mouseOnEmoji) {
        state.mouseOnEmoji = mouseOnEmoji
    },
    setMouseOnInput (state, mouseOnInput) {
        state.mouseOnInput = mouseOnInput
    },
    setInputOverflow (state, inputOverflow) {
        state.inputOverflow = inputOverflow
    },
    ping (state) {
        state.ws?.send(JSON.stringify({
            cmd: 'ping'
        }))
    },
    closeCustomer (state) {
        const {
            customer: { id },
            serverInfo: { kefu_code },
            platform: { search_engines }
        } = state
        state.ws?.send(
            JSON.stringify({
                cmd: 'onClosecustomer',
                data: {
                    uid: id,
                    kfcode: kefu_code,
                    search_engines: search_engines
                }
            })
        )
    }
}

export default {
    namespaced: true,
    state,
    mutations
}
