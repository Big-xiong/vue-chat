<template>
  <div class="config">
    <el-card v-loading="platformLoading" class="config-side">
      <div slot="header">{{ $t('robot.head[0]') }}</div>
      <div class="platform-list">
        <div v-for="platform in platformList" :key="platform.domain_id" :class="{'platform-item':true,'active':activePlatform.domain_id==platform.domain_id}" @click="getPlatformInfo(platform)">
          {{ platform.domain_title }}
        </div>
      </div>
    </el-card>
    <el-card v-loading="loading" class="config-main">
      <template v-if="!loading">
        <div slot="header">{{ $t('robot.head[1]') }}</div>
        <!-- 提交 -->
        <div class="ta-c">
          <el-button size="medium" class="cancel-btn">{{ $t('robot.config.cancel') }}</el-button>
          <el-button v-waves size="medium" type="primary" class="submit-btn" @click="editRobotInfo">{{ $t('authMessage.config.submit') }}</el-button>
        </div>
        <!-- 机器人开关 -->
        <div class="function-item">
          <div class="function-item__title">
            {{ $t('robot.config.robotAble.title') }}
            <p>
              <i class="el-icon-info" />
              <span class="tips">{{ $t('robot.config.robotAble.tips') }}</span>
            </p>
          </div>
          <div class="function-item__able">
            <span class="title">{{ $t('robot.config.enable') }}</span>
            <el-switch v-model="params.robotAble" :active-value="1" :inactive-value="0" active-color="#13ce66" />
          </div>
          <div class="function-item__title mt14">
            {{ $t('robot.config.robotFirstAble.title') }}
            <p>
              <i class="el-icon-info" />
              <span class="tips">{{ $t('robot.config.robotFirstAble.tips') }}</span>
            </p>
          </div>
          <div class="function-item__able">
            <span class="title">{{ $t('robot.config.enable') }}</span>
            <el-switch v-model="params.robotFirstAble" :active-value="1" :inactive-value="0" active-color="#13ce66" />
          </div>
          <div class="function-item__title mt14">
            {{ $t('robot.config.robotLastAble.title') }}
            <p>
              <i class="el-icon-info" />
              <span class="tips">{{ $t('robot.config.robotLastAble.tips') }}</span>
            </p>
          </div>
          <div class="function-item__able">
            <span class="title">{{ $t('robot.config.enable') }}</span>
            <el-switch v-model="params.robotLastAble" :active-value="1" :inactive-value="0" active-color="#13ce66" />
          </div>
          <div class="mt16 flex-jcsb-aic">
            <div class="flex">
              <el-input v-model="question" clearable class="filter-item mr10" style="width:200px" :placeholder="$t('robot.config.knowledge.placeholder')" />
              <el-button v-waves class="filter-item" type="primary" @click="()=>{page=1;getKnowledgeList()}">
                <i class="material-icons-round fs-18 mr6">search</i>{{ $t('action.type.search') }}
              </el-button>
              <el-button v-waves class="filter-item" type="primary" @click="openDialog('add')">
                <i class="material-icons-round fs-18 mr6">add</i>{{ $t('action.type.add') }}
              </el-button>
            </div>
            <uploadKnowledge :platform-id="activePlatform.domain_id" :total="total" @reloadKnowledgeList="()=>{page=1;getKnowledgeList()}" />
          </div>
          <el-table v-loading="tableLoading" :data="knowledgeList" class="mt16 table-robot" stripe>
            <el-table-column prop="question" :label="$t('robot.config.knowledge.table.question')" align="center" />
            <el-table-column prop="answer" :label="$t('robot.config.knowledge.table.answer')" align="center">
              <div slot-scope="{ row }" class="answer-content" v-html="row.answer" />
            </el-table-column>
            <el-table-column :label="$t('robot.config.knowledge.table.status')" align="center">
              <template slot-scope="{row}">
                <div :class="{'enable':getShowType(row),'status':true}">{{ getShowType(row)? $t('robot.config.knowledge.table.enable') : $t('robot.config.knowledge.table.disable') }}</div>
              </template>
              <!-- <el-tag slot-scope="{row}" size="small" :type="getShowType(row) ? '' : 'info'">{{ getShowType(row)? $t('robot.config.knowledge.table.enable') : $t('robot.config.knowledge.table.disable') }}</el-tag> -->
            </el-table-column>
            <el-table-column :label="$t('action.label')" align="center">
              <template slot-scope="{row}">
                <el-button v-waves size="mini" type="primary" @click="openDialog('edit',row)">
                  <i class="material-icons-round fs-14 mr6">drive_file_rename_outline</i>{{ $t('action.type.edit') }}
                </el-button>
                <el-button v-waves size="mini" type="danger" @click="deleteKnowledge(row)">
                  <i class="material-icons-round fs-14 mr6">delete_outline</i>{{ $t('action.type.delete') }}
                </el-button>
              </template>
            </el-table-column>
          </el-table>
          <pagination :total="total" :page.sync="page" :limit.sync="limit" @pagination="getKnowledgeList" />
        </div>
        <!-- 机器人名称 -->
        <div class="function-item">
          <div class="function-item__title">
            {{ $t('robot.config.robotName.title') }}
            <p>
              <i class="el-icon-info" />
              <span class="tips">{{ $t('robot.config.robotName.tips') }}</span>
            </p>
          </div>
          <el-input v-model="params.robotName" class="mt16" type="textarea" :autosize="{ minRows: 4}" :placeholder="$t('robot.config.robotName.placeholder')" />
        </div>
        <!-- 机器人头像 -->
        <div class="function-item">
          <div class="function-item__title">
            {{ $t('robot.config.robotAvatar.title') }}
            <p>
              <i class="el-icon-info" />
              <span class="tips">{{ $t('robot.config.robotAvatar.tips') }}</span>
            </p>
          </div>
          <div class="robot-avatar">
            <avatar ref="imgUploader" :img-path="params.robotAvatar" />
            <el-upload class="mt14 ml10" :action="`${baseUrl}/index/upload/uploadImg`" :on-success="uploadAvatarSuccess" :show-file-list="false">
              <el-button size="mini" type="primary">
                {{ this.params.robotAvatar==this.defaultAvatar?$t('robot.config.robotAvatar.text[0]'):$t('robot.config.robotAvatar.text[1]') }}</el-button>
            </el-upload>
          </div>
        </div>
        <!-- 机器人欢迎语 -->
        <div class="function-item">
          <div class="function-item__title">
            {{ $t('robot.config.robotWelMsg.title') }}
            <p>
              <i class="el-icon-info" />
              <span class="tips">{{ $t('robot.config.robotWelMsg.tips') }}</span>
            </p>
          </div>
          <el-input v-model="params.robotWelMsg" class="mt16" type="textarea" :autosize="{ minRows: 4}" :placeholder="$t('robot.config.robotWelMsg.placeholder')" />
        </div>
        <!-- 未知问题回答 -->
        <div class="function-item">
          <div class="function-item__title">
            {{ $t('robot.config.robotUnknownMsg.title') }}
            <p>
              <i class="el-icon-info ml12 mr8" />
              <span class="tips">{{ $t('robot.config.robotUnknownMsg.tips') }}</span>
            </p>
          </div>
          <el-input v-model="params.robotUnknownMsg" class="mt16" type="textarea" :autosize="{ minRows: 4}" :placeholder="$t('robot.config.robotUnknownMsg.placeholder')" />
        </div>
        <!-- 机器人结束语 -->
        <div class="function-item">
          <div class="function-item__title">{{ $t('robot.config.robotEndMsg.title') }}</div>
          <el-input v-model="params.robotEndMsg" class="mt16" type="textarea" :autosize="{ minRows: 4}" :placeholder="$t('robot.config.robotEndMsg.placeholder')" />
        </div>
        <!-- 提交 -->
        <div class="ta-c mt20">
          <el-button size="medium" class="cancel-btn">{{ $t('robot.config.cancel') }}</el-button>
          <el-button v-waves size="medium" type="primary" class="submit-btn" @click="editRobotInfo">{{ $t('authMessage.config.submit') }}</el-button>
        </div>
      </template>
    </el-card>

    <form-dialog v-bind="dialog" @reloadKnowledList="reloadKnowledList" @visibleChange="dialog.visible = $event" />
  </div>
