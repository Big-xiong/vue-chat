<template>
  <div class="custom-container">
    <!-- 筛选器 -->
    <div class="filter-container">
      <el-select v-model="platformId" clearable class="filter-item mr10" :placeholder="$t('unknownQuestion.placeholder')" @change="()=>{page=1;getQuestionList()}">
        <el-option
          v-for="platform in platformList"
          :key="platform.domain_id"
          :label="platform.domain_title"
          :value="platform.domain_id"
        />
      </el-select>
      <el-button v-waves class="filter-item" type="danger" @click="batchDeleteQuestion">
        <i class="material-icons-round fs-18 mr6">delete_sweep</i>{{ $t('action.type.batchDelete') }}
      </el-button>
      <el-button v-waves class="filter-item" type="primary" @click="openDialog('batch')">
        <i class="material-icons-round fs-18 mr6">receipt_long</i>{{ $t('action.type.batchAnswer') }}
      </el-button>
      <el-button v-waves class="filter-item" type="primary" @click="deleteResolvedQuestion">
        <i class="material-icons-round fs-18 mr6">delete_sweep</i>{{ $t('action.type.deleteAnswerQuestion') }}
      </el-button>
    </div>

    <!-- 结果列表 -->
    <el-table
      v-loading="loading"
      :data="questionList"
      border
      stripe
      :element-loading-text="$t('table.loading')"
      @selection-change="questions=>checkedQuestionList=questions"
    >
      <el-table-column type="selection" align="center" width="55" />
      <el-table-column prop="question" :label="$t('unknownQuestion.table.question')" align="center" />
      <el-table-column prop="customer_name" :label="$t('unknownQuestion.table.questioner')" align="center" />
      <el-table-column prop="create_time" :label="$t('unknownQuestion.table.questionTime')" align="center" />
      <el-table-column :label="$t('unknownQuestion.table.status')" align="center">
        <el-tag slot-scope="{row}" size="medium" :type="row.q_status==1 ? '' : 'info'">{{ row.q_status==1 ? $t('unknownQuestion.table.answered') : $t('unknownQuestion.table.unAnswer') }}</el-tag>
      </el-table-column>
      <el-table-column :label="$t('action.label')" align="center" width="220">
        <template slot-scope="{row}">
          <el-button v-if="row.q_status==0" v-waves size="mini" type="primary" @click="openDialog('single',row)">
            <i class="material-icons-round fs-14 mr6">list_alt</i>{{ $t('action.type.answer') }}
          </el-button>
          <el-button v-waves size="mini" type="danger" @click="deleteQuestion(row)">
            <i class="material-icons-round fs-14 mr6">delete_outline</i>{{ $t('action.type.delete') }}
          </el-button>
        </template>
      </el-table-column>
    </el-table>
    <pagination :total="total" :page.sync="page" :limit.sync="limit" @pagination="getQuestionList" />

    <!-- 编辑、新增弹窗 -->
    <form-dialog v-bind="dialog" @reloadUnknownQuestionList="getQuestionList" @visibleChange="dialog.visible = $event" />
  </div>
</template>

