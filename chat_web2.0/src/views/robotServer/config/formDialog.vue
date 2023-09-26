<template>
  <el-dialog :title="title" :visible="visible" width="830px" :close-on-click-modal="false" @close="closeHandler">
    <el-form v-if="visible" ref="form" :model="params" :rules="rules" label-width="auto" hide-required-asterisk>
      <el-form-item :label="$t('robot.config.knowledge.editForm.label.question')" prop="question" class="w-270">
        <el-input v-model="params.question" :disabled="type=='edit'" clearable :placeholder="$t('robot.config.knowledge.editForm.placeholder.question')" />
      </el-form-item>
      <el-form-item :label="$t('robot.config.knowledge.editForm.label.answer')" prop="answer">
        <tinymce ref="tinymce" v-model="params.answer" :height="190" />
      </el-form-item>
      <el-form-item :label="$t('robot.config.knowledge.editForm.label.date')" prop="termvalidity">
        <el-date-picker
          v-model="params.termvalidity"
          value-format="yyyy-MM-dd"
          type="date"
          placeholder="请选择日期"
        />
      </el-form-item>
      <el-form-item :label="$t('robot.config.knowledge.editForm.label.status')" prop="status">
        <el-switch v-model="params.status" :active-value="1" :inactive-value="0" active-color="#13ce66" />
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
import { escape } from 'html-escaper'
import { knowledgeHandler } from '@/api/robot.js'
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
    knowledgeDetail: {
      type: Object,
      default: () => ({})
    }
  },
  data() {
    return {
      params: {
        platformId: '',
        question: '',
        answer: '',
        termvalidity: '',
        status: 1
      },
      rules: {
        question: [{ required: true, trigger: 'blur', message: this.$t('robot.config.knowledge.editForm.tips.question') }],
        answer: [{ required: true, trigger: 'blur', message: this.$t('robot.config.knowledge.editForm.tips.answer') }]
      },
      buttonLoading: false
    }
  },
  watch: {
    knowledgeDetail(v) {
      this.params = JSON.parse(JSON.stringify(v))
    }
  },
  methods: {
    submitHandler() {
      this.$refs.form.validate((valid) => {
        if (valid) {
          this.buttonLoading = true
          const url = this.type == 'add' ? '/api/addKnowledge' : '/api/editKnowledge'
          const { platformId: domain_id, question, answer, termvalidity, status } = this.params
          knowledgeHandler(url, {
            domain_id, question, answer: escape(answer), termvalidity, status
          }).then((res) => {
            const { code, msg } = res
            const success = code === 0
            if (success) {
              this.$emit('reloadKnowledList')
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
    handleAddContinue() {
      this.$refs.form.validate((valid) => {
        if (valid) {
          this.buttonLoading = true
          const url = this.type == 'add' ? '/api/addKnowledge' : '/api/editKnowledge'
          const { platformId: domain_id, question, answer, termvalidity, status } = this.params
          knowledgeHandler(url, {
            domain_id, question, answer: escape(answer), termvalidity, status
          }).then((res) => {
            const { code, msg } = res
            const success = code === 0
            if (success) {
              this.params = {
                platformId: this.params.platformId,
                question: '',
                answer: '',
                termvalidity: '',
                status: 1
              },
              this.$refs.tinymce.setContent('')
              this.$emit('reloadKnowledList')
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
