<template>
	<div id="chat-content" ref="wrap" class="chat-content">
		<!-- :style="setColorOrGradient(theme.chatcolor)" -->
		<div v-show="loading&&total>curPage" style="margin: 10px 0;text-align: center;">{{ $t('chatClient.chatContent.loading') }}</div>
		<span v-if="total>1&&total==curPage" class="no-more">{{ $t('chatClient.chatContent.noMore') }}</span>
		<template v-if="isNew && isMobile()">
			<question :theme="theme" :is-new="isNew" :sunny="sunny" @scrollTo="scrollTo" />
		</template>

		<template v-for="(chat,index) in chatList">
			<div v-if="chat.type=='server'" :key="index" class="chat-item server">
				<!-- 机器人问候 -->
				<template v-if="chat.contentType=='robotBegin'">
					<div class="top">
						<span :style="sunny?'':'#e5e5e5'">{{ chat.name }}</span>
						<span class="time">{{ chat.time }}</span>
					</div>
					<div class="content" :class="{'light':sunny,'dark':!sunny,'special':theme.stylenum == 3,'special3':theme.stylenum == 4}">
						{{ chat.content }}
						{{ $t('chatClient.chatContent.server[0]') }}<span class="action" :style="`color:${theme.body_color.split(',')[0]}`" @click="transferMaunal">{{ $t('chatClient.chatContent.server[1]') }}</span>
						<img v-if="chat.avatar" class="avatar" :src="chat.avatar">
					</div>
				</template>
				<!-- 机器人结束语 -->
				<template v-else-if="chat.contentType=='robotClose'">
					<div class="centerTips"><span class="inner">{{ chat.content }}</span></div>
				</template>
				<!-- 推广 -->
				<template v-else-if="chat.contentType=='promote'">
					<div class="promote" :class="sunny?'light':'dark'" v-html="chat.content" />
				</template>
				<!-- 弹层中的常见问题 -->
				<template v-else-if="chat.contentType=='commonQuestion' && !isNew">
					<question :theme="theme" :sunny="sunny" @scrollTo="scrollTo" />
				</template>
				<!-- 客服忙 -->
				<template v-else-if="chat.contentType=='busy'">
					<div class="centerTips">
						<span v-if="platform.domainInfo.isoffline && platform.domainInfo.offline" class="inner">
							{{ platform.domainInfo.offline }}<span class="leave-message" @click="setLeaveMsgVisible(true)">{{ $t('chatClient.chatContent.server[3]') }}</span>
						</span>
						<span v-else class="inner">
							{{ $t('chatClient.chatContent.server[2]') }}<span class="leave-message" @click="setLeaveMsgVisible(true)">{{ $t('chatClient.chatContent.server[3]') }}</span>
						</span>
					</div>
				</template>
				<!-- 排队 -->
				<template v-else-if="chat.contentType=='queue'">
					<div class="centerTips">
						<span class="inner">
							{{ chat.content }}{{ $t('chatClient.chatContent.server[4]') }}<span class="leave-message" @click="setLeaveMsgVisible(true)">{{ $t('chatClient.chatContent.server[3]') }}</span>
						</span>
					</div>
				</template>
				<!-- 客服离线，转接至机器人 -->
				<template v-else-if="chat.contentType=='toRobot'">
					<div class="centerTips">
						<span class="inner">
							{{ $t('chatClient.chatContent.server[2]') }}
							<span class="action" @click="transferToRobot">{{ $t('chatClient.chatContent.server[5]') }}</span>
							{{ $t('chatClient.chatContent.server[6]') }}
							<span class="action" @click="setLeaveMsgVisible(true)">{{ $t('chatClient.chatContent.server[3]') }}</span>
						</span>
					</div>
				</template>
				<!-- 客服上线提示 -->
				<template v-else-if="chat.contentType=='online'">
					<div class="centerTips">
						<span class="inner">{{ chat.content }}</span>
					</div>
				</template>
				<!-- 评价结果 -->
				<template v-else-if="chat.contentType=='praise'">
					<div class="centerTips"><span class="inner">{{ chat.praise }}</span></div>
				</template>
				<!-- 关闭对话提示 -->
				<template v-else-if="chat.contentType=='closeTips'">
					<div class="top" style="margin-left:0">
						<span class="time">{{ chat.time }}</span>
						<span class="tips">{{ chat.content }}</span>
					</div>
				</template>
				<!-- 转接提示 -->
				<template v-else-if="chat.contentType=='transfer'">
					<div class="centerTips"><span class="inner">{{ chat.content }}</span></div>
				</template>
				<!-- 新客服加入群聊 -->
				<template v-else-if="chat.contentType=='joinGroup'">
					<div class="centerTips"><span class="inner">{{ chat.content }}</span></div>
				</template>
				<!-- 普通聊天内容 -->
				<template v-else>
					<div v-show="chat.avatar" :class="['top', {'special-new': theme.stylenum === 1}]">
						<span :style="sunny?`color:${serverColor(chat.name)}`:'#e5e5e5'">{{ chat.name }}</span>
						<span class="time">{{ formChatTime(chat.time) }}</span>
					</div>
					<div v-show="chat.avatar" class="content" :class="{'light':sunny,'dark':!sunny,'special':theme.stylenum == 3,'special3':theme.stylenum == 4, 'special-new': theme.stylenum === 1}">
						<img v-if="chat.avatar" class="avatar" :src="chat.avatar">
						<common-content :chat="chat" />
						<span class="leaveMsg" v-if="chat.readFlag === 3">{{$t('chatClient.tooltip[0]')}}</span>
					</div>
				</template>
			</div>
			<div v-if="chat.type=='customer'" :key="index" class="chat-item customer">
				<div :class="['top', {'special-new': theme.stylenum === 1}]">
					<span class="time">{{ formChatTime(chat.time) }}</span>
				</div>
				<div class="bottom-box">
					<div class="bottom">

						<div class="content" :style="theme.stylenum === 1 ? `${setColorOrGradient(theme.body_color)};color:${theme.font_color.split(',')[0]}` :`background:${contentBg};color:${theme.font_color.split(',')[0]}`" :class="{'light':sunny,'dark':!sunny,'special':theme.stylenum == 3,'special3':theme.stylenum == 4,'special-new': theme.stylenum === 1}">
							<span :class="{'read-status':true,'ed':chat.readFlag==2,'special-new': theme.stylenum === 1}">
								{{ chat.readFlag==2?$t('chatClient.chatContent.customer.read'):$t('chatClient.chatContent.customer.unread') }}
							</span>
							<common-content :chat="chat" />
						</div>
					</div>
				</div>
			</div>
		</template>
	</div>