</template>

<script>
import { getPlatformList, getPlatformInfo } from '@/api/common.js'
import { getKnowledgeList, deleteKnowledge, editRobotInfo } from '@/api/robot.js'
import uploadKnowledge from './uploadKnowledge.vue'
import formDialog from './formDialog.vue'
import avatar from './avatar.vue'
import { unescape } from 'html-escaper'
export default {
  name: 'RobotConfig',
  components: { avatar, formDialog, uploadKnowledge },
  data() {
    return {
      platformInfo: {},
      platformList: [],
      knowledgeList: [],
      activePlatform: {},
      page: 1,
      limit: 5,
      total: 0,
      question: '',
      dialog: {
        type: '',
        title: '',
        visible: false,
        knowledgeDetail: {}
      },
      params: {
        robotAble: 0,
        robotFirstAble: 0,
        robotLastAble: 0,
        robotName: '',
        robotAvatar: '',
        robotWelMsg: '',
        robotUnknownMsg: '',
        robotEndMsg: ''
      },
      loading: true,
      platformLoading: true,
      tableLoading: true,
      baseUrl: process.env.VUE_APP_BASE_URL,
      defaultAvatar: '/img/server-avatar/default.png'
    }
  },
  created() {
    this.getPlatformList()
  },
  methods: {
    getShowType(row) {
      // console.log(row,'row');
      if (row.status == 1) {
        const termvalidity = row.termvalidity
        if (!termvalidity) {
          return true
        }
        const day = new Date().getTime()
        const _day = new Date(termvalidity.replace(/-/g, '/')).getTime()
        // console.log(day,_day,'day');
        if (_day >= day) {
          return true
        }
        return false
      } else {
        return false
      }
    },
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
        const { isrobot, isfastrobot, iskfcolse, robotname, robotpic, robotmessage, robotquest, robotcolse } = res
        this.params = {
          robotAble: isrobot || '',
          robotName: robotname || '',
          robotEndMsg: robotcolse || '',
          robotLastAble: iskfcolse || '',
          robotWelMsg: robotmessage || '',
          robotUnknownMsg: robotquest || '',
          robotFirstAble: isfastrobot || '',
          robotAvatar: robotpic || this.defaultAvatar
        }
        this.platformInfo = res
        this.getKnowledgeList()
      })
    },
    async editRobotInfo() {
      if (this.params.robotAvatar == this.defaultAvatar) {
        const res = await this.$refs.imgUploader.upload()
        const { code, msg, data } = res
        if (code === 0) {
          this.params.robotAvatar = data.src
        } else {
          return this.$message({
            message: msg,
            type: 'error'
          })
        }
      }
      const {
        robotAble: isrobot,
        robotFirstAble: isfastrobot,
        robotLastAble: iskfcolse,
        robotName: robotname,
        robotAvatar: robotpic,
        robotWelMsg: robotmessage,
        robotUnknownMsg: robotquest,
        robotEndMsg: robotcolse
      } = this.params
      const { domain_id } = this.activePlatform
      this.loading = true
      editRobotInfo({
        domain_id, isrobot, robotpic, iskfcolse, robotname,
        robotmessage, robotcolse, robotquest, isfastrobot
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
    getKnowledgeList() {
      this.tableLoading = true
      const { page, limit, question } = this
      const { domain_id } = this.activePlatform
      getKnowledgeList({ domain_id, page, limit, question }).then(res => {
        const { code, data, count } = res
        if (code === 0) {
          data.forEach(item => {
            item.answer = unescape(item.answer)
          })
          this.total = count
          this.knowledgeList = data
        }
        this.loading = false
        this.tableLoading = false
      })
    },
    reloadKnowledList() {
      if (this.dialog.type == 'add') {
        this.page = 1
      }
      this.getKnowledgeList()
    },
    deleteKnowledge(knowledge) {
      const h = this.$createElement
      this.$confirm(this.$t('robot.config.knowledge.delete.message'), this.$t('robot.config.knowledge.delete.tips'), {
        confirmButtonText: this.$t('robot.config.knowledge.delete.confirm'),
        cancelButtonText: this.$t('robot.config.knowledge.delete.cancel'),
        dangerouslyUseHTMLString: true,
        message: h('p', [
          h('svg-icon', {
            props: {
              iconClass: 'warning'
            }
          }),
          h('span', this.$t('robot.config.knowledge.delete.message'))
        ])
      }).then(() => {
        deleteKnowledge({
          id: knowledge.knowledge_id,
          question: knowledge.question,
          domain_id: knowledge.domain_id
        }).then(res => {
          const { code, msg } = res
          const success = code === 0
          if (success) {
            if (this.page > 1 && this.knowledgeList.length === 1) {
              this.page--
            }
            this.getKnowledgeList()
          }
          this.$notify({
            message: msg,
            title: success ? this.$t('notify.success') : this.$t('notify.fail'),
            type: success ? 'success' : 'error'
          })
        })
      })
    },
    uploadAvatarSuccess(res) {
      const { code, msg, data } = res
      if (code === 0) {
        this.params.robotAvatar = data.src
      } else {
        this.$message.error(msg)
      }
    },
    openDialog(type, knowledge = {}) {
      const { question, answer, termvalidity, status } = knowledge
      const { domain_id: platformId } = this.activePlatform
      this.dialog = {
        type: type,
        visible: true,
        title: type == 'edit' ? this.$t('robot.config.knowledge.uploadForm.editTitle') : this.$t('robot.config.knowledge.uploadForm.addTitle'),
        knowledgeDetail: type == 'edit' ? { platformId, question, answer, termvalidity, status } : { platformId, question: '', answer: '', termvalidity: '', status: 1 }
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.config {
	display: flex;
	color: rgb(153, 153, 153);
	position: relative;
  background: var(--talk-replay-platform-bg);
  min-height: calc(100vh - 130px);
	.config-side {
		width: 300px;
		// margin-right: 20px;
		border-right: 20px solid var(--main-bg);
		.platform-item {
			line-height: 50px;
			// border-bottom: 1px solid var(--robot-config-border);
			transition: all 0.3s;
			cursor: pointer;
			text-indent: 20px;
			&:hover,
			&.active {
				// background: var(--robot-config-title);
				background: #5082f4;
				color: #fff;
			}
		}
		::v-deep.el-card__body {
			padding: 0;
		}
	}
	.config-main {
		flex: 1;
    background: var(--talk-replay-platform-bg);
    min-height: calc(100vh - 130px);
		.function-item {
			color: var(--robot-config-title);
			.function-item__title {
				font-size: 16px;
				font-weight: 700;
				color: var(--robot-config-title);
				.el-icon-info {
					margin-right: 10px;
					color: var(--robot-config-tips);
					font-size: 14px;
				}
				.tips {
					font-weight: normal;
				}
			}
			.function-item__able {
				margin: 14px 0 40px 0;
				.title {
					margin-right: 20px;
				}
			}
			::v-deep .answer-content {
				img {
					max-width: 100px;
					height: auto;
				}
			}
			.tips {
				color: var(--robot-config-tips);
				font-size: 14px;
			}
			.robot-avatar {
				margin-top: 16px;
			}
			& + .function-item {
				margin-top: 34px;
			}
		}
		::v-deep.el-dialog__body {
			padding: 25px 20px;
		}
		.table-robot {
			.status {
				display: inline-block;
				background-color: #f4f4f5;
				color: #909399;
				height: 24px;
				padding: 0 8px;
				line-height: 22px;
				border-radius: 4px;
				border: 1px solid #e9e9eb;
				font-size: 12px;
				white-space: nowrap;
				&.enable {
					background-color: #eaf3fc;
					border: 1px solid #d4e6fa;
					color: #5082f4;
				}
			}
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
