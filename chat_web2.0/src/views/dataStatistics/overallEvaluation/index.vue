<template>
  <div class="custom-container">
    <!-- 筛选器 -->
    <div class="filter-container">
      <el-select v-model="platformId" clearable class="filter-item mr10" :placeholder="$t('overallEvaluate.placeholder[0]')">
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
        :placeholder="$t('overallEvaluate.placeholder[1]')"
      />
      <el-date-picker
        v-model="end"
        class="filter-item mr10"
        style="width:200px"
        type="date"
        value-format="yyyy-MM-dd"
        :placeholder="$t('overallEvaluate.placeholder[2]')"
      />
      <el-button v-waves class="filter-item" type="primary" @click="()=>{page=1;getEvaluateList()}">
        <i class="material-icons-round fs-18 mr6">search</i>{{ $t('action.type.search') }}
      </el-button>
    </div>

    <!-- 结果表格 -->
    <el-table v-loading="loading" :data="evaluateList" stripe :element-loading-text="$t('table.loading')">
      <el-table-column prop="title" :label="$t('overallEvaluate.table.question')" align="center" />
      <el-table-column prop="star_total" :label="$t('overallEvaluate.table.number')" align="center" />
      <el-table-column prop="percent" :label="$t('overallEvaluate.table.percent')" align="center" />
    </el-table>
    <pagination :total="total" :page.sync="page" :limit.sync="limit" @pagination="getEvaluateList" />
  </div>
</template>

<script>
import { getPlatformList } from '@/api/common.js'
import { getOverallEvaluateList } from '@/api/statistics.js'
export default {
  name: 'OverallEvaluation',
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
      getOverallEvaluateList({ page, limit, start, end, domain_id }).then(res => {
        const { code, data, count } = res
        if (code === 0) {
          this.total = count
          const evaluateList = []
          for (const k in data) {
            evaluateList.push(data[k])
          }
          this.evaluateList = evaluateList
        }
        this.loading = false
      })
    }
  }
}
</script>

<style lang="scss" scoped>

</style>
