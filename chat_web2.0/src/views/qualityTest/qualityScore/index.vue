<template>
  <div class="custom-container">
    <!-- 开启质检 -->
    <div class="title">
      <span class="mr10">{{ $t('qualityScore.switch') }}</span>
      <el-switch v-model="qualitySwitch" :active-value="1" :inactive-value="0" active-color="#13ce66" @change="qualitySwitchHandler" />
    </div>

    <!-- 筛选器 -->
    <div class="filter-container">
      <el-select v-model="exeParams.platform" clearable multiple collapse-tags class="filter-item mr10" :placeholder="$t('qualityScore.table.search[0]')" @change="changeSelect" @remove-tag="removeTag">
        <el-option :label="$t('qualityScore.table.search[1]')" :value="$t('qualityScore.table[1]')" @click.native="selectAll" />
        <el-option
          v-for="(platform, index) in platformList"
          :key="index"
          :label="platform.domain_title"
          :value="platform.domain_id"
        />
      </el-select>
      <el-select v-model="exeParams.quality" clearable class="filter-item mr10" :placeholder="$t('qualityScore.table.search[2]')">
        <el-option
          v-for="(quality, index) in qualityList"
          :key="index"
          :label="quality.qualityname"
          :value="quality.qualityid"
        />
      </el-select>
      <el-button v-waves class="filter-item" type="primary" @click="setQualityPlatform">
        <i class="material-icons-round fs-18 mr6">search</i>{{ $t('qualityScore.table.search[3]') }}
      </el-button>
    </div>

    <!-- 结果表格 -->
    <el-table v-loading="loading" :data="platformQualityList" stripe :element-loading-text="$t('table.loading')">
      <el-table-column :label="$t('qualityScore.table.options[0]')" type="index" align="center" width="80" />
      <el-table-column prop="qualityname" :label="$t('qualityScore.table.options[1]')" align="center" />
      <el-table-column :label="$t('qualityScore.table.options[2]')" align="center">
        <template slot-scope="{ row }">{{ (row.platform&&row.platform.length)?row.platform.join(' '):'' }}</template>
      </el-table-column>
      <el-table-column prop="kefucount" :label="$t('qualityScore.table.options[3]')" align="center" />
      <el-table-column prop="kefuname" :label="$t('qualityScore.table.options[4]')" align="center" />
      <el-table-column prop="qualityNo" :label="$t('qualityScore.table.options[5]')" align="center" />
      <el-table-column :label="$t('action.label')" align="center" width="190">
        <template slot-scope="{row}">
          <el-button v-waves size="mini" type="danger" @click="deletePlatformQuality(row)">
            <i class="material-icons-round fs-14 mr6">delete_outline</i>{{ $t('action.type.delete') }}
          </el-button>
        </template>
      </el-table-column>
    </el-table>

    <!-- 分页器 -->
    <pagination :total="total" :page.sync="page" :limit.sync="limit" @pagination="getPlatformQuality" />

    <!-- 设置质检指标 -->
    <div>
      <div class="title">{{ $t('qualityScore.setting.title') }}</div>
      <div v-if="qualityList.length" class="index-list">
        <el-popover
          v-for="(quality, index) in qualityList"
          :key="index"
          placement="center"
          :visible-arrow="false"
          popper-class="index-item"
          trigger="hover"
        >
          <div class="action-group">
            <div class="action-item edit" @click="editQualityIndex(quality)">
              <i class="material-icons-round">drive_file_rename_outline</i>
            </div>
            <div class="action-item delete" @click="deleteQualityIndex(quality)">
              <i class="material-icons-round">delete_outline</i>
            </div>
          </div>
          <span slot="reference">{{ quality.qualityname }}</span>
        </el-popover>
      </div>
      <div class="index-setting">
        <div class="setting-item">
          <span class="ml50 mr50">{{ $t('qualityScore.setting.form[0]') }}</span>
          <el-input v-model="indexParams.name" style="width:200px" clearable :placeholder="$t('qualityScore.setting.form[1]')" />
        </div>
        <div class="setting-item">
          <span class="ml50 mr50">{{ $t('qualityScore.setting.form[2]') }}</span>
          <el-select v-model="indexParams.totalScore" filterable allow-create default-first-option :placeholder="$t('qualityScore.setting.form[3]')">
            <el-option label="100分" value="100" />
            <el-option label="10分" value="10" />
          </el-select>
        </div>
        <div class="setting-item">
          <span class="ml50 mr50">{{ $t('qualityScore.setting.form[4]') }}</span>
          <el-select v-model="indexParams.term" :placeholder="$t('qualityScore.setting.form[5]')">
            <el-option :label="$t('qualityScore.setting.label[0]')" :value="4" />
            <el-option :label="$t('qualityScore.setting.label[1]')" :value="0" />
            <el-option :label="$t('qualityScore.setting.label[2]')" :value="1" />
            <el-option :label="$t('qualityScore.setting.label[3]')" :value="2" />
          </el-select>
        </div>
        <div class="setting-item">
          <el-checkbox v-model="indexParams.loginTime.checked" :true-label="1" :false-label="0" />
          <span class="ml38 mr50">{{ $t('qualityScore.setting.form[6]') }}</span>
          {{ $t('qualityScore.setting.form[7]') }}<el-input v-model="indexParams.loginTime.reduceScore" class="mini-input" type="number" size="mini" />{{ $t('qualityScore.setting.last') }}
          <el-button type="text" class="ml30 mr18" @click="scheduleSetting.visible=true">+{{ $t('qualityScore.setting.button[2]') }}</el-button>
          <el-button type="text" @click="scheduleView.visible=true">{{ $t('qualityScore.setting.button[3]') }}</el-button>
        </div>
        <div class="setting-item">
          <el-checkbox v-model="indexParams.keyword.checked" :true-label="1" :false-label="0" />
          <span class="ml38 mr50">{{ $t('qualityScore.setting.form[8]') }}</span>
          {{ $t('qualityScore.setting.form[9]') }}<el-input v-model="indexParams.keyword.reduceScore" class="mini-input" type="number" size="mini" />{{ $t('qualityScore.setting.last') }}
          <el-button type="text" class="ml30" @click="keywordSetting.visible=true">+{{ $t('qualityScore.setting.form[10]') }}</el-button>
        </div>
        <div class="setting-item">
          <el-checkbox v-model="indexParams.evaluate.checked" :true-label="1" :false-label="0" />
          <span class="ml38 mr50">{{ $t('qualityScore.setting.form[11]') }}</span>
          {{ $t('qualityScore.setting.form[12]') }}<el-input v-model="indexParams.evaluate.percentage" class="mini-input" type="number" size="mini" />%，
          {{ $t('qualityScore.setting.form[13]') }}<el-input v-model="indexParams.evaluate.reduceScore" class="mini-input" type="number" size="mini" />{{ $t('qualityScore.setting.last') }}
        </div>
        <div class="setting-item">
          <el-checkbox v-model="indexParams.repeat.checked" :true-label="1" :false-label="0" />
          <span class="ml38 mr50">{{ $t('qualityScore.setting.form[14]') }}</span>
          {{ $t('qualityScore.setting.form[15]') }}<el-input v-model="indexParams.repeat.reduceScore" class="mini-input" type="number" size="mini" />{{ $t('qualityScore.setting.last') }}
        </div>
        <div class="setting-item">
          <el-checkbox v-model="indexParams.randomCheck.checked" :true-label="1" :false-label="0" />
          <span class="ml38 mr50">{{ $t('qualityScore.setting.form[16]') }}</span>
          <!-- 抽查得分<el-input class="mini-input" type="number" v-model="indexParams.randomCheck.getScore" size="mini"></el-input> -->
          <el-button type="text" @click="addCheck">+{{ $t('qualityScore.setting.form[17]') }}</el-button>
          <!-- <div style="width:100%;">
            <el-input style="margin:10px 0 0 52px;width:50%;" type="textarea" :rows="4" placeholder="填写备注" v-model="indexParams.randomCheck.mark"></el-input>
            <div class="tip" style="margin:5px 0 0 52px;width:80%;">*抽查可以随意打分，可以加分也可以减分，分数为设定分数的额外分数</div>
          </div> -->
          <el-table :data="checkInfo" class="mt18" stripe style="width: 100%" :empty-text="$t('qualityScore.setting.table[6]')" size="mini" max-height="280">
            <el-table-column prop="create_time" :label="$t('qualityScore.setting.table[0]')" align="center" />
            <el-table-column prop="kefu_name" :label="$t('qualityScore.setting.table[1]')" align="center" />
            <el-table-column prop="Spot" :label="$t('qualityScore.setting.table[2]')" align="center" />
            <el-table-column prop="Spotcontent" :label="$t('qualityScore.setting.table[3]')" align="center" />
            <el-table-column :label="$t('qualityScore.setting.table[4]')" align="center">
              <template slot-scope="{row}">
                <el-button type="text" @click="editCheckInfo(row)">{{ $t('qualityScore.setting.table[5]') }}</el-button>
              </template>
            </el-table-column>
          </el-table>
        </div>
        <div class="setting-item">
          <el-checkbox v-model="indexParams.talkInterval.checked" :true-label="1" :false-label="0" />
          <span class="ml38 mr50">{{ $t('qualityScore.setting.form[18]') }}</span>
          {{ $t('qualityScore.setting.form[19]') }}<el-input v-model="indexParams.talkInterval.time" class="mini-input" type="number" size="mini" />{{ $t('qualityScore.setting.form[20]') }}
          {{ $t('qualityScore.setting.form[13]') }}<el-input v-model="indexParams.talkInterval.reduceScore" class="mini-input" type="number" size="mini" />{{ $t('qualityScore.setting.last') }}
        </div>
        <div class="setting-item">
          <el-checkbox v-model="indexParams.talkAnswer.checked" :true-label="1" :false-label="0" />
          <span class="ml38 mr50">{{ $t('qualityScore.setting.form[21]') }}</span>
          {{ $t('qualityScore.setting.form[22]') }}<el-input v-model="indexParams.talkAnswer.time" class="mini-input" type="number" size="mini" />{{ $t('qualityScore.setting.form[20]') }}
          {{ $t('qualityScore.setting.form[13]') }}<el-input v-model="indexParams.talkAnswer.reduceScore" class="mini-input" type="number" size="mini" />{{ $t('qualityScore.setting.last') }}
        </div>
      </div>
      <div class="ta-c index-actions">
        <el-button @click="indexParams=JSON.parse(JSON.stringify(spareIndexParams))">{{ $t('qualityScore.setting.button[0]') }}</el-button>
        <el-button type="primary" @click="saveQualityIndex">{{ $t('qualityScore.setting.button[1]') }}</el-button>
      </div>
    </div>

    <!-- 设置弹窗 -->
    <schedule-setting :visible.sync="scheduleSetting.visible" />
    <schedule-view :visible.sync="scheduleView.visible" />
    <keyword-setting :visible.sync="keywordSetting.visible" />
    <random-check :visible.sync="randomCheck.visible" :check-item="checkItem" :type="checkType" @closeDialog="closeDialog" />
  </div>
