<template>
  <el-dialog :title="title" :visible="visible" :close-on-click-modal="true" width="640px" @close="closeHandler">
    <el-form v-if="visible" ref="form" :model="params" :rules="rules" label-width="auto" hide-required-asterisk>
      <el-form-item :label="$t('dailyWordType.form.label.name')" prop="name">
        <el-input v-model="params.name" :placeholder="$t('dailyWordType.form.placeholder.name')" />
      </el-form-item>
      <el-form-item :label="$t('dailyWordType.form.label.status')" prop="status">
        <el-switch
          v-model="params.status"
          :active-value="1"
          :inactive-value="2"
          :active-text="$t('dailyWordType.form.yes')"
          :inactive-text="$t('dailyWordType.form.no')"
          active-color="#13ce66"
        />
      </el-form-item>
    </el-form>
    <span slot="footer">
      <el-button @click="()=>{$refs.form.resetFields();buttonLoading=false}">{{ $t('action.type.reset') }}</el-button>
      <el-button v-if="type == 'add'" type="primary" :loading="buttonLoading" @click="handleAddContinue">{{ $t('action.type.continue') }}</el-button>
      <el-button type="primary" :loading="buttonLoading" @click="submitHandler">{{ $t('action.type.confirm') }}</el-button>
    </span>
  </el-dialog>
</template>

<script>
import { wordTypeHandlerCustom } from '@/api/dailyWord.js'
export default {
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
    typeDetail: {
      type: Object,
      default: () => ({})
    }
  },
  data() {
    return {
      params: {
        id: '',
        name: '',
        status: ''
      },
      platformList: [],
      rules: {
        name: [{ required: true, trigger: 'blur', message: this.$t('dailyWordType.form.tips.name') }]
      },
      buttonLoading: false
    }
  },
  watch: {
    typeDetail(v) {
      this.params = JSON.parse(JSON.stringify(v))
    }
  },
  methods: {
    handleAddContinue() {
      this.$refs.form.validate((valid) => {
        if (valid) {
          this.buttonLoading = true
          const url = '/service/customwordsadd'
          const { id: cate_id, name: cate_name, status } = this.params
          wordTypeHandlerCustom(url, {
            cate_name, status, cate_id
          }).then((res) => {
            const { code, msg } = res
            const success = code === 0
            if (success) {
              this.params = {
                id: '',
                platform: '',
                name: '',
                status: 1
              },
              this.$emit('reloadWordTypeList')
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
    submitHandler() {
      this.$refs.form.validate((valid) => {
        if (valid) {
          this.buttonLoading = true
          const url = this.type == 'add' ? '/service/customwordsadd' : '/service/customwordsedit'
          const { id: cate_id, name: cate_name, status } = this.params
          wordTypeHandlerCustom(url, {
            cate_name, status, cate_id
          }).then((res) => {
            const { code, msg } = res
            const success = code === 0
            if (success) {
              this.$emit('reloadWordTypeList')
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
    }
  }
}
</script>

<style lang="scss" scoped>
</style>
