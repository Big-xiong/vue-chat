import Vue from 'vue'
import 'normalize.css/normalize.css' // A modern alternative to CSS resets
import ElementUI from 'element-ui'
import '@/styles/element-variables.scss'

import '@/styles/index.scss' // global css

import App from './App'
import store from './store'
import router from './router'

import '@/icons' // icon
import '@/permission' // permission control

import i18n from '@/lang' //
import deepcopy from '@/utils/deepcopy' // 深拷贝
import '@/plugins' // 全局插件
import '@/components' // 全局组件

// 图片放大器
import 'viewerjs/dist/viewer.css'
import VueViewer from 'v-viewer'
import isElectron from 'is-electron'
import { VueJsonp } from 'vue-jsonp'
Vue.use(VueJsonp)
// import VConsole from 'vconsole'
// new VConsole()
Vue.use(VueViewer)
Vue.use(ElementUI, {
    size: 'medium',
    i18n: (key, value) => i18n.t(key, value)
})
window.addEventListener("contextmenu", (e) => {
    if (isElectron()) {
        e.preventDefault();
        if (e.target.id === "") {
            const date = new Date().valueOf();
            e.target.id = date;
        }
        // TODO 通知主线程
        let haveSelect = window.getSelection().type == 'Range';
        let isImg = e.target.tagName == 'IMG';
        let canInput = e.target && (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA' || !!e.target.isContentEditable)
        let params = {
            domId: e.target.id,
            haveSelect,
            isImg,
            canInput
        }
        if (haveSelect || isImg || canInput) {
            window.rightMenu.show(params);
        }
    }
});
import { setCORS } from "google-translate-api-browser";
// 处理google翻译浏览器跨域
const translate = setCORS("https://dev-parrot-corsanywhere.bigxiong.deta.app/");

Vue.config.productionTip = false
Vue.prototype.$deepcopy = deepcopy
Vue.prototype.$IS_ELECTRON = isElectron()
Vue.prototype.$translate = translate
new Vue({
    el: '#app',
    router,
    store,
    i18n,
    render: h => h(App)
})
