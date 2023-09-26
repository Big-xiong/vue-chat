<template>
  <el-dialog :title="title" :visible="visible" :close-on-click-modal="false" @close="closeHandler">
    <el-form v-if="visible" ref="form" :model="params" :rules="rules" label-width="auto" hide-required-asterisk>
      <el-form-item :label="$t('group.form.label.platform')" prop="platform">
        <el-input v-if="inLayer" v-model="params.platform" :placeholder="$t('group.form.placeholder.platform')" />
        <el-select v-else v-model="params.platform" :placeholder="$t('group.form.placeholder.platform')">
          <el-option
            v-for="platform in platformList"
            :key="platform.domain_id"
            :label="platform.domain_title"
            :value="platform.domain_id"
          />
        </el-select>
      </el-form-item>
      <el-form-item :label="$t('group.form.label.groupName')" prop="groupName">
        <el-input v-model="params.groupName" :placeholder="$t('group.form.placeholder.groupName')" :disabled="inLayer" />
      </el-form-item>
      <el-form-item :label="$t('group.form.label.isActive')" prop="status">
        <el-switch
          v-model="params.status"
          :active-value="1"
          :inactive-value="0"
          :active-text="$t('group.form.yes')"
          :inactive-text="$t('group.form.no')"
          active-color="#13ce66"
        />
      </el-form-item>
    </el-form>
    <span slot="footer">
      <el-button @click="()=>{$refs.form.resetFields();buttonLoading=false}">{{ $t('action.type.reset') }}</el-button>
      <el-button type="primary" :loading="buttonLoading" @click="submitHandler">{{ $t('action.type.confirm') }}</el-button>
    </span>
  </el-dialog>
</template>

<script>
import { groupHandler } from '@/api/group.js'
import { getPlatformList } from '@/api/common.js'
export default {
  props: {
    state: Number,
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
    groupDetail: {
      type: Object,
      default: () => ({})
    }
  },
  data() {
    return {
      params: {
        platform: '',
        groupName: '',
        status: 1,
        groupId: undefined
      },
      rules: {
        groupName: [{ required: true, trigger: 'blur', message: this.$t('group.form.tips.groupName') }],
        platform: [{ required: true, trigger: 'blur', message: this.$t('group.form.tips.platform') }]
      },
      buttonLoading: false,
      platformList: []
    }
  },
  computed: {
    inLayer() {
      return this.type === 'edit' && this.state === 1
    }
  },
  watch: {
    groupDetail(v) {
      this.params = JSON.parse(JSON.stringify(v))
    }
  },
  created() {
    this.getPlatformList()
  },
  methods: {
    submitHandler() {
      this.$refs.form.validate((valid) => {
        if (valid) {
          this.buttonLoading = true
          const url = this.type == 'edit' ? '/api/editGroup' : '/api/addGroup'
          const { status: group_status, platform: domain_id, groupName: group_name, groupId: group_id } = this.params
          groupHandler(url, {
            group_status, group_name, group_id, domain_id
          }).then((res) => {
            const { code, msg } = res
            const success = code === 0
            if (success) {
              this.$emit('reloadGroupList')
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
      })
    },
    closeHandler() {
      this.buttonLoading = false
      this.$emit('visibleChange', false)
    },
    getPlatformList() {
      getPlatformList().then(res => {
        const { code, data } = res
        if (code === 0) {
          this.platformList = [
            {
              domain_id: 0,
              domain_title: '全部'
            },
            ...data
          ]
        }
      })
    }
  }
}
</script>

<style lang="less" scoped>
</style>
