import element from './element'
import { camel2Dashed } from '@/utils/index'

const border = '#404040'
const content = '#808080'
const title = '#fff'
const contentBg = '#2A2C33'

// 头部导航栏
const navbar = {
  bg: '#2A2C33',
  border: '#1B1F24',
  content: '#A6A6A6',
  tag: content,
  tagBg: contentBg,
  tagBorder: contentBg,
  copyrightContent: content,
  copyrightTitle: title,
  copyrightBg: '#1B1F24',
  copyrightBorder: border
}

// 侧边栏菜单
const menu = {
  bg: '#2A2C33',
  text: '#979CB5',
  activeText: '#FFFFFF',
  activeBg: '#32343C'
}

// 主体部分
const main = {
  bg: '#1B1F24',
  innerBg: contentBg
}

// 主页
const dashboard = {
  statisticsBorder: contentBg,
  statisticsTitle: content,
  statisticsNum: title,
  th: title,
  thBg: contentBg,
  chartBg: contentBg
}

// 自动分配
const connectServer = {
  content: content,
  title: '#fff',
  code: content,
  codeBg: contentBg,
  codeBorder: border
}

// 自定义参数
const customParams = {
  content: content
}

// 会话记录
const talkRecord = {
  border: border,
  content: content,
  customerBg: contentBg,
  customerHeadBg: contentBg,
  sideLabel: '#fff',
  title: '#fff',
  detailContent: '#fff'
}

// 自动消息
const talkReplay = {
  border: border,
  platformBg: contentBg,
  tips: content,
  title: title
}

// 会话分配
const talkAssign = {
  head: content,
  name: title,
  desc: content
}

// 机器人配置
const robotConfig = {
  border: border,
  platformBg: contentBg,
  tips: content,
  title: title
}

// 地域统计
const visitorRegion = {
  title: title,
  border: border
}

// 客服端
const chatServer = {
  border: border,
  sideBg: '#2A2C33 ',
  sideContent: '#fff',
  sideHover: '#fff',
  sideActive: '#fff',
  sideActiveBg: '#32343C',
  headBg: '#1B1F24',
  headIcon: '#3d87dd',
  headPlatformHoverBg: 'rgba(28, 119, 224, 0.26)',
  langItem: '#a6a6a6',
  mainBg: '#2A2C33',
  contentBg: '#1B1F24',
  customerWrapBg: '#2A2C33',
  customerItemActiveBg: '#1B1F24',
  customerItemTitle: '#A6A6A6',
  customerItemContent: '#505050',
  customerBorder: '#1B1F24',
  transferContent: title,
  chatContent: content,
  chatContentBg: contentBg,
  userInfoHeadBg: '#292929',
  sendBtnDisabled: content,
  inviteDialogBorder: border,
  emojiBg: '#2A2C33',
  sendBtnBorder: '#404040'
}

const temp = {
  navbar,
  menu,
  main,
  dashboard,
  connectServer,
  customParams,
  talkRecord,
  talkReplay,
  talkAssign,
  robotConfig,
  visitorRegion,
  chatServer,
  ...element
}
const dark = {}

for (const ns in temp) {
  for (const property in temp[ns]) {
    const v = temp[ns][property]
    dark[`--${camel2Dashed(ns)}-${camel2Dashed(property)}`] = v
  }
}

export default dark
