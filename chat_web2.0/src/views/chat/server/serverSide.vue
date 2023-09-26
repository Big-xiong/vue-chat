<template>
  <div class="server-wrap">
    <div class="base-info">
      <div class="inner">
        <div class="inner-top-wrap mt30">
          <img class="avatar" :src="`${baseUrl}${server.kefu_avatar}`">
          <span class="status-icon" :class="serverStatus" />
        </div>
        <span class="mt16">{{ server.kefu_username }}</span>

        <el-dropdown placement="bottom" trigger="click" @command="changeServerStatus">
          <div style="cursor:pointer;padding-bottom: 10px;">
            <p class="mt6 mb0">{{ serverStatusMap[serverStatus] }} <i class="el-icon-arrow-down" /></p>
          </div>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item command="online">{{ $t('chatServer.online') }}</el-dropdown-item>
            <el-dropdown-item command="invisible">{{ $t('chatServer.invisible') }}</el-dropdown-item>
            <!-- <el-dropdown-item command="offline">{{ $t('chatServer.offline') }}</el-dropdown-item> -->
          </el-dropdown-menu>
        </el-dropdown>
      </div>
    </div>
    <div v-show="left === 0" class="session-list">
      <div v-for="session in sessionOptions" :key="session.label" class="session-item" :class="{active:activeSessionType==session.value}" @click="clickSession(session.value)">
        <!-- <i class="material-icons-round">{{ session.icon }}</i> -->
        <svg-icon :icon-class="session.icon" />
        <span class="session-item-label">{{ session.label }}</span>
        <span v-if="session.value == 'current'" class="number">（{{ currentCustomer.filter(v => !v.offline).length }}）</span>
      </div>
      <!-- <span class="session-bar hide" /> -->
    </div>
  </div>
</template>

