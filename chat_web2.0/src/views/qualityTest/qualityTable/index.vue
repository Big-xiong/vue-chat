<template>
  <div class="custom-container">
    <!-- 筛选器 -->
    <div class="filter-container">
      <el-select v-model="platform" class="filter-item mr10" clearable :placeholder="$t('qualityTable.search[0]')" @change="selectPlatform">
        <el-option
          v-for="(platform, index) in platformList"
          :key="index"
          :label="platform.domain_title"
          :value="platform.domain_id"
        />
      </el-select>
      <el-select v-model="server" class="filter-item mr10" clearable :placeholder="$t('qualityTable.search[1]')" @change="selectServer">
        <el-option
          v-for="(server, index) in serverList"
          :key="index"
          :label="server.kefu_name"
          :value="server.kefu_code"
        />
      </el-select>
      <el-date-picker
        v-model="time"
        class="filter-item mr10"
        type="daterange"
        value-format="yyyy-MM-dd"
        :range-separator="$t('qualityTable.search[3]')"
        :start-placeholder="$t('qualityTable.search[2]')"
        :end-placeholder="$t('qualityTable.search[4]')"
      />
      <el-button v-waves class="filter-item" type="primary" @click="()=>{page=1;getQualityReport()}">
        <i class="material-icons-round fs-18 mr6">search</i>{{ $t('action.type.search') }}
      </el-button>
      <el-button type="text" class="download" @click="exporquality">{{ $t('qualityTable.search[5]') }}</el-button>
    </div>

    <!-- 结果表格 -->
    <el-table v-loading="loading" :data="reportList" stripe :element-loading-text="$t('table.loading')">
      <el-table-column prop="kefu_name" :label="$t('qualityTable.table[0]')" align="center" />
      <el-table-column prop="week" :label="$t('qualityTable.table[1]')" align="center" />
      <el-table-column :label="$t('qualityTable.table[2]')" align="center">
        <el-button slot-scope="{row}" type="text" @click="openRecord('loginRecord',row)">{{ row.logincount }}</el-button>
      </el-table-column>
      <el-table-column :label="$t('qualityTable.table[3]')" align="center">
        <el-button slot-scope="{row}" type="text" @click="openRecord('overtimeRecord',row,'noReply')">{{ row.noreply }}</el-button>
      </el-table-column>
      <el-table-column :label="$t('qualityTable.table[4]')" align="center">
        <el-button slot-scope="{row}" type="text" @click="openRecord('overtimeRecord',row,'overtime')">{{ row.overtime }}</el-button>
      </el-table-column>
      <el-table-column :label="$t('qualityTable.table[5]')" align="center">
        <el-button slot-scope="{row}" type="text" @click="openRecord('checkRecord',row)">{{ row.check }}</el-button>
      </el-table-column>
      <el-table-column :label="$t('qualityTable.table[6]')" align="center">
        <el-button slot-scope="{row}" type="text" @click="openRecord('evaluateRecord',row)">{{ row.evaluate }}</el-button>
      </el-table-column>
      <el-table-column :label="$t('qualityTable.table[7]')" align="center">
        <el-button slot-scope="{row}" type="text" @click="openRecord('keywordRecord',row)">{{ row.keyword }}</el-button>
      </el-table-column>
      <el-table-column prop="total" :label="$t('qualityTable.table[8]')" align="center" />
    </el-table>

    <!-- 分页器 -->
    <pagination :total="total" :page.sync="page" :limit.sync="limit" @pagination="getQualityReport" />

    <!-- 记录 -->
    <component :is="recordComponent.name" :visible.sync="recordComponent.visible" v-bind="recordComponent.prop" />
  </div>
</template>

<script>
import loginRecord from './loginRecord.vue'
import checkRecord from './checkRecord.vue'
import keywordRecord from './keywordRecord.vue'
import overtimeRecord from './overtimeRecord.vue'
import evaluateRecord from './evaluateRecord.vue'
import { getPlatformList } from '@/api/common.js'
import { getPlatformServerList, getQualityReport, exporquality } from '@/api/qualityTest.js'
export default {
  name: 'QualityTable',
  components: { loginRecord, checkRecord, overtimeRecord, evaluateRecord, keywordRecord },
  data() {
    return {
      // 选项
      platformList: [],
      serverList: [],
      // 分页
      page: 1,
      limit: 20,
      total: 0,
      // 参数
      platform: '',
      server: '',
      // 结果
      reportList: [],
      // 记录
      recordComponent: {
        name: '',
        visible: true,
        prop: {}
      },
      // 其他
      loading: true,
      time: ['', '']
    }
  },
  created() {
    this.getQualityReport()
    this.getPlatformList()
    this.getPlatformServerList()
  },
  methods: {
    // 获取平台
    getPlatformList() {
      getPlatformList().then(res => {
        const { code, data } = res
        if (code === 0) {
          this.platformList = data
        }
      })
    },
    // 获取平台对应的客服
    getPlatformServerList() {
      const { platform: domain_id } = this
      getPlatformServerList({ domain_id }).then(res => {
        const { code, data } = res
        if (code === 0) {
          this.serverList = data
        }
      })
    },
    // 选择平台
    selectPlatform() {
      this.page = 1
      this.server = ''
      this.getPlatformServerList()
      this.getQualityReport()
    },
    // 选择客服
    selectServer() {
      this.page = 1
      this.getQualityReport()
    },
    // 获取报表
    getQualityReport() {
      const { page, limit, platform: domain_id, server: kefu_code, time } = this
      this.loading = true
      getQualityReport({
        page, limit, domain_id, kefu_code, time
      }).then(res => {
        const { code, data, total } = res
        if (code === 0) {
          this.reportList = data
          this.total = total
        }
        this.loading = false
      })
    },
    downloadLink(src) {
      const link = document.createElement('a')
      link.style.display = 'none'
      link.href = src
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)
    },
    // 导出报表
    exporquality() {
      const { platform: domain_id, server: kefy_code, time } = this
      exporquality({ domain_id, kefy_code, time }).then(res => {
        if (res.code === 0) {
          this.downloadLink(res.file)
        }
      })
    },
    // 打开记录弹窗
    openRecord(name, data, type) {
      const prop = {
        server: data.kefu_code,
        startTime: data.start_time,
        endTime: data.end_time
      }
      if (name === 'overtimeRecord') {
        prop.type = type
      }
      this.recordComponent = {
        name, prop, visible: true
      }
    }
  }
}
</script>

<style lang="scss">
.filter-container .el-button.download{
  float: right;
  margin-right: 10px;
  background: transparent !important;
}
.el-range-editor--medium.el-input__inner{
  display: inline-flex;
  align-items: center;
}
</style>
