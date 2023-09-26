<template>
	<div class="client-container" :style="serverBg" v-loading="isShowLoading">
		<!-- 主体 -->
		<template v-if="isNew">
			<div class="client-container__center new" :class="{'dark':!sunny,'light':sunny}">
				<div class="spe-bg" :style="`background-image: linear-gradient(to right,${theme.chatcolor.split(',')[0]}, ${theme.rightcolor.split(',')[0]});`" />
				<!-- 头部 -->
				<div class="chat-head" :style="setColorOrGradient(theme.chatcolor)" :class="{'dark':!sunny}">
					<div class="chat-head__left">
						<div v-if="serverDetail.avatar" class="avatar" :class="serverStatus">
							<img :src="`${baseUrl}${serverDetail.avatar}`">
							<span class="status" />
						</div>
						<div class="server">
							<div class="name">{{ serverDetail.name }}</div>
							<span v-if="platform.domainInfo" class="hello-world">{{ platform.domainInfo.hello_title }}</span>
						</div>
					</div>
					<div class="chat-head__right">
						<!-- <a v-if="platform.domainInfo && platform.domainInfo.skype" target="_blank" :href="`skype:${platform.domainInfo.skype}`" :style="theme.stylenum == 2?`color:${theme.body_color[0]}`:''"> -->
						<el-tooltip v-if="platform.domainInfo && platform.domainInfo.skype" effect="light" :content="$t('chatClient.tooltip[6]')">
							<i class="material-icons-round" style="background:transparent;" @click="activeSkype(platform.domainInfo.skype)">phone_in_talk</i>
							<!-- <i class="material-icons-round" :style="theme.stylenum == 2?`background:transparent;color:${theme.body_color.split(',')[0]}`:'background:transparent;'" >phone_in_talk</i> -->
						</el-tooltip>
						<!-- </a> -->
						<el-tooltip effect="light" :content="$t('chatClient.tooltip[0]')">
							<i class="material-icons-round" style="background:transparent;" @click="setLeaveMsgVisible(true)">mail</i>
						</el-tooltip>
						<!-- <el-tooltip effect="light" :content="$t('chatClient.tooltip[1]')">

              </el-tooltip> -->
						<el-popover width="103" placement="bottom" :popper-class="sunny?'setting-reference light':'setting-reference dark'" trigger="click">
							<div class="setting new" :class="sunny?'light':'dark'">
								<div v-if="$refs.audio" class="setting-item">
									<i class="material-icons-round notification" style="margin-right:5px;">{{ soundTip?'notifications_active':'notifications_off' }}</i>
									<el-switch v-model="soundTip" @change="clickSoundTip" />
								</div>
								<div v-if="showDayNight" class="setting-item">
									<i class="material-icons-round sunny" style="margin-right:5px;">wb_sunny</i>
									<el-switch v-model="sunny" />
								</div>
								<div class="setting-item close" :class="sunny?'light':'dark'" :style="`display: flex;align-items: center;justify-content: center;color:${theme.body_color.split(',')[0]}`" @click="closeWindow">{{$t('chatClient.close')}}</div>
							</div>
							<i slot="reference" class="material-icons-round" style="background:transparent;">settings</i>
						</el-popover>
						<audio ref="audio" src="/audio/default.wav" />
					</div>
				</div>

				<!-- 内容框 -->
				<div class="chat-body" :class="{'hide-side': hideSide}" :style="setColorOrGradient(theme.chatcolor.split(',')[0])">
					<div v-loading="uploading" class="content-main" :element-loading-text="$t('chatClient.chatBody.uploading')" :class="{'dark':!sunny}" element-loading-background="transparent" :style="`${setColorOrGradient(theme.chatcolor)}`">
						<chat-content :hasClickUpload="hasClickUpload" ref="chatContent" :is-new="isNew" :theme="theme" :sunny="sunny" />
						<input-menu @handleUpload="handleUpload" :theme="theme" :sunny="sunny" :layer="layer" />
					</div>
					<div class="content-side" :style="setColorOrGradient(theme.rightcolor)">
						<question :theme="theme" :sunny="sunny" />
					</div>
				</div>
			</div>
		</template>
		<template v-else>
			<div class="client-container__center" :class="{'dark':!sunny,'light':sunny,'special3':theme.stylenum == 4}">
				<div class="spe-bg" :style="`background-image: linear-gradient(to right,${theme.chatcolor.split(',')[0]}, ${theme.rightcolor.split(',')[0]});`" />
				<!-- 头部 -->
				<div class="chat-head" :style="theme.stylenum == 3?setColorOrGradient(theme.chatcolor) : setColorOrGradient(theme.body_color)" :class="{'special':theme.stylenum == 3,'special3':theme.stylenum == 3,'dark':!sunny, 'special4': theme.stylenum === 4}">
					<div class="chat-head__left">
						<div v-if="serverDetail.avatar" class="avatar" :class="serverStatus">
							<img :src="`${baseUrl}${serverDetail.avatar}`" :class="{'special':theme.stylenum == 3,'special3':theme.stylenum == 4}">
							<span class="status" :class="{'special':theme.stylenum == 3,'special3':theme.stylenum == 4}" />
						</div>
						<div class="server" :class="{'special':theme.stylenum == 3,'special3':theme.stylenum == 4}">
							<div class="name">{{ serverDetail.name }}</div>
							<span v-if="platform.domainInfo" class="hello-world">{{ platform.domainInfo.hello_title }}</span>
						</div>
					</div>
					<div class="chat-head__right">
						<!-- <a v-if="platform.domainInfo && platform.domainInfo.skype" target="_blank" :href="`skype:${platform.domainInfo.skype}`" :style="theme.stylenum == 2?`color:${theme.body_color[0]}`:''"> -->
						<el-tooltip v-if="platform.domainInfo && platform.domainInfo.skype" effect="light" :content="$t('chatClient.tooltip[6]')">
							<i class="material-icons-round" :class="{'special1':theme.stylenum == 2,'special3':theme.stylenum == 4}" :style="theme.stylenum == 3?`background:transparent;color:${theme.body_color.split(',')[0]}`:'background:transparent;'" @click="activeSkype(platform.domainInfo.skype)">phone_in_talk</i>
							<!-- <i class="material-icons-round" :class="{'special1':theme.stylenum == 1,'special3':theme.stylenum == 3}" :style="theme.stylenum == 2?`background:transparent;color:${theme.body_color.split(',')[0]}`:'background:transparent;'" >phone_in_talk</i> -->
						</el-tooltip>
						<!-- </a> -->
						<el-tooltip effect="light" :content="$t('chatClient.tooltip[0]')">
							<i class="material-icons-round" :class="{'special1':theme.stylenum == 2,'special3':theme.stylenum == 4}" :style="theme.stylenum == 3?`background:transparent;color:${theme.body_color.split(',')[0]}`:'background:transparent;'" @click="setLeaveMsgVisible(true)">mail</i>
						</el-tooltip>
						<!-- <el-tooltip effect="light" :content="$t('chatClient.tooltip[1]')">

              </el-tooltip> -->
						<el-popover width="103" placement="bottom" :popper-class="sunny?'setting-reference light':'setting-reference dark'" trigger="click">
							<div class="setting" :class="sunny?'light':'dark'">
								<div v-if="$refs.audio" class="setting-item">
									<i class="material-icons-round notification" :style="`color:${theme.body_color.split(',')[0]};margin-right:5px;`">{{ soundTip?'notifications_active':'notifications_off' }}</i>
									<el-switch v-model="soundTip" :active-color="theme.body_color.split(',')[0]" @change="clickSoundTip" />
								</div>
								<div v-if="showDayNight" class="setting-item">
									<i class="material-icons-round sunny" :style="`color:${theme.body_color.split(',')[0]};margin-right:5px;`">wb_sunny</i>
									<el-switch v-model="sunny" :active-color="theme.body_color.split(',')[0]" />
								</div>
								<div class="setting-item close" :class="sunny?'light':'dark'" :style="`display: flex;align-items: center;justify-content: center;color:${theme.body_color.split(',')[0]}`" @click="closeWindow">{{$t('chatClient.close')}}</div>
							</div>
							<i slot="reference" class="material-icons-round" :class="{'special1':theme.stylenum == 2,'special3':theme.stylenum == 4}" :style="theme.stylenum == 3?`background:transparent;color:${theme.body_color.split(',')[0]}`:'background:transparent;'">settings</i>
						</el-popover>
						<audio ref="audio" src="/audio/default.wav" />
					</div>
				</div>

				<!-- 内容框 -->
				<div class="chat-body" :class="{'hide-side': hideSide}">
					<div v-loading="uploading" class="content-main" :element-loading-text="$t('chatClient.chatBody.uploading')" :class="{'special3':theme.stylenum ==3,'special4':theme.stylenum ==4,'dark':!sunny}" element-loading-background="transparent" :style="theme.stylenum == 2?`${setColorOrGradient(theme.chatcolor)};border-color:${theme.chatcolor.split(',')[0]}`:`${setColorOrGradient(theme.chatcolor)}`">
						<chat-content :hasClickUpload="hasClickUpload" ref="chatContent" :theme="theme" :sunny="sunny" />
						<input-menu @handleUpload="handleUpload" :theme="theme" :sunny="sunny" :layer="layer" />
					</div>
					<div :class="['content-side', {'special4':theme.stylenum ==4, 'dark':!sunny}]" :style="setColorOrGradient(theme.rightcolor)">
						<question :theme="theme" :sunny="sunny" />
					</div>
				</div>
			</div>
		</template>

		<!-- 接入客服loading -->
		<!-- <loading-modal v-show="isShowLoading" /> -->
		<!-- 留言弹窗 -->
		<leave-message />
	</div>
