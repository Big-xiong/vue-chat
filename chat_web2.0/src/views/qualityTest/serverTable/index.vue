<template>
  <div class="custom-container">
    <!-- 筛选器 -->
    <div class="filter-container">
      <div class="filter-item mr10">
        <el-date-picker
          v-model="time"
          type="datetimerange"
          value-format="yyyy-M-d HH:mm:ss"
          :range-separator="$t('serverTable.search[1]')"
          :start-placeholder="$t('serverTable.search[0]')"
          :end-placeholder="$t('serverTable.search[0]')"
        />
      </div>
      <el-select v-model="platform" class="filter-item mr10" clearable :placeholder="$t('serverTable.search[2]')">
        <el-option
          v-for="(platform, index) in platformList"
          :key="index"
          :label="platform.domain_title"
          :value="platform.domain_id"
        />
      </el-select>
      <el-select v-model="group" class="filter-item mr10" clearable :placeholder="$t('serverTable.search[3]')">
        <el-option
          v-for="group in groupList"
          :key="group.group_id"
          :label="group.group_name"
          :value="group.group_id"
        />
      </el-select>
      <el-select v-model="server" class="filter-item mr10" clearable :placeholder="$t('serverTable.search[4]')">
        <el-option
          v-for="(server, index) in serverList"
          :key="index"
          :label="server.kefu_name"
          :value="server.kefu_code"
        />
      </el-select>
      <el-button v-waves class="filter-item" type="primary" @click="()=>{page=1;getServerReport()}">
        <i class="material-icons-round fs-18 mr6">search</i>{{ $t('action.type.search') }}
      </el-button>
    </div>

    <!-- 结果表格 -->
    <el-table v-loading="loading" :data="reportList" stripe :element-loading-text="$t('table.loading')">
      <el-table-column type="index" :index="index=>(page-1)*limit+(index+1)" :label="$t('serverTable.table[0]')" align="center" width="80" />
      <el-table-column prop="kefu_name" :label="$t('serverTable.table[1]')" align="center" />
      <el-table-column prop="group" :label="$t('serverTable.table[2]')" align="center" />
      <el-table-column :label="$t('serverTable.table[3]')" align="center">
        <template slot-scope="{row}">{{ row.times[0].time }}</template>
      </el-table-column>
      <el-table-column :label="$t('serverTable.table[4]')" align="center">
        <template slot-scope="{row}">{{ row.times[0].totaltime }}</template>
      </el-table-column>
      <el-table-column prop="customermun" :label="$t('serverTable.table[5]')" align="center" />
      <el-table-column prop="aver_customermun" :label="$t('serverTable.table[6]')" align="center" />
      <el-table-column prop="kfresponse" :label="$t('serverTable.table[7]')" align="center" />
      <el-table-column prop="prise" :label="$t('serverTable.table[8]')" align="center" />
      <el-table-column prop="quality" :label="$t('serverTable.table[9]')" align="center" />
      <el-table-column prop="platformmun" :label="$t('serverTable.table[10]')" align="center" />
      <el-table-column prop="platform" :label="$t('serverTable.table[11]')" align="center" />
    </el-table>

    <!-- 分页器 -->
    <pagination :total="total" :page.sync="page" :limit.sync="limit" @pagination="getServerReport" />
  </div>
</template>

<script>
import { getServerReport } from '@/api/qualityTest.js'
import { getUseInfo } from '@/api/common.js'
export default {
  name: 'ServerTable',
  data() {
    return {
      // 分页
      page: 1,
      limit: 20,
      total: 0,
      // 选项
      platformList: [],
      groupList: [],
      // 参数
      time: '',
      platform: '',
      group: '',
      server: '',
      // 结果
      reportList: [],
      // 其他
      loading: true
    }
  },
  computed: {
    serverList() {
      const { group, groupList } = this
      if (group) {
        const target = groupList.find(({ group_id }) => group_id == group)
        if (target) {
          return target.kefuList
        } else {
          return []
        }
      } else {
        return []
      }
    }
  },
  created() {
    this.getUseInfo()
    this.getServerReport()
  },
  methods: {
    getUseInfo() {
      getUseInfo().then(res => {
        const { code, data } = res
        if (code === 0) {
          this.groupList = data.groupList
          this.platformList = data.platformList
        }
      })
    },
    getServerReport() {
      const { page, limit, time, platform: domain_id, group: groupid, server: kefu_code } = this
      const params = {
        page, limit,
        start_time: time ? time[0] : '',
        end_time: time ? time[1] : '',
        domain_id, groupid, kefu_code
      }
      this.loading = true
      getServerReport(params).then(res => {
        const { code, data, total } = res
        if (code === 0) {
          this.reportList = data
          this.total = total
        }
        this.loading = false
      })
    }
  }
}
</script>

<style lang="scss" scoped>

</style>
