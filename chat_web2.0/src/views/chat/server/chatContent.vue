<template>
  <div id="scrollChatContent" ref="wrap" class="chat-content" :class="theme">
    <div class="ta-c">
      <div v-show="loading&&total>curPage" style="margin: 10px 0">{{ $t('chatServer.chatContent.loading') }}</div>
      <span v-if="total>1&&total==curPage" class="no-more">{{ $t('chatServer.chatContent.noMore') }}</span>
    </div>
    <div v-if="chatList.length<=0" class="NoNews">该访客未主动发消息给客服 (仅进线)</div>
    <template v-for="(chat,index) in chatList">
      <!-- 客服 -->
      <div v-if="chat.type=='server'" :key="index" class="chat-item server">
        <span class="name" :style="`color:${serverColor(chat.name)}`">{{ chat.name }}</span>
        <div class="main">
          <span v-if="chat.hasOwnProperty('readFlag')" :class="`read ${chat.readFlag==2?'yes':'no'}`">
            {{ chat.readFlag===2?$t('chatServer.chatContent.read'):$t('chatServer.chatContent.unread') }}
          </span>
          <span v-else class="type-tip">
            <i v-if="chat.typeTip && chat.typeTip === 'loading'" class="el-icon-loading loading" />
            <span v-if="chat.typeTip && chat.typeTip === 'failed'" class="failed">
              <span class="tip">{{ $t('chatServer.chatContent.failed') }}</span>
              <!-- <span class="re-send" @click="handleReSend(chat)">{{ $t('chatServer.chatContent.reSend') }}</span> -->
              <span class="material-icons-round re-send" @click="handleReSend(chat)">refresh</span>
            </span>
          </span>
          <div class="content" :data-id="chat.chatId">
            <common-content :chat="chat" />
          </div>
        </div>
        <div class="head mt10">
          <span>{{ formChatTime(chat.time) }}
            <span v-show="chat.revokeAble" class="revoke" @click="revokeMessage(chat.chatId)">
              <svg-icon icon-class="revoke" class="mr4" />
              {{ $t('chatServer.chatContent.revoke') }}
            </span>
          </span>
        </div>
      </div>
      <!-- 访客 -->
      <div v-if="chat.type=='customer'" :key="index" class="chat-item customer" :class="{'offline':chat.contentType == 'offline'}">
        <div v-if="chat.contentType == 'offline' || +chat.leave === 1" class="offline">
          <!-- <span>{{ $t('chatServer.chatContent.hasLeft') }}</span> -->
          <el-divider v-if="index != chatList.length - 1">{{ $t('chatServer.chatContent.history') }}</el-divider>
        </div>
        <template v-else>
          <div class="main">
            <!-- <div v-if="chat.lang && chat.lang !== chat.content" class="content">
							<common-content :chat="chat" />
						</div> -->
            <div class="content">
              <common-content :chat="chat" />
            </div>
          </div>
          <div class="head mt10">
            <!-- <span class="name">{{ chat.name }}</span> -->
            <span>{{ formChatTime(chat.time) }}</span>
            <!-- <img class="avatar" :src="chat.avatar"> -->
          </div>
        </template>
      </div>
    </template>
  </div>
</template>

