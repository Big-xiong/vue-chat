<template>
  <div class="custom-container">
    <!-- 问题类别筛选器 -->
    <div class="filter-container">
      <div class="title">{{ $t('questions.typeTitle') }}</div>
      <el-select v-model="tplatformId" clearable class="filter-item mr10" :placeholder="$t('questions.placeholder')" @change="tplatformChange">
        <el-option
          v-for="platform in platformList"
          :key="platform.domain_id"
          :label="platform.domain_title"
          :value="platform.domain_id"
        />
      </el-select>
      <el-button v-waves class="filter-item" type="primary" @click="openTypeDialog('add')">
        <i class="material-icons-round fs-18 mr6">add</i>{{ $t('action.type.addType') }}
      </el-button>
    </div>
    <!-- 类别结果 -->
    <el-table
      v-loading="tloading"
      :data="tquestionList"
      border
      stripe
      :element-loading-text="$t('table.loading')"
    >
      <el-table-column prop="cate_id" :label="$t('questions.table.id')" align="center" />
      <el-table-column prop="domain_name" :label="$t('questions.table.platform')" align="center" />
      <el-table-column prop="cate_name" :label="$t('questions.table.cate_name')" align="center" />
      <el-table-column :label="$t('action.label')" align="center">
        <template slot-scope="{row}">
          <el-button v-waves size="mini" type="primary" @click="openTypeDialog('edit',row)">
            <i class="material-icons-round fs-14 mr6">drive_file_rename_outline</i>{{ $t('action.type.edit') }}
          </el-button>
          <el-button v-waves size="mini" type="danger" @click="deletCate(row)">
            <i class="material-icons-round fs-14 mr6">delete_outline</i>{{ $t('action.type.delete') }}
          </el-button>
        </template>
      </el-table-column>
    </el-table>
    <pagination :total="ttotal" :page.sync="tpage" :limit.sync="tlimit" @pagination="getTquestionList" />
    <!-- 筛选器 -->
    <div class="filter-container question">
      <div class="title">{{ $t('questions.questionTitle') }}</div>
      <el-select v-model="platformId" clearable class="filter-item mr10" :placeholder="$t('questions.placeholder')" @change="platformChange">
        <el-option
          v-for="platform in platformList"
          :key="platform.domain_id"
          :label="platform.domain_title"
          :value="platform.domain_id"
        />
      </el-select>
      <el-button v-waves class="filter-item" type="primary" @click="openDialog('add')">
        <i class="material-icons-round fs-18 mr6">add</i>{{ $t('action.type.addQuestion') }}
      </el-button>
      <el-button v-waves class="filter-item" type="danger" @click="batchDeleteQuestion">
        <i class="material-icons-round fs-18 mr6">delete_sweep</i>{{ $t('action.type.batchDelete') }}
      </el-button>
    </div>

    <!-- 结果表格 -->
    <el-table
      v-loading="loading"
      :data="questionList"
      border
      stripe
      :element-loading-text="$t('table.loading')"
      @selection-change="questions=>questionIds=questions.map(question=>question.question_id).join(',')"
    >
      <el-table-column type="selection" align="center" width="55" />
      <el-table-column prop="question_id" :label="$t('questions.table.id')" align="center" />
      <el-table-column prop="domain_title" :label="$t('questions.table.platform')" align="center" />
      <el-table-column prop="cate_name" :label="$t('questions.table.cate_name')" align="center" />
      <el-table-column prop="question" :label="$t('questions.table.question')" align="center" />
      <el-table-column :label="$t('questions.table.answer')" align="center">
        <div slot-scope="{ row }" class="answer-content" v-html="row.answer" />
      </el-table-column>
      <el-table-column prop="add_time" :label="$t('questions.table.createTime')" align="center" />
      <el-table-column :label="$t('action.label')" align="center">
        <template slot-scope="{row}">
          <el-button v-waves size="mini" type="primary" @click="openDialog('edit',row)">
            <i class="material-icons-round fs-14 mr6">drive_file_rename_outline</i>{{ $t('action.type.edit') }}
          </el-button>
          <el-button v-waves size="mini" type="danger" @click="deleteQuestion(row)">
            <i class="material-icons-round fs-14 mr6">delete_outline</i>{{ $t('action.type.delete') }}
          </el-button>
        </template>
      </el-table-column>
    </el-table>
    <pagination :total="total" :page.sync="page" :limit.sync="limit" @pagination="getQuestionList" />

    <form-dialog v-bind="dialog" :platform-list="platformList" :tquestion-list="tquestionList" @visibleChange="dialog.visible = $event" @reloadQuestionList="()=>{page=1;getQuestionList()}" />
    <type-dialog v-bind="typeDialog" :platform-list="platformList" @visibleChange="typeDialog.visible = $event" @reloadTypeList="()=>{page=1;getTquestionList()}" />
  </div>
