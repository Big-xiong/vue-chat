<template>
  <div class="custom-container">
    <!-- 筛选器 -->
    <div class="filter-container">
      <el-select v-model="platform" clearable class="filter-item mr10" :placeholder="$t('qualityScore.table.search[0]')">
        <!-- <el-option :label="$t('qualityScore.table.search[1]')" :value="$t('qualityScore.table[1]')" @click.native="selectAll" /> -->
        <!-- <el-option label="公用" :value="0"></el-option> -->
        <el-option
          v-for="(platform, index) in platformList"
          :key="index"
          :label="platform.domain_title"
          :value="platform.domain_id"
        />
      </el-select>
      <el-input v-model="typeName" clearable class="filter-item mr10" style="width:200px" :placeholder="$t('dailyWordType.placeholder')" />
      <el-button v-waves class="filter-item" type="primary" @click="()=>{page=1;getWordTypeList()}">
        <i class="material-icons-round fs-18 mr6">search</i>{{ $t('action.type.search') }}
      </el-button>
      <el-button v-waves class="filter-item" type="primary" @click="openDialog('add')">
        <i class="material-icons-round fs-18 mr6">add</i>{{ $t('action.type.add') }}
      </el-button>
    </div>

    <!-- 结果表格 -->
    <el-table v-loading="loading" :data="wordTypeList" stripe :element-loading-text="$t('table.loading')">
      <el-table-column prop="cate_id" :label="$t('dailyWordType.table.id')" align="center" />
      <el-table-column prop="domain_id" :label="$t('dailyWordType.table.platform')" align="center">
        <template slot-scope="{row}">
          <span>{{ getPlatformName(row.domain_id) }}</span>
        </template>
      </el-table-column>
      <el-table-column prop="cate_name" :label="$t('dailyWordType.table.name')" align="center" />
      <el-table-column :label="$t('dailyWordType.table.status')" align="center">
        <el-tag slot-scope="{row}" :type="row.status==1 ? '' : 'info'">{{ row.status==1 ? $t('dailyWordType.table.active') : $t('dailyWordType.table.unActive') }}</el-tag>
      </el-table-column>
      <el-table-column :label="$t('action.label')" align="center">
        <template slot-scope="{row}">
          <el-button v-waves size="mini" type="primary" @click="openDialog('edit',row)">
            <i class="material-icons-round fs-14 mr6">drive_file_rename_outline</i>{{ $t('action.type.edit') }}
          </el-button>
          <el-button v-waves size="mini" type="danger" @click="deleteDailyType(row)">
            <i class="material-icons-round fs-14 mr6">delete_outline</i>{{ $t('action.type.delete') }}
          </el-button>
        </template>
      </el-table-column>
    </el-table>
    <pagination :total="total" :page.sync="page" :limit.sync="limit" @pagination="getWordTypeList" />

    <!-- 编辑、新增弹窗 -->
    <form-dialog v-bind="dialog" @visibleChange="dialog.visible = $event" @reloadWordTypeList="getWordTypeList" />
  </div>
</template>

<script>
import { getWordTypeList, deleteDailyType } from '@/api/dailyWord.js'
import { getPlatformList } from '@/api/common.js'
import formDialog from './formDialog.vue'
export default {
  name: 'DailyWordType',
  components: { formDialog },
  data() {
    return {
      page: 1,
      limit: 20,
      total: 0,
      platform: '',
      typeName: '',
      wordTypeList: [],
      platformList: [],
      dialog: {
        type: '',
        title: '',
        visible: false,
        typeDetail: {}
      },
      loading: false
    }
  },
  created() {
    this.getWordTypeList()
    this.getPlatformList()
  },
  methods: {
    // 客服下拉全选
    selectAll() {
      if (this.platform.length < this.platformList.length) {
        this.platform = []
        this.platformList.map((item) => {
          this.platform.push(item.domain_id)
        })
        this.platform.unshift('全选')
      } else {
        this.platform = []
      }
    },
    // 单击某一个客服选项
    changeSelect(val) {
      if (!val.includes('全选') && val.length === this.platformList.length) {
        this.platform.unshift('全选')
      } else if (val.includes('全选') && (val.length - 1) < this.platformList.length) {
        this.platform = this.platform.filter((item) => {
          return item !== '全选'
        })
      }
    },
    removeTag(val) {
      if (val === '全选') {
        this.platform = []
      }
    },
    getPlatformName(id) {
      let domain_title
      this.platformList.forEach(item => {
        if (item.domain_id == id) {
          domain_title = item.domain_title
        }
      })
      if (domain_title) {
        return domain_title
      }
      return '公用'
    },
    getPlatformList() {
      getPlatformList().then(res => {
        const { code, data } = res
        if (code === 0) {
          this.platformList = data
        }
      })
    },
    getWordTypeList() {
      this.loading = true
      const { page, limit, platform: domain_id, typeName: cate_name } = this
      getWordTypeList({ page, limit, domain_id, cate_name }).then(res => {
        const { code, data, count } = res
        if (code === 0) {
          this.total = count
          this.wordTypeList = data
        }
        this.loading = false
      })
    },
    openDialog(dialogType, wordType = {}) {
      const { cate_id: id, domain_id: platform, cate_name: name, status } = wordType
      this.dialog = {
        type: dialogType,
        visible: true,
        title: dialogType == 'edit' ? this.$t('dailyWordType.form.editTitle') : this.$t('dailyWordType.form.addTitle'),
        typeDetail: dialogType == 'edit' ? { id, platform, name, status } : { id: undefined, platform, name: '', status: 1 }
      }
    },
    deleteDailyType(type) {
      const h = this.$createElement;
      this.$confirm(this.$t('dailyWordType.delete.message'), this.$t('dailyWordType.delete.tips'), {
        confirmButtonText: this.$t('dailyWordType.delete.confirm'),
        cancelButtonText: this.$t('dailyWordType.delete.cancel'),
        dangerouslyUseHTMLString: true,
        message: h('p', [
          h('svg-icon', {
            props: {
              iconClass: 'warning'
            }
          }),
          h('span', this.$t('dailyWordType.delete.message'))
        ])
      }).then(() => {
        deleteDailyType({
          cate_id: type.cate_id
        }).then(res => {
          const { code, msg } = res
          const success = code === 0
          if (success) {
            if (this.page > 1 && this.wordTypeList.length === 1) {
              this.page--
            }
            this.getWordTypeList()
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

</style>
