<template>
  <el-dialog :title="title" :visible="visible" :close-on-click-modal="true" @close="closeHandler">
    <el-form v-if="visible" ref="form" :model="params" :rules="rules" label-position="top" hide-required-asterisk>
      <el-form-item :label="$t('authMessage.config.promote.form.label.status')" prop="status">
        <el-switch v-model="params.status" :active-value="1" :inactive-value="0" active-color="#13ce66" />
      </el-form-item>
      <el-form-item prop="content">
        <tinymce v-model="params.content" :height="200" />
      </el-form-item>
    </el-form>
    <span slot="footer">
      <el-button type="primary" :loading="buttonLoading" @click="submitHandler">{{ $t('action.type.save') }}</el-button>
    </span>
  </el-dialog>
</template>

<script>
import { escape } from 'html-escaper'
import { promoteMessageHandler } from '@/api/replay.js'
import tinymce from '@/components/Tinymce'
export default {
  components: { tinymce },
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
    messageDetail: {
      type: Object,
      default: () => ({})
    }
  },
  data() {
    return {
      params: {
        domainId: '',
        messageId: '',
        status: 1,
        content: ''
      },
      rules: {
        content: [{ required: true, message: this.$t('authMessage.config.promote.form.tips.content') }]
      },
      buttonLoading: false
    }
  },
  watch: {
    messageDetail(v) {
      this.params = JSON.parse(JSON.stringify(v))
    }
  },
  methods: {
    submitHandler() {
      this.$refs.form.validate((valid) => {
        if (valid) {
          this.buttonLoading = true
          const url = this.type == 'add' ? '/api/addMessage' : '/api/editMes'
          const { domainId: domain_id, messageId: messagesid, status: mes_state, content: word } = this.params
          promoteMessageHandler(url, {
            domain_id, messagesid, mes_state, word: escape(word)
          }).then((res) => {
            const { code, msg } = res
            const success = code === 0
            if (success) {
              this.$emit('reloadPromoteMessageList')
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
::v-deep.el-form {
  .el-form-item__label {
    line-height: 1;
  }
  .el-form-item__content {
    width: auto;
    line-height: 1;
  }
}
</style>
