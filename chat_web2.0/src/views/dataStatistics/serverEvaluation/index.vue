<template>
  <div class="custom-container">
    <!-- 筛选器 -->
    <div class="filter-container">
      <el-select v-model="platformId" clearable class="filter-item mr10" :placeholder="$t('serverEvaluate.placeholder[0]')">
        <el-option
          v-for="platform in platformList"
          :key="platform.domain_id"
          :label="platform.domain_title"
          :value="platform.domain_id"
        />
      </el-select>
      <el-date-picker
        v-model="start"
        class="filter-item mr10"
        style="width:200px"
        type="date"
        value-format="yyyy-MM-dd"
        :placeholder="$t('serverEvaluate.placeholder[1]')"
      />
      <el-date-picker
        v-model="end"
        class="filter-item mr10"
        style="width:200px"
        type="date"
        value-format="yyyy-MM-dd"
        :placeholder="$t('serverEvaluate.placeholder[2]')"
      />
      <el-button v-waves class="filter-item" type="primary" @click="()=>{page=1;getEvaluateList()}">
        <i class="material-icons-round fs-18 mr6">search</i>{{ $t('action.type.search') }}
      </el-button>
    </div>

    <!-- 结果表格 -->
    <el-table v-loading="loading" :data="evaluateList" stripe :element-loading-text="$t('table.loading')">
      <el-table-column prop="kefu_name" :label="$t('serverEvaluate.table.serverName')" align="center" />
      <el-table-column prop="star5" :label="$t('serverEvaluate.table.star5')" align="center" />
      <el-table-column prop="star4" :label="$t('serverEvaluate.table.star4')" align="center" />
      <el-table-column prop="star3" :label="$t('serverEvaluate.table.star3')" align="center" />
      <el-table-column prop="star2" :label="$t('serverEvaluate.table.star2')" align="center" />
      <el-table-column prop="star1" :label="$t('serverEvaluate.table.star1')" align="center" />
      <el-table-column prop="percent" :label="$t('serverEvaluate.table.percent')" align="center" />
    </el-table>
    <pagination :total="total" :page.sync="page" :limit.sync="limit" @pagination="getEvaluateList" />
  </div>
</template>

<script>
import { getPlatformList } from '@/api/common.js'
import { getServerEvaluateList } from '@/api/statistics.js'
export default {
  name: 'ServerEvaluation',
  data() {
    return {
      page: 1,
      limit: 20,
      start: undefined,
      end: undefined,
      platformId: '',
      evaluateList: [],
      platformList: [],
      total: 0,
      loading: false
    }
  },
  created() {
    this.getPlatformList()
    this.getEvaluateList()
  },
  methods: {
    getPlatformList() {
      getPlatformList().then(res => {
        const { code, data } = res
        if (code === 0) {
          this.platformList = data
        }
      })
    },
    getEvaluateList() {
      this.loading = true
      const { page, limit, start, end, platformId: domain_id } = this
      getServerEvaluateList({ page, limit, start, end, domain_id }).then(res => {
        const { code, data, count } = res
        if (code === 0) {
          this.total = count
          this.evaluateList = data
        }
        this.loading = false
      })
    }
  }
}
</script>

<style>

</style>
