<template>
  <el-dialog class="invite-session-dialog" :title="$t('chatServer.inviteDialog.title')" :visible="visible" :close-on-click-modal="true" @close="$emit('update:visible',false)">
    <el-row v-for="(server, index) in serverList" :key="index" type="flex">
      <el-col :span="16">
        <img :src="`${baseUrl}${server.kefu_avatar}`" class="avatar">
        <span>{{ server.kefu_name }}</span>
      </el-col>
      <el-col :span="8" style="justify-content:flex-end">
        <el-button v-waves size="medium" type="primary" :loading="inviteingServer === server" :disabled="inviteingServer!==null && inviteingServer!==server" @click="inviteHandler(server)">
          <span v-if="inviteingServer === server">{{ $t('chatServer.inviteDialog.btns[1]') }}</span>
          <span v-else>{{ $t('chatServer.inviteDialog.btns[0]') }}</span>
        </el-button>
        <el-button v-if="inviteingServer === server" v-waves size="medium" type="warning" @click="cancelInviteHandler(server)">{{ $t('chatServer.inviteDialog.btns[2]') }}</el-button>
      </el-col>
    </el-row>
  </el-dialog>
</template>

<script>
import { mapState, mapActions, mapMutations } from 'vuex'
import { getPlatformServerList } from '@/api/chatServer.js'
export default {
  props: {
    visible: false,
    platformId: ''
  },
  data() {
    return {
      loading: false,
      serverList: [],
      inviteingServer: null,
      baseUrl: process.env.VUE_APP_BASE_URL
    }
  },
  computed: {
    ...mapState({
      wsMsg: state => state.chatServer.wsMsg,
      serverName: state => state.auth.server.kefu_name,
      activeCustomer: state => state.chatServer.activeCustomer
    })
  },
  watch: {
    wsMsg(v) {
      const { cmd, data, msg } = v
      switch (cmd) {
        // 群组建立反馈
        case 'groupALL':
          this.groupALLHandler(data)
          break
          // 群组建立反馈
        case 'kfGroups':
          this.kfGroupsHandler(data)
          break
          // 拒绝邀请回调
        case 'closeInvitation':
          this.refuseInviteCallback(msg)
          break
        default:
          break
      }
    },
    visible(v) {
      if (v) {
        this.inviteingServer = null
        this.getPlatformServerList()
      }
    }
  },
  methods: {
    getPlatformServerList() {
      this.loading = true
      getPlatformServerList({ domainId: this.platformId }).then(res => {
        const { code, data, msg } = res
        if (code === 0) {
          this.serverList = data.filter(item => item.kefu_name !== this.serverName)
        } else {
          this.$notify.error({
            title: this.$t('notify.fail'),
            message: msg
          })
        }
        this.loading = false
      })
    },
    inviteHandler(server) {
      this.inviteingServer = server
      this.setIdentityInGroup(0)
      this.inviteServer(server)
    },
    cancelInviteHandler(server) {
      this.inviteingServer = null
      this.cancelInvite(server)
    },
    groupALLHandler(res) {
      const { code, msg } = res
      const { activeCustomer } = this
      if (activeCustomer.Beinvited === 0) {
        if (code === 200) {
          this.$notify({
            title: this.$t('chatServer.invite.notify[0]'),
            message: `${this.inviteingServer.kefu_name}${this.$t('chatServer.invite.notify[1]')}`,
            type: 'success'
          })
          this.inviteingServer = null
          this.$emit('update:visible', false)
        }
      } else {
        if (code === 200) {
          this.$notify({
            title: this.$t('chatServer.invite.notify[0]'),
            message: this.$t('chatServer.invite.notify[1]'),
            type: 'success'
          })
        }
      }
    },
    kfGroupsHandler(res) {
      const { code, msg } = res
      const { activeCustomer } = this
      if (activeCustomer.Beinvited === 0) {
        // 邀请方
        if (code === 203) {
          this.inviteingServer = null
          this.$emit('update:visible', false)
          this.setIdentityInGroup('')
          this.$notify.error({
            title: this.$t('notify.fail'),
            message: msg
          })
        }
      } else {
        // 被邀请方
        if (code === 203) {
          this.setIdentityInGroup('')
          this.$notify.error({
            title: this.$t('notify.fail'),
            message: msg
          })
        }
      }
    },
    // 拒绝邀请回调
    refuseInviteCallback(msg) {
      this.$notify.error({
        title: this.$t('notify.fail'),
        message: msg
      })
      this.$emit('update:visible', false)
    },
    ...mapActions('chatServer', [
      'inviteServer', 'closeGroupChat', 'cancelInvite'
    ]),
    ...mapMutations('chatServer', [
      'setIdentityInGroup'
    ])
  }
}
</script>

<style lang="scss" scoped>
.invite-session-dialog {
	width: 700px;
	margin: 0 auto;
	color: #505050;
	::v-deep.el-dialog {
		width: 100%;
	}
	.el-row {
		padding: 10px 0;
		border-bottom: 1px solid var(--chat-server-invite-dialog-border);
		.el-col {
			display: flex;
			align-items: center;
			.avatar {
				width: 58px;
				height: 58px;
				margin-right: 20px;
				border-radius: 50%;
			}
		}
	}
}
@media (max-width: 600px) {
	.invite-session-dialog {
		width: 80%;
		margin: 0 auto;
		color: #505050;
		::v-deep.el-dialog {
			width: 100%;
		}
		.el-row {
			padding: 10px 0;
			border-bottom: 1px solid var(--chat-server-invite-dialog-border);
			.el-col {
				display: flex;
				align-items: center;
				.avatar {
					width: 58px;
					height: 58px;
					margin-right: 20px;
					border-radius: 50%;
				}
			}
		}
	}
}
</style>
