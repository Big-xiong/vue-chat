

const state = {
    sidebar: {
        opened: sessionStorageCompatible.getItem('sidebarStatus') ? !!+sessionStorageCompatible.getItem('sidebarStatus') : true,
        withoutAnimation: false
    },
    device: 'desktop',
    theme: 'light'
}
const getters = {
    theme (state) {
        return state.theme
    }
}
const mutations = {
    TOGGLE_SIDEBAR: state => {
        state.sidebar.opened = !state.sidebar.opened
        state.sidebar.withoutAnimation = false
        if (state.sidebar.opened) {
            sessionStorageCompatible.setItem('sidebarStatus', 1)
        } else {
            sessionStorageCompatible.setItem('sidebarStatus', 0)
        }
    },
    CLOSE_SIDEBAR: (state, withoutAnimation) => {
        sessionStorageCompatible.setItem('sidebarStatus', 0)
        state.sidebar.opened = false
        state.sidebar.withoutAnimation = withoutAnimation
    },
    TOGGLE_DEVICE: (state, device) => {
        state.device = device
    },
    SET_THEME: (state, theme) => {
        state.theme = theme
    }
}

const actions = {
    toggleSideBar ({ commit }) {
        commit('TOGGLE_SIDEBAR')
    },
    closeSideBar ({ commit }, { withoutAnimation }) {
        commit('CLOSE_SIDEBAR', withoutAnimation)
    },
    toggleDevice ({ commit }, device) {
        commit('TOGGLE_DEVICE', device)
    }
}

export default {
    namespaced: true,
    state,
    getters,
    mutations,
    actions
}