</template>

<script>
import question from './question.vue'
import inputMenu from './inputMenu.vue'
import chatContent from './chatContent.vue'
import leaveMessage from './leaveMessage.vue'
// import loadingModal from './loadingModal.vue'
import { mapState, mapMutations } from 'vuex'
import { getPlatformInfo, getRequestIp } from '@/api/chatClient.js'
import { eventBus } from './eventBus.js'
import { setTheme } from '@/utils/theme'
import Bowser from 'bowser'
import { setColorOrGradient } from '@/utils/index'
export default {
	name: 'ChatClient',
	components: { question, inputMenu, leaveMessage, chatContent },
	data () {
		return {
			soundTip: true,
			heartBeat: null,
			baseUrl: process.env.VUE_APP_BASE_URL,
			hasClickUpload: false,
			sunny: true,
			isNew: false, // 是否新版ui
			layer: '',
			default: {
				body_color: '#fff',
				color_bg: '#f6f8ff',
				chatcolor: '#fff',
				rightcolor: '#F6F7FB',
				font_color: '#e3ebff',
				nbody_color: '#3D404A',
				ncolor_bg: '#393c47',
				nchatcolor: '#3D404A',
				nrightcolor: '#33353C',
				nfont_color: '#C5d2ec'
			},
			color: {
				light: {
					body_color: '',
					color_bg: '',
					chatcolor: '',
					rightcolor: '',
					font_color: ''
				},
				night: {
					body_color: '',
					color_bg: '',
					chatcolor: '',
					rightcolor: '',
					font_color: ''
				}
			},
			isShowLoading: true
		}
	},
	computed: {
		theme () {
			if (this.sunny) {
				return this.color.light
			} else {
				return this.color.night
			}
		},
		showDayNight () {
			const {
				platform: { domainInfo }
			} = this
			return !!(domainInfo && domainInfo.isnight)
		},
		serverBg () {
			const {
				baseUrl,
				platform: { domainInfo }
			} = this
			return domainInfo && domainInfo.kefu_bg ? `background:url(${baseUrl}${domainInfo.kefu_bg}) no-repeat center / cover` : `${setColorOrGradient(this.theme.color_bg)}`
		},
		...mapState('chatClient', [
			'ws',
			'sp',
			'customer',
			'wsMsg',
			'platform',
			'uploading',
			'serverStatus',
			'themeColor',
			'transferServer',
			'serverInfo',
			'mouseOnEmoji'
		]),
		...mapState({
			serverStatus (state) {
				return state.chatClient.serverStatus
				// const {
				// 	platform: { type }
				// } = this
				// if (type == 2) {
				// 	// 固定链接，头像动态展示
				// 	return state.chatClient.serverStatus
				// } else {
				// 	// 头像写死
				// 	return 'online'
				// }
			}
		}),
		serverDetail () {
			let curServer = {}
			const {
				sp,
				serverInfo,
				transferServer,
				platform: { domainInfo }
			} = this
			if (sp == 'robot') {
				curServer = {
					name: domainInfo.robotname,
					avatar: domainInfo.robotpic
				}
			} else if (sp == 'server') {
				curServer = {
					name: serverInfo.kefu_name,
					avatar: serverInfo.kefu_avatar
				}
			} else if (sp == 'transferServer') {
				curServer = {
					name: transferServer.kefu_name,
					avatar: transferServer.kefu_avatar
				}
			}
			return curServer
		},
		hideSide () {
			const { platform } = this
			return !platform?.domainInfo?.extension_bg && !platform?.question?.length
		}
	},
	watch: {
		wsMsg (v) {
			const { cmd, data } = v
      console.log("index-wsMsg -> cmd", cmd)
			switch (cmd) {
				// 初始化客服
				case 'userInit':
					this.isShowLoading = false
					break
				// 客服隐身
				case 'Kfinvisible':
					this.setServerStatus('invisible')
					break

        case 'Kfonline':
          this.directConnect()
          break

				default:
					this.isShowLoading = false
					break
			}
		}
	},
	methods: {
		setColorOrGradient,
		getXhr (url, cb) {
			var httpRequest = new XMLHttpRequest();
			httpRequest.open('GET', url, true);
			httpRequest.send();
			httpRequest.onreadystatechange = function () {
				if (httpRequest.readyState == 4 && httpRequest.status == 200) {
					var json = httpRequest.responseText;
					cb(json);
				}
			};
		},
		handleUpload (val) {
			this.hasClickUpload = val
		},
		activeSkype (skype) {
			const skypeA = document.createElement('a')
			skypeA.setAttribute('href', `skype:${skype}`)
			skypeA.setAttribute('target', '_blank')
			skypeA.style.position = 'relative'
			skypeA.style.zIndex = 1
			document.body.appendChild(skypeA)
			skypeA.click()
			setTimeout(() => {
				skypeA.parentNode.removeChild(skypeA)
			})
		},
		initTheme () {
			const date = new Date()
			const hour = date.getHours()
			if ((hour >= 21 || hour <= 6) && this.showDayNight) {
				this.sunny = false
			}
		},
		watchTime () {
			const date = new Date()
			const hour = date.getHours()
			const min = date.getMinutes()
			const seconds = date.getSeconds()
			if (hour == 21 && min == 0 && seconds == 0 && this.showDayNight) {
				this.sunny = false
			}
			if (hour == 6 && min == 0 && seconds == 0) {
				this.sunny = true
			}
		},
		async getPlatformInfo () {
			const tempParams = {}
			const { pathMatch } = this.$route.params
			if (pathMatch) {
				const paramsList = pathMatch.split('/')
				paramsList.forEach(params => {
					const [type, value] = params.split('_')
					tempParams[type] = value
				})
			}
			const {
				seller: u,
				server: f,
				domain: referer,
				group,
				custom: params,
				layer,
				source
			} = tempParams

			this.setServerCode(f)
			this.setGroup(group)
			this.layer = ''
			// 在弹层里
			if (layer === 'yes') {
				// 取之前缓存的客服
				this.setInlayer(true)
				this.layer = 'yes'
				// f = localStorageCompatible.getItem('cacheServerCode')
			}

			let dataIp = await getRequestIp();
			let ip = dataIp.ip;
      if(dataIp.city === '0' && sessionStorageCompatible.getItem('lang') !== 'en'){
        sessionStorageCompatible.setItem('lang', 'en')
				location.reload()
      }
			/*let ip = window?.returnCitySN?.cip
			if (!ip) {
				this.getXhr("https://api.ipify.org/?format=json", function (data) {
					ip = JSON.parse(data)?.ip;
				})
			}*/
			getPlatformInfo({ u, f, referer, group, params, source, ip }).then(res => {
				const { code, data } = res
				this.isNew = data.domainInfo.style.includes('is_new') && data.domainInfo.stylenum === 1
				if (code === 0) {
					this.setPlatform(data)
					this.initWebSocket(true)
					if (!data.domainInfo.style.includes('is_new')) {
						this.color = {
							light: {
								body_color: data.domainInfo.body_color || this.default.body_color,
								color_bg: data.domainInfo.color_bg || this.default.color_bg,
								chatcolor: data.domainInfo.chatcolor || this.default.chatcolor,
								rightcolor: data.domainInfo.rightcolor || this.default.rightcolor,
								font_color: data.domainInfo.font_color || this.default.font_color,
								stylenum: data.domainInfo.stylenum || 2
							},
							night: {
								body_color: data.domainInfo.nbody_color || this.default.nbody_color,
								color_bg: data.domainInfo.ncolor_bg || this.default.ncolor_bg,
								chatcolor: data.domainInfo.nchatcolor || this.default.nchatcolor,
								rightcolor: data.domainInfo.nrightcolor || this.default.nrightcolor,
								font_color: data.domainInfo.nfont_color || this.default.nfont_color,
								stylenum: data.domainInfo.stylenum || 2
							}
						}
					} else {
						this.color = {
							light: {
								body_color: data.domainInfo.body_color || this.default.body_color,
								color_bg: data.domainInfo.color_bg || this.default.color_bg,
								chatcolor: data.domainInfo.chatcolor || this.default.chatcolor,
								rightcolor: data.domainInfo.rightcolor || this.default.rightcolor,
								font_color: data.domainInfo.font_color || this.default.font_color,
								stylenum: data.domainInfo.stylenum || 2
							},
							night: {
								body_color: data.domainInfo.nbody_color || this.default.nbody_color,
								color_bg: data.domainInfo.ncolor_bg || this.default.ncolor_bg,
								chatcolor: data.domainInfo.nchatcolor || this.default.nchatcolor,
								rightcolor: data.domainInfo.nrightcolor || this.default.nrightcolor,
								font_color: data.domainInfo.nfont_color || this.default.nfont_color,
								stylenum: data.domainInfo.stylenum || 2
							}
						}
					}

					document.title = data.domainInfo.domain_title + this.$t('chatClient.server')
				}
			}).catch(error => {
        this.$alert(this.$t('chatClient.timeout.message'), '', {
          confirmButtonText: this.$t('chatClient.timeout.confirm'),
          showClose: false,
          callback: action => {
            location.reload();
          }
        });
      })
		},
		initWebSocket (firstFlag) {
			const ws = new WebSocket(this.platform.socket + '/websocket')
			ws.onopen = () => {
				console.log('=========ws建立=========')
				this.setWS(ws)
				this.initCustomer()
				this.keepHeartbeat()
				this.setSessionStatus('open')
				this.setFirstInitFlag(firstFlag)
				if (!firstFlag && this.sp != 'robot') {
					this.directConnect()
				}
			}
			ws.onmessage = evt => {
				const wsMsg = JSON.parse(evt.data)
				this.setWsMsg(wsMsg)
				if (wsMsg.cmd == 'chatMessage' && this.soundTip) {
					this.$refs.audio.play()
				}
			}
			ws.onclose = () => {
				console.log('=========ws关闭=========')
				clearInterval(this.heartBeat)
        // TODO: 修复bug 刷新无法获取新的客服，之前为false，调整为true之后正常，考虑是否影响其他功能
				this.initWebSocket(false)
			}
		},
		keepHeartbeat () {
			this.ping()
			this.heartBeat = setInterval(() => {
				this.ping()
			}, 20000)
		},
		clickSoundTip (v) {
			if (this.soundTip) {
				this.$refs.audio.play()
			}
		},
		closeWindow () {
			this.closeCustomer()
			if (top == window) {
				if (confirm(this.$t('chatClient.closeWindow'))) {
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
				}
			} else {
				top.postMessage({ cmd: 'hideChat' }, '*')
			}
		},
		clickQuestion (question) {
			this.sendQuestion(question)
			eventBus.$emit('sendQuestion', question.question)
		},
		stopWheelSpread () {
			if (top != window && window.innerWidth < 1000) {
				const head = document.querySelector('.chat-head')
				const body = document.querySelector('.chat-content')
				const foot = document.querySelector('.input-menu')

				if (navigator.userAgent.indexOf('Firefox') > 0) {
					head.addEventListener('DOMMouseScroll', evt => {
						evt.preventDefault()
					}, false)
					foot.addEventListener('DOMMouseScroll', evt => {
						if (!this.mouseOnEmoji) {
							evt.preventDefault()
						}
					}, false)
					body.addEventListener('DOMMouseScroll', evt => {
						if (body.scrollHeight !== body.clientHeight) {
							if (body.scrollTop === 0) {
								if (evt.detail == -3) {
									evt.preventDefault()
								}
							} else if (
								body.scrollTop ===
								body.scrollHeight - body.clientHeight
							) {
								if (evt.detail == 3) {
									evt.preventDefault()
								}
							}
						} else {
							evt.preventDefault()
						}
					}, false)
				} else {
					head.addEventListener('mousewheel', evt => {
						evt.preventDefault()
					}, false)
					foot.addEventListener('mousewheel', evt => {
						if (!this.mouseOnEmoji) {
							evt.preventDefault()
						}
					}, false)
					body.addEventListener('mousewheel', evt => {
						if (body.scrollHeight !== body.clientHeight) {
							if (body.scrollTop === 0) {
								if (evt.wheelDelta > 0) {
									evt.preventDefault()
								}
							} else if (
								body.scrollTop ===
								body.scrollHeight - body.clientHeight
							) {
								if (evt.wheelDelta < 0) {
									evt.preventDefault()
								}
							}
						} else {
							evt.preventDefault()
						}
					}, false)
				}
			}
		},
		closeCustomerHandler () {
			const {
				browser: { name }
			} = Bowser.parse(navigator.userAgent)
			if (name.toLowerCase() === 'safari') {
				const body = document.getElementsByTagName('body')[0]
				body.onunload = () => {
					this.closeCustomer()
				}
				body.onbeforeunload = () => {
					this.closeCustomer()
				}
			} else {
				window.onunload = () => {
					this.closeCustomer()
				}
				window.onbeforeunload = () => {
					this.closeCustomer()
				}
			}
		},
		forceRefreshOnReturn () {
			const {
				browser: { name }
			} = Bowser.parse(navigator.userAgent)
			if (name === 'Safari') {
				window.onpageshow = function (e) {
					if (e.persisted || (window.performance && window.performance.navigation.type == 2)) {
						window.location.reload()
					}
				}
			}
		},
		...mapMutations('chatClient', [
			'ping',
			'setWS',
			'setWsMsg',
			'setInlayer',
			'setPlatform',
			'setServerCode',
			'setServerStatus',
			'setGroup',
			'initCustomer',
			'sendQuestion',
			'setThemeColor',
			'directConnect',
			'setSessionStatus',
			'setLeaveMsgVisible',
			'setFirstInitFlag',
			'setBowserInfo',
			'closeCustomer',
			'sendToServer'
		])
	},
	created () {
		this.setBowserInfo(Bowser.parse(navigator.userAgent))
		this.getPlatformInfo()
		setTheme('light')
	},
	mounted () {
		this.stopWheelSpread()
		this.closeCustomerHandler()
		this.forceRefreshOnReturn()
		this.timer = setInterval(() => {
			this.watchTime()
		}, 1000)
		this.$nextTick(() => {
			setTimeout(() => {
				this.initTheme()
			}, 1000)
		})
	},
	destroyed () {
		clearInterval(this.timer)
	}
}
</script>
<style lang="scss">
.setting-reference {
	padding: 0;
	border: none;
	.setting {
		padding: 10px;
		padding-bottom: 5px;
		&.dark {
			background: rgba(69, 69, 69, 1);
		}
		.setting-item {
			display: flex;
			align-items: center;
			justify-content: center;
			margin-bottom: 5px;
			cursor: pointer;
			&.close {
				padding-top: 5px;
				margin-bottom: 0;
				box-sizing: border-box;
				border-top: 1px solid rgba(229, 229, 229, 0.6);
				&.dark {
					border-top: 1px solid rgba(72, 72, 72, 0.6);
				}
			}
		}
		&.new.light {
			.material-icons-round {
				color: #28324c !important;
			}
		}
		&.new.dark {
			.material-icons-round {
				color: #979cb5 !important;
			}
			background: #3d404a !important;
		}
		&.new {
			.close {
				color: #5082f4 !important;
			}
		}
	}
	&.dark {
		.popper__arrow {
			border-bottom-color: rgba(69, 69, 69, 1) !important;
			border-top-color: rgba(69, 69, 69, 1) !important;
			&::after {
				border-bottom-color: rgba(69, 69, 69, 1) !important;
				border-top-color: rgba(69, 69, 69, 1) !important;
			}
		}
	}
}
</style>

