<template>
  <div class="replay">
    <el-card v-loading="platformLoading" class="replay-side">
      <div slot="header">{{ $t('authMessage.head[0]') }}</div>
      <div class="platform-list">
        <div v-for="platform in platformList" :key="platform.domain_id" :class="{'platform-item':true,'active':activePlatform.domain_id==platform.domain_id}" @click="getPlatformInfo(platform)">
          {{ platform.domain_title }}
        </div>
      </div>
    </el-card>
    <el-card v-loading="loading" class="replay-main">
      <template v-if="!loading">
        <div slot="header">{{ $t('authMessage.head[1]') }}</div>
        <!-- 提交 -->
        <div class="ta-c">
          <el-button size="medium" class="cancel-btn">{{ $t('authMessage.config.cancel') }}</el-button>
          <el-button v-waves size="medium" type="primary" class="submit-btn" @click="editPlatformInfo">{{ $t('authMessage.config.submit') }}</el-button>
        </div>
        <!-- 推广消息 -->
        <div class="function-item">
          <div class="function-item__title">
            {{ $t('authMessage.config.promote.title') }}
            <p>
              <i class="el-icon-info" />
              <span class="tips">{{ $t('authMessage.config.promote.tips') }}</span>
            </p>
          </div>
          <div class="function-item__able">
            <span class="title">{{ $t('authMessage.config.enable') }}</span>
            <el-switch v-model="params.promoteAble" :active-value="1" :inactive-value="0" active-color="#13ce66" />
          </div>
          <div v-if="promoteMessageList.length<5" class="mt30 flex-aic">
            <el-button v-waves class="mr8" type="primary" size="mini" @click="openDialog('add')">
              <i class="material-icons-round fs-18 mr6">add</i>{{ $t('authMessage.config.promote.add') }}
            </el-button>
            <span class="tips">{{ $t('authMessage.config.promote.limit') }}</span>
          </div>
          <el-table v-loading="tableLoading" :data="promoteMessageList" class="mt16" stripe>
            <el-table-column type="index" :label="$t('authMessage.config.promote.table.order')" align="center" width="150" />
            <el-table-column :label="$t('authMessage.config.promote.table.content')" align="center">
              <div slot-scope="{ row }" class="promote-content" v-html="row.content" />
            </el-table-column>
            <el-table-column prop="mes_state" :label="$t('authMessage.config.promote.table.status')" align="center">
              <el-switch v-model="row.mes_state" slot-scope="{row}" disabled :active-value="1" :inactive-value="0" active-color="#13ce66" />
            </el-table-column>
            <el-table-column :label="$t('action.label')" align="center">
              <template slot-scope="{row}">
                <el-button v-waves size="mini" type="primary" @click="openDialog('edit',row)">
                  <i class="material-icons-round fs-14 mr6">drive_file_rename_outline</i>{{ $t('action.type.edit') }}
                </el-button>
                <el-button v-waves size="mini" type="danger" @click="deletePromoteMessage(row)">
                  <i class="material-icons-round fs-14 mr6">delete_outline</i>{{ $t('action.type.delete') }}
                </el-button>
              </template>
            </el-table-column>
          </el-table>
        </div>
        <!-- 欢迎消息 -->
        <div class="function-item">
          <div class="function-item__title">
            {{ $t('authMessage.config.welcomeMsg.title') }}
            <p>
              <i class="el-icon-info" />
              <span class="tips">{{ $t('authMessage.config.welcomeMsg.tips') }}</span>
            </p>
          </div>
          <div class="function-item__able">
            <span class="title">{{ $t('authMessage.config.enable') }}</span>
            <el-switch v-model="params.welcomeAble" :active-value="1" :inactive-value="0" active-color="#13ce66" />
          </div>
          <el-input maxlength="500" show-word-limit v-model="params.welcomeMessage" class="mt16" type="textarea" :autosize="{ minRows: 4}" :placeholder="$t('authMessage.config.welcomeMsg.placeholder')" />
        </div>
        <!-- 顾客无响应消息 -->
        <div class="function-item">
          <div class="function-item__title">
            {{ $t('authMessage.config.noResponse.title') }}
            <p>
              <i class="el-icon-info" />
              <span class="tips">{{ $t('authMessage.config.noResponse.tips') }}</span>
            </p>
          </div>
          <div class="function-item__able">
            <span class="title">{{ $t('authMessage.config.enable') }}</span>
            <el-switch v-model="params.resplessAble" class="mr20" :active-value="1" :inactive-value="0" active-color="#13ce66" />
            <span>{{ $t('authMessage.config.noResponse.text[0]') }}</span>
            <el-input v-model="params.resendTime" class="resend" type="number" size="mini" />{{ $t('authMessage.config.noResponse.text[1]') }}
          </div>
          <el-input v-model="params.resplessMessage" class="mt16" type="textarea" :autosize="{ minRows: 4}" :placeholder="$t('authMessage.config.noResponse.placeholder')" />
        </div>
        <!-- 顾客离线消息 -->
        <div class="function-item">
          <div class="function-item__title">
            {{ $t('authMessage.config.offline.title') }}
            <p>
              <i class="el-icon-info" />
              <span class="tips">{{ $t('authMessage.config.offline.tips') }}</span>
            </p>
          </div>
          <div class="function-item__able">
            <span class="title">{{ $t('authMessage.config.enable') }}</span>
            <el-switch v-model="params.offlineAble" class="mr20" :active-value="1" :inactive-value="0" active-color="#13ce66" />
          </div>
          <el-input v-model="params.offlineMesssage" class="mt16" type="textarea" :autosize="{ minRows: 4}" :placeholder="$t('authMessage.config.offline.placeholder')" />
        </div>
        <!-- 客服评价消息 -->
        <div class="function-item">
          <div class="function-item__title">
            {{ $t('authMessage.config.comment.title') }}
            <p>
              <i class="el-icon-info" />
              <span class="tips">{{ $t('authMessage.config.comment.tips') }}</span>
            </p>
          </div>
          <div class="function-item__able">
            <span class="title">{{ $t('authMessage.config.enable') }}</span>
            <el-switch v-model="params.commentAble" :active-value="1" :inactive-value="0" active-color="#13ce66" />
          </div>
          <el-input v-model="params.commentMessage" class="mt16" type="textarea" :autosize="{ minRows: 4}" :placeholder="$t('authMessage.config.comment.placeholder')" />
        </div>
        <!-- 结束对话消息 -->
        <div class="function-item">
          <div class="function-item__title">
            {{ $t('authMessage.config.endMsg.title') }}
            <p>
              <i class="el-icon-info" />
              <span class="tips">{{ $t('authMessage.config.endMsg.tips') }}</span>
            </p>
          </div>
          <div class="function-item__able">
            <span class="title">{{ $t('authMessage.config.enable') }}</span>
            <el-switch v-model="params.endAble" :active-value="1" :inactive-value="0" active-color="#13ce66" />
          </div>
          <el-input v-model="params.endMessage" class="mt16" type="textarea" :autosize="{ minRows: 4}" :placeholder="$t('authMessage.config.endMsg.placeholder')" />
        </div>
        <!-- 自动弹出客服消息 -->
        <div class="function-item">
          <div class="function-item__title">
            {{ $t('authMessage.config.autoMsg.title') }}
            <p>
              <i class="el-icon-info" />
              <span class="tips">{{ $t('authMessage.config.autoMsg.tips') }}</span>
            </p>
          </div>
          <div class="function-item__able">
            <span class="title">{{ $t('authMessage.config.enable') }}</span>
            <el-switch v-model="params.iseject" class="mr20" :active-value="1" :inactive-value="0" active-color="#13ce66" />
            <span>{{ $t('authMessage.config.autoMsg.text[0]') }}</span>
            <el-input v-model="params.ejectnum" class="resend" type="number" size="mini" />{{ $t('authMessage.config.autoMsg.text[1]') }}
          </div>
          <tinymce v-model="params.ejecmessage" class="mt16" :height="190" />
          <!-- <el-input v-model="params.resplessMessage" class="mt16" type="textarea" :autosize="{ minRows: 4}" :placeholder="$t('authMessage.config.autoMsg.placeholder')" /> -->
        </div>
        <!-- 提交 -->
        <div class="ta-c mt20">
          <el-button size="medium" class="cancel-btn">{{ $t('authMessage.config.cancel') }}</el-button>
          <el-button v-waves size="medium" type="primary" class="submit-btn" @click="editPlatformInfo">{{ $t('authMessage.config.submit') }}</el-button>
        </div>
      </template>


      <form-dialog v-bind="dialog" @reloadPromoteMessageList="getPromoteMessageList" @visibleChange="dialog.visible = $event" />
    </el-card>
  </div>
