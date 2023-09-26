<template>
  <div class="server-header">
    <div v-if="platformItemIndex && isMobile" class="arrow left-arrow" @click="handleLeftClick">
      <i class="el-icon-arrow-left" />
    </div>
    <div v-if="isMobile && platformItemIndex < platformList.length - 1" class="arrow right-arrow" @click="handleRightClick">
      <i class="el-icon-arrow-right" />
    </div>
    <span v-if="isMobile && leftShow" class="leftUnRead" />
    <span v-if="isMobile && rightShow" class="rightUnRead" />
    <div class="header-left">
      <!-- <span>
				<i class="material-icons-round fs-16 mr4">filter_none</i>
				<i class="material-icons-round fs-16">more_vert</i>
			</span> -->
      <div class="platform-list" :style="{left:platformLeft+'px'}">
        <div v-if="isMobile" class="base-info">
          <el-dropdown placement="bottom" trigger="click" @command="changeServerStatus">
            <div style="position:relative;">
              <img class="avatar" :src="`${baseUrl}${server.kefu_avatar}`">
              <span class="status-icon" :class="serverStatus" />
            </div>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item command="online">{{ $t('chatServer.online') }}</el-dropdown-item>
              <el-dropdown-item command="invisible">{{ $t('chatServer.invisible') }}</el-dropdown-item>
              <!-- <el-dropdown-item command="offline">{{ $t('chatServer.offline') }}</el-dropdown-item> -->
            </el-dropdown-menu>
          </el-dropdown>
        </div>
        <div v-if="isMobile" class="setting">
          <el-popover ref="mobileSide" placement="bottom" trigger="click" popper-class="mobile-side-pop">
            <i slot="reference" class="material-icons-round setting-icon">menu</i>
            <div class="mobile-side-pop-main">
              <h4>设置<i class="el-icon-close" @click="closePop" /></h4>
              <div class="flex-aic flex-aic-jcs">
                <span class="mr8">
                  <svg-icon :icon-class="theme" />{{ $t('chatServer.header[2]') }}
                </span>
                <el-switch v-model="theme" active-value="dark" inactive-value="light" active-color="#1890FF" @change="setTheme" />
              </div>
              <div class="flex-aic flex-aic-jcs">
                <span class="mr8">
                  <svg-icon icon-class="notice" />{{ $t('chatServer.header[3]') }}
                </span>
                <el-switch v-model="soundTip" active-color="#1890FF" @change="clickSoundTipMoble" />
              </div>
              <div class="flex-aic flex-aic-jcs">
                <span class="mr8">
                  <svg-icon icon-class="lan" />{{ $t('chatServer.header[4]') }}
                </span>
                <el-dropdown trigger="click" @command="changeLang">
                  <div class="lang-item">
                    <img class="icon" :src="curLang.icon">
                    <span class="mr2">{{ curLang.lang }}</span>
                    <i class="el-icon-arrow-down" />
                  </div>
                  <el-dropdown-menu slot="dropdown" class="lang-dropdown">
                    <el-dropdown-item command="zh">
                      <div class="lang-item">
                        <img class="icon" src="@/assets/svg/zh.svg">
                        {{ $t('navbar.zh') }}
                      </div>
                    </el-dropdown-item>
                    <el-dropdown-item command="en">
                      <div class="lang-item">
                        <img class="icon" src="@/assets/svg/en.svg">
                        {{ $t('navbar.en') }}
                      </div>
                    </el-dropdown-item>
                    <el-dropdown-item command="vi">
                      <div class="lang-item">
                        <img class="icon" src="@/assets/svg/vi.svg">
                        {{ $t('navbar.vi') }}
                      </div>
                    </el-dropdown-item>
                    <el-dropdown-item command="th">
                      <div class="lang-item">
                        <img class="icon" src="@/assets/svg/th.svg">
                        {{ $t('navbar.th') }}
                      </div>
                    </el-dropdown-item>
                  </el-dropdown-menu>
                </el-dropdown>
              </div>
              <div class="flex-aic flex-aic-jcc">
                <span @click="clickLogout">{{ $t('chatServer.header[5]') }}</span>
              </div>
            </div>
            <div class="mobile-side-pop-bg" @click="closePop" />
          </el-popover>
        </div>
        <div v-for="(platform, index) in platformList" :key="index" :class="{'platform-item':true,'active':activePlatform==platform.domain_title,'un-read':platform.unRead,'has-relink':platform.hasRelink}" @click="clickPlatform(platformList,platform, index)">
          {{ platform.domain_title }}
          <i class="material-icons-round fs-16">error</i>
        </div>
      </div>
    </div>
    <div class="header-right">
      <el-button v-if="NODE_ENV == 'development'" type="primary" style="margin-right:10px;" @click="closeWsHandle">断开ws</el-button>
      <div class="flex-aic mr24">
        <span class="mr8">{{ $t('chatServer.header[2]') }}</span>
        <el-switch v-model="theme" active-value="dark" inactive-value="light" active-color="#1890FF" @change="setTheme" />
      </div>
      <!-- <i class="material-icons-round fs-16 mr6">account_circle</i> -->
      <!-- <span class="mr16">{{ server.kefu_username }}</span> -->
      <!-- <i class="material-icons-round fs-18 mr24" @click="clickSoundTip">{{ soundTip?'volume_up':'volume_off' }}</i> -->
      <svg-icon :icon-class="soundTip?'volume_up':'volume_off'" class="fs-18 mr24" @click="clickSoundTip" />
      <el-dropdown class="mr18" trigger="click" @command="changeLang">
        <div class="lang-item">
          <img class="icon" :src="curLang.icon">
          <span class="mr2">{{ curLang.lang }}</span>
          <i class="el-icon-arrow-down" />
        </div>
        <el-dropdown-menu slot="dropdown" class="lang-dropdown">
          <el-dropdown-item command="zh">
            <div class="lang-item">
              <img class="icon" src="@/assets/svg/zh.svg">
              {{ $t('navbar.zh') }}
            </div>
          </el-dropdown-item>
          <el-dropdown-item command="en">
            <div class="lang-item">
              <img class="icon" src="@/assets/svg/en.svg">
              {{ $t('navbar.en') }}
            </div>
          </el-dropdown-item>
          <el-dropdown-item command="vi">
            <div class="lang-item">
              <img class="icon" src="@/assets/svg/vi.svg">
              {{ $t('navbar.vi') }}
            </div>
          </el-dropdown-item>
          <el-dropdown-item command="th">
            <div class="lang-item">
              <img class="icon" src="@/assets/svg/th.svg">
              {{ $t('navbar.th') }}
            </div>
          </el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
      <span class="logout" @click="clickLogout">{{ $t('chatServer.header[1]') }}</span>
    </div>
    <audio ref="audio" :src="`/audio/${sound}`" />
  </div>