<script>
import { parseTime } from '@/utils/index.js'
import { findLastIndex, cloneDeep } from 'lodash'
import { getChatList } from '@/api/chatServer.js'
import commonContent from './commonContent.vue'
import { mapState, mapGetters, mapActions, mapMutations } from 'vuex'
import { titleFlash, desktopNotice, extractImage } from '@/utils/chat.js'
import { getLanguage } from '@/lang/index.js'
import { eventBus } from './eventBus.js'
export default {
  components: { commonContent },
  data() {
    return {
      page: 1,
      limit: 20,
      curPage: 1,
      total: 0,
      realChatList: [],
      chatList: [],
      unReadList: [],
      loading: false,
      flag: true,
      serverThemeConfig: {
        index: 0,
        options: ['#505050', '#00AB9F', '#E33C64', '#FF8D1A'],
        cacheMap: {}
      },
      baseUrl: process.env.VUE_APP_BASE_URL
    }
  },
  computed: {
    ...mapState({
      theme: state => state.app.theme,
      server: state => state.auth.server,
      wsMsg: state => state.chatServer.wsMsg,
      activeSession: state => state.chatServer.activeSession,
      activeCustomer: state => state.chatServer.activeCustomer,
      currentCustomer: state => state.chatServer.currentCustomer,
      serverStatus: state => state.chatServer.serverStatus,
      chatLang: state => state.chatServer.chatLang,
      withdraw: state => state.chatServer.withdraw
    }),
    ...mapGetters('chatServer', [
      'activeSessionType',
      'lastTime'
    ])
  },
  watch: {
    wsMsg(v) {
      const { cmd, data } = v
      switch (cmd) {
        // 聊天消息
        case 'chatMessage':
					window?.electron?.ipcRenderer.send('new-message', data)
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
          // 客服撤回消息
        case 'revokeMessage':
          this.revokeHandler(data)
          break
          // 转接结果
        case 'changeGroupCB':
          this.transferHandler(data)
          break
          // 访客离线
        case 'offline':
          this.offlineHandler(data)
          break
        default:
          break
      }
    },
    activeSession() {
      this.total = 0
      this.chatList = []
    },
    async activeCustomer({ customer_id }) {
      const { activeSessionType } = this
      if (activeSessionType == 'current' || activeSessionType == 'history') {
        this.page = 1
        this.total = 0
        this.chatList = []
        if (customer_id) {
          await this.getChatList()
          this.scrollTo('bottom')
        }
        const chatIds = this.chatList.filter(chat => {
          return chat.type == 'customer' && chat.readFlag != 2 && chat.chatId
        }).map(chat => chat.chatId).join(',')
        if (chatIds) this.sendHasRead(chatIds)
      }
    }
  },
  methods: {
    formChatTime(time) {
      return parseTime(time, '{m}.{d} {h}:{i}:{s}')
    },
    async getChatList(append) {
      this.loading = true
      const { page, limit, activeCustomer: { customer_id: uid, offline }, activeSessionType, lastTime, serverStatus } = this

      const time = lastTime.find(v => v.customer_id == uid)?.time

      const lasttime = (activeSessionType == 'current' && (offline || serverStatus == 'offline')) ? time : parseTime(new Date())

      const { code, msg, total, data } = await getChatList({ page, limit, uid, lasttime })
      if (code === 0) {
        this.total = total
        this.curPage = msg
        this.chatList = this.formatChatList(data).concat(append ? this.chatList : [])
        if (append == true) {
          const { scrollHeight } = this.$refs.wrap
          this.$nextTick(() => {
            this.$refs.wrap.scrollTop = this.$refs.wrap.scrollHeight - scrollHeight
          })
        }
      }
      this.loading = false
    },
    async getMoreChat() {
      this.page++
      await this.getChatList(true)
    },
    async receiveHandler(res) {
      if (this.serverStatus == 'offline') {
        return
      }
      const { type } = res
      const { activeCustomer, chatList, baseUrl } = this
      if (type === 0) {
        // 访客信息
        if (activeCustomer.customer_id == res.id) {
          const index = chatList ? chatList.findIndex(chat => chat.chatId === res.chat_log_id) : -1
          if (index === -1) {
            const { includeImg, content } = extractImage(res.content)
            chatList.push({
              type: 'customer',
              name: res.name,
              time: res.time,
              includeImg,
              content,
              lang: null,
              chatId: res.chat_log_id,
              avatar: res.avatar
            })
            this.scrollTo('bottom')
          }
          if (document.hidden) {
            this.unReadList.push(res.chat_log_id)
          } else {
            this.sendHasRead(res.chat_log_id)
          }
        }
      } else if (type === 1) {
        if (activeCustomer.customer_id == res.to_id && res.id && res.id.indexOf(this.server.kefu_code) == -1) {
          // 客服信息
          const index = chatList.findIndex(chat => chat.chatId === res.chat_log_id)
          if (index === -1) {
            const { includeImg, content } = extractImage(res.content)
            chatList.push({
              type: 'server',
              name: res.name,
              time: res.time,
              includeImg, content,
              avatar: `${baseUrl}${res.avatar}`,
              chatId: res.chat_log_id,
              lang: res.lang
            })
            this.scrollTo('bottom')
          }
        }
      }
      if (document.hidden) {
        desktopNotice(res.avatar, res.content)
        titleFlash.start(this)
      }
    },
    afterSendHandler(res) {
      const { baseUrl, server, activeCustomer, currentCustomer, chatList, withdraw } = this

      const { code, data, msg } = res
      if (code === 0) {
        if (msg == '对话结束！') {
          this.total = 0
          this.chatList = []
        } else {
          const { includeImg, content } = extractImage(msg)
          const offline = currentCustomer.find(v => v.customer_id == activeCustomer.customer_id)?.offline
          // 添加历史会话分割线
          if (offline) {
            const index = chatList.findIndex(chat => chat.contentType == 'offline' && chat.type == 'customer')
            const lastIndex = findLastIndex(chatList, function(chat) { return chat.contentType == 'offline' && chat.type == 'customer' })
            if (index != -1 && lastIndex != -1 && (lastIndex != index)) {
              chatList.splice(index, 1)
            }
          }
          if (withdraw == '0') {
            const chatItem = {
              type: 'server',
              includeImg, content,
              readFlag: 0,
              chatId: parseInt(data),
              name: server.kefu_name,
              avatar: `${baseUrl}${server.kefu_avatar}`,
              time: parseTime(Date.now()),
            }
            if (chatList.findIndex(chat => chat.chatId === parseInt(data)) === -1) {
              if (res.Customer === activeCustomer.customer_id || offline) {
                // chatList.push(chatItem)
                let flag = false
                chatList.forEach((v, index) => {
                  if (Object.prototype.toString.call(content) === '[object Array]') {
                    // 对于图片的特殊处理
                    if (v.content?.[1]?.src === content[1].src && !v.chatId) {
                      this.$set(chatList, index, chatItem)
                      flag = true
                    }
                  } else {
                    const msgContent = v.tempContent ?? v.content
                    if (msgContent === content && !v.chatId) {
                      this.$set(chatList, index, chatItem)
                      flag = true
                    }
                  }
                })
                if (!flag) {
                  chatList.push(chatItem)
                }
              }
              this.scrollTo('bottom')
            }
          } else {
            const chatItem = {
              type: 'server',
              revokeAble: true,
              readFlag: 0,
              includeImg, content,
              chatId: parseInt(data),
              name: server.kefu_name,
              avatar: `${baseUrl}${server.kefu_avatar}`,
              time: parseTime(Date.now()),
              lang: null
            }
            if (chatList.findIndex(chat => chat.chatId === parseInt(data)) === -1) {
              if (res.Customer === activeCustomer.customer_id || offline) {
                // chatList.push(chatItem)
                let flag = false
                chatList.forEach((v, index) => {
                  if (Object.prototype.toString.call(content) === '[object Array]') {
                    // 对于图片的特殊处理
                    if (v.content?.[1]?.src === content[1].src && !v.chatId) {
                      this.$set(chatList, index, chatItem)
                      flag = true
                    }
                  } else {
                    const msgContent = v.tempContent ?? v.content
                    chatItem.lang = v.lang
                    if (msgContent === content && !v.chatId) {
                      this.$set(chatList, index, chatItem)
                      flag = true
                    }
                  }
                })
                if (!flag) {
                  chatList.push(chatItem)
                }
              }
              let timer = setTimeout(() => {
                delete chatItem.revokeAble
                timer = null
                this.$forceUpdate()
              }, Number(withdraw))
              this.scrollTo('bottom')
            }
          }
        }
      } else {
        this.$notify.error({
          title: this.$t('notify.fail'),
          message: msg
        })
      }
    },
    // 前端处理发送过后ws没有及时响应
    handleSend(res) {
      const { baseUrl, server, activeCustomer, currentCustomer, chatList, withdraw } = this
      const { msg, lang } = res
      const { includeImg, content } = extractImage(msg)
      const offline = currentCustomer.find(v => v.customer_id == activeCustomer.customer_id)?.offline
      // 添加历史会话分割线
      if (offline) {
        const index = chatList.findIndex(chat => chat.contentType == 'offline' && chat.type == 'customer')
        const lastIndex = findLastIndex(chatList, function(chat) { return chat.contentType == 'offline' && chat.type == 'customer' })
        if (index != -1 && lastIndex != -1 && (lastIndex != index)) {
          chatList.splice(index, 1)
        }
      }
      const chatItem = {
        type: 'server',
        includeImg, content,
        name: server.kefu_name,
        avatar: `${baseUrl}${server.kefu_avatar}`,
        typeTip: 'loading',
        time: parseTime(Date.now()),
        tempContent: JSON.parse(JSON.stringify(content)),
        lang,
      }
      chatList.push(chatItem)
      this.scrollTo('bottom')
    },
    // 前端处理发送失败给出提示
    sendFailed(res) {
      setTimeout(() => {
        const { baseUrl, server, chatList } = this
        const { msg, lang } = res
        const { includeImg, content } = extractImage(msg)
        const chatItem = {
          type: 'server',
          includeImg, content,
          name: server.kefu_name,
          avatar: `${baseUrl}${server.kefu_avatar}`,
          typeTip: 'failed',
          time: parseTime(Date.now()),
          lang,
        }
        chatList.forEach((v, index) => {
          const msgContent = v.tempContent ?? v.content
          if (msgContent === content && !v.chatId) {
            this.$set(chatList, index, chatItem)
          }
        })
      }, 3000)
    },
    // 重新发送
    handleReSend(chat) {
      const { chatList } = this
      const { content, lang } = chat
      chatList.forEach((v, index) => {
        const msgContent = v.tempContent ?? v.content
        if (msgContent === content && !v.chatId) {
          chatList.splice(index, 1)
        }
      })
      const options = {
        msg: content
      }
      this.handleSend(options)
      this.sendMessage({
        message: content,
        lang,
        cb: () => {
          this.sendFailed(options)
        }
      })
    },
    offlineHandler(res) {
      const { activeCustomer, chatList } = this
      if (activeCustomer.customer_id == res.customer_id) {
        const index = findLastIndex(chatList, function(chat) { return chat.contentType == 'offline' && chat.type == 'customer' })
        if (index != -1 && index == chatList.length - 1) {
          chatList.splice(index, 1)
        }
        chatList.push({
          type: 'customer',
          contentType: 'offline'
        })
        this.scrollTo('bottom')
      }
    },
    readHandler(res) {
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
    serverColor(serverName) {
      const { serverThemeConfig, serverThemeConfig: { index, options, cacheMap }} = this
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
    docVisibleHandler() {
      document.onvisibilitychange = () => {
        if (!document.hidden) {
          const { activeCustomer, unReadList } = this
          if (activeCustomer.customer_id) {
            const chatIds = unReadList.join(',')
            if (chatIds) {
              this.sendHasRead(chatIds)
              this.unReadList = []
            }
          }
          titleFlash.end(this)
        }
      }
    },
    revokeHandler(res) {
      const { chatList } = this
      const { code, data } = res
      if (code == 200) {
        const index = chatList.findIndex(chat => {
          return chat.chatId == data.msg_id
        })
        chatList.splice(index, 1)
      } else {
        this.$notify.error({
          title: this.$t('notify.fail'),
          message: msg
        })
      }
    },
    transferHandler(res) {
      if (res.code === 0) {
        this.total = 0
        this.chatList = []
        this.setActiveCustomer({})
      }
    },
    scrollTo(pos) {
      this.$nextTick(() => {
        if (pos == 'bottom') {
          this.$refs.wrap.scrollTop = this.$refs.wrap.scrollHeight + 100
        } else if (pos == 'top') {
          this.$refs.wrap.scrollTop = 0
        }
      })
    },
    formatChatList(data) {
      data.reverse()
      const _data = data.map((item, index) => {
        const { baseUrl } = this
        const { includeImg, content } = extractImage(item.content)
        if (item.type == 'mine') {
          return {
            type: 'server',
            includeImg, content,
            chatId: item.log_id,
            name: item.from_name,
            time: item.create_time,
            avatar: `${baseUrl}${item.from_avatar}`,
            readFlag: item.read_flag,
            lang: item.lang
          }
        } else if (item.type == 'user') {
          if (item.leave == '1') {
            if (this.flag && index) {
              this.flag = false
              return {
                type: 'customer',
                contentType: 'offline'
              }
            } else {
              return {
                type: '',
                contentType: 'offline'
              }
            }
          } else {
            return {
              type: 'customer',
              includeImg, content,
              chatId: item.log_id,
              name: item.from_name,
              time: item.create_time,
              readFlag: item.read_flag,
              avatar: item.from_avatar,
              lang: null
            }
          }
        }
      })
      return _data.reverse()
    },
    lazyLoad() {
      const { $refs: { wrap }} = this
      wrap.onscroll = () => {
        const { total, page } = this
        if (wrap.scrollTop === 0 && total > 1 && total > page) {
          this.getMoreChat()
        }
      }
    },
    ...mapActions('chatServer', [
      'sendHasRead', 'revokeMessage', 'sendMessage'
    ]),
    ...mapMutations('chatServer', [
      'setActiveCustomer'
    ])
  },
  mounted() {
    this.lazyLoad()
    this.docVisibleHandler()
    eventBus.$on('handleSend', this.handleSend)
    eventBus.$on('sendFailed', this.sendFailed)
  }
}
</script>

<style lang="scss" scoped>
.chat-content {
  position: relative;
	flex: 1;
	margin:0 0 20px 0;
	overflow-y: auto;
  .NoNews{
    margin-top: 15px;
    width: 100%;
    display: flex;
    justify-content: center;
    color: #a6a6a6;
    font-size: 16px;
  }
	&::-webkit-scrollbar {
		display: none;
	}
	scrollbar-width: none; /* firefox */
	-ms-overflow-style: none;
	.more-record {
		padding: 8px 15px;
		border: none;
		border-radius: 3px;
		margin: 15px 0;
		background-color: #e2e2e2;
		color: #333;
		font-size: 13px;
		cursor: pointer;
		&:disabled {
			cursor: not-allowed;
		}
	}
	.no-more {
		display: inline-block;
		margin: 15px 0;
		font-size: 12px;
		color: #888;
	}
	.chat-item {
		padding: 0 90px;
		margin-bottom: 28px;
		position: relative;
		&.offline {
			padding: 0 23px;
		}
		.head {
			margin-bottom: 6px;
			position: relative;
			// #72798c 7b818e
			color: #72798c;
			.avatar {
				position: absolute;
				z-index: 1;
				width: 44px;
				height: 44px;
				border-radius: 50%;
			}
			.revoke {
				margin-left: 16px;
				font-size: 12px;
				cursor: pointer;
				display: flex;
				align-items: center;
				opacity: 1;
			}
			> span {
				opacity: 0.6;
			}
		}
		.main {
			::v-deep.content {
				position: relative;
				display: inline-block;
				min-height: 14px;
				max-width: 452px;
				// padding: 8px 24px;
				border-radius: 16px;
				word-wrap: break-word;
				text-align: left;
				color: #fff;
				&:after {
					position: absolute;
					content: "";
					border-top: 10px solid transparent;
					border-bottom: 10px solid transparent;
				}
				.emoji {
					width: 26px;
					vertical-align: bottom;
				}
				img {
					max-width: 100%;
					vertical-align: bottom;
				}
				.icon-download {
					margin-right: 5px;
				}
				.video {
					width: 200px;
				}
				.audio {
					width: 200px;
					height: 20px;
				}
			}
		}
		&.server {
			text-align: right;
			> span {
				margin-bottom: 6px;
				display: block;
			}
			.head {
				.name {
					margin-right: 4px;
					color: rgb(42, 130, 228);
				}
				.avatar {
					right: -60px;
					top: -42px;
				}
				> span {
					display: flex;
					justify-content: flex-end;
					align-items: center;
				}
			}
			.read {
				margin-right: 10px;
				font-size: 12px;
				&.yes {
					color: #72798c;
				}
				&.no {
					color: #5082f4;
				}
			}
			.type-tip {
				margin-right: 10px;
				.loading {
					font-size: 16px;
				}
				.failed {
					font-size: 12px;
                    display: inline-flex;
                    align-items: center;
					.tip {
						color: #f00;
						margin-right: 5px;
					}
					.re-send {
						color: rgba(60, 144, 247, 1);
                        font-size: 16px;
						// text-decoration: underline;
                        cursor: pointer;
					}
				}
			}
			// ::v-deep.content {
			// 	background: #28324C;
			//   border-radius: 10px 0 10px 10px;
			// 	p {
			// 		margin: 0;
			// 	}
			// }
		}
		&.customer {
			.content-lang {
				background: var(--chat-server-content-bg);
				border-radius: 10px 10px 10px 0;
				color: var(--chat-server-card-input);
				word-wrap: break-word;
				color: #466ac9;
				display: inline-block;
				max-width: 452px;
				min-height: 14px;
				padding: 8px 24px;
				position: relative;
				text-align: left;
				margin-bottom: 4px;
			}
			.head {
				.name {
					margin-right: 4px;
					color: rgb(42, 130, 228);
				}
				.avatar {
					left: -60px;
					top: -42px;
				}
			}
			.main {
				text-align: left;
				position: relative;
				::v-deep.content {
					padding: 0;
					// border-radius: 0px 10px 10px 10px;
					// color: var(--chat-server-card-input);
					// background: var(--chat-server-content-bg);
					.file {
						color: #345eea;
					}
					&.content-lang {
						position: absolute;
						top: -110%;
						left: 0;
					}
					// border-radius: 0px 10px 10px 10px;
					// color: var(--chat-server-card-input);
					// background: var(--chat-server-content-bg);
					.file {
						color: #345eea;
					}
				}
			}
			.offline {
				text-align: center;
				// ::v-deep.el-divider{
				//     background-color: #999;
				// }
				::v-deep.el-divider__text {
					background-color: var(--chat-server-customer-wrap-bg);
					color: #888;
				}
			}
		}
	}
	&.dark {
		.chat-item {
			.head {
				color: #a6a6a6;
				.name {
					color: #a6a6a6 !important;
				}
			}
			.main {
				::v-deep.content {
					color: #808080;
					// background: #2a2c33;
				}
			}
			&.server {
				::v-deep.content {
					.common {
						background: #5296e2;
						color: #fff;
					}
				}
			}
			&.customer {
				::v-deep.content {
					.common {
						color: #fff;
					}
				}
			}
		}
	}
}
</style>
