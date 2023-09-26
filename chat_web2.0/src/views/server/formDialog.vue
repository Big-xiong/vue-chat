<template>
  <div>
    <el-dialog :title="title" :visible="visible" :close-on-click-modal="false" @close="closeHandler" @open="openHandler">
      <el-radio-group v-model="peopleType" class="people-type" :disabled="type==='edit'">
        <el-radio label="server">{{ $t('server.form.peopleType[0]') }}</el-radio>
        <!-- <el-radio label="assist">{{ $t('server.form.peopleType[1]') }}</el-radio> -->
      </el-radio-group>

      <div v-if="visible">
        <!-- 客服 -->
        <el-form v-show="peopleType==='server'" ref="serverForm" :model="serverParams" :rules="serverRules" label-width="100px" hide-required-asterisk>
          <el-form-item :label="$t('server.form.label.serverName')" prop="serverName">
            <el-input v-model="serverParams.serverName" :placeholder="$t('server.form.placeholder.serverName')" />
          </el-form-item>
          <el-form-item :label="$t('server.form.label.userName')" prop="userName">
            <el-input v-model="serverParams.userName" :placeholder="$t('server.form.placeholder.userName')" />
          </el-form-item>
          <el-form-item :label="$t('server.form.label.serverPwd')" prop="serverPwd" :rules="type=='add'?{ required: true, trigger: 'blur', message: $t('server.form.tips.serverPwd') }:{}">
            <el-input v-model="serverParams.serverPwd" :placeholder="type=='add'?$t('server.form.placeholder.serverPwd'):$t('server.form.placeholder.resetPwd')" />
          </el-form-item>
          <el-form-item :label="$t('server.form.label.serverGroup')" prop="groupId">
            <el-select v-model="serverParams.groupId" multiple :placeholder="$t('server.form.placeholder.serverGroup')">
              <el-option
                v-for="group in groupList"
                :key="group.group_id"
                :label="group.group_name"
                :value="group.group_id"
              />
            </el-select>
          </el-form-item>
          <el-form-item :label="$t('server.form.label.maxServedNumber')" prop="maxServedNumber">
            <el-input v-model="serverParams.maxServedNumber" :placeholder="$t('server.form.placeholder.maxServedNumber')" />
          </el-form-item>
          <el-form-item :label="$t('server.form.label.activeStatus')" prop="isActive">
            <el-switch
              v-model="serverParams.isActive"
              :active-value="1"
              :inactive-value="0"
              :active-text="$t('server.form.yes')"
              :inactive-text="$t('server.form.no')"
              active-color="#13ce66"
            />
          </el-form-item>
          <el-form-item :label="$t('server.form.label.serverAvatar')" prop="serverAvatar">
            <div class="flex-aic">
              <avatar ref="serverImgUploader" :img-path="serverParams.serverAvatar" />
              <el-button type="text" class="ml6" @click="avatarDialog.visible = true">{{ $t('server.form.change') }}</el-button>
            </div>
          </el-form-item>
        </el-form>

        <!-- 助手 -->
        <el-form v-show="peopleType==='assist'" ref="assistForm" :model="assistParams" :rules="assistRules" label-width="100px" hide-required-asterisk>
          <el-form-item :label="$t('server.form.assistLabel.userName')" prop="userName">
            <el-input v-model="assistParams.userName" :placeholder="$t('server.form.assistPlaceholder.userName')" />
          </el-form-item>
          <el-form-item :label="$t('server.form.assistLabel.nickName')" prop="nickName">
            <el-input v-model="assistParams.nickName" :placeholder="$t('server.form.assistPlaceholder.nickName')" />
          </el-form-item>
          <el-form-item :label="$t('server.form.assistLabel.password')" prop="password" :rules="type=='add'?{ required: true, trigger: 'blur', message: $t('server.form.assistTips.password') }:{}">
            <el-input v-model="assistParams.password" :placeholder="type=='add'?$t('server.form.assistPlaceholder.inputPwd'):$t('server.form.assistPlaceholder.resetPwd')" />
          </el-form-item>
          <el-form-item :label="$t('server.form.assistLabel.isActive')" prop="isActive">
            <el-switch
              v-model="assistParams.isActive"
              :active-value="1"
              :inactive-value="0"
              :active-text="$t('server.form.yes')"
              :inactive-text="$t('server.form.no')"
              active-color="#13ce66"
            />
          </el-form-item>
          <el-form-item :label="$t('server.form.assistLabel.avatar')" prop="avatar">
            <div class="flex-aic">
              <avatar ref="assistImgUploader" :img-path="assistParams.avatar" />
              <el-button type="text" class="ml6" @click="avatarDialog.visible = true">{{ $t('server.form.change') }}</el-button>
            </div>
          </el-form-item>
        </el-form>
      </div>

      <span slot="footer">
        <el-button @click="resetHandler">{{ $t('action.type.reset') }}</el-button>
        <el-button type="primary" :loading="buttonLoading" @click="submitHandler">{{ $t('action.type.confirm') }}</el-button>
      </span>
    </el-dialog>

    <!-- 头像弹窗 -->
    <el-dialog top="26vh" width="270px" class="avatar-dialog" :visible.sync="avatarDialog.visible" :close-on-click-modal="true">
      <el-row>
        <el-col v-for="fileName in avatarDialog.fileNameList" :key="fileName" class="ta-c mb12" :span="8" justify="center">
          <img class="avatar-img" :src="`/img/server-avatar/${fileName}`" @click="selectAvatar(fileName)">
        </el-col>
      </el-row>
      <el-upload
        class="ta-c mt10"
        :action="`${baseUrl}/index/upload/uploadKfImg`"
        :show-file-list="false"
        :on-success="uploadSuccess"
        :on-progress="()=>{uploading=true}"
        :on-error="()=>{uploading=false}"
      >
        <el-button v-waves size="small" type="primary" icon="el-icon-upload2" :loading="uploading">{{ $t('server.form.custom') }}</el-button>
      </el-upload>
    </el-dialog>
  </div>