</template>

<script>
import { unescape } from 'html-escaper'
import { eventBus } from './eventBus.js'
import { isMobile, parseTime } from '@/utils/index.js'
import { getChatList } from '@/api/chatClient.js'
import { formatContent, extractImage } from '@/utils/chat.js'
import { mapState, mapMutations } from 'vuex'
import question from './question.vue'
import commonContent from '../commonContent.vue'
import { setColorOrGradient } from '@/utils/index'
export default {
	components: { question, commonContent },
	props: {
		theme: {
			type: Object,
			default: () => { }
		},
		sunny: {
			type: Boolean,
			default: true
		},
		isNew: {
			type: Boolean,
			default: false
		},
		hasClickUpload: {
			type: Boolean,
			default: false
		}
	},
	data () {
		return {
			page: 1,
			curPage: 1,
			total: 0,
			chatList: [],
			unReadList: [],
			loading: false,
			eventBus: eventBus,
			noRespTimer: undefined,
			baseUrl: process.env.VUE_APP_BASE_URL,
			connectTimer: null,
			contentTimes: 0,
			leaveReadArr: [],
			serverThemeConfig: {
				index: 0,
				options: ['#505050', '#00AB9F', '#E33C64', '#FF8D1A'],
				cacheMap: {}
			}
		}
	},
	computed: {
		fontColor () {
			const { platform } = this
			return platform.domainInfo ? `${platform.domainInfo.font_color}` : ''
		},
		contentBg () {
			const { theme } = this
			if (theme) {
				const red = theme.body_color.split(',')[0].substring(1, 3)
				const green = theme.body_color.split(',')[0].substring(3, 5)
				const blue = theme.body_color.split(',')[0].substring(5)
				const redHex = parseInt(red, '16')
				const greenHex = parseInt(green, '16')
				const blueHex = parseInt(blue, '16')
				return `rgba(${redHex},${greenHex},${blueHex},.85)`
			} else {
				return ''
			}
		},
    ChatLog(){
      const tempParams = {}
			const { pathMatch } = this.$route.params
			if (pathMatch) {
				const paramsList = pathMatch.split('/')
				paramsList.forEach(params => {
					const [type, value] = params.split('_')
					tempParams[type] = value
				})
			}
			const { NoChatLog } = tempParams
      return !NoChatLog || NoChatLog !== '1'
    },
		...mapState('chatClient', [
			'sp', 'ws', 'wsMsg', 'platform', 'customer', 'inlayer', 'hasPraised', 'themeColor', 'serverStatus', 'firstInitFlag', 'transferServer', 'serverInfo'
		])
	},
	watch: {
		wsMsg (v) {
			const { cmd, data } = v
      console.log("chatContent-wsMsg -> cmd", cmd,data)
			switch (cmd) {
				// 初始化成功
				case 'userInit':
					this.userInitHandler(data)
					break
				// 聊天消息
				case 'chatMessage':
					this.receiveHandler(data)
					break
				// 发送消息之后
				case 'afterSend':
					this.afterSendHandler(data)
					break
				// 标记已读
				case 'readMessage':
					this.readHandler(data)
					break
				// 常见问题答案
				case 'comQuestion':
					this.showAnswer(data)
					break
				// 被关闭
				case 'isClose':
					this.closeHandler()
					break
				// 被转接
				case 'reLink':
					this.reLinkHandler(data)
					break
				// 客服上线
				case 'Kfonline':
					this.onlineHandler(data)
					break
				// 客服下线
				case 'Kfoffline':
					this.offlineHandler(data)
					break
				// 撤回消息
				case 'revokeMessage':
					this.revokeHandler(data)
					break
				// 群组建立反馈
				case 'groupALL':
					this.groupALLHandler(data)
					break
				default:
					break
			}
		},
		async firstInitFlag (flag) {
			if (flag) {
				const { platform: { domainInfo: { isrobot, isfastrobot } } } = this
				if (isrobot && isfastrobot) {
					// 机器人接待
					if(this.ChatLog){
            await this.getChatList()
          }
					this.showPromote()
					this.showRobotGreeting()
					this.showCommonQuestion()
					this.scrollTo('bottom')
					this.setSP('robot')
				} else {
					// 连接客服
					this.directConnect()
				}
			}
		}
	},
	methods: {
		setColorOrGradient,
		async getChatList (append) {
			const { platform: { domainInfo: { seller_code }, nowTime, token }, customer: { id }, page } = this
			if (seller_code && nowTime && token) {
				this.loading = true
				const { code, msg, data, total } = await getChatList({
					uid: id,
					tk: token,
					page: page,
					t: nowTime,
					u: seller_code
				})
				if (code === 0) {
					this.total = total
					this.curPage = msg
					this.chatList = this.formatChatList(data).concat(this.chatList)
					if (append) {
						const { scrollHeight } = this.$refs.wrap
						this.$nextTick(() => {
							this.$refs.wrap.scrollTop = this.$refs.wrap.scrollHeight - scrollHeight
						})
					}
				}
				this.loading = false
			}
		},
		async getMoreChat () {
			this.page++
			await this.getChatList(true)
		},
		clearHistoryChat () {
			this.total = 0
			this.chatList = []
		},
		readHandler (res) {
			// this.chatList.forEach(chat => {
			//   if (chat.chatId && res.mid.includes(chat.chatId.toString())) {
			//     chat.readFlag = 2
			//   }
			// })
			for (let index = 0; index < this.chatList.length; index++) {
				this.chatList[index].readFlag = 2
				if (this.chatList[index].chatId && res.mid.includes(this.chatList[index].chatId.toString())) {
					continue
				}
			}
			this.$forceUpdate()
		},
		closeHandler () {
			const { chatList, serverInfo: { kefu_name }, platform: { domainInfo: { messstate, closemessage } } } = this
			if (messstate) {
				chatList.push({
					type: 'server',
					name: kefu_name,
					contentType: 'closeTips',
					time: parseTime(Date.now()),
					content: formatContent(closemessage || this.$t('authMessage.config.endMsg.placeholder'))
				})
			}
			this.scrollTo('bottom')
			this.setSessionStatus('close')
      this.$store.commit('chatClient/closeCustomer')
      this.closeWindow()
		},
		receiveHandler (res) {
			const { includeImg, content } = extractImage(res.content)
			if (content === '对话结束！' && this.chatList.findIndex(chat => chat.content === '对话结束！') !== -1) {
				return
			}
			this.chatList.push({
				type: 'server',
				name: res.name,
				time: res.time,
				includeImg, content,
				chatId: res.chat_log_id,
				avatar: `${this.baseUrl}${res.avatar}`
			})
			if (document.hidden) {
				this.unReadList.push(res.chat_log_id)
			} else {
				this.sendHasRead(res.chat_log_id)
			}
			this.scrollTo('bottom')
		},
		revokeHandler (res) {
			const { chatList } = this
			const { code, data } = res
			if (code == 200) {
				const index = chatList.findIndex(chat => chat.chatId == data.msg_id)
				if (index != -1) {
					chatList.splice(index, 1)
				}
			}
		},
		async userInitHandler (res) {
			const { code, data, msg } = res
			if (code === 0) {
				if (this.firstInitFlag) {
					this.chatList = []
					this.setSP('server')
					this.setServerInfo(data)
          if(this.ChatLog){
            await this.getChatList()
          }
					this.chatList.map(item => {
						if (+item.readFlag === 3) {
							this.leaveReadArr.push(item.chatId)
						}
					})
					// if(this.isMobile()) {
					//   setTimeout(() => {
					//     this.sendHasRead(this.unReadList.join(','))
					//     this.unReadList = []
					//   }, 1000)
					// }
					this.showPromote()
					this.showServerGreeting()
					this.showCommonQuestion()
					this.noResponseHandler()
					this.setServerStatus('online')
					this.scrollTo('bottom')
				}
			} else {
				this.setServerInfo(data)
				const { chatList, platform: { domainInfo: { isrobot, isfastrobot } } } = this
				if (isrobot && isfastrobot) {
					if (chatList.findIndex(chat => chat.contentType == 'toRobot') == -1) {
						chatList.push({
							type: 'server',
							contentType: 'toRobot'
						})
						this.setSP('robot')
						this.scrollTo('bottom')
					}
				} else {
					if (code == 202) {
						if (chatList.findIndex(chat => chat.contentType == 'queue') == -1) {
							this.chatList.push({
								type: 'server',
								contentType: 'queue',
								content: msg
							})
							this.setSP('server')
							this.scrollTo('bottom')
						}
					} else if (code == 400) {
						if (chatList.findIndex(chat => chat.contentType == 'busy') == -1) {
							this.chatList.push({
								type: 'server',
								contentType: 'busy'
							})
							this.scrollTo('bottom')
						}
						this.setSP('server')
					} else {
						if (chatList.findIndex(chat => chat.contentType == 'busy') == -1) {
							this.chatList.push({
								type: 'server',
								contentType: 'busy'
							})
							this.setSP('server')
							this.scrollTo('bottom')
						}
					}
				}
				this.setServerStatus('offline')
			}
		},
		afterSendHandler (res) {
			const { code, data, msg } = res
			const leaveId = this.leaveReadArr.join(',')
			if (leaveId && this.isMobile()) {
				this.sendHasRead(leaveId)
				this.leaveReadArr = []
			}
			if (code === 0) {
				if (this.chatList.findIndex(chat => chat.chatId === parseInt(data)) === -1) {
					const { includeImg, content } = extractImage(msg)
					this.chatList.push({
						type: 'customer',
						includeImg, content,
						chatId: parseInt(data),
						time: parseTime(Date.now())
					})
					this.scrollTo('bottom')
				}
			} else {
				this.$notify.error({
					title: this.$t('notify.fail'),
					message: msg
				})
			}
		},
		showServerGreeting () {
			const { chatList, baseUrl, serverInfo: { kefu_avatar, kefu_name }, platform: { domainInfo: { hello_word, ishello, iseject, ejecmessage }, type, kefuInfo: { isEnable } } } = this
			let _content = ''
            if(isEnable == 1 && hello_word){
                _content = hello_word
            }else{
                if (iseject && type == 1 && ejecmessage) {
                    _content = ejecmessage
                } else {
                    _content = hello_word || this.$t('authMessage.config.welcomeMsg.placeholder')
                }
            }
			if (ishello) {
				const index = chatList.findIndex(chat => chat.contentType === 'serverGreeting')
				const leaveIndex = chatList.findIndex(item => item.readFlag === 3)
				if (index === -1) {
					if (leaveIndex !== -1) {
						chatList.splice(leaveIndex, 0, {
							type: 'server',
							name: kefu_name,
							time: parseTime(Date.now()),
							content: formatContent(_content),
							contentType: 'serverGreeting',
							avatar: `${baseUrl}${kefu_avatar}`
						})
					} else {
						chatList.push({
							type: 'server',
							name: kefu_name,
							time: parseTime(Date.now()),
							content: formatContent(_content),
							contentType: 'serverGreeting',
							avatar: `${baseUrl}${kefu_avatar}`
						})
					}
				}
			}
		},
		showRobotGreeting () {
			const { baseUrl, chatList, platform: { domainInfo: { robotpic, robotname, robotmessage } } } = this
			chatList.push({
				type: 'server',
				name: robotname,
				avatar: `${baseUrl}${robotpic}`,
				contentType: 'robotBegin',
				time: parseTime(Date.now()),
				content: formatContent(robotmessage)
			})
		},
		showAnswer (res) {
			let avatar, name
			const { sp, baseUrl, chatList, transferServer, serverInfo, platform: { domainInfo: { robotpic, robotname } } } = this
			if (sp === 'robot') {
				avatar = `${baseUrl}${robotpic}`
				name = robotname
			} else if (sp === 'server') {
				avatar = `${baseUrl}${serverInfo.kefu_avatar}`
				name = serverInfo.kefu_name
			} else if (sp === 'transferServer') {
				avatar = `${baseUrl}${transferServer.kefu_avatar}`
				name = transferServer.kefu_name
			}
			const leaveIndex = chatList.findIndex(item => item.readFlag === 3)
			if (leaveIndex !== -1) {
				chatList.splice(leaveIndex, 0, {
					type: 'server',
					time: res.time,
					content: unescape(res.content),
					avatar, name
				})
			} else {
				chatList.push({
					type: 'server',
					time: res.time,
					content: unescape(res.content),
					avatar, name
				})
			}

			this.scrollTo('bottom')
		},
		showPromote () {
			if (this.platform.domainInfo.isextension) {
				this.platform.messcontent.forEach(item => {
					const leaveIndex = this.chatList.findIndex(item => item.readFlag === 3)
					if (leaveIndex !== -1) {
						this.chatList.splice(leaveIndex, 0, {
							type: 'server',
							contentType: 'promote',
							content: unescape(item.content)
						})
					} else {
						this.chatList.push({
							type: 'server',
							contentType: 'promote',
							content: unescape(item.content)
						})
					}
				})
			}
		},
		async showCommonQuestion () {
			const { inlayer } = this
			const isMobile = await this.isMobile()
			if (inlayer || isMobile) {
				const leaveIndex = this.chatList.findIndex(item => item.readFlag === 3)
				if (leaveIndex !== -1) {
					this.chatList.splice(leaveIndex, 0, {
						type: 'server',
						contentType: 'commonQuestion'
					})
				} else {
					this.chatList.push({
						type: 'server',
						contentType: 'commonQuestion'
					})
				}

			}
		},
		transferMaunal () {
			this.clearHistoryChat()
			this.chatList.push({
				type: 'server',
				contentType: 'robotClose',
				content: this.platform.domainInfo.robotcolse
			})
			this.directConnect()
		},
		transferToRobot () {
			this.showRobotGreeting()
			this.scrollTo('bottom')
			this.setSP('robot')
		},
		reLinkHandler (res) {
			this.setSP('transferServer')
			this.setTransferServer(res)
			this.chatList.push({
				type: 'server',
				contentType: 'transfer',
				content: formatContent(res.msg)
			})
			this.scrollTo('bottom')
		},
		onlineHandler (res) {
			const { sp, chatList, serverInfo, transferServer } = this
			if (res.kfcode == serverInfo.kefu_code) {
				// 初始客服上线
				if (sp != 'transferServer') {
					this.setSP('server')
				}
				const index = chatList.findIndex(chat => chat.contentType == 'online')
				if (index == -1) {
					chatList.push({
						type: 'server',
						contentType: 'online',
						content: this.$t('chatClient.chatContent.serverHello')
					})
					this.scrollTo('bottom')
				}
			} else if (transferServer && ('KF_' + res.kfcode == transferServer.kefu_code)) {
				// 转接客服上线
				if (sp != 'server') {
					this.setSP('transferServer')
				}
				const index = chatList.findIndex(chat => chat.contentType == 'online')
				if (index == -1) {
					chatList.push({
						type: 'server',
						contentType: 'online',
						content: this.$t('chatClient.chatContent.serverHello')
					})
					this.scrollTo('bottom')
				}
			}
			const index = chatList.findIndex(chat => chat.contentType == 'toRobot' || chat.contentType == 'busy')
			if (index != -1) {
				chatList.splice(index, 1)
			}
			this.setServerStatus('online')
		},
		offlineHandler (res) {
			const { msg, kfcode } = res
			const { chatList, platform: { domainInfo: { isrobot, isfastrobot } } } = this
			if (msg == 'OK') {
				kfcode.kefu_code = 'KF_' + kfcode.kefu_code
				this.setSP('transferServer')
				this.setTransferServer(kfcode)
                let msg = this.$t('chatClient.chatContent.transfer') + kfcode.kefu_name
                this.chatList.push({
                    type: 'server',
                    contentType: 'transfer',
                    content: formatContent(msg)
                })
			} else if (isrobot && isfastrobot) {
				if (chatList.findIndex(chat => chat.contentType == 'toRobot') == -1) {
					chatList.push({
						type: 'server',
						contentType: 'toRobot'
					})
					this.setSP('robot')
				}
			} else {
                this.setServerStatus('offline')
				if (chatList.findIndex(chat => chat.contentType == 'busy') == -1) {
					chatList.push({
						type: 'server',
						contentType: 'busy'
					})
				}
			}
			this.scrollTo('bottom')
		},
		formatChatList (data) {
			return data.map(item => {
				const { includeImg, content } = extractImage(item.content)
				if (item.type == 'mine') {
					return {
						type: 'customer',
						includeImg, content,
						time: item.create_time,
						readFlag: item.read_flag,
						chatId: item.log_id
					}
				} else if (item.type == 'user') {
					return {
						type: 'server',
						includeImg, content,
						name: item.from_name,
						time: item.create_time,
						avatar: `${this.baseUrl}${item.from_avatar}`,
						readFlag: item.read_flag,
						chatId: item.log_id
					}
				}
			})
		},
		scrollTo (pos) {
			this.$nextTick(() => {
				if (pos == 'bottom') {
					this.$refs.wrap.scrollTop = this.$refs.wrap.scrollHeight + 100
				} else if (pos == 'top') {
					this.$refs.wrap.scrollTop = 0
				}
			})
		},
		unReadHandler () {
			document.onvisibilitychange = async () => {
				if (!document.hidden) {
					// await this.getChatList()
					// this.scrollTo('bottom')
					const chatIds = this.unReadList.join(',')
					if (chatIds) {
						this.sendHasRead(chatIds)
						this.unReadList = []
						if (this.isMobile() && !this.hasClickUpload) {
							setTimeout(() => {
								document.location.reload()
							}, 800)
							// await this.getChatList()
							// this.scrollTo('bottom')
						}
					} else {
						if (this.isMobile() && !this.hasClickUpload) {
							setTimeout(() => {
								document.location.reload()
							}, 800)
							// await this.getChatList()
							// this.scrollTo('bottom')
						}
					}
				}
			}
		},
		// 根据后端设置的超时时间前端处理超时后的逻辑
		noResponseHandler () {
			if (this.sp == 'server' && this.serverStatus == 'online') {
				const { chatList, hasPraised, serverInfo: { kefu_name }, platform: { domainInfo: { isresponse, no_response, kfNo, isevaluate } } } = this
				clearTimeout(this.noRespTimer)
				this.noRespTimer = setTimeout(() => {
					if (isresponse) {
						chatList.push({
							type: 'server',
							name: kefu_name,
							content: no_response || this.$t('authMessage.config.noResponse.placeholder'),
							contentType: 'closeTips',
							time: parseTime(Date.now())
						})
					}
					if (isresponse && isevaluate) {
						this.$store.commit('chatClient/closeCustomer')
            this.closeWindow()
						// 如果没有进行过客服评论
						// if (!hasPraised) this.setPraiseVisible(true)
					}
					this.scrollTo('bottom')
				}, kfNo * 1000)
			}
		},
    closeWindow () {
			if (top == window) {
				// if (confirm(this.$t('chatClient.closeWindow'))) {
					const userAgent = navigator.userAgent
					if (
						userAgent.indexOf('Firefox') != -1 ||
						userAgent.indexOf('Chrome') != -1 ||
						userAgent.indexOf('Safari') != -1
					) {
						location.href = 'about:blank'
					} else {
						window.opener = null
						window.open('', '_self')
					}
					window.close()
				// }
			} else {
				top.postMessage({ cmd: 'hideChat' }, '*')
			}
		},
		robotAnwerHandler (answer) {
			const { code, msg } = answer
			const { baseUrl, chatList, platform: { domainInfo: { robotpic, robotname } } } = this
			if (code === 0) {
				chatList.push({
					type: 'server',
					name: robotname,
					time: parseTime(Date.now()),
					content: formatContent(unescape(msg)),
					avatar: `${baseUrl}${robotpic}`
				})
			} else {
				chatList.push({
					type: 'server',
					name: robotname,
					avatar: `${baseUrl}${robotpic}`,
					contentType: 'robotBegin',
					time: parseTime(Date.now()),
					content: formatContent(msg || this.$t('chatClient.chatContent.robotUnknown'))
				})
			}
			this.scrollTo('bottom')
		},
		praiseSuccessHandler (praise) {
			this.chatList.push({
				praise,
				type: 'server',
				contentType: 'praise'
			})
			this.scrollTo('bottom')
		},
		robotQuestionHandler (message) {
			const { includeImg, content } = extractImage(message)
			this.chatList.push({
				readFlag: 2,
				type: 'customer',
				includeImg, content,
				time: parseTime(Date.now())
			})
			this.scrollTo('bottom')
		},
		sendQuestionHandler (question) {
			this.chatList.push({
				readFlag: 2,
				type: 'customer',
				time: parseTime(Date.now()),
				content: formatContent(question)
			})
			this.scrollTo('bottom')
		},
		lazyLoad () {
			const { $refs: { wrap } } = this
			wrap.onscroll = () => {
				const { total, page } = this
				if (wrap.scrollTop === 0 && total > 1 && total > page && this.ChatLog) {
					this.getMoreChat()
				}
			}
		},
		layerOpenHandler () {
			if (top != window) {
				window.onmessage = evt => {
					const { cmd } = evt.data
					if (cmd == 'layerOpen') {
						this.scrollTo('bottom')
					}
				}
			}
		},
		serverColor (serverName) {
			const { serverThemeConfig, serverThemeConfig: { index, options, cacheMap } } = this
			if (serverName in cacheMap) {
				return cacheMap[serverName]
			} else {
				cacheMap[serverName] = options[index]
				if (index === options.length - 1) {
					serverThemeConfig.index = 0
				} else {
					serverThemeConfig.index++
				}
				return cacheMap[serverName]
			}
		},
		groupALLHandler (res) {
			const { code, msg } = res
			if (code === 200) {
				this.chatList.push({
					type: 'server',
					contentType: 'joinGroup',
					content: msg
				})
				this.scrollTo('bottom')
			}
		},
		...mapMutations('chatClient', [
			'setSP', 'sendHasRead', 'directConnect', 'setServerStatus', 'setSessionStatus', 'setServerInfo', 'setPraiseVisible', 'setLeaveMsgVisible', 'setTransferServer'
		]),
		// 判断是否在移动端
		isMobile () {
			const info = navigator.userAgent
			const agents = ['Android', 'iPhone', 'SymbianOS', 'Windows Phone', 'iPod', 'iPad']
			for (let i = 0; i < agents.length; i++) {
				if (info.indexOf(agents[i]) >= 0) return true
			}
			return false
		},
		formChatTime (time) {
			if (time && this.theme.stylenum === 1) {
				return parseTime(time, '{m}.{d} {h}:{i}:{s}')
			} else return time
		}
	},
	mounted () {
    if(this.ChatLog){
      this.lazyLoad()
    }
		this.unReadHandler()
		this.layerOpenHandler()
		eventBus.$on('robotAnwer', this.robotAnwerHandler)
		eventBus.$on('noResponse', this.noResponseHandler)
		eventBus.$on('sendQuestion', this.sendQuestionHandler)
		eventBus.$on('praiseSuccess', this.praiseSuccessHandler)
		eventBus.$on('robotQuestion', this.robotQuestionHandler)
		eventBus.$on('transferMaunal', this.transferMaunal)
	}
}
</script>

