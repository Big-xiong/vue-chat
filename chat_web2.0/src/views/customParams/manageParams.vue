<template>
  <div>
    <!-- 筛选器 -->
    <div class="filter-container">
      <el-input v-model="paramsName" clearable class="filter-item mr10" style="width:200px" :placeholder="$t('customParams.placeholder')" />
      <el-button v-waves class="filter-item" type="primary" @click="()=>{page=1;getParamsList()}">
        <i class="material-icons-round fs-18 mr6">search</i>{{ $t('action.type.search') }}
      </el-button>
      <el-button v-waves class="filter-item" type="primary" @click="openDialog('add')">
        <i class="material-icons-round fs-18 mr6">add</i>{{ $t('action.type.add') }}
      </el-button>
    </div>

    <!-- 数据表格 -->
    <el-table v-loading="loading" :data="paramsList" stripe :element-loading-text="$t('table.loading')">
      <el-table-column prop="params_id" :label="$t('customParams.table.id')" align="center" />
      <el-table-column prop="params_name" :label="$t('customParams.table.paramsName')" align="center" />
      <el-table-column prop="params_field" :label="$t('customParams.table.paramsField')" align="center" />
      <el-table-column :label="$t('action.label')" align="center">
        <template slot-scope="{row}">
          <el-button v-waves size="mini" type="primary" @click="openDialog('edit',row)">
            <i class="material-icons-round fs-14 mr6">drive_file_rename_outline</i>{{ $t('action.type.edit') }}
          </el-button>
          <el-button v-waves size="mini" type="danger" @click="deleteParams(row)">
            <i class="material-icons-round fs-14 mr6">delete_outline</i>{{ $t('action.type.delete') }}
          </el-button>
        </template>
      </el-table-column>
    </el-table>
    <pagination :total="total" :page.sync="page" :limit.sync="limit" @pagination="getParamsList" />

    <!-- 编辑、新增弹窗 -->
    <form-dialog v-bind="dialog" @reloadParamsList="reloadParamsList" @visibleChange="dialog.visible = $event" />
  </div>
</template>

<script>
import { getParamsList, deleteParams } from '@/api/params.js'
import formDialog from './formDialog.vue'
export default {
  components: { formDialog },
  data() {
    return {
      page: 1,
      limit: 20,
      paramsName: '',
      paramsList: [],
      total: 0,
      dialog: {
        type: '',
        title: '',
        visible: false,
        paramsDetail: {}
      },
      loading: true
    }
  },
  created() {
    this.getParamsList()
  },
  methods: {
    getParamsList() {
      this.loading = true
      const { page, limit, paramsName } = this
      getParamsList({
        page, limit, params_name: paramsName
      }).then(res => {
        const { code, data, count } = res
        if (code === 0) {
          this.total = count
          this.paramsList = data
        }
        this.loading = false
      })
    },
    openDialog(type, params = {}) {
      const {
        params_id: id,
        params_name: name,
        params_field: field
      } = params

      this.dialog = {
        type, visible: true,
        title: type == 'add' ? this.$t('customParams.form.addTitle') : this.$t('customParams.form.editTitle'),
        paramsDetail: type == 'add' ? { id: undefined, name: '', field: '' } : { id, name, field }
      }
    },
    reloadParamsList() {
      if (this.dialog.type == 'add') {
        this.page = 1
      }
      this.getParamsList()
    },
    deleteParams(params) {
      const h = this.$createElement;
      this.$confirm(this.$t('customParams.delete.message', { paramsName: params.params_name }), this.$t('customParams.delete.tips'), {
        confirmButtonText: this.$t('customParams.delete.confirm'),
        cancelButtonText: this.$t('customParams.delete.cancel'),
        dangerouslyUseHTMLString: true,
        message: h('p', [
          h('svg-icon', {
            props: {
              iconClass: 'warning'
            }
          }),
          h('span', this.$t('customParams.delete.message', { paramsName: params.params_name }))
        ])
      }).then(() => {
        deleteParams({
          params_id: params.params_id
        }).then(res => {
          const { code, msg } = res
          const success = code === 0
          if (success) {
            if (this.page > 1 && this.paramsList.length === 1) {
              this.page--
            }
            this.getParamsList()
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

<style lang="less" scoped>

</style>
