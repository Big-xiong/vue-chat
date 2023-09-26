<template>
  <div class="custom-container">
    <!-- 筛选器 -->
    <div class="filter-container">
      <el-select v-model="platformId" clearable class="filter-item mr10" :placeholder="$t('blackList.placeholder[0]')">
        <el-option
          v-for="platform in platformList"
          :key="platform.domain_id"
          :label="platform.domain_title"
          :value="platform.domain_id"
        />
      </el-select>
      <el-input v-model="ip" clearable class="filter-item mr10" style="width:200px"
        :placeholder="$t('blackList.placeholder[1]')" />
      <el-input v-model="customerId" clearable class="filter-item mr10" style="width:200px"
        :placeholder="$t('blackList.placeholder[2]')" />      
      <el-date-picker v-model="source_date" class="filter-item mr10" type="daterange" align="right" unlink-panels range-separator="至"
        :start-placeholder="$t('blackList.placeholder[3]')" :end-placeholder="$t('blackList.placeholder[4]')" value-format="yyyy-MM-dd" />
      <el-button v-waves class="filter-item" type="primary" @click="()=>{page=1;getBlackList()}">
        <i class="material-icons-round fs-18 mr6">search</i>{{ $t('action.type.search') }}
      </el-button>
    </div>

    <!-- 结果列表 -->
    <el-table v-loading="loading" :data="blackList" stripe :element-loading-text="$t('table.loading')">
      <el-table-column prop="list_id" :label="$t('blackList.table.id')" align="center" />
      <el-table-column prop="ip" :label="$t('blackList.table.ip')" align="center" />
      <el-table-column prop="customer_name" :label="$t('blackList.table.customerName')" align="center" />
      <el-table-column prop="customer_real_name" :label="$t('blackList.table.realName')" align="center" />
      <el-table-column prop="add_time" :label="$t('blackList.table.addTime')" align="center" />
      <el-table-column :label="$t('action.label')" align="center" width="190">
        <el-button slot-scope="{row}" v-waves size="mini" type="danger" @click="deleteBlackList(row)">
          <i class="material-icons-round fs-14 mr6">restart_alt</i>
          {{ $t('action.type.recovery') }}
        </el-button>
      </el-table-column>
    </el-table>

    <pagination :total="total" :page.sync="page" :limit.sync="limit" @pagination="getBlackList" />
  </div>
</template>

<script>
import { getPlatformList } from '@/api/common.js'
import { getBlackList, deleteBlackList } from '@/api/blackList.js'
export default {
  name: 'BlackList',
  data() {
    return {
      page: 1,
      limit: 20,
      ip: '',
      customerId: '',
      source_date:'',
      platformId: '',
      blackList: [],
      platformList: [],
      total: 0,
      loading: false
    }
  },
  created() {
    this.getBlackList()
    this.getPlatformList()
  },
  computed: {
    talk_date: {
      get(){
        return this.source_date == ''?'':this.source_date[0] + " 00:00:00" + "@" + this.source_date[1] + " 23:59:59"
      }    
    },
  },
  methods: {
    getBlackList() {
      this.loading = true
      const { page, limit, ip, customerId, talk_date, platformId: domian_id } = this
      getBlackList({ page, limit, ip, customerId, talk_date, domian_id }).then(res => {
        const { code, data, count } = res
        if (code === 0) {
          this.total = count
          this.blackList = data
        }
        this.loading = false
      })
    },
    getPlatformList() {
      getPlatformList().then(res => {
        const { code, data } = res
        if (code === 0) {
          this.platformList = data
        }
      })
    },
    deleteBlackList(blackItem) {
      const h = this.$createElement;
      this.$confirm(this.$t('blackList.delete.message'), this.$t('blackList.delete.tips'), {
        confirmButtonText: this.$t('blackList.delete.confirm'),
        cancelButtonText: this.$t('blackList.delete.cancel'),
        dangerouslyUseHTMLString: true,
        message: h('p', [
          h('svg-icon', {
            props: {
              iconClass: 'warning'
            }
          }),
          h('span', this.$t('blackList.delete.message'))
        ])
      }).then(() => {
        deleteBlackList({
          list_id: blackItem.list_id
        }).then(res => {
          const { code, msg } = res
          const success = code === 0
          if (success) {
            if (this.page > 1 && this.blackList.length === 1) {
              this.page--
            }
            this.getBlackList()
          }
          this.$notify({
            message: msg,
            title: success ? this.$t('notify.success') : this.$t('notify.fail'),
            type: success ? 'success' : 'error'
          })
        })
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.icon-recovery {
  font-size: 13px;
}
.el-range-editor--medium.el-input__inner{
  display: inline-flex;
  align-items: center;
}
</style>
