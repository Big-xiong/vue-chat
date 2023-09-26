<template>
  <el-dialog :title="title" :visible="visible" :close-on-click-modal="false" @close="closeHandler">
    <el-form v-if="visible" ref="form" :model="params" :rules="rules" hide-required-asterisk label-width="auto">
      <el-form-item :label="$t('customParams.form.label.name')" prop="name">
        <el-input v-model="params.name" :placeholder="$t('customParams.form.placeholder.name')" />
      </el-form-item>
      <el-form-item :label="$t('customParams.form.label.field')" prop="field">
        <el-input v-model="params.field" :placeholder="$t('customParams.form.placeholder.field')" />
      </el-form-item>
    </el-form>
    <span slot="footer">
      <el-button @click="()=>{$refs.form.resetFields();buttonLoading=false}">{{ $t('action.type.reset') }}</el-button>
      <el-button type="primary" :loading="buttonLoading" @click="submitHandler">{{ $t('action.type.confirm') }}</el-button>
    </span>
  </el-dialog>
</template>

<script>
import { paramsHandler } from '@/api/params.js'
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
    paramsDetail: {
      type: Object,
      default: () => ({})
    }
  },
  data() {
    return {
      params: {
        id: '',
        name: '',
        field: ''
      },
      rules: {
        name: [{ required: true, trigger: 'blur', message: this.$t('customParams.form.tips.name') }],
        field: [{ required: true, trigger: 'blur', message: this.$t('customParams.form.tips.field') }]
      },
      buttonLoading: false
    }
  },
  watch: {
    paramsDetail(v) {
      this.params = JSON.parse(JSON.stringify(v))
    }
  },
  methods: {
    submitHandler() {
      this.$refs.form.validate(valid => {
        if (valid) {
          const {
            id: params_id,
            name: params_name,
            field: params_field
          } = this.params
          this.buttonLoading = true
          const url = this.type == 'add' ? '/api/addParams' : '/api/editParams'
          paramsHandler(url, { params_id, params_name, params_field }).then(res => {
            const { code, msg } = res
            const success = code === 0
            if (success) {
              this.$emit('reloadParamsList')
              this.closeHandler()
            }
            this.$notify({
              message: msg,
              title: success ? this.$t('notify.success') : this.$t('notify.fail'),
              type: success ? 'success' : 'error'
            })
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
