<template>
  <el-dialog class="transfer-server" :title="$t('chatServer.transfer.title')" :visible="visible" :close-on-click-modal="true" @close="$emit('update:visible',false)">
    <div v-loading="loading">
      <el-tabs v-if="serverGroup.length" v-model="activeGroup">
        <el-tab-pane v-for="(group, index) in serverGroup" :key="index" :label="group.group_name" :name="group.group_name">
          <template v-if="group.users.length">
            <template v-for="(user, index) in group.users">
              <el-row :key="index" type="flex">
                <el-col :span="13">
                  <div class="server-info">
                    <img class="avatar" :src="`${baseUrl}${user.kefu_avatar}`">
                    <span>{{ user.kefu_name }}</span>
                  </div>
                </el-col>
                <el-col :span="6">
                  <div class="customer-number">
                    <i class="iconfont icon-users" />
                    {{ user.service_num }} / {{ user.max_service_num }}
                  </div>
                </el-col>
                <el-col :span="5">
                  <div class="transfer-btn">
                    <el-button v-waves size="mini" :disabled="server.kefu_code==user.kefu_code" type="primary" @click="transferSession(user)">{{ $t('chatServer.transfer.actions') }}</el-button>
                  </div>
                </el-col>
              </el-row>
            </template>
          </template>
          <div v-else class="no-data">
            <i class="iconfont icon-nodata" />
            <div class="mt40">{{ $t('chatServer.transfer.noServer') }}</div>
          </div>
        </el-tab-pane>
      </el-tabs>
      <div v-else class="no-data">
        <i class="iconfont icon-nodata" />
        <div class="mt40">{{ $t('chatServer.transfer.noServer') }}</div>
      </div>
    </div>
  </el-dialog>
</template>

<script>
import { mapState, mapActions } from 'vuex'
import { getServerGroup } from '@/api/chatServer.js'
export default {
  props: {
    visible: false
  },
  data() {
    return {
      loading: false,
      activeGroup: '',
      serverGroup: [],
      baseUrl: process.env.VUE_APP_BASE_URL
    }
  },
  computed: {
    ...mapState('auth', [
      'server'
    ])
  },
  watch: {
    visible(v) {
      if (v) {
        this.getServerGroup()
      }
    }
  },
  methods: {
    getServerGroup() {
      const { seller_id } = this.server
      this.loading = true
      getServerGroup({ seller_id }).then(res => {
        const { code, data, msg } = res
        if (code === 0) {
          this.serverGroup = data
          this.activeGroup = data[0] ? data[0].group_name : ''
        } else {
          this.$notify.error({
            title: this.$t('notify.fail'),
            message: msg
          })
        }
        this.loading = false
      })
    },
    ...mapActions('chatServer', [
      'transferSession'
    ])
  }
}
</script>

<style lang="scss" scoped>
.transfer-server {
   width:700px;
   margin: 0 auto;
  ::v-deep.el-dialog {
    width: 100%;
    .el-dialog__header {
      padding-top: 10px;
    }
    .el-dialog__body {
      padding: 0 28px 24px;
      .el-row {
        padding: 10px 0;
        border-bottom: 1px solid var(--chat-server-invite-dialog-border);
        .el-col {
          display: flex;
          color: var(--chat-server-transfer-content);
          .server-info {
            display: flex;
            align-items: center;
            font-size: 15px;
            img {
              width: 58px;
              border-radius: 50%;
              margin-right: 20px;
            }
          }
          .customer-number {
            display: flex;
            align-items: center;
            .iconfont {
              margin-right: 6px;
              transform: translateY(-1px);
              color: #999;
            }
          }
          .transfer-btn {
            display: flex;
            align-items: center;
          }
        }
      }
      .no-data {
        margin: 40px 0;
        text-align: center;
        .icon-nodata {
          font-size: 100px;
        }
      }
    }
  }
}
@media (max-width: 600px) {
  .transfer-server {
    width:88%;
    margin: 0 auto;
    ::v-deep.el-dialog {
      width: 100%;
      .el-dialog__header {
        padding-top: 10px;
      }
      .el-dialog__body {
        padding: 0 28px 24px;
        .el-row {
          padding: 10px 0;
          border-bottom: 1px solid var(--chat-server-invite-dialog-border);
          .el-col {
            display: flex;
            color: var(--chat-server-transfer-content);
            .server-info {
              display: flex;
              align-items: center;
              font-size: 15px;
              img {
                width: 35px;
                border-radius: 50%;
                margin-right: 5px;
              }
            }
            .customer-number {
              display: flex;
              align-items: center;
              .iconfont {
                margin-right: 6px;
                transform: translateY(-1px);
                color: #999;
              }
            }
            .transfer-btn {
              display: flex;

            }
          }
        }
        .no-data {
          margin: 40px 0;
          text-align: center;
          .icon-nodata {
            font-size: 100px;
          }
        }
      }
    }
  }
}
</style>
