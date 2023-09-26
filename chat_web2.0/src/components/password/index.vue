<template>
  <el-dialog :title="$t('navbar.modifyPwdForm.title')" :visible="visible" :append-to-body="true" :close-on-click-modal="true" @close="closeHandler">
    <el-form ref="form" :model="params" :rules="rules" label-width="auto" hide-required-asterisk>
      <el-form-item :label="$t('navbar.modifyPwdForm.label.oldPwd')" prop="oldPassword">
        <el-input v-model="params.oldPassword" type="password" :placeholder="$t('navbar.modifyPwdForm.placeholder.oldPwd')" />
      </el-form-item>
      <el-form-item :label="$t('navbar.modifyPwdForm.label.newPwd')" prop="newPassword">
        <el-input v-model="params.newPassword" type="password" :placeholder="$t('navbar.modifyPwdForm.placeholder.newPwd')" />
      </el-form-item>
      <el-form-item :label="$t('navbar.modifyPwdForm.label.repeatPwd')" prop="repeatPassword">
        <el-input v-model="params.repeatPassword" type="password" :placeholder="$t('navbar.modifyPwdForm.placeholder.repeatPwd')" />
      </el-form-item>
    </el-form>

    <span slot="footer">
      <el-button @click="()=>{$refs.form.resetFields();buttonLoading=false}">{{ $t('action.type.reset') }}</el-button>
      <el-button type="primary" :loading="buttonLoading" @click="submitHandler">{{ $t('action.type.confirm') }}</el-button>
    </span>
  </el-dialog>
</template>

<script>
import { editPassword } from '@/api/auth.js'
export default {
  props: {
    visible: {
      type: Boolean,
      default: false
    }
  },
  data() {
    const passwordValid = (rule, value, callback) => {
      const { newPassword, repeatPassword } = this.params
      if (newPassword != repeatPassword) {
        return callback(new Error(this.$t('navbar.modifyPwdForm.tips.notSame')))
      }
      callback()
    }
    return {
      params: {
        oldPassword: '',
        newPassword: '',
        repeatPassword: ''
      },
      rules: {
        oldPassword: [{ required: true, trigger: 'blur', message: this.$t('navbar.modifyPwdForm.tips.oldPwd') }],
        newPassword: [{ required: true, trigger: 'blur', message: this.$t('navbar.modifyPwdForm.tips.newPwd') }],
        repeatPassword: [
          { required: true, trigger: 'blur', message: this.$t('navbar.modifyPwdForm.tips.repeatPwd') },
          { validator: passwordValid, trigger: 'blur' }
        ]
      },
      buttonLoading: false
    }
  },
  methods: {
    submitHandler() {
      this.$refs.form.validate((valid) => {
        if (valid) {
          this.buttonLoading = true
          const { oldPassword: password, newPassword: new_password, repeatPassword: rep_password } = this.params
          editPassword({ password, new_password, rep_password }).then((res) => {
            const { code, msg } = res
            const success = code === 0
            if (success) {
              this.closeHandler()
            }
            this.$notify({
              message: msg,
              title: success ? '成功' : '失败',
              type: success ? 'success' : 'error'
            })
            this.buttonLoading = false
          })
        }
      })
    },
    closeHandler() {
      this.params = {
        oldPassword: '',
        newPassword: '',
        repeatPassword: ''
      }
      this.buttonLoading = false
      this.$refs.form.clearValidate()
      this.$emit('update:visible', false)
    }
  }
}
</script>

<style lang="scss" scoped>
</style>