</template>

<script>
import Bowser from 'bowser'
import { setTheme } from '@/utils/theme'
import { mapState, mapActions, mapMutations } from 'vuex'
import { getLanguage } from '@/lang/index.js'
import { getPlatformList } from '@/api/chatServer.js'
import { eventBus } from './eventBus.js'
export default {
  data() {
    return {
      sound: '',
      haveMessage: false,
      customer: [],
      platformItemIndex: 0,
      platformLeft: 0,
      leftShow: false,
      rightShow: false,
      soundTip: true,
      platformList: [],
      activePlatform: '',
      theme: 'light',
      baseUrl: process.env.VUE_APP_BASE_URL,
      NODE_ENV: process.env.NODE_ENV,
      serverStatusMap: {
        online: this.$t('chatServer.online'),
        offline: this.$t('chatServer.offline'),
        invisible: this.$t('chatServer.invisible')
      }
    }
  },
  computed: {
    curLang() {
      const lang = getLanguage()
      return {
        zh: {
          lang: this.$t('navbar.zh'),
          icon: require('@/assets/svg/zh.svg')
        },
        en: {
          lang: this.$t('navbar.en'),
          icon: require('@/assets/svg/en.svg')
        },
        vi: {
          lang: this.$t('navbar.vi'),
          icon: require('@/assets/svg/vi.svg')
        },
        th: {
          lang: this.$t('navbar.th'),
          icon: require('@/assets/svg/th.svg')
        }
      }[lang]
    },
    // 判断是否在移动端
    isMobile() {
      const info = navigator.userAgent
      const agents = [
        'Android',
        'iPhone',
        'SymbianOS',
        'Windows Phone',
        'iPod',
        'iPad'
      ]
      for (let i = 0; i < agents.length; i++) {
        if (info.indexOf(agents[i]) >= 0) return true
      }
      return false
    },
    ...mapState({
      server: state => state.auth.server,
      wsMsg: state => state.chatServer.wsMsg,
      activeState: state => state.chatServer.activeState,
      platformIndex: state => state.chatServer.platformIndex,
      serverStatus: state => state.chatServer.serverStatus,
      currentCustomer: state => state.chatServer.currentCustomer
    })
  },
  watch: {
    wsMsg(v) {
      const { cmd, data } = v
      switch (cmd) {
        // 聊天消息
        case 'chatMessage':
          if (this.serverStatus == 'offline') {
            return
          }
          this.receiveHandler(data)
          break
          // 接受转接
        case 'reLink':
          this.reLinkHandler(data)
          break
          // 群组建立反馈
        case 'groupALL':
          this.groupALLHandler(data)
          break
          // 收到群组邀请
        case 'InvitationKf':
          if (this.soundTip && localStorageCompatible.getItem('serverAudio')) {
            this.$refs.audio.play()
          }
          break
        default:
          break
      }
    },
    platformItemIndex(v) {
      const w = document.body.clientWidth
      this.platformLeft = -1 * v * w
    }
  },
  methods: {
    ...mapMutations({
      setServer: 'auth/setServer'
    }),
    // 手动关闭ws
    closeWsHandle() {
      this.closeWs()
    },
    changeSound(value) {
      this.sound = value
      const _server = { ...this.server, sound: value }
      this.setServer(_server)
    },
    setCustomer(customer) {
      this.customer = customer
    },
    handleRightClick() {
      this.platformItemIndex++
      this.clickPlatform(
        this.platformList,
        this.platformList[this.platformItemIndex],
        this.platformItemIndex
      )
    },
    handleLeftClick() {
      this.platformItemIndex--
      this.clickPlatform(
        this.platformList,
        this.platformList[this.platformItemIndex],
        this.platformItemIndex
      )
    },
    changeServerStatus(status) {
      const { serverStatus } = this
      if (status === 'online') {
        if (serverStatus !== 'online') {
          // 可以上线
          this.onlineServer()
        }
      }
      if (status === 'offline') {
        if (serverStatus !== 'offline') {
          // 可以离线
          this.offlineServer()
        }
      }
      if (status === 'invisible') {
        if (serverStatus !== 'invisible') {
          const onlineCustomer = this.currentCustomer.filter(v => !v.offline)
          if (onlineCustomer.length > 0) {
            this.$alert(`<div style="line-height: 35px;font-weight: bold;">${this.$t('chatServer.invisibleAlert.message')}</div>`, '提示', {
              showConfirmButton: false,
              dangerouslyUseHTMLString: true,
              center: true
            })
            return
          }
          // 可以隐身
          this.hideServer()
        }
      }
    },
    clickLogout() {
      const { seller_code } = this.server
      const { redirect } = this.$route.query
      if (redirect) {
        // 管理员登录的
        this.$router.push({ path: redirect })
      } else {
        // 客服登录的
        // 登出 调用离线指令
        this.offlineServer()
        this.serverLogout().then(res => {
          const { code, msg } = res
          if (code === 0) {
            this.$emit('logout')
            this.$router.push({ path: `/login/server/${seller_code}` })
          } else {
            this.$notify.error({
              title: this.$t('notify.fail'),
              message: msg
            })
          }
        })
      }
    },
    clickSoundTip() {
      this.soundTip = !this.soundTip
      if (this.soundTip) {
        this.$refs.audio.play()
      }
    },
    clickSoundTipMoble() {
      if (this.soundTip) {
        this.$refs.audio.play()
      }
    },
    clickPlatform(platformList, platform, index) {
      this.$emit('changePlatform', platform)
      this.setPlatformIndex(index)
      platform.unRead = false
      platform.hasRelink = false
      this.$forceUpdate()
      // 切换不同平台
      if (platform.domain_title != this.activePlatform) {
        this.activePlatform = platform.domain_title
        this.setActivePlatform(platform.domain_title)
        this.setActiveWithdraw(platform.withdraw)
        this.setActiveState(platform.state)
        this.setActiveSession('current')
        this.$emit('clickPlatform')
      }
      let left = true
      let right = true
      for (let index = 0; index < this.platformItemIndex; index++) {
        if (platformList[index] && platformList[index].unRead) {
          left = false
          this.leftShow = true
          break
        }
      }
      for (
        let index = this.platformItemIndex + 1;
        index < platformList.length;
        index++
      ) {
        if (platformList[index] && platformList[index].unRead) {
          right = false
          this.rightShow = true
          break
        }
      }
      if (left) {
        this.leftShow = false
      }
      if (right) {
        this.rightShow = false
      }
    },
    receiveHandler(res) {
      this.haveMessage = false
      if (this.serverStatus == 'offline') {
        return
      }
      const { platform, state, customer_id } = res
      const { activeState, platformList, activePlatform } = this
      platformList.forEach((item, index) => {
        if (item.domain_title === platform) {
          if (item.domain_title != activePlatform) {
            // 当前平台不显示红点未读标识
            item.unRead = true
          }
          this.haveMessage = true
          if (index > this.platformItemIndex) {
            this.rightShow = true
          }
          if (index < this.platformItemIndex) {
            this.leftShow = true
          }
        }
      })
      this.$forceUpdate()
      // 提示音开关
      if (this.soundTip && this.serverStatus != 'offline' && (this.haveMessage || this.customer.indexOf(customer_id) != -1)) {
        this.$refs.audio.play()
      }
    },
    reLinkHandler(res) {
      const { platform } = res
      const { activePlatform, platformList } = this
      const index = platformList.findIndex(
        item => item.domain_title === platform
      )
      // 分组不匹配
      if (index === -1) {
        // 不是其他分组时，其他分组显示提示
        if (activePlatform !== '其他') {
          const other = platformList.find(item => item.domain_title === '其他')
          if (other) {
            other.hasRelink = true
          }
        }
      } else {
        // 分组匹配，不是当前分组时，显示提示
        if (activePlatform !== platform) {
          for (let i = 0; i < platformList.length; i++) {
            if (platformList[i].domain_title === platform) {
              platformList[i].hasRelink = true
              break
            }
          }
        }
      }
      this.$forceUpdate()
      // 提示音开关
      if (this.soundTip && this.serverStatus != 'offline') {
        this.$refs.audio.play()
      }
    },
    changeLang(lang) {
      if (lang != getLanguage()) {
        sessionStorageCompatible.setItem('lang', lang)
        location.reload()
      }
    },
    getPlatformList(callback) {
      getPlatformList().then(res => {
        const { code, data } = res
        if (code === 0) {
          this.platformList = data
          this.setPlatformList(this.platformList)
          if (typeof callback === 'function') {
            callback(data)
          }
        }
      })
    },
    setTheme(theme) {
      setTheme(theme)
      this.SET_THEME(theme)
      this.theme = theme
    },
    switchPlatform() {
      const {
        os: { name }
      } = Bowser.parse(navigator.userAgent)
      window.addEventListener('keydown', evt => {
        const { ctrlKey, metaKey, keyCode } = evt
        const { platformList, platformIndex } = this

        if ((name === 'macOS' && metaKey) || (name !== 'macOS' && ctrlKey)) {
          if (keyCode === 37) {
            // 左箭头
            if (platformIndex === 0) {
              // 切换到最右边
              this.clickPlatform(
                platformList[platformList.length - 1],
                platformList.length - 1
              )
            } else {
              // 切换到左边挨着的
              this.clickPlatform(
                platformList[platformIndex - 1],
                platformIndex - 1
              )
            }
            evt.preventDefault()
          } else if (keyCode === 39) {
            // 右箭头
            if (platformIndex === platformList.length - 1) {
              // 切换到最左边
              this.clickPlatform(platformList[0], 0)
            } else {
              // 切换到右边挨着的
              this.clickPlatform(
                platformList[platformIndex + 1],
                platformIndex + 1
              )
            }
            evt.preventDefault()
          }
        }
      })
    },
    groupALLHandler(res) {
      const { code, data } = res
      if (code === 200) {
        const { activePlatform, platformList } = this
        if (data.platform !== activePlatform) {
          for (let i = 0; i < platformList.length; i++) {
            if (platformList[i].domain_title === data.platform) {
              platformList[i].hasRelink = true
              this.$forceUpdate()
              break
            }
          }
        }
      }
    },
    closePop() {
      this.$refs.mobileSide.doClose()
    },
    ...mapActions({
      serverLogout: 'auth/serverLogout'
    }),
    ...mapMutations('chatServer', [
      'setActivePlatform',
      'setActiveWithdraw',
      'setActiveState',
      'setActiveSession',
      'setPlatformList',
      'setPlatformIndex',
      'initPlatformOfflineCustomerList',
      'initPlatformLastTime'
    ]),
    ...mapActions('chatServer', [
      'offlineServer',
      'onlineServer',
      'hideServer',
      'closeWs'
    ]),
    ...mapMutations('app', ['SET_THEME'])
  },
  created() {
    this.getPlatformList(data => {
      if (data.length) {
        this.activePlatform = data[0].domain_title
        this.$emit('changePlatform', data[0])
        this.setActivePlatform(data[0].domain_title)
        this.setActiveWithdraw(data[0].withdraw)
        this.setActiveState(data[0].state)
        this.initPlatformOfflineCustomerList(data.length)
        this.initPlatformLastTime(data.length)
      }
      this.setActiveSession('current')
    })
    this.setTheme('light')
  },
  mounted() {
    this.sound = this.server.sound || 'default.wav'
    this.switchPlatform()
    eventBus.$on('setCustomer', this.setCustomer)
    eventBus.$on('changeSound', this.changeSound)
  }
}
</script>