<style lang="scss" scoped>
.material-icons-round.sunny,
.material-icons-round.notification {
	// color: #5082F4;
	vertical-align: middle;
}
.client-container {
	position: relative;
	height: 100%;
	background-position: center;
	background-repeat: no-repeat;
	background-size: cover;
	.client-container__center {
		display: flex;
		flex-direction: column;
		justify-content: space-between;
		position: absolute;
		z-index: 1;
		top: 0;
		bottom: 0;
		left: 0;
		right: 0;
		width: 768px;
		height: 600px;
		border-radius: 16px;
		overflow: hidden;
		margin: auto;
		box-shadow: 0px 8px 25px 3px rgb(0 0 0 / 20%);
		&.special3 {
			border-radius: 12px;
		}
		&.dark {
			box-shadow: 0px 8px 25px 3px rgb(0 0 0 / 30%);
		}
		.spe-bg {
			position: absolute;
			top: 40px;
			left: 0;
			height: 15px;
			width: 100%;
			z-index: 4;
		}
		.chat-head {
			display: flex;
			align-items: center;
			justify-content: space-between;
			padding: 4px 20px;
			color: #fff;
			position: relative;
			z-index: 5;
			height: 55px;
			&.special {
				border-bottom: 1px solid #f0f0f0;
				&::after {
					content: "";
					position: absolute;
					z-index: 1;
					left: 0;
					bottom: -2px;
					right: 0;
					height: 1px;
					background: #ffffff;
				}
				&.dark {
					border-bottom: 1px solid #171717;
					&::after {
						content: "";
						position: absolute;
						z-index: 1;
						left: 0;
						bottom: -2px;
						right: 0;
						height: 1px;
						background: #535353;
					}
				}
			}
			&.special4 {
				border-radius: 12px 12px 0 0;
				box-shadow: 0px 5px 10px 0px rgba(#9cbfff, 0.5);
				&.dark {
					box-shadow: 0px 5px 10px 0px rgba(0, 0, 0, 0.3);
				}
			}
			.chat-head__left {
				display: flex;
				// align-items: flex-start;
				align-items: center;
				.server {
					flex: 1;
					padding-top: 2px;
					font-size: 12px;
					&.special {
						color: #7a7a7a;
					}
					&.special3 {
						color: #e9e9e9;
						.name {
							padding-bottom: 5px;
						}
					}
					.name {
						padding-bottom: 5px;
						font-size: 16px;
					}
					.hello-world {
						line-height: 1.4;
					}
				}
				.avatar {
					position: relative;
					margin-right: 12px;
					img {
						width: 40px;
						height: 40px;
						// border: 2px solid #fff;
						border-radius: 50%;
						overflow: hidden;
						&.special,
						&.special3 {
							border-radius: 8px;
							margin-top: 4px;
						}
					}
					.status {
						position: absolute;
						z-index: 1;
						bottom: 7px;
						right: -3px;
						width: 13px;
						height: 13px;
						border: 2px solid #fff;
						border-radius: 50%;
						background: #009f41;
						&.special {
							bottom: 4px;
							right: -6px;
						}
						&.special3 {
							bottom: 7px;
							right: -6px;
						}
					}
					&.online {
						.status {
							background: #009f41;
						}
					}
					&.offline {
						img {
							filter: grayscale(100%);
						}
						.status {
							background: #d8dde9;
						}
					}
					&.invisible {
						img {
							filter: grayscale(100%);
						}
						.status {
							background: #d8dde9;
						}
					}
				}
			}
			.chat-head__right {
				z-index: 20;
				::v-deep.el-dropdown {
					.material-icons-round {
						color: #fff;
					}
					.close {
						display: flex;
						align-items: center;
						justify-content: center;
					}
				}
				.material-icons-round {
					display: inline-flex;
					align-items: center;
					justify-content: center;
					width: 34px;
					height: 34px;
					margin-right: 25px;
					border-radius: 50%;
					background: rgba(255, 255, 255, 0.3);
					font-size: 20px;
					cursor: pointer;
					&.special1,
					&.special3 {
						opacity: 0.3;
					}
					&.close {
						width: auto;
						height: auto;
						margin: 0 0 0 5px;
						background: none;
						color: rgba(255, 255, 255, 0.3);
					}
				}
			}
		}
		.chat-body {
			flex: 1;
			display: flex;
			overflow: auto;
			overflow-x: hidden;
			.content-main {
				display: flex;
				flex-direction: column;
				width: 530px;
				border-right: 1px solid transparent;
				position: relative;
				&.special3 {
					// border-color: #ffffff;
					&::after {
						content: "";
						position: absolute;
						z-index: 1;
						bottom: 0;
						right: -2px;
						top: 0;
						width: 1px;
						background: #f0f0f0;
					}
					&.dark {
						border-color: #353a5d;
						&::after {
							content: "";
							position: absolute;
							z-index: 1;
							bottom: 0;
							right: -2px;
							top: 0;
							width: 1px;
							background: #1a2251;
						}
					}
					.input-menu {
						border-top: 1px solid #f0f0f0;
					}
				}
				&.special4 {
					.input-menu {
						border-top: 1px solid #f0f0f0;
					}
					&.dark {
						.input-menu {
							border-top: 1px solid #32343b;
						}
					}
				}
				.input-menu {
					&.special {
						border-top: 1px solid #ffffff;
						&::after {
							content: "";
							position: absolute;
							z-index: 1;
							left: 0;
							top: -1px;
							right: 0;
							height: 1px;
							background: #f0f0f0;
						}
						&.dark {
							border-top: 1px solid #535353;
							&::after {
								content: "";
								position: absolute;
								z-index: 1;
								left: 0;
								top: -1px;
								right: 0;
								height: 1px;
								background: #171717;
							}
						}
						::v-deep.el-textarea .el-textarea__inner {
							padding: 10px 0;
							resize: none;
							border: none;
							border-radius: 0;
						}
					}
					&.special3 {
						border-top: 1px solid #ffffff;
						&::after {
							content: "";
							position: absolute;
							z-index: 1;
							left: 0;
							top: -2px;
							right: 0;
							height: 1px;
							background: #f0f0f0;
						}
						&.dark {
							border-top: 1px solid #171717;
							&::after {
								content: "";
								position: absolute;
								z-index: 1;
								left: 0;
								top: -2px;
								right: 0;
								height: 1px;
								background: #535353;
							}
						}
						::v-deep.el-textarea .el-textarea__inner {
							padding: 10px 0;
							resize: none;
							border: none;
							border-radius: 0;
						}
					}
					&.not-special.dark {
						border-top: 1px solid rgba(#979cb5, 0.2);
						::v-deep.el-textarea::after {
							content: "";
							position: absolute;
							z-index: 1;
							left: 0;
							top: 0;
							right: 0;
							height: 1px;
							background: #535353;
							.el-textarea__inner {
								padding: 10px 0;
								resize: none;
								border: none;
								border-radius: 0;
							}
						}
					}
					&.not-special {
						border-top: 1px solid #ebedf0;
						::v-deep.el-textarea {
							position: relative;
							&::after {
								content: "";
								position: absolute;
								z-index: 1;
								left: 0;
								top: 0;
								right: 0;
								height: 1px;
								background: rgba(229, 229, 229, 0.6);
							}
							.el-textarea__inner {
								padding: 10px 0;
								resize: none;
								border: none;
								border-radius: 0;
							}
						}
					}

					.chat-foot__menu {
						display: flex;
						align-items: center;
						justify-content: space-between;
						padding: 0 20px 20px;
						.iconfont {
							margin-right: 10px;
							cursor: pointer;
							font-size: 20px;
							color: #c2c2c2;
						}
					}
				}
			}
			.content-side {
				display: flex;
				flex-direction: column;
				flex: 1;
				&.special4 {
					border-left: 1px solid #f0f0f0;
					&.dark {
						border-left: 1px solid #32343b;
					}
				}
			}
			&.hide-side {
				.content-main {
					width: 100%;
				}
				.content-side {
					display: none;
				}
			}
		}

		&.new {
			::v-deep.menu {
				.menu-right {
					background: #6ecc94 !important;
					box-shadow: 0px 6px 24px 0px rgba(95, 210, 141, 0.5);
					// border-radius: 16px;
				}
			}
			::v-deep#chat-content {
				.chat-item.customer {
					.content {
						// background: #5082f4 !important;
					}
				}
				.chat-item.server {
					.common-question {
						background: #f6f7fb !important;
						&.dark {
							background: #33353c !important;
						}
					}
					.action {
						color: #5082f4 !important;
					}
				}
			}
			::v-deep.input-menu {
				.menu-left__switch {
					color: #72798c !important;
				}
			}
			.content-side {
				margin: 14px 16px 10px 0;
				border-radius: 10px;
			}
			&.light {
				.material-icons-round {
					color: #28324c;
				}
				.chat-head {
					.server {
						.name {
							color: #28324c;
						}
						.hello-world {
							color: #72798c;
						}
					}
				}
				::v-deep#chat-content {
					.chat-item.server {
						.content {
							background: #f6f7fb !important;
						}
					}
				}

				::v-deep.input-menu {
					.el-tooltip.material-icons-round {
						color: #28324c !important;
					}
				}

				::v-deep.common-question {
					.question-head {
						color: #28324c !important;
					}
					.el-collapse .border-left {
						background: #5082f4 !important;
					}
					.question-body {
						.question-item.no-cate .border-left {
							background: #5082f4 !important;
						}
						.changePage {
							i {
								color: #72798c;
							}
						}
					}
				}
			}
			&.dark {
				.material-icons-round {
					color: #979cb5;
				}
				.chat-head {
					.server {
						.name {
							color: #979cb5;
						}
						.hello-world {
							color: #72798c;
						}
					}
				}
				::v-deep#chat-content {
					.chat-item.server {
						.content {
							background: #33353c !important;
						}
					}
				}

				::v-deep.input-menu {
					.el-tooltip.material-icons-round {
						color: #979cb5 !important;
					}
				}

				::v-deep.common-question {
					.question-head {
						color: #979cb5 !important;
					}
					.el-collapse .border-left {
						background: #5082f4 !important;
					}
					.question-body {
						.question-item.no-cate .border-left {
							background: #5082f4 !important;
						}
						.changePage {
							i {
								color: #72798c;
							}
						}
					}
				}
			}
		}
	}
}
</style>

