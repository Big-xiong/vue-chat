import Vue from "vue";
import App from "./App.vue";
import i18n from "./utils/i18n";
import store from "./store";
import router from "./router";
import Api from "./api";
import ElementUI, { Message } from "element-ui";
import "element-ui/lib/theme-chalk/index.css";
import locale from "element-ui/lib/locale/lang/zh-CN";
import "./styles/base.scss";
import 'wowjs/css/libs/animate.css'
import VueClipboard from 'vue-clipboard2'
Vue.prototype.$api = Api;
Vue.prototype.$message = Message;
Vue.use(VueClipboard)
Vue.use(ElementUI, { locale });
Vue.config.productionTip = false
Vue.mixin({
    computed: {
        isMobile () {
            if (
                /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
                    navigator.userAgent
                )
            ) {
                return true;
            } else {
                return false;
            }
        },
    },
    methods: {},
});
window.vm = new Vue({
    i18n,
    store,
    router,
    render: (h) => h(App),
}).$mount("#app");
