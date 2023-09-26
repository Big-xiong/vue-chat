<template>
  <el-dialog title="客服评价记录" :visible="visible" :close-on-click-modal="true" @close="$emit('update:visible',false)">
    <el-table v-loading="loading" :data="recordList" stripe :element-loading-text="$t('table.loading')" show-summary :summary-method="getSummaries">
      <el-table-column type="index" label="序号" align="center" width="80" />
      <el-table-column prop="kefu_name" label="客服名称" align="center" />
      <el-table-column prop="add_time" label="日期" align="center" />
      <el-table-column prop="percent" label="评价" align="center">
        <template slot-scope="scope">
          <span>{{ format(scope.row.percent) }}</span>
        </template>
      </el-table-column>
    </el-table>
    <div class="ta-r mt24">
      <el-button type="primary" @click="$emit('update:visible',false)">确定</el-button>
    </div>
  </el-dialog>
</template>

<script>
import { getEvaluateRecord } from '@/api/qualityTest.js'
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
          this.getEvaluateRecord()
        }
      }
    }
  },
  methods: {
    async getSummaries() {
      const { recordList } = this
      let avg = 0
      if (recordList.length) {
        avg = recordList.reduce((pre, cur) => {
          return pre + parseFloat(cur.percent)
        }, 0) / recordList.length
      }
      const _avg = await this.format(avg)
      return ['', '', '', `平均： ${_avg}%`, '']
    },
    getEvaluateRecord() {
      const { server: kefu_code, startTime: add_time, endTime: end } = this
      this.loading = true
      getEvaluateRecord({ kefu_code, add_time, end }).then(res => {
        const { code, data } = res
        if (code === 0) {
          this.recordList = data
        }
        this.loading = false
      })
    },
    format(percent) {
      let _percent
      if (String(percent).indexOf('.') != -1) {
        _percent = Number(percent).toFixed(1)
      } else {
        _percent = Number(percent)
      }
      return _percent
    }
  }
}
</script>

<style lang="scss" scoped>
</style>
