import Vue from 'vue'
import Vuex from 'vuex'
import basic from './modules/basic'
import VuexPersistence from 'vuex-persist/dist/cjs/index.js'

const vuexLocal = new VuexPersistence({
    modules: ['basic'],
    storage: window.sessionStorage
})
Vue.use(Vuex)

export default new Vuex.Store({
    strict: process.env.NODE_ENV !== 'production',
    modules: {
        basic
    },
    plugins: [vuexLocal.plugin]

})