<style lang="scss" scoped>
.chat-content {
	flex: 1;
	padding: 20px 25px 12px 33px;
	overflow-y: auto;
	box-sizing: border-box;
	&::-webkit-scrollbar-track {
		background: rgba(255, 255, 255, 0);
	}
	&::-webkit-scrollbar-thumb {
		background-color: rgba(50, 50, 50, 0.05);
	}
	.more-record {
		padding: 8px 15px;
		border: none;
		border-radius: 3px;
		margin-bottom: 11px;
		background-color: #e2e2e2;
		color: #333;
		font-size: 13px;
		cursor: pointer;
		&:disabled {
			cursor: not-allowed;
		}
	}
	.no-more {
		display: block;
		margin-bottom: 20px;
		font-size: 12px;
		color: #888;
		text-align: center;
	}
	.chat-item {
		margin-bottom: 30px;
		.top {
			margin-bottom: 8px;
			color: #888;
			font-size: 12px;
			.time {
				margin-left: 4px;
				font-family: "Mulish", "PingFang SC", "Microsoft YaHei",
					"SimSun", Arial, sans-serif;
			}
			.tips {
				margin-left: 4px;
			}
		}
		::v-deep.content {
			.emoji {
				width: 26px;
				vertical-align: middle;
			}
			img {
				max-width: 100%;
				vertical-align: bottom;
			}
			.video {
				width: 200px;
				vertical-align: middle;
			}
			.audio {
				width: 200px;
				height: 20px;
			}
		}
		&.server {
			position: relative;
			.top {
				margin-left: 21px;
				&.special-new {
					position: absolute;
					bottom: 4px;
					span {
						&:first-child {
							display: none;
						}
					}
					.time {
						margin-left: 12px;
						color: #949eb8;
					}
				}
			}
			::v-deep.content {
				display: inline-block;
				position: relative;
				min-height: 14px;
				max-width: 452px;
				line-height: 1.6;
				padding: 8px 24px;
				border-radius: 20px;
				word-wrap: break-word;
				background: #f8f8f8;
				font-family: -apple-system-font, Helvetica Neue, sans-serif;
				.leaveMsg {
					position: absolute;
					color: #ff5700;
					right: -40px;
					top: 50%;
					margin-top: -12px;
					font-size: 12px;
				}
				p {
					margin: 0;
				}
				&.special-new {
					margin: 0 0 38px 30px;
					border-radius: 0px 10px 10px 10px;
					img {
						transform: none;
						left: -50px;
					}
					div {
						color: #28324c;
					}
					&.dark {
						div {
							color: #fff;
						}
					}
				}
				&.dark {
					background: rgba(91, 91, 91, 1);
					color: rgba(229, 229, 229, 1);
				}
				&.special {
					color: #808080;
					border-radius: 8px;
					background: #fdfdfd;
					box-shadow: 0px 2px 10px 0px rgba(234, 234, 234, 0.5);
					margin-left: 20px;
					&.dark {
						background: #545454;
						box-shadow: 0px 2px 10px 0px rgba(47, 47, 47, 0.5);
					}
					.avatar {
						border-radius: 8px;
						top: 18px;
						left: -26px;
					}
				}
				&.special3 {
					color: #afafaf;
					border-radius: 8px;
					background: #ffffff;
					box-shadow: 0px 2px 10px 0px rgba(234, 234, 234, 0.5);
					margin-left: 20px;
					&.dark {
						background: #55586b;
						box-shadow: 0px 2px 10px 0px rgba(47, 47, 47, 0.5);
					}
					.avatar {
						border-radius: 8px;
						top: 18px;
						left: -26px;
					}
				}
				.file {
					.iconfont {
						margin-right: 4px;
					}
				}
				.avatar {
					position: absolute;
					z-index: 1;
					left: 0;
					top: 0;
					width: 38px;
					height: 38px;
					border-radius: 50%;
					transform: translate(-50%, -50%);
				}
			}
			::v-deep.promote {
				position: relative;
				display: inline-block;
				min-height: 14px;
				max-width: 452px;
				padding: 8px 12px;
				border: 1px solid rgba(0, 0, 0, 0.1);
				border-radius: 6px;
				background: #ffffff;
				box-sizing: content-box;
				color: #505050;
				word-break: break-all;
				&.dark {
					background: rgba(91, 91, 91, 1);
					color: rgba(229, 229, 229, 1);
				}
				p {
					margin: 0;
					word-break: break-all;
				}
				img {
					max-width: 100%;
					height: auto;
					vertical-align: middle;
				}
			}
			.centerTips {
				text-align: center;
				.inner {
					display: inline-block;
					padding: 8px 15px;
					border-radius: 3px;
					color: #333;
					font-size: 13px;
					cursor: pointer;
					word-break: break-all;
					background-color: #e2e2e2;
					.leave-message {
						cursor: pointer;
						color: #0101df;
						text-decoration: underline;
						&:hover {
							color: #777;
						}
					}
				}
			}
			.action {
				cursor: pointer;
				color: #0101df;
				text-decoration: underline;
				&:hover {
					color: #777;
				}
			}
			::v-deep.common-question {
				margin-left: 18px;
				width: 70%;
				padding: 12px 12px 0;
				margin-top: -24px;
				border-radius: 16px;
				background: #f8f8f8;
				&.special {
					background: #fdfdfd;
					box-shadow: 0px 2px 10px 0px rgb(234 234 234 / 50%);
				}
				&.special3 {
					background: #ffffff;
					box-shadow: 0px 2px 10px 0px rgb(234 234 234 / 50%);
					.question-body {
						.question-item,
						.el-collapse
							.el-collapse-item
							.el-collapse-item__header {
							color: #afafaf;
						}
					}
				}
				&.dark {
					background: #5b5b5b;
					&.special {
						background: #545454;
						box-shadow: 0px 2px 10px 0px rgb(47 47 47 / 50%);
					}
					&.special3 {
						background: #55586b;
						box-shadow: 0px 2px 10px 0px rgb(47 47 47 / 50%);
					}
				}
			}
		}
		&.customer {
			text-align: right;
			position: relative;
			.top {
				&.special-new {
					position: absolute;
					bottom: 4px;
					right: 0;
					.time {
						margin-left: 12px;
						color: #949eb8;
					}
				}
			}
			.bottom-box {
				display: flex;
				justify-content: flex-end;
				.bottom {
					display: flex;
					align-items: center;

					::v-deep.content {
						display: inline-block;
						position: relative;
						min-height: 14px;
						max-width: 420px;
						line-height: 1.6;
						padding: 8px 24px;
						// border: 1px solid rgba(0,0,0,0.1);
						border-radius: 20px;
						text-align: left;
						word-wrap: break-word;
						color: #fff;
						font-family: -apple-system-font, Helvetica Neue,
							sans-serif;
						.read-status {
							font-size: 12px;
							color: #5082f4;
							word-break: keep-all;
							position: absolute;
							top: 50%;
							margin-top: -12px;
							left: -50px;
							&.ed {
								color: #c2c2c2;
							}
							&.special-new {
								margin-bottom: 8px;
							}
						}
						&.special-new {
							margin: 0 0 38px 0;
							border-radius: 10px 0 10px 10px;
							img {
								transform: none;
								left: -50px;
							}
							div {
								color: #fff;
							}
						}
						&.special {
							border-radius: 8px;
							box-shadow: 0px 2px 10px 0px
								rgba(127, 186, 253, 0.5);
							&.dark {
								box-shadow: 0px 2px 10px 0px
									rgba(19, 50, 86, 0.5);
							}
						}
						&.special3 {
							border-radius: 8px;
							box-shadow: 0px 2px 10px 0px
								rgba(127, 186, 253, 0.5);
							&.dark {
								box-shadow: 0px 2px 10px 0px
									rgba(127, 186, 253, 0);
							}
						}
						.file {
							color: #ff5722;
							.iconfont {
								margin-right: 4px;
							}
						}
					}
				}
			}
		}
	}
}
</style>
