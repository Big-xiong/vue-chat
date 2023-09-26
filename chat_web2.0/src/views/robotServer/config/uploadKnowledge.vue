<template>
  <div>
    <div>
      <span class="entry">{{ $t('robot.config.knowledge.entry') }}：<span class="entry-num">{{ entry }}</span></span>
      <el-button type="text" @click="exportKnowledge">{{ $t('robot.config.knowledge.export') }}</el-button>
      <el-button type="text" @click="dialogVisible=true">{{ $t('robot.config.knowledge.import') }}</el-button>
    </div>

    <el-dialog :title="$t('robot.config.knowledge.uploadForm.title')" :visible.sync="dialogVisible" top="28vh" width="380px" :close-on-click-modal="true">
      <el-upload
        :limit="1"
        :on-success="uploadSuccess"
        :before-upload="checkFileType"
        :on-remove="()=>{importData=null}"
        :action="`${baseUrl}/api/api/uploadKnowledge`"
      >
        <el-button size="small" type="primary" :disabled="!!importData">{{ $t('robot.config.knowledge.uploadForm.text[0]') }}<i class="el-icon-upload2 ml4" /></el-button>
        <div slot="tip" class="mt20">{{ $t('robot.config.knowledge.uploadForm.text[1]') }}</div>
      </el-upload>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">{{ $t('action.type.cancel') }}</el-button>
        <el-button type="primary" @click="submitKnowledge">{{ $t('action.type.confirm') }}</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { submitKnowledge, exportKnowledge } from '@/api/robot.js'
import { getSysConfig } from '@/api/robot'
import { mapState, mapGetters, mapMutations, mapActions } from 'vuex'
export default {
  props: {
    platformId: {
      type: Number
    },
    total: {
      type: Number
    }
  },
  data() {
    return {
      importData: null,
      dialogVisible: false,
      baseUrl: process.env.VUE_APP_BASE_URL,
      rootNo: undefined
    }
  },
  mounted() {
    this.$nextTick(() => {
      this.getSellerNumber()
    })
  },
  computed: {
    ...mapState({
      seller: state => state.auth.seller
    }),
    entry() {
      return this.rootNo - this.total
    }
  },
  methods: {
    checkFileType({ name }) {
      if (!name.endsWith('.xlsx') && !name.endsWith('.xls')) {
        this.$message.error('选择的文件中包含不支持的格式')
        return false
      }
      return true
    },
    uploadSuccess(res) {
      const { code, data, msg } = res
      const success = code === 0
      if (success) {
        this.importData = data
      }
      this.$notify({
        message: msg,
        title: success ? '成功' : '失败',
        type: success ? 'success' : 'error'
      })
    },
    submitKnowledge() {
      if (!this.importData) {
        return this.$message.error('请选择需要上传的文件')
      }
      const { platformId: domain_id, importData: data } = this
      submitKnowledge({
        data, domain_id
      }).then(res => {
        const { code, msg } = res
        const success = code === 0
        if (success) {
          this.dialogVisible = false
          this.$emit('reloadKnowledgeList')
        }
        this.$notify({
          message: msg,
          title: success ? '成功' : '失败',
          type: success ? 'success' : 'error'
        })
      })
    },
    exportKnowledge() {
      const { platformId: domain_id } = this
      exportKnowledge({ domain_id }).then(res => {
        const { code, file, msg } = res
        if (code === 0) {
          window.open(file)
        } else {
          this.$message.error(msg)
        }
      })
    },
    getSellerNumber() {
      const { seller_code } = this.seller
      const params = {
        sellerCode: seller_code
      }
      getSysConfig(params).then(res => {
        this.rootNo = res.data.rootNo
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.entry{
  margin-right: 15px;
  color: rgb(102, 102, 102);
  .entry-num{
    color: red;
    font-size: 14px;
  }
}
.el-button--text {
  font-size: 14px;
  color: var(--robot-config-tips);
  &:hover {
    color: #666;
  }
}
</style>
