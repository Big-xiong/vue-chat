<template>
  <el-dialog :title="title" :visible="visible" :close-on-click-modal="true" width="800px" @close="closeHandler">
    <el-form v-if="visible" ref="form" :model="params" :rules="rules" label-width="auto" hide-required-asterisk>
      <el-form-item :label="$t('dailyWord.form.label.type')" prop="type">
        <el-select v-model="params.type" clearable :placeholder="$t('dailyWord.form.placeholder.type')">
          <el-option
            v-for="type in wordTypeList"
            :key="type.cate_id"
            :label="type.cate_name"
            :value="type.cate_id"
          />
        </el-select>
      </el-form-item>
      <el-form-item :label="$t('dailyWord.form.label.title')" prop="title">
        <el-input v-model="params.title" :placeholder="$t('dailyWord.form.placeholder.title')" />
      </el-form-item>
      <el-form-item :label="$t('dailyWord.form.label.content')" prop="content" class="width-auto">
        <commonWordsInput ref="Words" :content="params.content" />
        <!-- <el-input v-model="params.content" :placeholder="$t('dailyWord.form.placeholder.content')" type="textarea" :rows="6" /> -->
      </el-form-item>
    </el-form>
    <span slot="footer">
      <el-button @click="reset">{{ $t('action.type.reset') }}</el-button>
      <el-button v-if="type == 'add'" type="primary" :loading="buttonLoading" @click="handleAddContinue">{{ $t('action.type.continue') }}</el-button>
      <el-button type="primary" :loading="buttonLoading" @click="submitHandler">{{ $t('action.type.confirm') }}</el-button>
    </span>
  </el-dialog>
</template>

<script>
import { dailyWordHandlerCustom, getWordTypeListCustom } from '@/api/dailyWord.js'
import commonWordsInput from "@/components/commonWordsInput/index.vue";
// import { escape } from "html-escaper";
import { cloneDeep } from "lodash";

export default {
  components:{
    commonWordsInput
  },
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
    wordDetail: {
      type: Object,
      default: () => ({})
    }
  },
  data() {
    return {
      params: {
        id: '',
        type: '',
        title: '',
        content: ''
      },
      rules: {
        type: [{ required: true, trigger: 'blur', message: this.$t('dailyWord.form.tips.type') }],
        title: [{ required: true, trigger: 'blur', message: this.$t('dailyWord.form.tips.title') }],
        content: [{ required: true, trigger: 'blur', message: this.$t('dailyWord.form.tips.content') }]
      },
      wordTypeList: [],
      buttonLoading: false
    }
  },
  watch: {
    wordDetail: {
      deep: true,
      handler(v) {
        this.$set(this, "params", cloneDeep(v));
        this.$nextTick(() => {
          this.$refs.Words.setContent(v.content);
        });
      },
    },
    visible(v) {
      if (v) {
        this.getWordTypeListCustom()
      }
    }
  },
  methods: {
    reset() {
      this.$refs.form.resetFields();
      this.buttonLoading = false;
      this.$refs.Words.setContent("");
    },
    handleAddContinue() {
      const text = this.$refs.Words.getContent();
      this.params.content = text;
      this.$refs.form.validate((valid) => {
        if (valid) {
          this.buttonLoading = true
          const url = this.type == 'add' ? '/service/addWordcustom' : '/api/editWord'
          const { id: word_id, type: cate_id, title: title, content: word } = this.params
          dailyWordHandlerCustom(url, {
            cate_id, title, word, word_id
          }).then((res) => {
            const { code, msg } = res
            const success = code === 0
            if (success) {
              this.params = {
                id: '',
                type: '',
                title: '',
                content: ''
              }
              this.$emit('reloadDailyWordList')
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
      const text = this.$refs.Words.getContent();
      this.params.content = text;
      this.$refs.form.validate((valid) => {
        if (valid) {
          this.buttonLoading = true
          const url = this.type == 'add' ? '/service/addWordcustom' : '/service/editWordcustom'
          const { id: word_id, type: cate_id, title: title, content: word } = this.params
          dailyWordHandlerCustom(url, {
            cate_id, title, word, word_id
          }).then((res) => {
            const { code, msg } = res
            const success = code === 0
            if (success) {
              this.$emit('reloadDailyWordList')
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
    getWordTypeListCustom() {
      const params = {
        page: 1,
        limit: 1000
      }
      getWordTypeListCustom(params).then(res => {
        const { code, data } = res
        if (code === 0) {
          this.wordTypeList = data
        }
      })
    }
  }
}
</script>

<style lang="scss" scoped>
::v-deep .el-dialog {
  .width-auto {
    .el-form-item__content {
      width: 600px;
    }
  }
}
</style>
