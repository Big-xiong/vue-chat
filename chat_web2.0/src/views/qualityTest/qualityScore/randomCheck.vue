<template>
  <el-dialog title="客服抽查" :visible="visible" :close-on-click-modal="true" @close="$emit('update:visible',false)">
    <div>
      <div class="mb10">选择平台</div>
      <el-select v-model="platform" clearable placeholder="选择平台" value-key="domain_id" :disabled="type == 'edit'">
        <el-option
          v-for="(platform, index) in platformList"
          :key="index"
          :label="platform.domain_title"
          :value="platform"
        />
      </el-select>
    </div>
    <div class="mt24">
      <div class="mb10">选择客服</div>
      <el-select v-model="serverCode" clearable placeholder="选择客服" :disabled="type == 'edit'" style="margin-right:10px;">
        <el-option
          v-for="(server, index) in serverList"
          :key="index"
          :label="server.kefu_name"
          :value="server.kefu_code"
        />
      </el-select>
      <el-button v-waves type="primary" @click="submitHandler">
        开始抽查
      </el-button>
    </div>
    <div class="mt24">
      <div class="mb10">打分</div>
      <el-input v-model="Spot" placeholder="输入打分" @keyup.native="proving" />
    </div>
    <div class="mt24">
      <div class="mb10">备注</div>
      <el-input v-model="Spotcontent" type="textarea" :rows="4" />
    </div>
    <div slot="footer" class="btns">
      <el-button v-waves type="info" @click="$emit('update:visible',false)">
        取消
      </el-button>
      <el-button v-waves type="primary" @click="handleSave">
        提交
      </el-button>
    </div>
  </el-dialog>
</template>

<script>
import { getPlatformList } from '@/api/common.js'
import { getServerList } from '@/api/server.js'
import {
  addQualitycheck,
  updateQualitycheck
} from '@/api/qualityTest.js'
export default {
  props: {
    visible: {
      type: Boolean,
      default: false
    },
    type: {
      type: String,
      default: 'add'
    },
    checkItem: {
      type: Object,
      default: () => {
        return {}
      }
    }
  },
  data() {
    return {
      // 选项
      platformList: [],
      serverList: [],
      // 参数
      serverCode: '',
      platform: null,
      Spot: '',
      Spotcontent: '',
      checkid: '',
      sysname: ''
    }
  },
  watch: {
    visible(v) {
      if (v) {
        // 重置
        this.platformList = []
        this.serverList = []
        this.serverCode = ''
        this.sysname = ''
        this.platform = null
        this.Spot = ''
        this.Spotcontent = ''
        this.checkid = ''
        // 获取选项
        this.getPlatformList()
        this.getServerList()
        if (this.checkItem) {
          this.serverCode = this.checkItem.kefu_code,
          this.sysname = this.checkItem.sysname,
          this.Spot = this.checkItem.Spot,
          this.Spotcontent = this.checkItem.Spotcontent
          this.checkid = this.checkItem.checkid
        }
      }
    }
  },
  methods: {
    proving() {
      // 先把非数字的都替换掉，除了数字和.
      this.Spot = this.Spot.replace(/[^\d.]/g, '')
      // 必须保证第一个为数字而不是.
      this.Spot = this.Spot.replace(/^\./g, '')
      // 保证只有出现一个.而没有多个.
      this.Spot = this.Spot.replace(/\.{2,}/g, '')
      // 保证.只出现一次，而不能出现两次以上
      this.Spot = this.Spot.replace('.', '$#$').replace(/\./g, '').replace('$#$', '.')
    },
    getPlatformList() {
      getPlatformList().then(res => {
        const { code, data } = res
        if (code === 0) {
          this.platformList = data
          if (this.type == 'edit' && this.sysname) {
            for (let index = 0; index < this.platformList.length; index++) {
              if (this.platformList[index].domain_title == this.sysname) {
                this.platform = this.platformList[index]
                break
              }
            }
          }
        }
      })
    },
    getServerList() {
      getServerList().then(res => {
        const { code, data } = res
        if (code === 0) {
          this.serverList = data
        }
      })
    },
    // 保存
    handleSave() {
      if (this.Spot === '') {
        return this.$notify.error({
          title: '失败',
          message: '未打分'
        })
      }
      if (this.type == 'add') {
        const { platform, serverCode: kefu_code, Spot, Spotcontent } = this
        addQualitycheck({
          sysname: platform.domain_title, kefu_code, Spot, Spotcontent
        }).then(res => {
          const { code } = res
          if (code === 0) {
            this.$message({
              type: 'success',
              message: '保存成功'
            })
            this.$emit('closeDialog')
          }
        })
      } else if (this.type == 'edit') {
        const { Spot, Spotcontent, checkid } = this
        updateQualitycheck({
          Spot, Spotcontent, checkid
        }).then(res => {
          const { code } = res
          if (code === 0) {
            this.$message({
              type: 'success',
              message: '编辑成功'
            })
            this.$emit('closeDialog')
          }
        })
      }
    },
    submitHandler() {
      const { platform, serverCode } = this
      if (!platform) {
        return this.$notify.error({
          title: '失败',
          message: '请选择平台'
        })
      }
      if (!serverCode) {
        return this.$notify.error({
          title: '失败',
          message: '请选择客服'
        })
      }
      // this.$emit('update:visible',false)
      window.open(
        `${location.origin}/chat/client/seller_${platform.seller_code}/server_${serverCode}/domain_${platform.domain_name}`
      )
    }
  }
}
</script>

<style lang="scss" scoped>
::v-deep.el-input{
  width: 202px;
}
.btns {
  // margin-top: 20px;
  text-align: center;
  .el-button {
    width: 100px;
    &:last-child {
      margin-left: 60px;
    }
  }
}
</style>
