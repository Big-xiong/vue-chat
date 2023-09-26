<template>
  <el-dialog title="抽查记录" :visible="visible" :close-on-click-modal="true" @close="$emit('update:visible',false)">
    <el-table v-loading="loading" :data="recordList" stripe :element-loading-text="$t('table.loading')" show-summary :summary-method="getSummaries">
      <el-table-column type="index" label="序号" align="center" width="80" />
      <el-table-column prop="kefu_name" label="客服名称" align="center" />
      <el-table-column prop="create_time" label="抽查日期" align="center" />
      <el-table-column prop="fraction" label="得分" align="center" />
      <el-table-column prop="Spotcontent" label="备注" align="center" />
    </el-table>
    <div class="ta-r mt24">
      <el-button type="primary" @click="$emit('update:visible',false)">确定</el-button>
    </div>
  </el-dialog>
</template>

<script>
import { getCheckRecord } from '@/api/qualityTest.js'
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
          this.getCheckRecord()
        }
      }
    }
  },
  methods: {
    getSummaries() {
      const { recordList } = this
      let avg = 0
      if (recordList.length) {
        avg = recordList.reduce((pre, cur) => {
          return pre + cur.fraction * 1
        }, 0) / recordList.length
      }
      return ['', '', '', `平均： ${avg}`, '']
    },
    getCheckRecord() {
      const { server: kefu_code, startTime: add_time, endTime: end } = this
      this.loading = true
      getCheckRecord({ kefu_code, add_time, end }).then(res => {
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