<script>
import { mapState, mapGetters, mapMutations, mapActions } from 'vuex'
export default {
  props: {
    left: {
      type: Number,
      default: 0
    }
  },
  data() {
    return {
      sessionOptions: [
        {
          label: this.$t('chatServer.sessionOptions[0]'),
          value: 'current',
          icon: 'textsms',
          api: '/getisNowServiceList'
        },
        {
          label: this.$t('chatServer.sessionOptions[1]'),
          value: 'history',
          icon: 'watch_later',
          api: '/getHistoryChatList'
        },
        {
          label: this.$t('chatServer.sessionOptions[2]'),
          value: 'waiting',
          icon: 'pending',
          api: '/getCustomerQueue'
        }
      ],
      activeTab: 'userInfo',
      baseUrl: process.env.VUE_APP_BASE_URL,
      serverStatusMap: {
        'online': this.$t('chatServer.online'),
        'offline': this.$t('chatServer.offline'),
        'invisible': this.$t('chatServer.invisible')
      }
    }
  },
  computed: {
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
      activeSession: state => state.chatServer.activeSession,
      serverStatus: state => state.chatServer.serverStatus,
      currentCustomer: state => state.chatServer.currentCustomer
    }),
    ...mapGetters('chatServer', [
      'activeSessionType'
    ])
  },
  methods: {
    clickSession(session) {
      this.setActiveSession(session)
      this.setActiveCustomer({})
      this.setCustomerDetail({})
      this.$emit('clickSession', session)
    },
    changeServerStatus(status) {
      const { serverStatus } = this
      if (status === 'online') {
        if (serverStatus !== 'online') {
          // 可以上线
          // ws重连
          this.$emit('openWs', true)
          // this.onlineServer()
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
    hoverSessionItem() {
      const sessionbar = document.querySelector('.session-bar')
      const sessionWrapper = document.querySelector('.session-list')
      const sessionList = document.querySelectorAll('.session-item')
      const { top: wrapTop } = sessionWrapper.getBoundingClientRect()
      sessionList.forEach(session => {
        session.onmouseenter = () => {
          const beginTime = Date.now()
          const { top: sessionTop } = session.getBoundingClientRect()
          const { top: sessionBarTop } = sessionbar.getBoundingClientRect()
          function scroll() {
            const progress = (Date.now() - beginTime) / 200
            if (progress < 1) {
              if (sessionTop > sessionBarTop) {
                // 下滑
                const distance = (sessionTop - sessionBarTop) * progress
                sessionbar.style.top = sessionBarTop - wrapTop + distance + 'px'
              } else if (sessionTop < sessionBarTop && sessionBarTop - sessionTop != 24) {
                // 上滑
                const distance = (sessionBarTop - sessionTop) * progress
                sessionbar.style.top = sessionBarTop - wrapTop - distance + 'px'
              }
              window.requestAnimationFrame(scroll)
            } else {
              sessionbar.style.top = sessionTop - wrapTop + 'px'
            }
          }
          window.requestAnimationFrame(scroll)
        }
      })
      sessionWrapper.onmouseleave = () => {
        // sessionbar.classList.replace('show', 'hide')
        const { classList } = sessionbar
        if (classList.contains('show')) {
          classList.remove('show')
          classList.add('hide')
        }
      }
      sessionWrapper.onmouseenter = () => {
        // sessionbar.classList.replace('hide', 'show')
        const { classList } = sessionbar
        if (classList.contains('hide')) {
          classList.remove('hide')
          classList.add('show')
        }
      }
    },
    ...mapMutations({
      setActiveSession: 'chatServer/setActiveSession',
      setActiveCustomer: 'chatServer/setActiveCustomer',
      setCustomerDetail: 'chatServer/setCustomerDetail'
    }),
    ...mapActions('chatServer', [
      'offlineServer', 'onlineServer', 'hideServer'
    ])
  },
  mounted() {
    // this.hoverSessionItem()
  }
}
</script>

<style lang="scss" scoped>
.server-wrap {
	background: var(--chat-server-side-bg);
	color: #eee;
	width: 240px;
	.base-info {
		// padding: 40px 0 20px 50px;
		.inner {
			display: flex;
			align-items: center;
			position: relative;
			flex-direction: column;
			.mt16 {
				font-size: 18px;
				font-weight: bold;
				color: var(--chat-server-side-content);
			}
			.inner-top-wrap {
				position: relative;
			}
			.avatar {
				width: 60px;
				height: 60px;
				border-radius: 50%;
			}
			.status-icon {
				position: absolute;
				bottom: 2px;
				right: 2px;
				width: 12px;
				height: 12px;
				border-radius: 100%;
				border: 2px solid #fff;
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
			.el-dropdown {
				.mt6 {
					color: var(--chat-server-head-title);
					.el-icon-arrow-down {
						color: var(--el-select-caret);
					}
				}
			}
		}
	}
	.session-list {
		position: relative;
		.session-item {
			display: flex;
			align-items: center;
			padding-left: 40px;
			padding-right: 40px;
			line-height: 18px;
			padding-top: 15px;
			padding-bottom: 15px;
			width: 100%;
			cursor: pointer;
			color: var(--chat-server-side-content);
			.svg-icon {
				margin-right: 16px;
				// font-size: 17px;
			}
			&.active {
				color: var(--chat-server-side-active) !important;
				background: var(--chat-server-side-active-bg) !important;
			}
			&:hover {
				color: var(--chat-server-side-hover);
			}
            .number{
                margin-bottom: 1px;
                font-size: 12px;
                color: #f00;
                transform: scale(0.8);
            }
		}
		.session-bar {
			position: absolute;
			z-index: 1;
			top: 0;
			left: 0;
			height: 48px;
			width: 4px;
			background: #345eea;
			transition: transform 0.2s;
			&.show {
				transform: scaleY(1);
			}
			&.hide {
				transform: scaleY(0);
			}
		}
	}
}
@media (max-width: 600px) {
	.server-wrap {
		position: fixed;
		width: 100%;
		bottom: 0;
		left: 0;
		z-index: 2;
		.base-info {
			display: none;
		}
		.session-list {
			display: flex;
			align-items: center;
			.session-item {
				box-sizing: border-box;
				flex: 1;
				display: flex;
				flex-direction: column;
				align-items: center;
				// justify-content: center;
				.svg-icon {
					margin: 0;
					width: 30px;
					height: 30px;
				}
				.session-item-label {
					font-size: 12px;
					text-overflow: ellipsis;
					white-space: nowrap;
					overflow: hidden;
					// display: block;
				}
			}
		}
	}
}

::v-deep.el-popper[x-placement^="bottom"] {
	margin-top: 0;
}
</style>