</template>

<script>
import randomCheck from './randomCheck'
import scheduleView from './scheduleView'
import keywordSetting from './keywordSetting'
import scheduleSetting from './scheduleSetting'
import { getPlatformList } from '@/api/common.js'
import { qualitySwitchHandler, setQualityPlatform, addQualityIndex, updateQualityIndex, deleteQualityIndex, getQualityList, getPlatformQuality, deletePlatformQuality, getSellerInfo, getCheckInfo } from '@/api/qualityTest.js'
export default {
  name: 'QualityScore',
  components: { scheduleView, scheduleSetting, keywordSetting, randomCheck },
  data() {
    return {
      // 分页
      page: 1,
      limit: 20,
      total: 0,
      // 选项
      platformList: [],
      qualityList: [],
      // 表格数据
      platformQualityList: [],
      // 执行参数
      exeParams: {
        platform: [],
        quality: ''
      },
      // 质检详情参数
      indexParams: {
        id: '',
        name: '',
        totalScore: '',
        term: '',
        loginTime: {
          checked: 0,
          reduceScore: ''
        },
        keyword: {
          checked: 0,
          reduceScore: ''
        },
        evaluate: {
          checked: 0,
          reduceScore: '',
          percentage: ''
        },
        repeat: {
          checked: 0,
          reduceScore: ''
        },
        randomCheck: {
          checked: 0,
          getScore: '',
          mark: ''
        },
        talkInterval: {
          checked: 0,
          time: '',
          reduceScore: ''
        },
        talkAnswer: {
          checked: 0,
          time: '',
          reduceScore: ''
        }
      },
      spareIndexParams: {},
      // 弹窗配置
      keywordSetting: {
        visible: false
      },
      scheduleSetting: {
        visible: false
      },
      scheduleView: {
        visible: false
      },
      randomCheck: {
        visible: false
      },
      // 其他
      qualitySwitch: 1,
      loading: false,
      checkInfo: [],
      checkItem: null,
      checkType: 'add'
    }
  },
  computed: {
    // 有id为保存，无id为新增
    saveQualityHandler() {
      if (this.indexParams.id) {
        // 更新
        return updateQualityIndex
      } else {
        // 新增
        return addQualityIndex
      }
    }
  },
  created() {
    // 备份参数格式
    this.spareIndexParams = JSON.parse(JSON.stringify(this.indexParams))

    // 请求数据
    this.getPlatformQuality()
    this.getQualityList()
    this.getPlatformList()
    this.getQualitySwitch()
    this.getCheckInfoData()
  },
  methods: {
    // 客服下拉全选
    selectAll() {
      if (this.exeParams.platform.length < this.platformList.length) {
        this.exeParams.platform = []
        this.platformList.map((item) => {
          this.exeParams.platform.push(item.domain_id)
        })
        this.exeParams.platform.unshift('全选')
      } else {
        this.exeParams.platform = []
      }
    },
    // 单击某一个客服选项
    changeSelect(val) {
      if (!val.includes('全选') && val.length === this.platformList.length) {
        this.exeParams.platform.unshift('全选')
      } else if (val.includes('全选') && (val.length - 1) < this.platformList.length) {
        this.exeParams.platform = this.exeParams.platform.filter((item) => {
          return item !== '全选'
        })
      }
    },
    removeTag(val) {
      if (val === '全选') {
        this.exeParams.platform = []
      }
    },
    getQualitySwitch() {
      getSellerInfo().then(res => {
        const { code, data } = res
        if (code === 0) {
          this.qualitySwitch = data.isquality
        }
      })
    },
    qualitySwitchHandler(v) {
      qualitySwitchHandler({ isquality: v }).then(res => {
        const { code } = res
        if (code != 0) {
          this.qualitySwitch = v == 0 ? 1 : 0
        }
      })
    },
    setQualityPlatform() {
      const { platform, quality: qualityid } = this.$deepcopy(this.exeParams)
      if (!platform) {
        return this.$notify.error({
          title: '失败',
          message: '请选择平台'
        })
      }
      if (!qualityid) {
        return this.$notify.error({
          title: '失败',
          message: '请选择质检指标'
        })
      }
      const index = platform.indexOf('全选')
      if (index > -1) {
        platform.splice(index, 1)
      }
      setQualityPlatform({ platform, qualityid }).then(res => {
        const { code } = res
        if (code === 0) {
          this.getPlatformQuality()
        }
      })
    },
    saveQualityIndex() {
      const { id: qualityid, name: qualityname, totalScore: qualityNo, term: qualityweek, loginTime: { reduceScore: logintime, checked: islogin }, keyword: { reduceScore: keywork, checked: iskeywork }, evaluate: { reduceScore: priseNO, checked: isprise, percentage: prise }, repeat: { reduceScore: repeat, checked: isrepeat }, randomCheck: { getScore: Spot, checked: isSpot, mark: Spotcontent }, talkInterval: { time: dialogue, reduceScore: dialogueNO, checked: isdialogue }, talkAnswer: { time: answer, reduceScore: answerNO, checked: isanswer }} = this.indexParams
      const params = {
        qualityname, qualityNo, qualityweek, logintime, islogin, keywork, iskeywork, priseNO, isprise, prise, repeat, isrepeat, Spot, isSpot, Spotcontent, dialogue, dialogueNO, isdialogue, answer, answerNO, isanswer
      }

      if (!qualityname) {
        return this.$notify.error({
          title: '失败',
          message: '请输入质检名称'
        })
      }

      this.saveQualityHandler(
        qualityid ? { ...params, qualityid } : params
      ).then(res => {
        const { code } = res
        if (code === 0) {
          this.indexParams = JSON.parse(JSON.stringify(this.spareIndexParams))
          this.getQualityList()
          if (qualityid) {
            this.$message({
              message: '编辑成功',
              type: 'success'
            })
          } else {
            this.$message({
              message: '添加成功',
              type: 'success'
            })
          }
        }
      })
    },
    getQualityList() {
      getQualityList().then(res => {
        const { code, data } = res
        if (code === 0) {
          this.qualityList = data
        }
      })
    },
    getPlatformQuality() {
      this.loading = true
      getPlatformQuality().then(res => {
        const { code, data } = res
        if (code === 0) {
          this.platformQualityList = data.data
          this.total = data.total
        }
        this.loading = false
      })
    },
    editQualityIndex(qualityIndex) {
      this.indexParams = {
        id: qualityIndex.qualityid,
        name: qualityIndex.qualityname,
        totalScore: qualityIndex.qualityNo,
        term: qualityIndex.qualityweek,
        loginTime: {
          checked: qualityIndex.islogin,
          reduceScore: qualityIndex.logintime
        },
        keyword: {
          checked: qualityIndex.iskeywork,
          reduceScore: qualityIndex.keywork
        },
        evaluate: {
          checked: qualityIndex.isprise,
          reduceScore: qualityIndex.priseNO,
          percentage: qualityIndex.prise
        },
        repeat: {
          checked: qualityIndex.isrepeat,
          reduceScore: qualityIndex.repeat
        },
        randomCheck: {
          checked: qualityIndex.isSpot,
          getScore: qualityIndex.Spot,
          mark: qualityIndex.Spotcontent
        },
        talkInterval: {
          checked: qualityIndex.isdialogue,
          time: qualityIndex.dialogue,
          reduceScore: qualityIndex.dialogueNO
        },
        talkAnswer: {
          checked: qualityIndex.isanswer,
          time: qualityIndex.answer,
          reduceScore: qualityIndex.answerNO
        }
      }
    },
    getCheckInfoData() {
      getCheckInfo().then(res => {
        const { code, data } = res
        if (code === 0) {
          this.checkInfo = data
        }
      })
    },
    addCheck() {
      this.checkItem = null
      this.randomCheck.visible = true
      this.checkType = 'add'
    },
    // 编辑抽查信息
    editCheckInfo(row) {
      this.checkItem = row
      this.checkType = 'edit'
      this.randomCheck.visible = true
    },
    closeDialog() {
      this.randomCheck.visible = false
      this.getCheckInfoData()
    },
    deleteQualityIndex(qualityIndex) {
      const { qualityid } = qualityIndex
      deleteQualityIndex({ qualityid }).then(res => {
        const { code } = res
        if (code === 0) {
          this.getQualityList()
        }
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
    deletePlatformQuality(row) {
      this.$confirm('确认删除？', this.$t('platform.delete.tips'), {
        confirmButtonText: this.$t('platform.delete.confirm'),
        cancelButtonText: this.$t('platform.delete.cancel'),
        dangerouslyUseHTMLString: true
      }).then(() => {
        deletePlatformQuality({ qualityid: row.qualityid }).then(res => {
          const { code } = res
          if (code === 0) {
            this.getPlatformQuality()
          }
        })
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.title {
  margin-bottom: 16px;
  font-size: 18px;
  font-weight: bold;
  color: var(--talk-record-title);
}
.index-list {
  padding: 20px;
  >span{
    position: relative;
    background: var(--quality-score-tag-bg);
    border: 1px solid var(--quality-score-tag-border);
    margin-right: 43px;
    padding: 14px 43px;
    border-radius: 24px;
  }
  // background: #F1F1F1;
}
.index-setting {
  .mini-input {
    width: 50px;
    margin: 0 6px;
  }
  ::v-deep .setting-item {
    margin-top: 30px;
    color: var(--talk-record-title);
    .mr50{
      color: var(--talk-record-detail-label);
    }
    input[type='number'] {
      padding: 0 0 0 12px;
    }
    .tip{
      font-size: 12px;
      color: #999;
    }
    .el-button{
      background: #edf2fc;
      border-radius: 100px;
      padding: 6px 10px;
    }
  }
}
.index-actions {
  margin-top: 30px;
  .el-button{
    width: 120px;
    height: 48px;
    border-radius: 24px;
  }
}
.el-popover__reference {
  // display: inline-block;
  // padding: 10px 20px;
  // border-radius: 8px;
  // margin-right: 43px;
  // background: #fff;
  color: var(--quality-score-tag-border);
  cursor: pointer;
  user-select: none;
}
</style>

<style lang="scss">
.index-item {
  padding: 0;
  border: none;
  box-shadow: none;
  background: transparent;
  height: 100%!important;
  width: 99%!important;
  position: absolute;
  border-radius: 24px;
  background: var(--quality-score-tag-bg);
  top: 0;
  left: 0;
  .action-group {
    display: flex;
    width: 100%;
    height: 100%;
    justify-content: center;
    align-items: center;
    .action-item {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 25px;
      height: 20px;
      border-radius: 4px;
      // background: #fff;
      cursor: pointer;
      user-select: none;
    }
    .edit {
      color: var(--quality-score-tag-border);
      margin-right: 16px;
    }
    .delete {
      color: var(--quality-score-tag-border);
    }
    .material-icons-round {
      font-size: 14px;
    }
  }
}
</style>
