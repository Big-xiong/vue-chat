import Vue from 'vue'
import Router from 'vue-router'
Vue.use(Router)

import Layout from '@/layout'
import isElectron from 'is-electron'
const isElectronFlag = isElectron()
export const constantRoutes = [
  // 主页
  {
    path: '/',
    component: Layout,
    redirect: process.env.VUE_APP_ENTRY == 'SERVER' ? '/login/server' : '/dashboard',
    children: [{
      path: 'dashboard',
      name: 'Dashboard',
      component: () => import('@/views/dashboard/index'),
      meta: { title: 'dashboard', icon: 'home', noCache: true }
    }]
  },
  // 商户登录
  {
    path: '/login/seller',
    component: () => import('@/views/login/seller'),
    name: 'SellerLogin',
    hidden: true
  },
  // 客服登录
  {
    path: '/login/server/:sellerCode?',
    component: () => import('@/views/login/server'),
    name: 'ServerLogin',
    hidden: true
  },
  // 忘记密码
  {
    path: '/forget-password',
    component: () => import('@/views/forgetPassword'),
    name: 'ForgetPassword',
    hidden: true
  },
  // 域名绑定
  {
    path: '/platform',
    component: Layout,
    children: [
      {
        path: 'index',
        name: 'PlatformList',
        component: () => import('@/views/platform/index'),
        meta: { title: 'platformList', icon: 'token', noCache: true }
      }
    ]
  },
  // 分组
  {
    path: '/group',
    component: Layout,
    children: [
      {
        path: 'index',
        name: 'GroupList',
        component: () => import('@/views/group/index'),
        meta: { title: 'groupList', icon: 'group_add', noCache: true }
      }
    ]
  },
  // 客服列表
  {
    path: '/server',
    component: Layout,
    children: [
      {
        path: 'index',
        name: 'ServerList',
        component: () => import('@/views/server/index'),
        meta: { title: 'serverList', icon: 'person_add', noCache: true }
      }
    ]
  },
  // 接入客服
  {
    path: '/connectServer',
    component: Layout,
    children: [
      {
        path: 'index',
        name: 'ConnectServer',
        component: () => import('@/views/connectServer/index'),
        meta: { title: 'connectServer', icon: 'person_pin_circle', noCache: true }
      }
    ]
  },
  // 自定义参数
  {
    path: '/customParams',
    component: Layout,
    children: [
      {
        path: 'index',
        name: 'CustomParams',
        component: () => import('@/views/customParams/index'),
        meta: { title: 'customParams', icon: 'fact_check', noCache: true }
      }
    ]
  },
  // 会话管理
  {
    path: '/talk',
    component: Layout,
    redirect: 'noRedirect',
    alwaysShow: true,
    name: 'TalkManage',
    meta: {
      title: 'talkManage',
      icon: 'forum'
    },
    children: [
      {
        path: 'record',
        component: () => import('@/views/talkManage/record'),
        name: 'TalkRecord',
        meta: { title: 'talkRecord', noCache: true }
      },
      {
        path: 'replay',
        component: () => import('@/views/talkManage/autoReplay'),
        name: 'AutoReplay',
        meta: { title: 'autoReplay', noCache: true }
      },
      {
        path: 'message',
        component: () => import('@/views/talkManage/message'),
        name: 'MessageList',
        meta: { title: 'messageList', noCache: true }
      },
      {
        path: 'assign',
        component: () => import('@/views/talkManage/assign'),
        name: 'TalkAssign',
        meta: { title: 'talkAssign', noCache: true }
      }
    ]
  },
  // 客服质检
  {
    path: '/qualityTest',
    component: Layout,
    redirect: 'noRedirect',
    alwaysShow: true,
    name: 'QualityTest',
    meta: {
      title: 'qualityTest',
      icon: 'assignment_turned_in'
    },
    children: [
      {
        path: 'qualityScore',
        name: 'QualityScore',
        component: () => import('@/views/qualityTest/qualityScore'),
        meta: { title: 'qualityScore', noCache: true }
      },
      {
        path: 'qualityTable',
        name: 'QualityTable',
        component: () => import('@/views/qualityTest/qualityTable'),
        meta: { title: 'qualityTable', noCache: true }
      },
      {
        path: 'serverTable',
        name: 'ServerTable',
        component: () => import('@/views/qualityTest/serverTable'),
        meta: { title: 'serverTable', noCache: true }
      }
    ]
  },
  // 常用语管理
  {
    path: '/dailyWord',
    component: Layout,
    redirect: 'noRedirect',
    alwaysShow: true,
    name: 'DailyWord',
    meta: {
      title: 'dailyWord',
      icon: 'message'
    },
    children: [
      {
        path: 'type',
        component: () => import('@/views/dailyWord/type'),
        name: 'DailyWordType',
        meta: { title: 'dailyWordType', noCache: true }
      },
      {
        path: 'list',
        component: () => import('@/views/dailyWord/list'),
        name: 'DailyWordList',
        meta: { title: 'dailyWordList', noCache: true }
      }
    ]
  },
  // 常见问题
  {
    path: '/questions',
    component: Layout,
    children: [
      {
        path: 'index',
        name: 'Questions',
        component: () => import('@/views/questions/index'),
        meta: { title: 'questions', icon: 'quiz', noCache: true }
      }
    ]
  },
  // 机器人客服
  {
    path: '/robotServer',
    component: Layout,
    redirect: 'noRedirect',
    alwaysShow: true,
    name: 'RobotServer',
    meta: {
      title: 'robotServer',
      icon: 'support_agent'
    },
    children: [
      {
        path: 'config',
        component: () => import('@/views/robotServer/config'),
        name: 'RobotConfig',
        meta: { title: 'robotConfig', noCache: true }
      },
      {
        path: 'unknown',
        component: () => import('@/views/robotServer/unknown'),
        name: 'UnknownQuestion',
        meta: { title: 'unknownQuestion', noCache: true }
      }
    ]
  },
  // 黑名单管理
  {
    path: '/blackList',
    component: Layout,
    children: [
      {
        path: 'index',
        name: 'BlackList',
        component: () => import('@/views/blackList/index'),
        meta: { title: 'blackList', icon: 'note_alt', noCache: true }
      }
    ]
  },
  // 数据统计
  {
    path: '/dataStatistics',
    component: Layout,
    redirect: 'noRedirect',
    alwaysShow: true,
    name: 'DataStatistics',
    meta: {
      title: 'dataStatistics',
      icon: 'assessment'
    },
    children: [
      {
        path: 'serverEvaluation',
        component: () => import('@/views/dataStatistics/serverEvaluation'),
        name: 'ServerEvaluation',
        meta: { title: 'serverEvaluation', noCache: true }
      },
      {
        path: 'overallEvaluation',
        component: () => import('@/views/dataStatistics/overallEvaluation'),
        name: 'OverallEvaluation',
        meta: { title: 'overallEvaluation', noCache: true }
      },
      {
        path: 'visitorRecord',
        component: () => import('@/views/dataStatistics/visitorRecord'),
        name: 'VisitorRecord',
        meta: { title: 'visitorRecord', noCache: true }
      },
      {
        path: 'visitorRegion',
        component: () => import('@/views/dataStatistics/visitorRegion'),
        name: 'VisitorRegion',
        meta: { title: 'visitorRegion', noCache: true }
      }
    ]
  },
  // 对聊客户端
  {
    path: '/chat/client/*',
    component: () => import('@/views/chat/client'),
    name: 'ChatClient',
    hidden: true
  },
  {
    // 谷歌验证1
    path: '/GoogleCheckStep1',
    name: 'GoogleCheckStep1',
    hidden: true,
    component: () => import('@/views/GoogleCheckStep1/index.vue')
  },
  {
    // 谷歌验证2
    path: '/GoogleCheckStep2',
    name: 'GoogleCheckStep2',
    hidden: true,
    component: () => import('@/views/GoogleCheckStep2/index.vue')
  },
  {
    // 谷歌验证3
    path: '/GoogleCheckStep3',
    name: 'GoogleCheckStep3',
    hidden: true,
    component: () => import('@/views/GoogleCheckStep3/index.vue')
  },
  // 对聊服务端
  {
    path: '/chat/server/:sellerCode?',
    component: () => import('@/views/chat/server'),
    name: 'ChatServer',
    hidden: true
  },
  // 重定向
  {
    path: '/redirect',
    component: Layout,
    hidden: true,
    children: [
      {
        path: '/redirect/:path(.*)',
        component: () => import('@/views/redirect/index')
      }
    ]
  },
  // 404
  {
    path: '/404',
    component: () => import('@/views/404'),
    hidden: true
  },
  // 404 page must be placed at the end !!!
  { path: '*', redirect: '/404', hidden: true }
]

export const asyncRoutes = []

const createRouter = () => new Router({
  mode: isElectronFlag ? 'hash' : 'history',
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRoutes
})

const router = createRouter()

export function resetRouter() {
  const newRouter = createRouter()
  router.matcher = newRouter.matcher // reset router
}

export default router
