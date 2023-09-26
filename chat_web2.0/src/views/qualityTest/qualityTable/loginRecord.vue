<template>
  <el-dialog title="登录记录" :visible="visible" :close-on-click-modal="true" @close="$emit('update:visible',false)">
    <el-table v-loading="loading" :data="recordList" stripe :element-loading-text="$t('table.loading')" show-summary :summary-method="getSummaries">
      <el-table-column type="index" :index="index=>(page-1)*limit+index+1" label="序号" align="center" width="80" />
      <el-table-column prop="login_user" label="客服名称" align="center" />
      <el-table-column prop="login_time" label="登录时间" align="center" />
      <el-table-column prop="out_time" label="最后登出" align="center" />
    </el-table>

    <pagination :total="total" :page.sync="page" :limit.sync="limit" @pagination="getLoginRecord" />

    <div class="ta-r">
      <el-button type="primary" @click="$emit('update:visible',false)">确定</el-button>
    </div>
  </el-dialog>
</template>

<script>
import { getLoginRecord } from '@/api/qualityTest.js'
export default {
  props: {
    visible: {
      type: Boolean,
      default: false
    },
    server: String,
    startTime: String,
    endTime: String
  },
  data() {
    return {
      page: 1,
      limit: 10,
      total: 0,
      recordList: [],
      loading: false
    }
  },
  watch: {
    visible: {
      immediate: true,
      handler(v) {
        if (v) {
          this.page = 1
          this.recordList = []
          this.getLoginRecord()
        }
      }
    }
  },
  methods: {
    getSummaries(param) {
      const { data } = param
      const times = `${data.length} 次`
      return ['', '', times, times]
    },
    getLoginRecord() {
      const { page, limit, server: kefu_code, startTime: add_time, endTime: end } = this
      this.loading = true
      getLoginRecord({
        page, limit, kefu_code, add_time, end
      }).then(res => {
        const { code, data } = res
        if (code === 0) {
          this.recordList = data.data
          this.total = data.total
        }
        this.loading = false
      })
    }
  }
}
</script>

<style lang="scss" scoped>
</style>
