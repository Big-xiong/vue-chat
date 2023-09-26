<template>
  <el-dialog :title="title" :visible="visible" width="830px" :close-on-click-modal="true" @close="closeHandler">
    <el-form v-if="visible" ref="form" :model="params" :rules="rules" label-width="auto" hide-required-asterisk>
      <el-form-item :label="$t('unknownQuestion.form.label.question')" prop="question" class="w-270">
        <el-input v-model="params.question" clearable :placeholder="$t('unknownQuestion.form.placeholder.question')" />
      </el-form-item>
      <el-form-item :label="$t('unknownQuestion.form.label.answer')" prop="answer">
        <tinymce v-model="params.answer" :height="190" />
      </el-form-item>
      <el-form-item :label="$t('unknownQuestion.form.label.status')" prop="status">
        <el-switch v-model="params.status" :active-value="1" :inactive-value="0" active-color="#13ce66" />
      </el-form-item>
    </el-form>
    <span slot="footer">
      <el-button @click="()=>{$refs.form.resetFields();buttonLoading=uploading=false}">{{ $t('action.type.reset') }}</el-button>
      <el-button type="primary" :loading="buttonLoading" @click="submitHandler">{{ $t('action.type.confirm') }}</el-button>
    </span>
  </el-dialog>
</template>

<script>
import { escape } from 'html-escaper'
import { questionHander } from '@/api/robot.js'
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
    questionDetail: {
      type: Object,
      default: () => ({})
    }
  },
  data() {
    return {
      params: {
        answer: '',
        question: '',
        domainId: '',
        questionId: '',
        status: 1
      },
      rules: {
        answer: [{ required: true, trigger: 'blur', message: this.$t('unknownQuestion.form.tips.answer') }],
        question: [{ required: true, trigger: 'blur', message: this.$t('unknownQuestion.form.tips.question') }]
      },
      buttonLoading: false
    }
  },
  watch: {
    questionDetail(v) {
      this.params = JSON.parse(JSON.stringify(v))
    }
  },
  methods: {
    submitHandler() {
      this.$refs.form.validate((valid) => {
        if (valid) {
          this.buttonLoading = true
          const url = this.type == 'single' ? '/api/addrobot' : '/api/Alladdku'
          const { answer, question, domainId: domain_id, questionId: question_id, status } = this.params
          questionHander(url, {
            question, answer: escape(answer), domain_id, question_id, status
          }).then((res) => {
            const { code, msg } = res
            const success = code === 0
            if (success) {
              this.$emit('reloadUnknownQuestionList')
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
::v-deep .el-dialog {
  .el-dialog__body {
    padding: 20px 20px 0;
    .el-form-item__content {
      width: auto;
    }
    .w-270 {
      .el-form-item__content {
        width: 270px;
      }
    }
  }
}
</style>
