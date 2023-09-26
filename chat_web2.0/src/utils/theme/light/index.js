import element from './element'
import { camel2Dashed } from '@/utils/index'

// 头部导航栏
const navbar = {
  bg: '#fff',
  border: '#F6F7FB',
  content: '#666',
  tag: '#495060',
  tagBg: '#fff',
  tagBorder: '#d8dce5',
  copyrightContent: '#72798C',
  copyrightTitle: '#28324C',
  copyrightBg: '#fff',
  copyrightBorder: '#EBEDF0'
}

// 侧边栏菜单
const menu = {
  bg: '#fff',
  text: '#28324C',
  activeText: '#5082F4',
  activeBg: '#edf2fc'
}

// 主体部分
const main = {
  bg: '#F6F7FB',
  innerBg: '#fff'
}

// 主页
const dashboard = {
  statisticsBorder: '#ebeef5',
  statisticsTitle: '#333',
  statisticsNum: '#666',
  th: '#666',
  thBg: '#F6F7FB',
  chartBg: '#fff'
}

// 自动分配
const connectServer = {
  content: '#72798C',
  title: '#28324C',
  code: '#333',
  codeBg: '#F2F2F2',
  codeBorder: '#DDD'
}

// 自定义参数
const customParams = {
  content: '#666'
}

// 会话记录
const talkRecord = {
  border: '#eee',
  content: '#666',
  title: '#28324C',
  customerBg: '#fff',
  customerHeadBg: '#f5f7fa',
  detailLabel: '#72798C',
  detailContent: '#28324C',
  sideLabel: '#28324C'
}

// 自动消息
const talkReplay = {
  border: '#eee',
  platformBg: '#fff',
  tips: '#72798C',
  title: '#28324C'
}

// 会话分配
const talkAssign = {
  head: '#666',
  name: 'rgba(4,15,66,.9)',
  desc: 'rgba(4,15,66,.6)'
}

// 机器人配置
const robotConfig = {
  border: '#eee',
  platformBg: '#fff',
  tips: '#72798C',
  title: '#28324C'
}

// 地域统计
const visitorRegion = {
  title: '#fff',
  border: '#eee'
}

// 客服端
const chatServer = {
  border: '#eee',
  sideBg: '#fff',
  sideContent: '#28324C',
  sideHover: '#5082F4',
  sideActive: '#5082F4',
  sideActiveBg: '#edf2fc',
  headBg: '#fff',
  headIcon: '#fff',
  headPlatformHoverBg: '#1d66bc',
  headTitle: '#72798C',
  headTitleActive: '#5082F4',
  langItem: '#28324C',
  mainBg: '#fff',
  contentBg: '#F6F7FB',
  customerWrapBg: '#fff',
  customerItemActiveBg: '#e6f3fa',
  customerItemTitle: '#000',
  customerItemContent: '#bbbfc3',
  customerBorder: '#EBEDF0',
  customerItemActiveTitle: '#5082F4',
  transferContent: '#333',
  chatContent: '#666',
  chatContentBg: '#E3E3E3',
  chatHead: '#72798C',
  userInfoHeadBg: '#f2f2f2',
  sendBtnDisabled: '#cfcfcf',
  inviteDialogBorder: '#f2f2f2',
  emojiBg: '#ffffff',
  sendBtnBorder: '#E7E9EF',
  tabDefault: '#72798c',
  tabActive: '#5082f4',
  cardLabel: '#72798c',
  cardInput: '#28324C'
}

// 顶部筛选条件
const filter = {
  buttonBg: '#28324C'
}

// 质检
const quality = {
  scoreTagBg: '#fdf8ee',
  scoreTagBorder: '#B8773D'
}

const temp = { navbar, menu, main, dashboard, connectServer, customParams, talkRecord, talkReplay, talkAssign, robotConfig, visitorRegion, chatServer, filter, quality, ...element }
const light = {}

for (const ns in temp) {
  for (const property in temp[ns]) {
    const v = temp[ns][property]
    light[`--${camel2Dashed(ns)}-${camel2Dashed(property)}`] = v
  }
}

export default light
