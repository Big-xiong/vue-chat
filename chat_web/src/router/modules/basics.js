/**
 $ @Author: Elvis
 $ @Date: 2022-07-28 16:36:32
 $ @LastEditors: 简锋 feng.jian@lantaiyuan.com
 $ @LastEditTime: 2022-07-28 16:42:43
 $ @Description: 
 $ @FilePath: \aichat_web\src\router\modules\basics.js
 */
export default [
    {
        path: "/",
        name: "Home",
        component: () => import("@/views/Home.vue"),
    },
    {
        path: "/about",
        name: "About",
        component: () => import("@/views/About.vue"),
    },
    {
        path: "/price",
        name: "Price",
        component: () => import("@/views/Price.vue"),
    },
    {
        path: "/pay/:sellerCode?",
        name: "Pay",
        component: () => import("@/views/Pay.vue"),
    },
    {
        path: "/download",
        name: "download",
        component: () => import("@/views/Download.vue"),
    },
    {
        path: "/contact",
        name: "Contact",
        component: () => import("@/views/Contact.vue"),
    },
    {
        path: "/login",
        name: "Login",
        meta: {
            hideFooter: true
        },
        component: () => import("@/views/Login.vue"),
    },
    {
        path: "/service/login",
        name: "serviceLogin",
        component: () => import("@/views/serviceLogin.vue"),
    },
    {
        path: "/register",
        name: "Register",
        meta: {
            hideFooter: true
        },
        component: () => import("@/views/Register.vue"),
    },
    {
        path: "/faq",
        name: "FAQ",
        component: () => import("@/views/FAQ.vue"),
    },
    {
        // 找回密码
        path: "/retrieve",
        name: "RetrievePassword",
        meta: {
            hideFooter: true
        },
        component: () => import("@/views/RetrievePassword.vue"),
    },
    {
        // 重置密码
        path: "/reset-password",
        name: "ResetPassword",
        meta: {
            hideFooter: true
        },
        component: () => import("@/views/ResetPassword.vue"),
    },
    {
        // 谷歌验证1
        path: "/GoogleCheckStep1",
        name: "GoogleCheckStep1",
        meta: {
            hideFooter: true
        },
        component: () => import("@/views/GoogleCheckStep1.vue"),
    },
    {
        // 谷歌验证2
        path: "/GoogleCheckStep2",
        name: "GoogleCheckStep2",
        meta: {
            hideFooter: true
        },
        component: () => import("@/views/GoogleCheckStep2.vue"),
    },
    {
        // 谷歌验证3
        path: "/GoogleCheckStep3",
        name: "GoogleCheckStep3",
        meta: {
            hideFooter: true
        },
        component: () => import("@/views/GoogleCheckStep3.vue"),
    },
];
