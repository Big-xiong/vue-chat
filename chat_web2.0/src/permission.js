import router from './router'
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'
import qs from 'qs'
import store from './store'
NProgress.configure({ showSpinner: false })
import { isSellerLogin, isServerLogin } from '@/utils/auth.js'

router.beforeEach(async (to, from, next) => {
    if( to.path.includes('GoogleCheckStep') ){
        next()
        return
    }
    if (to.path == '/dashboard' && to.fullPath.indexOf('?') != -1) {
        const params = qs.parse(to.fullPath.split('?')[1])
        if (params.token && params.data) {
            store.commit('auth/setToken', params.token)
            if (params.data.indexOf('seller_name') != -1) {
                store.commit('auth/setSeller', JSON.parse(params.data))
            } else {
                next('/')
            }
            next()
            return
        }
    }
    NProgress.start()
    if (to.path.startsWith('/chat/client') || to.path === '/forget-password' ) {
        next()
    } else {
        let { path, params: { sellerCode } } = to
        sellerCode = sellerCode ? `/${sellerCode}` : ''
        if (isSellerLogin() && isServerLogin()) {
            console.log(path,'path');
            // 商户登录、客服登录
            if (path == '/login/seller') {
                next('/')
            } else if (path.includes('/login/server')) {
                next(`/chat/server${sellerCode}`)
            } else {
                next()
            }
        } else if (isSellerLogin() && !isServerLogin()) {
            // 商户登录、客服未登录
            if (path == '/login/seller') {
                next('/')
            } else if (path.includes('/login/server')) {
                next()
            } else {
                if (path.includes('/chat/server')) {
                    next(`/login/server${sellerCode}`)
                } else {
                    next()
                }
            }
        } else if (!isSellerLogin() && isServerLogin()) {
            // 商户未登录、客服登录
            if (path == '/login/seller') {
                next()
            } else if (path.includes('/login/server')) {
                next(`/chat/server${sellerCode}`)
            } else {
                if (path.includes('/chat/server')) {
                    next()
                } else {
                    next('/login/seller')
                }
            }
        } else if (!isSellerLogin() && !isServerLogin()) {
            // 商户未登录、客服未登录
            if (path == '/login/seller') {
                next()
            } else if (path.includes('/login/server')) {
                next()
            } else {
                if (path.includes('/chat/server')) {
                    next(`/login/server${sellerCode}`)
                } else {
                    next('/login/seller')
                }
            }
        }
    }

    NProgress.done()
})

router.afterEach(() => {
    NProgress.done()
})
