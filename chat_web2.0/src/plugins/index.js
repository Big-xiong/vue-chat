import Vue from 'vue'
import waves from './waves/waves.js'
import VueClipboard from 'vue-clipboard2'

Vue.directive('waves', waves)
Vue.use(VueClipboard)
