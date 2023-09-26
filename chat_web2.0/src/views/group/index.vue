<template>
  <div class="custom-container">
    <!-- 筛选器 -->
    <div class="filter-container">
      <el-input v-model="groupName" clearable class="filter-item mr10" style="width:200px" :placeholder="$t('group.groupNamePlaceholder')" />
      <el-button v-waves class="filter-item" type="primary" @click="()=>{page=1;getGroupList()}">
        <i class="material-icons-round fs-18 mr6">search</i>{{ $t('action.type.search') }}
      </el-button>
      <el-button v-waves class="filter-item" type="primary" @click="openDialog('add')">
        <i class="material-icons-round fs-18 mr6">add</i>{{ $t('action.type.add') }}
      </el-button>
    </div>

    <!-- 结果表格 -->
    <el-table v-loading="loading" :data="groupList" stripe :element-loading-text="$t('table.loading')">
      <el-table-column prop="group_id" :label="$t('group.table.groupId')" align="center" />
      <el-table-column prop="islayer" :label="$t('group.table.accessType')" align="center" />
      <el-table-column prop="domain_name" :label="$t('group.table.platform')" align="center" />
      <el-table-column prop="group_name" :label="$t('group.table.groupName')" align="center" />
      <el-table-column prop="group_users" :label="$t('group.table.peopleNumber')" align="center" />
      <el-table-column :label="$t('group.table.status')" align="center">
        <el-tag slot-scope="{row}" size="medium" :type="row.group_status==1 ? '' : 'info'">{{ row.group_status==1 ? $t('group.table.active') : $t('group.table.unActive') }}</el-tag>
      </el-table-column>
      <el-table-column prop="create_time" :label="$t('group.table.createDate')" align="center" />
      <el-table-column :label="$t('action.label')" align="center" width="190">
        <template slot-scope="{row}">
          <el-button v-waves size="mini" type="primary" @click="openDialog('edit',row)">
            <i class="material-icons-round fs-14 mr6">drive_file_rename_outline</i>{{ $t('action.type.edit') }}
          </el-button>
          <el-button v-waves size="mini" type="danger" :disabled="row.state===1" @click="deleteGroup(row)">
            <i class="material-icons-round fs-14 mr6">delete_outline</i>{{ $t('action.type.delete') }}
          </el-button>
        </template>
      </el-table-column>
    </el-table>
    <pagination :total="total" :page.sync="page" :limit.sync="limit" @pagination="getGroupList" />

    <!-- 新增、编辑弹窗 -->
    <form-dialog v-bind="dialog" @reloadGroupList="reloadGroupList" @visibleChange="dialog.visible = $event" />
  </div>
</template>

<script>
import { getGroupList, deleteGroup } from '@/api/group.js'
import formDialog from './formDialog.vue'
export default {
  name: 'GroupList',
  components: { formDialog },
  data() {
    return {
      page: 1,
      limit: 50,
      groupName: '',
      total: 0,
      groupList: [],
      dialog: {
        type: '',
        title: '',
        state: undefined,
        visible: false,
        groupDetail: {}
      },
      loading: true
    }
  },
  created() {
    this.getGroupList()
  },
  methods: {
    openDialog(type, group = {}) {
      const {
        state, domain_name,
        group_id: groupId,
        domain_id: platform,
        group_status: status,
        group_name: groupName
      } = group
      this.dialog = {
        type, visible: true, state,
        title: type == 'edit' ? this.$t('group.form.editTitle') : this.$t('group.form.addTitle'),
        groupDetail: type == 'edit' ? { groupName, status, groupId, platform: state === 1 ? domain_name : platform } : { groupName: '', platform: 0, status: 1, groupId: undefined }
      }
    },
    getGroupList() {
      this.loading = true
      const { page, limit, groupName } = this
      getGroupList({
        page, limit, group_name: groupName
      }).then(res => {
        const { code, data, count } = res
        if (code === 0) {
          this.total = count
          this.groupList = data
        }
        this.loading = false
      })
    },
    reloadGroupList() {
      if (this.dialog.type == 'add') {
        this.page = 1
      }
      this.getGroupList()
    },
    deleteGroup(group) {
      const h = this.$createElement;
      this.$confirm(this.$t('group.delete.message', { groupName: group.group_name }), this.$t('group.delete.tips'), {
        confirmButtonText: this.$t('group.delete.confirm'),
        cancelButtonText: this.$t('group.delete.cancel'),
        dangerouslyUseHTMLString: true,
        message: h('p', [
          h('svg-icon', {
            props: {
              iconClass: 'warning'
            }
          }),
          h('span', this.$t('group.delete.message', { groupName: group.group_name }))
        ])
        // icon:
      }).then(() => {
        deleteGroup({
          group_id: group.group_id
        }).then(res => {
          const { code, msg } = res
          const success = code === 0
          if (success) {
            if (this.page > 1 && this.groupList.length === 1) {
              this.page--
            }
            this.getGroupList()
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
