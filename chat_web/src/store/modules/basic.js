const state = {
    lang: "cn",
    sellerName: "",
    token: "",
    userInfo: ""
};
const actions = {};
const mutations = {
    setSellerName (state, data) {
        state.sellerName = data
    },
    setToken (state, data) {
        state.token = data
    },
    setUserInfo (state, data) {
        state.userInfo = data
    },
    setLang (state, lang) {
        state.lang = lang || "cn";
    }
};
export default { namespaced: true, state, actions, mutations };