<style lang="scss" scoped>
@media screen and (max-width: 600px) {
	.client-container {
		background: none !important;
		.client-container__center {
			width: 100%;
			height: 100%;
			margin: 0;
			border-radius: 16px 16px 0 0;
			&.special3 {
				border-radius: 12px 12px 0 0;
			}
			.chat-head {
				padding: 5px 15px 5px 10px;
				&.special {
					border-bottom: 1px solid #f0f0f0;
					&::after {
						content: "";
						position: absolute;
						z-index: 1;
						left: 0;
						bottom: -2px;
						right: 0;
						height: 1px;
						background: #ffffff;
					}
					&.dark {
						border-bottom: 1px solid #171717;
						&::after {
							content: "";
							position: absolute;
							z-index: 1;
							left: 0;
							bottom: -2px;
							right: 0;
							height: 1px;
							background: #535353;
						}
					}
				}
				&.special4 {
					// border-radius: 12px;
					box-shadow: 0px 5px 10px 0px rgba(#9cbfff, 0.5);
					&.dark {
						box-shadow: 0px 5px 10px 0px rgba(0, 0, 0, 0.3);
					}
				}
				.chat-head__right {
					z-index: 1;
					margin-left: 10px;
					white-space: nowrap;
					.material-icons-round {
						margin-right: 10px;
						&.special1,
						&.special3 {
							opacity: 0.3;
						}
						&.close {
							width: auto;
							height: auto;
							margin: 0;
							background: none;
							color: rgba(255, 255, 255, 0.3);
						}
					}
				}
			}
			.chat-body {
				.content-main {
					width: 100%;
					border-right: none;
					overflow: hidden;
					::v-deep.chat-item {
						.content,
						.promote {
							max-width: 260px;
							word-break: break-all;
						}
					}
				}
				.content-side {
					display: none;
				}
			}
		}
		::v-deep.el-drawer {
			width: 100% !important;
			.el-drawer__body {
				padding: 15px 22px 0;
				.btn-box {
					text-align: center;
				}
			}
		}
	}
}
@media screen and (max-width: 370px) {
	.client-container {
		::v-deep.chat-item {
			.content,
			.promote {
				max-width: 250px !important;
			}
		}
	}
}
</style>
