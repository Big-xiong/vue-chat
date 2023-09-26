import request from '@/utils/request'

export function changeAssginType (data) {
    return request({
        url: '/api/editDistribution',
        method: 'post',
        data
    })
}

export function getCustomerList (data) {
    return request({
        url: '/api/getTakeCaredCustomer',
        method: 'post',
        data
    })
}

export function getChattxt (data) {
    return request({
        url: '/api/getchattxt',
        method: 'post',
        data
    })
}
export function getchattxtAll (data) {
    return request({
        url: '/api/getchattxtAll',
        method: 'post',
        data
    })
}
export function getChatRecord (data) {
    return request({
        url: '/api/getChatLogDetail',
        method: 'post',
        data
    })
}

export function getCustomerDetail (params) {
    return request({
        url: '/api/getServerCustomer',
        params
    })
}

export function getCurAssginType () {
    return request({
        url: '/api/Distributionindex'
    })
}


