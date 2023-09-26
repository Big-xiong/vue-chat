<template>
  <el-dialog title="关键词出现记录" :visible="visible" :close-on-click-modal="true" @close="$emit('update:visible',false)">
    <el-table v-loading="loading" :data="recordList" stripe :element-loading-text="$t('table.loading')" show-summary :summary-method="getSummaries">
      <el-table-column type="index" label="序号" align="center" width="80" />
      <el-table-column prop="from_name" label="客服名称" align="center" />
      <el-table-column prop="daytime" label="日期" align="center" />
      <el-table-column prop="mum" label="次数" align="center" />
      <el-table-column prop="content" label="关键词" align="center" />
    </el-table>
    <div class="ta-r mt24">
      <el-button type="primary" @click="$emit('update:visible',false)">确定</el-button>
    </div>
  </el-dialog>
</template>

<script>
import { getkefuNO } from '@/api/qualityTest.js'
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
      recordList: [],
      loading: false
    }
  },
  watch: {
    visible: {
      immediate: true,
      handler(v) {
        if (v) {
          this.getkefuNO()
        }
      }
    }
  },
  methods: {
    getSummaries() {
      const { recordList } = this
      let total = 0
      if (recordList.length) {
        total = recordList.reduce((pre, cur) => {
          return pre + cur.mum * 1
        }, 0)
      }
      return ['', '', '', `总共： ${total}次`, '']
    },
    getkefuNO() {
      const { server: kefu_code, startTime: add_time, endTime: end } = this
      this.loading = true
      getkefuNO({ kefu_code, add_time, end }).then(res => {
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

<style lang="scss" scoped>
</style>
