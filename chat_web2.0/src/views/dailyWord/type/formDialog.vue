<template>
  <el-dialog :title="title" :visible="visible" :close-on-click-modal="false" width="640px" @close="closeHandler">
    <el-form v-if="visible" ref="form" :model="params" :rules="rules" label-width="auto" hide-required-asterisk>
      <el-form-item :label="$t('dailyWordType.form.label.platform')" prop="name">
        <el-select v-model="params.platform" clearable class="filter-item mr10" :placeholder="$t('dailyWordType.form.placeholder.platform')" @change="changeSelect" @remove-tag="removeTag">
          <el-option label="公用" :value="0" />
          <el-option
            v-for="(platform, index) in platformList"
            :key="index"
            :label="platform.domain_title"
            :value="platform.domain_id"
          />
        </el-select>
      </el-form-item>
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
import { wordTypeHandler } from '@/api/dailyWord.js'
import { getPlatformList } from '@/api/common.js'
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
        platform: '',
        name: '',
        status: ''
      },
      platformList: [],
      rules: {
        platform: [{ required: true, trigger: 'blur', message: this.$t('dailyWordType.form.tips.platform') }],
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
  created() {
    this.getPlatformList()
  },
  methods: {
    getPlatformList() {
      getPlatformList().then(res => {
        const { code, data } = res
        if (code === 0) {
          this.platformList = data
        }
      })
    },
    handleAddContinue() {
      this.$refs.form.validate((valid) => {
        if (valid) {
          this.buttonLoading = true
          const url = '/api/wordsadd'
          const { id: cate_id, platform: domain_id, name: cate_name, status } = this.params
          wordTypeHandler(url, {
            domain_id, cate_name, status, cate_id
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
          const url = this.type == 'add' ? '/api/wordsadd' : '/api/wordsedit'
          const { id: cate_id, platform: domain_id, name: cate_name, status } = this.params
          wordTypeHandler(url, {
            domain_id, cate_name, status, cate_id
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