<style lang="scss" scoped>
.server-header {
	display: flex;
	align-items: center;
	justify-content: space-between;
	height: 60px;
	padding: 0 20px 0 40px;
	background: var(--chat-server-head-bg);
	color: var(--chat-server-head-title);
	overflow-y: hidden;
	border-left: 2px solid var(--chat-server-content-bg);
	.header-left {
		display: flex;
		align-items: center;
		.platform-list {
			display: flex;
			// overflow-y: hidden;
		}
		.platform-item {
			display: flex;
			align-items: center;
			justify-content: center;
			height: 30px;
			// min-width: 120px;
			// border: 1px solid #5ca3f1;
			border-radius: 16px;
			margin-right: 50px;
			cursor: pointer;
			user-select: none;
			background: none;
			color: var(--chat-server-head-title);
			&:before {
				content: "";
				width: 6px;
				height: 6px;
				border-radius: 3px;
				background: var(--chat-server-head-title);
				display: block;
				margin-right: 8px;
			}
			.material-icons-round {
				display: none;
			}
			&:hover {
				color: var(--chat-server-head-title-active);
				&:before {
					background: var(--chat-server-head-title-active);
				}
				// border: 1px solid #1c77e0;
				// background: #1c77e0;
				// background: var(--chat-server-head-platform-hover-bg);
			}
			&.active {
				color: var(--chat-server-head-title-active);
				&:before {
					background: var(--chat-server-head-title-active);
				}
				// border: 1px solid #1d66bc;
				// background: #1d66bc;
			}
			&.un-read {
				position: relative;
				&::after {
					content: "";
					position: absolute;
					z-index: 1;
					right: -2px;
					top: 1px;
					width: 8px;
					height: 8px;
					border-radius: 50%;
					background: red;
				}
			}
			&.has-relink {
				position: relative;
				.material-icons-round {
					display: block;
					position: absolute;
					z-index: 1;
					right: -6px;
					bottom: 2px;
					color: rgba(67, 207, 124);
				}
			}
		}
		.material-icons-round {
			cursor: pointer;
			color: "#fff";
		}
	}
	.header-right {
		display: flex;
		align-items: center;
		.logout {
			cursor: pointer;
			width: 60px;
			height: 30px;
			border-radius: 15px;
			border: 1px solid var(--el-btn-primary-bg);
			color: var(--el-tag-light-content);
			text-align: center;
			line-height: 30px;
		}
		.material-icons-round {
			cursor: pointer;
			color: var(--chat-server-head-icon);
		}
	}
}
.lang-item {
	display: flex;
	align-items: center;
	color: var(--chat-server-lang-item);
	cursor: pointer;
	.icon {
		width: 18px;
		height: 14px;
		margin-right: 10px;
	}
}
.lang-dropdown {
	.lang-item {
		color: #606266;
	}
}
@media (max-width: 600px) {
	.flex-aic-jcs {
		justify-content: space-between;
	}
	.flex-aic-jcc {
		// border-top: 1px solid #999;
		justify-content: center;
		// padding: 10px 0 5px;
	}
	.lang-item {
		color: #808080;
		.mr {
			display: flex;
			align-items: center;
		}
	}
	.server-header {
		padding: 0;
		width: 100vw;
		position: relative;
		border: 0;
		.leftUnRead {
			position: absolute;
			z-index: 100;
			left: 30px;
			top: 50%;
			margin-top: -4px;
			width: 6px;
			height: 6px;
			border-radius: 50%;
			background: red;
		}
		.rightUnRead {
			position: absolute;
			z-index: 100;
			right: 30px;
			top: 50%;
			margin-top: -4px;
			width: 6px;
			height: 6px;
			border-radius: 50%;
			background: red;
		}
		.arrow {
			font-size: 20px;
			width: 18px;
			height: 18px;
			position: absolute;
			z-index: 100;
			top: 50%;
			margin-top: -10px;
			&.left-arrow {
				left: 10px;
				color: #5082f4;
			}
			&.right-arrow {
				right: 10px;
				color: #5082f4;
			}
		}
		.header-left {
			width: 100vw;
			height: 30px;
			position: relative;
			overflow: hidden;
			&::-webkit-scrollbar {
				display: none;
			}
			> span {
				display: none;
			}
			.platform-list {
				position: absolute;
				left: 0;
				top: 0;
				transition: left 0.5s;
				.base-info {
					width: 30px;
					height: 30px;
					position: absolute;
					left: 50px;
					top: 0;
					.avatar {
						width: 30px;
						height: 30px;
						border-radius: 50%;
					}
					.status-icon {
						position: absolute;
						top: 22px;
						left: 23px;
						width: 6px;
						height: 6px;
						border-radius: 50%;
						&.online {
							background: #16c681;
						}
						&.offline {
							background: #d8dde9;
						}
						&.invisible {
							background: #ffc300;
						}
					}
				}
				.setting {
					position: absolute;
					left: 15px;
					top: 0;
					width: 28x;
					height: 28px;
					font-size: 18px;
					.setting-icon {
						width: 18px;
						height: 18px;
						display: flex;
						align-items: center;
						justify-content: center;
						margin-top: 5px;
						margin-left: 6px;
						color: #5082f4;
					}
				}
				.platform-item {
					width: 50vw;
					margin: 0 25vw;
					&::before {
						display: none;
					}
					&.active {
						font-size: 18px;
					}
				}
			}
		}
		.header-right {
			display: none;
		}
	}
}
</style>
