<template>
  <el-dialog :title="title" :visible="visible" :close-on-click-modal="true" @close="$emit('update:visible',false)">
    <el-table v-loading="loading" :data="recordList" stripe :element-loading-text="$t('table.loading')" show-summary :summary-method="getSummaries">
      <el-table-column type="index" label="序号" align="center" width="80" />
      <el-table-column prop="kefu_name" label="客服名称" align="center" />
      <el-table-column prop="timeout" label="应答超时时间" align="center" />
      <el-table-column label="次数" align="center">1</el-table-column>
    </el-table>
    <div class="ta-r mt24">
      <el-button type="primary" @click="$emit('update:visible',false)">确定</el-button>
    </div>
  </el-dialog>
</template>

<script>
import { getOvertimeRecord } from '@/api/qualityTest.js'
export default {
  props: {
    visible: {
      type: Boolean,
      default: false
    },
    type: String,
    server: String,
    startTime: String,
    endTime: String
  },
  data() {
    return {
      recordList: [],
      loading: false
    }
  },
  computed: {
    title() {
      const { type } = this
      if (type === 'noReply') {
        return '未回复记录'
      } else if (type === 'overtime') {
        return '应答超时记录'
      }
    }
  },
  watch: {
    visible: {
      immediate: true,
      handler(v) {
        if (v) {
          this.getOvertimeRecord()
        }
      }
    }
  },
  methods: {
    getSummaries(param) {
      const { data } = param
      const times = `总次数 ${data.length} 次`
      return ['', '', '', times]
    },
    getOvertimeRecord() {
      const { type, server: kefu_code, startTime: add_time, endTime: end } = this
      this.loading = true
      getOvertimeRecord({
        kefu_code, type: type === 'noReply' ? 1 : 0, add_time, end
      }).then(res => {
        const { code, data } = res
        if (code === 0) {
          this.recordList = data
        }
        this.loading = false
      })
    }
  }
}
</script>

<style lang="less" scoped>
</style>