</template>

<script>
import { unescape } from 'html-escaper'
import formDialog from './formDialog.vue'
import tinymce from '@/components/Tinymce'
import { getPlatformList, getPlatformInfo, editPlatformInfo, getPromoteMessageList, deletePromoteMessage } from '@/api/replay.js'
export default {
  name: 'AutoReplay',
  components: { formDialog, tinymce },
  data() {
    return {
      platformInfo: {},
      platformList: [],
      promoteMessageList: [],
      activePlatform: {},
      dialog: {
        type: '',
        title: '',
        visible: false,
        messageDetail: {}
      },
      params: {
        promoteAble: 0,
        welcomeAble: 0,
        welcomeMessage: '',
        resendTime: 120,
        resplessAble: 0,
        resplessMessage: '',
        commentAble: 0,
        commentMessage: '',
        endAble: 0,
        endMessage: '',
        offlineAble: 0,
        offlineMesssage: '',
        iseject: 0,
        ejectnum: 10,
        ejecmessage: ''
      },
      loading: true,
      platformLoading: true,
      tableLoading: true
    }
  },
  created() {
    this.getPlatformList()
  },
  methods: {
    getPlatformList() {
      this.platformLoading = true
      getPlatformList().then(res => {
        const { code, data } = res
        if (code === 0) {
          this.platformLoading = false
          if (data.length) {
            this.activePlatform = data[0]
            this.getPlatformInfo(data[0])
            this.platformList = data
          }
        }
      })
    },
    getPlatformInfo(platform) {
      this.loading = true
      this.activePlatform = platform
      getPlatformInfo({ domain_id: platform.domain_id }).then(res => {
        this.params = {
          endAble: res.messstate,
          welcomeAble: res.ishello,
          commentAble: res.isevaluate,
          resplessAble: res.isresponse,
          promoteAble: res.isextension,
          welcomeMessage: res.hello_word || '',
          resplessMessage: res.no_response || '',
          commentMessage: res.evaluate || '',
          endMessage: res.closemessage || '',
          resendTime: res.kfNo,
          offlineAble: res.isoffline,
          offlineMesssage: res.offline || '',
          iseject: res.iseject,
          ejectnum: res.ejectnum,
          ejecmessage: res.ejecmessage || ''
        }
        this.platformInfo = res
        this.loading = false
        this.getPromoteMessageList()
      })
    },
    editPlatformInfo() {
      const {
        promoteAble: isextension,
        welcomeAble: ishello,
        welcomeMessage: hello_word,
        resplessAble: isresponse,
        resplessMessage: no_response,
        resendTime: kfNo,
        commentAble: isevaluate,
        commentMessage: evaluate,
        endAble: messstate,
        endMessage: closemessage,
        offlineAble: isoffline,
        offlineMesssage: offline,
        iseject,
        ejectnum,
        ejecmessage
      } = this.params

      const { domain_id } = this.activePlatform
      this.loading = true
      editPlatformInfo({
        domain_id, isextension, ishello, isresponse, isevaluate,
        messstate, hello_word, kfNo, no_response, evaluate, closemessage, isoffline, offline, iseject, ejectnum, ejecmessage
      }).then(res => {
        const { code, msg } = res
        const success = code === 0
        if (success) {
          this.getPlatformInfo(this.activePlatform)
        }
        this.$notify({
          message: msg,
          title: success ? this.$t('notify.success') : this.$t('notify.fail'),
          type: success ? 'success' : 'error'
        })
        this.loading = false
      })
    },
    getPromoteMessageList() {
      this.tableLoading = true
      const { domain_id: limit } = this.platformInfo
      getPromoteMessageList({ limit }).then(res => {
        const { code, data } = res
        if (code === 0) {
          data.forEach(item => {
            item.content = unescape(item.content)
          })
          this.promoteMessageList = data
        }
        this.tableLoading = false
      })
    },
    deletePromoteMessage(message) {
      const h = this.$createElement
      this.$confirm(this.$t('authMessage.config.promote.delete.message'), this.$t('authMessage.config.promote.delete.tips'), {
        confirmButtonText: this.$t('authMessage.config.promote.delete.confirm'),
        cancelButtonText: this.$t('authMessage.config.promote.delete.cancel'),
        dangerouslyUseHTMLString: true,
        message: h('p', [
          h('svg-icon', {
            props: {
              iconClass: 'warning'
            }
          }),
          h('span', this.$t('authMessage.config.promote.delete.message'))
        ])
      }).then(() => {
        deletePromoteMessage({
          messid: message.messagesid,
          domain_id: this.platformInfo.domain_id
        }).then(res => {
          const { code, msg } = res
          const success = code === 0
          if (success) {
            this.getPromoteMessageList()
          }
          this.$notify({
            message: msg,
            title: success ? this.$t('notify.success') : this.$t('notify.fail'),
            type: success ? 'success' : 'error'
          })
        })
      })
    },
    openDialog(type, message = {}) {
      const { content, mes_state: status, messagesid: messageId } = message; const { domain_id: domainId } = this.activePlatform
      this.dialog = {
        type: type,
        visible: true,
        title: type === 'edit' ? this.$t('authMessage.config.promote.form.editTitle') : this.$t('authMessage.config.promote.form.addTitle'),
        messageDetail: type === 'edit' ? { domainId, messageId, status, content } : { domainId, messageId: undefined, status: 1, content: '' }
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.replay {
	display: flex;
	color: rgb(153, 153, 153);
  position: relative;
  background: var(--talk-replay-platform-bg);
  min-height: calc(100vh - 130px);
	.replay-side {
		width: 240px;
		box-shadow: none;
		border-right: 4px solid var(--main-bg);
		.platform-item {
			line-height: 50px;
			// border-bottom: 1px solid var(--talk-replay-border);
			transition: all 0.3s;
			cursor: pointer;
			text-indent: 20px;
			background: var(--talk-replay-platform-bg);
			&:hover,
			&.active {
				background: #5082f4;
				color: #fff;
			}
		}
		::v-deep.el-card__body {
			padding: 0;
		}
	}
	.replay-main {
		flex: 1;
		box-shadow: none;
		border: 0;
    background: var(--talk-replay-platform-bg);
    min-height: calc(100vh - 130px);
		.function-item {
			color: var(--talk-replay-title);
			.function-item__title {
				font-size: 16px;
				color: var(--talk-replay-title);
				font-weight: bold;
				.el-icon-info {
					margin: 0 10px 0 0;
					color: var(--talk-replay-tips);
					font-size: 14px;
				}
			}
			.function-item__able {
				margin-top: 14px;
				.title {
					margin-right: 20px;
				}
			}
			.flex-aic {
				.el-button--primary {
					width: 170px;
					height: 48px;
					border-radius: 24px;
					background: var(--el-btn-primary-bg);
					border: 0;
          font-size: 14px;
				}
			}
			.tips {
				color: var(--talk-replay-tips);
				font-size: 14px;
				font-weight: normal;
			}
			.resend {
				display: inline-block;
				width: 50px;
				margin: 0 8px;
				::v-deep.el-input__inner {
					padding: 0 5px;
				}
			}
			::v-deep .promote-content {
				img {
					max-width: 100px;
					height: auto;
				}
			}
			::v-deep.el-input-number {
				width: 90px;
				.el-input__inner {
					height: 28px !important;
					line-height: 28px !important;
				}
				.el-input-number__decrease,
				.el-input-number__increase {
					line-height: 13px !important;
				}
			}
			& + .function-item {
				margin-top: 34px;
			}
		}
		::v-deep.el-dialog__body {
			padding: 15px 20px 0;
		}
	}
	::v-deep.el-card__header {
		font-size: 15px;
	}
	.ta-c {
		.el-button {
			width: 120px;
			height: 48px;
			border-radius: 24px;
		}
    .cancel-btn {
      color: #0000FF;
    }
    .submit-btn {
      background: #ffd700;
      color: #FF00CC;
    }
	}
}
</style>