</template>

<script>
import { unescape } from 'html-escaper'
import { getPlatformList } from '@/api/common.js'
import { getCateList, questcatedel, getQuestionList, deleteQuestion, batchDeleteQuestion } from '@/api/questions.js'
import formDialog from './formDialog.vue'
import typeDialog from './typeDialog.vue'
export default {
  name: 'Questions',
  components: { formDialog, typeDialog },
  data() {
    return {
      // 类别的
      tpage: 1,
      tlimit: 20,
      tplatformId: '',
      ttotal: 0,
      tquestionList: [],
      tloading: false,
      // 问题的
      page: 1,
      limit: 20,
      platformId: '',
      questionIds: '',
      total: 0,
      platformList: [],
      questionList: [],
      dialog: {
        type: '',
        title: '',
        visible: false,
        questionDetail: {}
      },
      typeDialog: {
        type: '',
        title: '',
        visible: false,
        questionDetail: {}
      },
      loading: false
    }
  },
  created() {
    this.getPlatformList()
    this.getTquestionList()
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
          data.forEach(item => {
            item.answer = unescape(item.answer)
          })
          this.total = count
          this.questionList = data
        }
        this.loading = false
      })
    },
    deleteQuestion(question) {
      const h = this.$createElement;
      this.$confirm(this.$t('questions.delete.message'), this.$t('questions.delete.tips'), {
        confirmButtonText: this.$t('questions.delete.confirm'),
        cancelButtonText: this.$t('questions.delete.cancel'),
        dangerouslyUseHTMLString: true,
        message: h('p', [
          h('svg-icon', {
            props: {
              iconClass: 'warning'
            }
          }),
          h('span', this.$t('questions.delete.message'))
        ])
      }).then(() => {
        deleteQuestion({
          id: question.question_id,
          domain_id: question.domain_id
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
    deletCate(item) {
      const h = this.$createElement;
      this.$confirm(this.$t('questions.delete.message'), this.$t('questions.delete.tips'), {
        confirmButtonText: this.$t('questions.delete.confirm'),
        cancelButtonText: this.$t('questions.delete.cancel'),
        dangerouslyUseHTMLString: true,
        message: h('p', [
          h('svg-icon', {
            props: {
              iconClass: 'warning'
            }
          }),
          h('span', this.$t('questions.delete.message'))
        ])
      }).then(() => {
        questcatedel({ cate_id: item.cate_id }).then(res => {
          const { code, msg } = res
          const success = code === 0
          if (success) {
            if (this.tpage > 1 && this.tquestionList.length === 1) {
              this.page--
            }
            this.getTquestionList()
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
      if (this.questionIds) {
        const { questionIds } = this
        batchDeleteQuestion({ id: questionIds }).then(res => {
          const { code, msg } = res
          const success = code === 0
          if (success) {
            if (this.page > 1 && this.questionList.length === questionIds.split(',').length) {
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
      } else {
        this.$message.error(this.$t('questions.delTips'))
      }
    },
    platformChange(platformId) {
      this.page = 1
      this.platformId = platformId
      this.getQuestionList()
    },
    tplatformChange(platformId) {
      this.tpage = 1
      this.tplatformId = platformId
      this.getTquestionList()
    },
    getTquestionList() {
      // 获取类别的table
      this.tloading = true
      const { tpage: page, tlimit: limit, tplatformId: domain_id } = this
      getCateList({
        page, limit, domain_id
      }).then(res => {
        const { code, data, count } = res
        if (code === 0) {
          this.ttotal = count
          this.tquestionList = data
        }
        this.tloading = false
      })
    },
    openTypeDialog(type, item = {}) {
      this.typeDialog = {
        type, visible: true,
        title: type == 'edit' ? this.$t('questions.form.editTypeTitle') : this.$t('questions.form.addTypeTitle'),
        questionDetail: type == 'edit' ? { platform: item.domain_id, cate_id: item.cate_id, cate_name: item.cate_name } : { platform: '', cate_name: '' }
      }
    },
    openDialog(type, question = {}) {
      this.dialog = {
        type, visible: true,
        title: type == 'edit' ? this.$t('questions.form.editTitle') : this.$t('questions.form.addTitle'),
        questionDetail: type == 'edit' ? { platform: question.domain_id, cate_id: question.cate_id, question: question.question, answer: question.answer } : { platform: '', cate_id: '', question: '', answer: '' }
      }
    }
  }
}
</script>

<style lang="scss" scoped>
::v-deep .answer-content {
  img {
    max-width: 100px;
    height: auto;
  }
}
.filter-container{
  display: flex;
  &.question{
    margin-top: 20px;
  }
  .title{
    margin-top: 10px;
  }
}
</style>
