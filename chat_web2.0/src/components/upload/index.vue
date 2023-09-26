<template>
  <el-upload
    :class="['avatar-uploader',imgSrc?'no-border':'']"
    :action="`${baseUrl}/index/upload/uploadImg`"
    :before-upload="()=>{loading = true}"
    :on-success="uploadSuccess"
    :show-file-list="false"
  >
    <div v-if="imgSrc" class="avatar">
      <img :src="imgSrc">
      <div class="delete">
        <i class="el-icon-delete" @click.stop="deleteImage" />
      </div>
    </div>
    <span v-else>
      <i v-if="loading" class="avatar-uploader-icon el-icon-loading" />
      <i v-else class="el-icon-plus avatar-uploader-icon" />
    </span>
  </el-upload>
</template>

<script>
export default {
  props: {
    value: {
      type: String
    }
  },
  data() {
    return {
      imgSrc: '',
      loading: false,
      baseUrl: process.env.VUE_APP_BASE_URL
    }
  },
  watch: {
    value: {
      immediate: true,
      handler(v) {
        this.imgSrc = v ? process.env.VUE_APP_BASE_URL + v : ''
      }
    }
  },
  methods: {
    uploadSuccess(res) {
      const { code, msg, data } = res
      const success = code === 0
      if (success) {
        this.imgSrc = process.env.VUE_APP_BASE_URL + data.src
        this.$emit('input', data.src)
      } else {
        this.$message({
          message: msg,
          type: 'error'
        })
      }
      this.loading = false
    },
    deleteImage() {
      this.imgSrc = ''
      this.$emit('input', '')
    }
  }
}
</script>

<style lang="scss" scoped>
 .avatar-uploader {
   &.no-border ::v-deep.el-upload {
     border:none;
   }
  ::v-deep .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
    &:after {
      border-color: #409EFF;
    }
  }
  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 100px;
    height: 100px;
    line-height: 100px;
    text-align: center;
  }
  .avatar {
    position: relative;
    img {
      width: 100px;
      height: 100px;
      display: block;
    }
    .delete {
      display: none;
      position: absolute;
      z-index: 1;
      top: 0;
      bottom: 0;
      left: 0;
      right: 0;
      text-align: center;
      background: rgba(0,0,0,.4);
      .el-icon-delete {
        margin-top: 40px;
        font-size: 16px;
        color: #fff;
      }
    }
    &:hover {
      .delete {
        display: block;
      }
    }
  }
}
</style>
