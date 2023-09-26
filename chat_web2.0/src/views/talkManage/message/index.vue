<template>
  <el-card shadow="never">
    <!-- 筛选器 -->
    <div slot="header" class="flex-jcsb-aic">
      <div>
        {{ $t('messageList.unreadCount') }}<span style="color:red">{{ unreadTotal }}</span>
      </div>
      <div>
        <el-select v-model="platform" class="mr10" style="width:200px" clearable :placeholder="$t('messageList.placeholder')" @change="platformChange">
          <el-option
            v-for="platform in platformList"
            :key="platform.domain_id"
            :label="platform.domain_title"
            :value="platform.domain_title"
          />
        </el-select>
        <el-button v-waves type="primary" @click="readAllMessage">{{ $t('action.type.markAllRead') }}</el-button>
      </div>
    </div>

    <!-- 结果列表 -->
    <el-table v-loading="loading" :data="messageList" stripe :element-loading-text="$t('table.loading')">
      <el-table-column prop="type" :label="$t('messageList.table.name')" align="center">
        <template slot-scope="{row}">
          <span>{{ getFrom(row) }}</span>
        </template>
      </el-table-column>
      <!-- <el-table-column prop="phone" :label="$t('messageList.table.phone')" align="center">
        <template slot-scope="{row}">
          <span>{{ getPhone(row) }}</span>
        </template>
      </el-table-column> -->
      <el-table-column :label="$t('messageList.table.content')" align="center" width="150">
        <ellipsis slot-scope="{ row }" :content="row.content" @showDialog="showDialog" :arrowIsdialog="true" />
      </el-table-column>
      <el-table-column prop="add_time" :label="$t('messageList.table.leaveTime')" align="center" />
      <el-table-column prop="group_id" :label="$t('messageList.table.status')" align="center">
        <el-tag slot-scope="{row}" size="medium" :type="row.status==1 ? '' : 'info'">{{ row.status==1 ? $t('messageList.table.unRead') : $t('messageList.table.read') }}</el-tag>
      </el-table-column>
      <el-table-column prop="update_time" :label="$t('messageList.table.processTime')" align="center" />
      <el-table-column :label="$t('action.label')" align="center" width="230">
        <template slot-scope="{row}">
          <el-button v-waves size="mini" type="primary" @click="readMessage(row)">
            <i class="material-icons-round fs-14 mr6">outlined_flag</i>{{ $t('action.type.markRead') }}
          </el-button>
          <el-button v-waves size="mini" type="danger" @click="deleteMessage(row)">
            <i class="material-icons-round fs-14 mr6">delete_outline</i>{{ $t('action.type.delete') }}
          </el-button>
        </template>
      </el-table-column>
    </el-table>
    <pagination :total="total" :page.sync="page" :limit.sync="limit" @pagination="getMessageList" />
    <el-dialog
      :center="true"
      :show-close="false"
      :close-on-click-modal="false"
      :visible.sync="dialogVisible"
    >
      <div v-html="elContent" />
      <div slot="title" class="dialog-title">
        <span>内容详情</span>
      </div>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="dialogVisible = false">确定</el-button>
      </div>
    </el-dialog>
  </el-card>
</template>

<script>
import { getMessageList, deleteMessage, readMessage, readAllMessage, getUnreadMessage } from '@/api/message.js'
export default {
  name: 'MessageList',
  data() {
    return {
      page: 1,
      limit: 20,
      platform: '',
      total: 0,
      messageList: [],
      platformList: [],
      loading: true,
      unreadTotal: 0,
      elContent: undefined,
      dialogVisible: false
    }
  },
  created() {
    this.getMessageList()
    this.getUnreadMessage()
  },
  methods: {
    showDialog(content) {
      this.elContent = ''
      content.split('\n').forEach(v => {
        this.elContent += `<p>${v}</p>`
      })
      this.dialogVisible = !this.dialogVisible
    },
    getFrom(row) {
      if (row.type == 1) {
        return this.$t('messageList.table.nameValue')
      } else {
        return row.username
      }
    },
    getPhone(row) {
      if (row.phone) {
        return row.phone
      }
      return this.$t('messageList.table.phoneValue')
    },
    getMessageList() {
      this.loading = true
      const { page, limit, platform: domain } = this
      getMessageList({ page, limit, domain }).then(res => {
        const { code, data, count } = res
        if (code === 0) {
          this.total = count
          this.messageList = data
        }
        this.loading = false
      })
    },
    getUnreadMessage() {
      getUnreadMessage().then(res => {
        const { code, data } = res
        if (code === 0) {
          this.unreadTotal = data.no_read
          this.platformList = data.list
        }
      })
    },
    platformChange(platform) {
      this.page = 1
      this.platform = platform
      this.getMessageList()
    },
    deleteMessage(message) {
      const h = this.$createElement;
      this.$confirm(this.$t('messageList.delete.message'), this.$t('messageList.delete.tips'), {
        confirmButtonText: this.$t('messageList.delete.confirm'),
        cancelButtonText: this.$t('messageList.delete.cancel'),
        dangerouslyUseHTMLString: true,
        message: h('p', [
          h('svg-icon', {
            props: {
              iconClass: 'warning'
            }
          }),
          h('span', this.$t('messageList.delete.message'))
        ])
      }).then(() => {
        deleteMessage({
          id: message.id
        }).then(res => {
          const { code, msg } = res
          const success = code === 0
          if (success) {
            if (this.page > 1 && this.messageList.length === 1) {
              this.page--
            }
            this.getMessageList()
          }
          this.$notify({
            message: msg,
            title: success ? this.$t('notify.success') : this.$t('notify.fail'),
            type: success ? 'success' : 'error'
          })
        })
      })
    },
    readMessage(message) {
      readMessage({
        id: message.id
      }).then(res => {
        const { code, msg } = res
        const success = code === 0
        if (success) {
          this.getMessageList()
        }
        this.$notify({
          message: msg,
          title: success ? this.$t('notify.success') : this.$t('notify.fail'),
          type: success ? 'success' : 'error'
        })
      })
    },
    readAllMessage() {
      readAllMessage().then(res => {
        const { code, msg } = res
        const success = code === 0
        if (success) {
          this.getMessageList()
        }
        this.$notify({
          message: msg,
          title: success ? this.$t('notify.success') : this.$t('notify.fail'),
          type: success ? 'success' : 'error'
        })
      })
    }
  }
}
</script>

<style lang="scss" scoped>

</style>
