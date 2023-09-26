<template>
  <el-dialog title="查看排班表" :visible="visible" :close-on-click-modal="true" @close="$emit('update:visible',false)">
    <div v-for="(schedule, index) in scheduleTable" :key="index" class="mb30">
      <div class="mb12">{{ schedule.watchname }}</div>
      <el-table :data="schedule.kefulist" stripe>
        <el-table-column prop="kefu_name" label="客服" align="center" />
        <el-table-column label="工作时间" align="center">
          <template slot-scope="{ row }">
            <div>
              <span class="mr12">{{ row.weeks }}</span>
              <span>{{ row.weekdate }}</span>
            </div>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <div class="mt30">
      <span class="mr12">开启排序</span>
      <el-switch
        v-model="openSort"
        :active-value="1"
        :inactive-value="0"
        active-color="#13ce66"
      />
    </div>
    <div class="mt30">
      <span class="mr12">开启循环</span>
      <el-switch
        v-model="openLoop"
        :active-value="1"
        :inactive-value="0"
        active-color="#13ce66"
      />
    </div>
    <div class="mt30">
      <span id="scheduleOrder">
        <span v-for="(schedule, index) in scheduleOrder" :key="index" class="schedule-item" :data-id="schedule.watchid">
          <i class="el-icon-right ml10 mr10" />
          <span>{{ schedule.watchname }}</span>
        </span>
      </span>
      <el-dropdown @command="scheduleOrder.push($event)">
        <i class="el-icon-plus ml10" />
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item v-for="(schedule, index) in scheduleTable" :key="index" :command="schedule">{{ schedule.watchname }}</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </div>
    <div slot="footer" class="btns">
      <el-button v-waves type="info" @click="$emit('update:visible',false)">
        取消
      </el-button>
      <el-button v-waves type="primary" @click="submitScheduleOrder">
        提交
      </el-button>
    </div>
  </el-dialog>
</template>

<script>
import Sortable from 'sortablejs'
import { getScheduleTable, submitScheduleOrder } from '@/api/qualityTest.js'
export default {
  props: {
    visible: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      scheduleTable: [],
      scheduleOrder: [],
      openSort: 0,
      openLoop: 0
    }
  },
  watch: {
    visible(v) {
      if (v) {
        this.scheduleTable = []
        this.scheduleOrder = []
        this.getScheduleTable()
      }
    },
    openSort(v) {
      if (v == 1) { // 开启排序
        this.closeSort()
      } else if (v == 0) { // 关闭排序
        this.destroySort()
      }
    }
  },
  methods: {
    // 获取排班表信息
    async getScheduleTable() {
      const { code, data, polling } = await getScheduleTable()
      if (code === 0) {
        this.scheduleTable = data
        this.scheduleOrder = JSON.parse(JSON.stringify(data))
        this.openLoop = polling
      }
    },
    // 提交排班顺序
    async submitScheduleOrder() {
      const { sortable, openLoop } = this
      const watchIds = sortable.toArray()
      const params = {
        watch: watchIds.map((watchid, index) => `${watchid}:${watchIds.length - index}`).join(','),
        polling: openLoop
      }
      const { code, msg } = await submitScheduleOrder(params)
      if (code === 0) {
        this.$emit('update:visible', false)
      } else {
        this.$notify.error({
          title: '失败',
          message: msg
        })
      }
    },
    // 开启排序功能
    closeSort() {
      this.sortable = new Sortable(document.getElementById('scheduleOrder'), {
        animation: 1000
      })
    },
    // 关闭排序功能
    destroySort() {
      this.sortable.destroy()
    }
  }
}
</script>

<style lang="scss" scoped>
.schedule-item {
  &:first-child {
    .el-icon-right {
      display: none;
    }
  }
}
.el-icon-plus {
  padding: 3px 3px 3px 2px;
  border-radius: 2px;
  cursor: pointer;
  background: #999;
  color: #fff;
}
.btns {
  text-align: center;
  .el-button {
    width: 100px;
    &:last-child {
      margin-left: 60px;
    }
  }
}
</style>