<script>
import { getPlatformList } from '@/api/common.js'
import { getQuestionList, deleteQuestion, batchDeleteQuestion, deleteResolvedQuestion } from '@/api/robot.js'
import formDialog from './formDialog.vue'
export default {
  name: 'UnknownQuestion',
  components: { formDialog },
  data() {
    return {
      page: 1,
      limit: 20,
      platformId: '',
      platformList: [],
      questionList: [],
      checkedQuestionList: [],
      total: 0,
      dialog: {
        type: '',
        title: '',
        visible: false,
        questionDetail: {}
      },
      loading: true
    }
  },
  created() {
    this.getPlatformList()
    this.getQuestionList()
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
    getQuestionList() {
      this.loading = true
      const { page, limit, platformId: domain_id } = this
      getQuestionList({
        page, limit, domain_id
      }).then(res => {
        const { code, data, count } = res
        if (code === 0) {
          this.total = count
          this.questionList = data
        }
        this.loading = false
      })
    },
    deleteQuestion(question) {
      const h = this.$createElement;
      this.$confirm(this.$t('unknownQuestion.delete.message[0]'), this.$t('unknownQuestion.delete.tips'), {
        confirmButtonText: this.$t('unknownQuestion.delete.confirm'),
        cancelButtonText: this.$t('unknownQuestion.delete.cancel'),
        dangerouslyUseHTMLString: true,
        message: h('p', [
          h('svg-icon', {
            props: {
              iconClass: 'warning'
            }
          }),
          h('span', this.$t('unknownQuestion.delete.message[0]'))
        ])
      }).then(() => {
        deleteQuestion({
          id: question.question_id
        }).then(res => {
          const { code, msg } = res
          const success = code === 0
          if (success) {
            if (this.page > 1 && this.questionList.length === 1) {
              this.page--
            }
            this.getQuestionList()
          }
          this.$notify({
            message: msg,
            title: success ? this.$t('notify.success') : this.$t('notify.fail'),
            type: success ? 'success' : 'error'
          })
        })
      })
    },
    batchDeleteQuestion() {
      const ids = this.checkedQuestionList.map(question => question.question_id).join(',')
      if (!ids) {
        return this.$message({
          message: this.$t('unknownQuestion.tips[0]'),
          type: 'error'
        })
      }
      const h = this.$createElement;
      this.$confirm(this.$t('unknownQuestion.delete.message[1]'), this.$t('unknownQuestion.delete.tips'), {
        confirmButtonText: this.$t('unknownQuestion.delete.confirm'),
        cancelButtonText: this.$t('unknownQuestion.delete.cancel'),
        dangerouslyUseHTMLString: true,
        message: h('p', [
          h('svg-icon', {
            props: {
              iconClass: 'warning'
            }
          }),
          h('span', this.$t('unknownQuestion.delete.message[1]'))
        ])
      }).then(() => {
        batchDeleteQuestion({ id: `${ids},` }).then(res => {
          const { code, msg } = res
          const success = code === 0
          if (success) {
            if (this.page > 1 && this.questionList.length === this.checkedQuestionList.length) {
              this.page--
            }
            this.getQuestionList()
          }
          this.$notify({
            message: msg,
            title: success ? this.$t('notify.success') : this.$t('notify.fail'),
            type: success ? 'success' : 'error'
          })
        })
      })
    },
    deleteResolvedQuestion() {
      deleteResolvedQuestion({
        domain_id: this.platformId
      }).then(res => {
        const { code, msg } = res
        const success = code === 0
        if (success) {
          this.page = 1
          this.getQuestionList()
        }
        this.$notify({
          message: msg,
          title: success ? this.$t('notify.success') : this.$t('notify.fail'),
          type: success ? 'success' : 'error'
        })
      })
    },
    openDialog(type, data) {
      let questionDetail
      if (type == 'batch') {
        const questionList = this.checkedQuestionList
        if (!questionList.length) {
          return this.$message({
            message: this.$t('unknownQuestion.tips[1]'),
            type: 'error'
          })
        }
        const { question, domain_id: domainId } = questionList[0]
        const questionId = questionList.map(question => question.question_id).join(',') + ','
        questionDetail = { answer: '', question, domainId, questionId, status: 1 }
      } else {
        const { question, domain_id: domainId, question_id: questionId } = data
        questionDetail = { answer: '', question, domainId, questionId, status: 1 }
      }
      this.dialog = {
        type, visible: true, questionDetail,
        title: type == 'single' ? this.$t('unknownQuestion.form.addTitle') : this.$t('unknownQuestion.form.batchEdit')
      }
    }
  }
}
</script>

<style lang="less" scoped>

</style>
