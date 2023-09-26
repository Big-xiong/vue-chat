<template>
  <el-dialog :visible="visible" top="30vh" width="400px" title="推广图上传" @close="closeHandler">
    <!-- <div class="dialog-upload-title">：</div> -->
    <div class="dialog-upload">
      <el-upload
        :action="`${baseUrl}/index/upload/uploadImg`"
        :on-success="uploadSuccess"
        :show-file-list="false"
      >
        <el-button size="small" type="primary">上传</el-button>
      </el-upload>
      <el-input v-model="params.promoteImg" class="img-url" />
    </div>
    <div class="http">
      <div>添加链接：</div>
      <el-input v-model="params.promoteLink" :placeholder="$t('platform.form.placeholder.promoteLink')">
        <template slot="prepend">http://</template>
      </el-input>
    </div>
    <div slot="footer" class="footer">
      <el-button @click="reset">{{ $t('action.type.reset') }}</el-button>
      <el-button type="primary" @click="submitHandler">{{ $t('action.type.confirm') }}</el-button>
    </div>
  </el-dialog>
</template>

<script>
export default {
  props: {
    visible: {
      type: Boolean,
      default: false
    },
    promotes: {
      type: Object,
      default: () => {
        return {}
      }
    }
  },
  data() {
    return {
      baseUrl: process.env.VUE_APP_BASE_URL,
      params: {
        promoteImg: '',
        promoteLink: ''
      }
    }
  },
  watch: {
    promotes(v) {
      this.params = JSON.parse(JSON.stringify(v))
    }
  },
  methods: {
    reset() {
      this.params.promoteImg = ''
      this.params.promoteLink = ''
    },
    uploadSuccess(res) {
      const { code, data } = res
      if (code === 0) {
        this.params.promoteImg = data.src
      }
    },
    submitHandler() {
      if (!this.params.promoteImg) {
        this.$message({
          message: '请上传推广图',
          type: 'warning'
        })
        return
      }
      const params = {
        promoteImg: this.params.promoteImg,
        promoteLink: 'http://' + this.params.promoteLink
      }
      this.$emit('updatePromotes', params)
    },
    closeHandler() {
      this.$emit('visibleChange', false)
    }
  }
}
</script>

<style lang="scss" scoped>
.img-url{
    margin-left: 14px;
}
.dialog-upload-title{
	margin-bottom: 10px;
}
.dialog-upload{
	display: flex;
	align-items: center;
	margin-bottom: 20px;
}
.http{
	display: flex;
	align-items: center;
	margin-bottom: 20px;
	div{
		white-space: nowrap;
	}
}
.footer{
    text-align: center;
}
</style>
