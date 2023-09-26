<template>
	<div class="custom-container">
		<!-- 筛选器 -->
		<div class="filter-container">
			<div class="title">{{ $t('dailyWord.filter.label[0]') }}</div>
			<el-select v-model="platformId" clearable class="filter-item mr10" :placeholder="$t('dailyWord.filter.placeholder[0]')" @change="wordType = ''">
				<el-option v-for="platform in platformList" :key="platform.domain_id" :label="platform.domain_title" :value="platform.domain_id" />
			</el-select>
			<div class="title">{{ $t('dailyWord.filter.label[1]') }}</div>
			<el-select v-model="wordType" clearable class="filter-item mr10" :placeholder="$t('dailyWord.filter.placeholder[0]')">
				<el-option v-for="type in typeList" :key="type.cate_id" :label="type.cate_name" :value="type.cate_id" />
			</el-select>
			<el-input class="filter-item mr10" :placeholder="$t('dailyWord.filter.placeholder[1]')" style="width:200px;" v-model="word"></el-input>

			<el-button v-waves class="filter-item mr10" type="primary" @click="changeHandleSearch">
				<i class="material-icons-round fs-18 mr6">search</i>{{ $t('action.type.search') }}
			</el-button>
			<el-button v-waves class="filter-item" type="primary" @click="openDialog('add')">
				<i class="material-icons-round fs-18 mr6">add</i>{{ $t('action.type.add') }}
			</el-button>
		</div>

		<!-- 结果表格 -->
		<el-table v-loading="loading" :data="dailyWordList" stripe :element-loading-text="$t('table.loading')">
			<el-table-column prop="word_id" :label="$t('dailyWord.table.id')" align="center" />
			<el-table-column prop="title" :label="$t('dailyWord.table.title')" align="center" />
			<el-table-column prop="word" :label="$t('dailyWord.table.word')" align="center">
        <ellipsis slot-scope="{ row }"
          :content="unescape(row.word).replace(/\\/g, '')"
          @showDialog="showDialog"
          :arrowIsdialog="true"
          isHtml
        />
      </el-table-column>
			<el-table-column prop="domain_title" :label="$t('dailyWord.table.domain_title')" align="center" />
			<el-table-column prop="cate_name" :label="$t('dailyWord.table.type')" align="center" />
			<el-table-column prop="create_time" :label="$t('dailyWord.table.createTime')" align="center" />
			<el-table-column prop="update_time" :label="$t('dailyWord.table.updateTime')" align="center" />
			<el-table-column :label="$t('action.label')" align="center">
				<template slot-scope="{row}">
					<el-button v-waves size="mini" type="primary" @click="openDialog('edit',row)">
						<i class="material-icons-round fs-14 mr6">drive_file_rename_outline</i>{{ $t('action.type.edit') }}
					</el-button>
					<el-button v-waves size="mini" type="danger" @click="deleteDailyWord(row)">
						<i class="material-icons-round fs-14 mr6">delete_outline</i>{{ $t('action.type.delete') }}
					</el-button>
				</template>
			</el-table-column>
		</el-table>
		<pagination :total="total" :page.sync="page" :limit.sync="limit" @pagination="getDailyWordList" />
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
		<!-- 编辑、新增弹窗 -->
		<form-dialog v-bind="dialog" @visibleChange="dialog.visible = $event" @reloadDailyWordList="getDailyWordList" />
	</div>
</template>

<script>
import { getDailyWordList, deleteDailyWord, getWordTypeList } from '@/api/dailyWord.js'
import { getPlatformList } from '@/api/common.js'
import formDialog from './formDialog.vue'
import { unescape } from 'html-escaper'
export default {
	name: 'DailyWordList',
	components: { formDialog },
	data () {
		return {
			page: 1,
			limit: 20,
			total: 0,
			platformId: '',
			wordType: '',
			word: '',
			platformList: [],
			wordTypeList: [],
			dailyWordList: [],
			dialog: {
				type: '',
				title: '',
				visible: false,
				wordDetail: {}
			},
			loading: false,
      elContent: '',
      dialogVisible: false
		}
	},
	computed: {
		typeList () {
			if (this.platformId) {
				return this.wordTypeList.filter(res => res.domain_id == this.platformId)
			} else {
				return this.wordTypeList
			}
		}
	},
	created () {
		this.getPlatformList()
		this.getWordTypeList()
		this.getDailyWordList()
	},
	methods: {
    unescape,
    showDialog(content) {
      this.elContent = content
      this.dialogVisible = !this.dialogVisible
    },
		getPlatformList () {
			getPlatformList().then(res => {
				const { code, data } = res
				if (code === 0) {
					this.platformList = data
				}
			})
		},
		getDailyWordList () {
			this.loading = true
			const { page, limit, platformId, wordType, word } = this
			let params = {
				page,
				limit,
				domain_id: platformId,
				cate: wordType,
				content: word
			}
			getDailyWordList(params).then(res => {
				const { code, data, count } = res
				if (code === 0) {
					this.total = count
					this.dailyWordList = data
				}
				this.loading = false
			})
		},
		openDialog (dialogType, word = {}) {
			const { word_id: id, cate_id: type, title, word: content } = word
			this.dialog = {
				type: dialogType,
				visible: true,
				title: dialogType == 'edit' ? this.$t('dailyWord.form.editTitle') : this.$t('dailyWord.form.addTitle'),
				wordDetail: dialogType == 'edit' ? { id, type, title, content } : { id: undefined, type: '', title: '', content: '' }
			}
		},
		deleteDailyWord (word) {
			const h = this.$createElement;
			this.$confirm(this.$t('dailyWord.delete.message'), this.$t('dailyWord.delete.tips'), {
				confirmButtonText: this.$t('dailyWord.delete.confirm'),
				cancelButtonText: this.$t('dailyWord.delete.cancel'),
				dangerouslyUseHTMLString: true,
				message: h('p', [
					h('svg-icon', {
						props: {
							iconClass: 'warning'
						}
					}),
					h('span', this.$t('dailyWord.delete.message'))
				])
			}).then(() => {
				deleteDailyWord({
					word_id: word.word_id
				}).then(res => {
					const { code, msg } = res
					const success = code === 0
					if (success) {
						if (this.page > 1 && this.dailyWordList.length === 1) {
							this.page--
						}
						this.getDailyWordList()
					}
					this.$notify({
						message: msg,
						title: success ? this.$t('notify.success') : this.$t('notify.fail'),
						type: success ? 'success' : 'error'
					})
				})
			})
		},
		getWordTypeList () {
			let params = {
				limit: 50
			}
			getWordTypeList(params).then(res => {
				const { code, data } = res
				if (code === 0) {
					this.wordTypeList = data
				}
			})
		},
		changeHandleSearch () {
			this.page = 1;
			this.getDailyWordList()
		}
	}
}
</script>

<style lang="scss" scoped>
.filter-container {
	display: flex;
	.title {
		margin-top: 10px;
		width: auto;
	}
}
</style>