</template>

<script>
import { serverHandler, judgeSameName } from '@/api/server.js'
import avatar from './avatar.vue'
export default {
  components: { avatar },
  props: {
    visible: {
      type: Boolean,
      default: false
    },
    title: {
      type: String
    },
    type: {
      type: String
    },
    serverType: {
      type: String
    },
    serverDetail: {
      type: Object,
      default: () => ({})
    },
    groupList: {
      type: Array,
      default: () => []
    }
  },
  data() {
    const userNameValid = async(rule, value, callback) => {
      if (this.type == 'edit') {
        callback()
      } else {
        const { data } = await judgeSameName({ username: value })
        if (data) {
          callback(this.$t('server.form.tips.userName[1]'))
        } else {
          callback()
        }
      }
    }
    const groupValid = async(rule, value, callback) => {
      if (value) {
        if (value.length === 0) {
          callback(this.$t('server.form.tips.serverGroup'))
        } else {
          callback()
        }
      } else {
        callback(this.$t('server.form.tips.serverGroup'))
      }
    }
    const maxServeValid = (rule, value, callback) => {
      const number = parseInt(value)
      if (isNaN(number)) {
        callback()
      } else {
        if (number < 10) {
          callback(this.$t('server.form.tips.minServerNumber'))
        } else {
          callback()
        }
      }
    }
    return {
      serverParams: {
        userName: '',
        serverName: '',
        serverPwd: '',
        groupId: [],
        isActive: 1,
        maxServedNumber: '',
        serverAvatar: '',
        serverId: ''
      },
      serverRules: {
        userName: [
          { required: true, trigger: 'blur', message: this.$t('server.form.tips.userName[0]') },
          { validator: userNameValid, trigger: 'blur' }
        ],
        groupId: [{ validator: groupValid, trigger: 'blur' }],
        serverName: [{ required: true, trigger: 'blur', message: this.$t('server.form.tips.serverName') }],
        maxServedNumber: [
          { required: true, trigger: 'blur', message: this.$t('server.form.tips.maxServedNumber') },
          { validator: maxServeValid, trigger: 'blur' }
        ]
      },
      assistParams: {
        id: '',
        userName: '',
        nickName: '',
        password: '',
        isActive: 1,
        avatar: '/img/server-avatar/default.png'
      },
      assistRules: {
        userName: { required: true, trigger: 'blur', message: this.$t('server.form.assistTips.userName') },
        nickName: { required: true, trigger: 'blur', message: this.$t('server.form.assistTips.nickName') }
      },
      avatarDialog: {
        visible: false,
        fileNameList: [
          '1.png', '2.png', '3.png', '4.png', '5.png', '6.png'
        ]
      },
      peopleType: '',
      uploading: false,
      buttonLoading: false,
      baseUrl: process.env.VUE_APP_BASE_URL
    }
  },
  watch: {
    serverDetail(v) {
      const { serverType } = this
      if (serverType === 'server') {
        this.serverParams = JSON.parse(JSON.stringify(v))
      } else if (serverType === 'assist') {
        this.assistParams = JSON.parse(JSON.stringify(v))
      }
    }
  },
  methods: {
    submitHandler() {
      const { peopleType } = this
      if (peopleType === 'server') {
        this.submitServer()
      } else if (peopleType === 'assist') {
        this.submitAssist()
      }
    },
    async submitServer() {
      const valid = await this.$refs.serverForm.validate()
      if (valid) {
        if (this.serverParams.serverAvatar.startsWith('/img/server-avatar')) {
          const res = await this.$refs.serverImgUploader.upload()
          const { code, msg, data } = res
          if (code === 0) {
            this.serverParams.serverAvatar = data.src
          } else {
            return this.$message({
              message: msg,
              type: 'error'
            })
          }
        }
        const {
          userName: kefu_username,
          serverName: kefu_name,
          serverPwd: kefu_password,
          groupId: group_id,
          isActive: kefu_status,
          maxServedNumber: max_service_num,
          serverAvatar: kefu_avatar,
          serverId: kefu_id
        } = this.serverParams
        const params = {
          kefu_username, kefu_name, kefu_password, kefu_id,
          group_id: group_id.join(','), kefu_status, max_service_num, kefu_avatar, type: 0
        }
        this.buttonLoading = true
        serverHandler(this.type, params).then(res => {
          const { code, msg } = res
          const success = code === 0
          if (success) {
            this.$emit('reloadServerList')
            this.closeHandler()
          }
          this.$notify({
            message: msg,
            title: success ? this.$t('notify.success') : this.$t('notify.fail'),
            type: success ? 'success' : 'error'
          })
          this.buttonLoading = false
        })
      }
    },
    async submitAssist() {
      const valid = await this.$refs.assistForm.validate()
      if (valid) {
        if (this.assistParams.avatar.startsWith('/img/server-avatar')) {
          const res = await this.$refs.assistImgUploader.upload()
          const { code, msg, data } = res
          if (code === 0) {
            this.assistParams.avatar = data.src
          } else {
            return this.$message({
              message: msg,
              type: 'error'
            })
          }
        }
        const {
          id: kefu_id,
          userName: kefu_username,
          nickName: kefu_name,
          password: kefu_password,
          isActive: kefu_status,
          avatar: kefu_avatar
        } = this.assistParams
        const { groupList } = this
        const params = { kefu_id, kefu_username, kefu_name, kefu_password, kefu_status, kefu_avatar, group_id: groupList[0] ? groupList[0].group_id : '', max_service_num: 10, type: 1 }
        this.buttonLoading = true
        serverHandler(this.type, params).then(res => {
          const { code, msg } = res
          const success = code === 0
          if (success) {
            this.$emit('reloadServerList')
            this.closeHandler()
          }
          this.$notify({
            message: msg,
            title: success ? this.$t('notify.success') : this.$t('notify.fail'),
            type: success ? 'success' : 'error'
          })
          this.buttonLoading = false
        })
      }
    },
    uploadSuccess(res) {
      const { code, msg, data } = res
      const success = code === 0
      if (success) {
        this.avatarDialog.visible = false
        const { peopleType } = this
        if (peopleType === 'server') {
          this.serverParams.serverAvatar = data.src
        } else if (peopleType === 'assist') {
          this.assistParams.avatar = data.src
        }
      }
      this.$notify({
        message: msg,
        title: success ? this.$t('notify.success') : this.$t('notify.fail'),
        type: success ? 'success' : 'error'
      })
      this.uploading = false
    },
    selectAvatar(fileName) {
      const { peopleType } = this
      if (peopleType === 'server') {
        this.serverParams.serverAvatar = `/img/server-avatar/${fileName}`
      } else if (peopleType === 'assist') {
        this.assistParams.avatar = `/img/server-avatar/${fileName}`
      }
      this.avatarDialog.visible = false
    },
    resetHandler() {
      const { peopleType } = this
      if (peopleType === 'server') {
        this.$refs.serverForm.resetFields()
      } else if (peopleType === 'assist') {
        this.$refs.assistForm.resetFields()
      }
      this.uploading = false
      this.buttonLoading = false
    },
    closeHandler() {
      this.uploading = false
      this.buttonLoading = false
      this.$emit('visibleChange', false)
    },
    openHandler() {
      const { type } = this
      if (type === 'add') {
        this.assistParams = {
          userName: '',
          nickName: '',
          password: '',
          isActive: 1,
          avatar: '/img/server-avatar/default.png'
        }
      }
      this.peopleType = this.serverType
    }
  }
}
</script>

<style lang="scss" scoped>
::v-deep.el-form{
  .el-form-item__label{
    text-align: left !important;
  }
  .el-form-item{
    margin-bottom: 18px;
  }
}
.people-type {
  margin: 0 0 20px 100px;
}
.server-avatar {
  width: 50px;
  height: 50px;
  border-radius: 50%;
}
.avatar-dialog {
  .avatar-img {
    width: 50px;
    height: 50px;
    cursor: pointer;
  }
}
::v-deep .el-dialog {
  max-height: 640px;
}
</style>
