<template>
  <el-dialog :title="title" :visible="visible" width="830px" :close-on-click-modal="false" @close="closeHandler">
    <el-form v-if="visible" ref="form" :model="params" :rules="rules" size="medium" label-width="auto" hide-required-asterisk>
      <el-form-item :label="$t('questions.form.label.platform')" prop="platform">
        <el-select v-model="params.platform" clearable :placeholder="$t('questions.form.placeholder.platform')" :disabled="type=='edit'">
          <el-option
            v-for="platform in platformList"
            :key="platform.domain_id"
            :label="platform.domain_title"
            :value="platform.domain_id"
          />
        </el-select>
      </el-form-item>
      <el-form-item :label="$t('questions.form.label.cate_name')" prop="cate_name">
        <el-input v-model="params.cate_name" :placeholder="$t('questions.form.placeholder.cate_name')" />
      </el-form-item>
    </el-form>

    <span slot="footer">
      <el-button @click="()=>{$refs.form.resetFields();buttonLoading=false}">{{ $t('action.type.reset') }}</el-button>
      <el-button type="primary" :loading="buttonLoading" @click="submitHandler">{{ $t('action.type.confirm') }}</el-button>
    </span>
  </el-dialog>
</template>

<script>
import { handleCate } from '@/api/questions.js'

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
    questionDetail: {
      type: Object,
      default: () => ({})
    },
    platformList: {
      type: Array,
      default: () => []
    }
  },
  data() {
    return {
      params: {
        platform: '',
        cate_name: ''
      },
      rules: {
        platform: [{ required: true, trigger: 'blur', message: this.$t('questions.form.tips.platform') }],
        cate_name: [{ required: true, trigger: 'blur', message: this.$t('questions.form.tips.cate_name') }]
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
          const { platform: domain_id, cate_id, cate_name } = this.params
          const url = this.type == 'add' ? '/api/Questcateadd' : '/api/questcatedit'
          handleCate(url, {
            domain_id, cate_id, cate_name
          }).then((res) => {
            const { code, msg } = res
            const success = code === 0
            if (success) {
              this.$emit('reloadTypeList')
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
.width-auto {
  ::v-deep.el-form-item__content {
    width: auto;
  }
}
</style>
