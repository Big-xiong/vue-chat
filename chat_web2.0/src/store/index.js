import Vue from 'vue'
import Vuex from 'vuex'
import getters from './getters'
import app from './modules/app'
import user from './modules/user'
import auth from './modules/auth'
import settings from './modules/settings'
import tagsView from './modules/tagsView'
import permission from './modules/permission'
import chatClient from './modules/chatClient'
import chatServer from './modules/chatServer'

Vue.use(Vuex)

const store = new Vuex.Store({
  modules: {
    app,
    user,
    auth,
    tagsView,
    settings,
    permission,
    chatClient,
    chatServer
  },
  getters
})

export default store
