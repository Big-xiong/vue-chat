<template>
	<el-dialog title="客服排班时间表" :visible="visible" :close-on-click-modal="true" @close="$emit('update:visible',false)">
		<!-- 排班表 -->
		<div class="schedule">
			<div class="filter">
				选择排班表
				<el-cascader :key="cascaderKey" ref="scheduleTree" v-model="schedule" class="filter-item ml10" :options="scheduleTree" :props="{children:'kefulist',checkStrictly:true,emitPath:false}" clearable @change="selectSchedule" />
				<el-button v-waves class="filter-item ml10" type="danger" @click="deleteScheduleTable">
					<i class="material-icons-round fs-18 mr6">delete_sweep</i>删除排表
				</el-button>
			</div>
			<el-table :data="scheduleList" stripe>
				<el-table-column prop="kefu_name" label="客服" align="center" width="180" />
				<el-table-column label="工作时间" align="center">
					<template slot-scope="{ row }">
						<div>
							<span class="mr12">{{ row.weeks }}</span>
							<span>{{ row.weekdate }}</span>
						</div>
					</template>
				</el-table-column>
				<el-table-column :label="$t('action.label')" align="center" width="200">
					<template slot-scope="data">
						<el-button v-waves size="mini" type="primary" @click="clickEditScheduleServer(data.row)">
							<i class="material-icons-round fs-14 mr6">drive_file_rename_outline</i>{{ $t('action.type.edit') }}
						</el-button>
						<el-button v-waves size="mini" type="danger" @click="deleteScheduleServer(data)">
							<i class="material-icons-round fs-14 mr6">delete_outline</i>{{ $t('action.type.delete') }}
						</el-button>
					</template>
				</el-table-column>
			</el-table>
			<div class="save">
				<el-button v-waves class="filter-item" type="primary" @click="addScheduleTable">
					+创建排班表
				</el-button>
			</div>
		</div>

		<!-- 排班时间 -->
		<div v-show="!!schedule && isShow" class="server">
			<div class="mb20 mt20">
				排班表名称
				<el-input v-model="scheduleName" clearable class="filter-item mr10" style="width:200px" placeholder="输入排班表名称" />
			</div>
			<div class="filter" v-if="serverTimeParams.id">
				选择客服
				<el-select v-model="serverTimeParams.serverCode" class="filter-item ml10" multiple collapse-tags placeholder="选择客服" :disabled="!!serverTimeParams.id" @change="changeSelect" @remove-tag="removeTag">
					<el-option label="全选" value="全选" @click.native="selectAll" />
					<el-option v-for="(server, index) in serverList" :key="index" :label="server.kefu_name" :value="server.kefu_code" />
				</el-select>
			</div>
			<div class="mb20 mt20">客服工作时间</div>
			<el-checkbox-group v-model="serverTimeParams.week">
				<el-checkbox label="1">周一</el-checkbox>
				<el-checkbox label="2">周二</el-checkbox>
				<el-checkbox label="3">周三</el-checkbox>
				<el-checkbox label="4">周四</el-checkbox>
				<el-checkbox label="5">周五</el-checkbox>
				<el-checkbox label="6">周六</el-checkbox>
				<el-checkbox label="7">周日</el-checkbox>
			</el-checkbox-group>
			<div class="mt20">
				<div v-for="(time, index) in serverTimeParams.time" :key="index">
					<el-time-picker v-model="serverTimeParams.time[index]" class="mr10 mb10" is-range arrow-control value-format="HH:mm" range-separator="至" start-placeholder="请选择时间" end-placeholder="请选择时间" />
				</div>
				<el-button v-waves type="info" @click="serverTimeParams.time.push('')">
					添加时间
				</el-button>
				<el-button v-if="serverTimeParams.time.length>1" v-waves type="info" @click="serverTimeParams.time.pop()">
					删除
				</el-button>
			</div>
		</div>
		<div slot="footer" class="ta-c">
			<el-button v-waves type="info" class="ml10" @click="clickcancelHandler">
				取消
			</el-button>
			<el-button v-waves type="primary" class="ml10" @click="clickAddHandler">
				+添加
			</el-button>
			<el-button v-waves type="primary" class="ml10" @click="submitHandler">
				完成
			</el-button>
		</div>
	</el-dialog>
</template>

<script>
import { getServerList } from '@/api/server.js'
import { getScheduleTable, addScheduleServer, editScheduleServer, deleteScheduleTable, deleteScheduleServer, addScheduleTable } from '@/api/qualityTest.js'
export default {
	props: {
		visible: {
			type: Boolean,
			default: false
		}
	},
	data () {
		return {
			// 排班表
			scheduleTree: [],
			scheduleList: [],
			schedule: '',
			scheduleName: '',
			isShow: false,
			// 排班时间
			serverList: [],
			serverTimeParams: {
				id: '',
				serverCode: [],
				week: [],
				time: ['']
			},

			// element-ui 问题
			cascaderKey: 0,
			lastSet: ''
		}
	},
	watch: {
		visible (v) {
			if (v) {
				// 重置
				this.schedule = ''
				this.scheduleName = ''
				this.scheduleTree = []
				this.scheduleList = []
				// 获取选项排班表和客服选项
				this.getScheduleTable()
				this.getServerList()
			}
		},
		scheduleTree () {
			this.cascaderKey++
		},
		schedule (v) {
			if (!v) {
				this.scheduleList = []
			}
		}
	},
	methods: {
		// 获取排班表
		async getScheduleTable () {
			const { code, data } = await getScheduleTable()
			if (code === 0) {
				this.printScheduleData(data)
				this.scheduleTree = data
			}
		},
		// 格式化排班表数据
		printScheduleData (scheduleTree) {
			scheduleTree.forEach(schedule => {
				if (schedule.watchname) {
					schedule.label = schedule.watchname
					schedule.value = schedule.watchid
				} else {
					schedule.label = schedule.kefu_name
					schedule.value = schedule.kefu_code
					schedule.disabled = true
				}
				if (schedule.kefulist) {
					this.printScheduleData(schedule.kefulist)
				}
			})
		},
		// 选择排班表
		selectSchedule () {
			const [{ data }] = this.$refs.scheduleTree.getCheckedNodes()
			this.scheduleList = data.kefulist
			this.scheduleName = data.watchname
			this.serverTimeParams = {
				id: '',
				serverCode: [],
				week: [],
				time: ['']
			}
			this.$refs.scheduleTree.dropDownVisible = false
			this.isShow = true
			this.lastSet = 'selectSchedule'
		},
		// 删除排班表
		deleteScheduleTable (callback) {
			const [node] = this.$refs.scheduleTree.getCheckedNodes()
			if (node) {
				const { watchid, kefulist } = node.data
				if (kefulist?.length) {
					return this.$notify.error({
						title: '失败',
						message: '请先删除排班表里面的客服'
					})
				}
				deleteScheduleTable({ watchid }).then(res => {
					const { code } = res
					if (code === 0) {
						this.schedule = ''
						this.getScheduleTable()
						// this.scheduleName = ''
						if (typeof callback === 'function') {
							callback()
						}
					}
				})
			}
		},
		// 新增排班表
		addScheduleTable () {
			const scheduleName = '未命名值班表' + this.scheduleTree.length
			addScheduleTable({
				watchname: scheduleName
			}).then(res => {
				const { code, data } = res
				if (code === 0) {
					this.schedule = data * 1
					this.scheduleName = scheduleName
					this.getScheduleTable()
					this.$notify.success({
						title: '成功',
						message: '新增成功'
					})
					this.isShow = true
					this.lastSet = 'addScheduleTable'
				}
			})
		},
		// 删除客服
		deleteScheduleServer (data) {
			const { row: { restid }, $index } = data
			deleteScheduleServer({ restid }).then(res => {
				const { code } = res
				if (code === 0) {
					this.getScheduleTable()
					this.scheduleList.splice($index, 1)
				}
			})
		},
		// 添加客服
		async addScheduleServer (callback) {
			let { serverCode, week, time } = this.$deepcopy(this.serverTimeParams)
			time = time.filter(_ => _)
			const [node] = this.$refs.scheduleTree.getCheckedNodes()
			if (!serverCode.length) {
				return this.$notify.error({
					title: '失败',
					message: '请选择客服'
				})
			}
			if (!week.length || !time.length) {
				return this.$notify.error({
					title: '失败',
					message: '请选择工作时间'
				})
			}
			const watchid = node ? node.data.watchid.toString() : ''
			const index = serverCode.indexOf('全选')
			if (index > -1) {
				serverCode.splice(index, 1)
			}
			const params = {
				kefu_code: serverCode,
				week: week.join(','),
				worktime: JSON.stringify(time.map(([state, end]) => ({ state, end }))),
				sort: '0', watchid,
				watchname: this.scheduleName
			}
			const { code } = await addScheduleServer(params)
			if (code === 0) {
				const oldScheduleTree = this.scheduleTree
				this.$message({
					message: '添加成功',
					type: 'success'
				})
				this.isShow = false
				await this.getScheduleTable()
				if (watchid) { // 新增客服
					const schedule = this.scheduleTree.find(item => item.watchid == watchid)
					if (schedule) {
						this.scheduleList = schedule.kefulist
					}
				} else { // 新增排班表
					const newScheduleTree = this.scheduleTree
					const newSchedule = newScheduleTree.find(newSchedule => {
						const schedule = oldScheduleTree.find(oldSchedule => oldSchedule.watchid == newSchedule.watchid) // 判断该表在之前是否存在
						if (schedule) {
							// 存在
							return false
						} else {
							// 不存在
							return true
						}
					})
					if (newSchedule) {
						this.scheduleList = newSchedule.kefulist
						this.schedule = newSchedule.watchid
						// this.scheduleName = newSchedule.watchname
					}
				}
				// 重置参数
				this.serverTimeParams = {
					id: '',
					serverCode: [],
					week: [],
					time: ['']
				}
				this.lastSet = ''
				// 执行回调
				if (typeof callback === 'function') {
					callback()
				}
			}
		},
		// 编辑客服
		async editScheduleServer (callback) {
			let { serverCode, week, time, id } = this.$deepcopy(this.serverTimeParams)
			time = time.filter(_ => _)
			const [node] = this.$refs.scheduleTree.getCheckedNodes()
			if (!serverCode.length) {
				return this.$notify.error({
					title: '失败',
					message: '请选择客服'
				})
			}
			if (!week.length || !time.length) {
				return this.$notify.error({
					title: '失败',
					message: '请选择工作时间'
				})
			}
			const watchid = node ? node.data.watchid.toString() : ''
			const index = serverCode.indexOf('全选')
			if (index > -1) {
				serverCode.splice(index, 1)
			}
			const params = {
				restid: id,
				week: week.join(','),
				worktime: JSON.stringify(time.map(([state, end]) => ({ state, end }))),
				watchname: this.scheduleName,
				watchid
			}
			const { code } = await editScheduleServer(params)
			if (code === 0) {
				this.$message({
					message: '编辑成功',
					type: 'success'
				})
				this.isShow = false
				await this.getScheduleTable()
				if (watchid) {
					const schedule = this.scheduleTree.find(item => item.watchid == watchid)
					if (schedule) {
						this.scheduleList = schedule.kefulist
					}
				}
				// 重置参数
				this.serverTimeParams = {
					id: '',
					serverCode: [],
					week: [],
					time: ['']
				}
				this.lastSet = ''
				// 执行回调
				if (typeof callback === 'function') {
					callback()
				}
			}
		},
		// 点击取消
		clickcancelHandler () {
			if (this.lastSet = '') {
				this.isShow = false
				// 重置参数
				this.serverTimeParams = {
					id: '',
					serverCode: [],
					week: [],
					time: ['']
				}
			} else if (this.lastSet = 'addScheduleTable') {
				// 新增排班表
				this.deleteScheduleTable(() => {
					this.isShow = false
					// 重置参数
					this.serverTimeParams = {
						id: '',
						serverCode: [],
						week: [],
						time: ['']
					}
				})
			} else if (this.lastSet = 'selectSchedule') {
				// 选择排班表
				this.isShow = false
				// 重置参数
				this.serverTimeParams = {
					id: '',
					serverCode: [],
					week: [],
					time: ['']
				}
			} else if (this.lastSet = 'editScheduleServer') {
				// 编辑客服
				this.isShow = false
				// 重置参数
				this.serverTimeParams = {
					id: '',
					serverCode: [],
					week: [],
					time: ['']
				}
			}
		},
		// 点击添加
		clickAddHandler () {
			this.serverTimeParams.id ? this.editScheduleServer() : this.addScheduleServer()
		},
		// 点击编辑客服
		clickEditScheduleServer (row) {
			let time = ['']
			if (row.worktime) {
				const worktime = JSON.parse(row.worktime)
				time = worktime.map(({ state, end }) => [state, end])
			}
			this.serverTimeParams = {
				id: row.restid, time,
				serverCode: row.kefu_code,
				week: row.week ? row.week.split(',') : []
			}
			this.isShow = true
			this.lastSet = 'editScheduleServer'
		},
		// 获取客服选项
		getServerList () {
			getServerList().then(res => {
				const { code, data } = res
				if (code === 0) {
					this.serverList = [
						...data
					]
				}
			})
		},
		// 客服下拉全选
		selectAll () {
			if (this.serverTimeParams.serverCode.length < this.serverList.length) {
				this.serverTimeParams.serverCode = []
				this.serverList.map((item) => {
					this.serverTimeParams.serverCode.push(item.kefu_code)
				})
				this.serverTimeParams.serverCode.unshift('全选')
			} else {
				this.serverTimeParams.serverCode = []
			}
		},
		// 单击某一个客服选项
		changeSelect (val) {
			if (!val.includes('全选') && val.length === this.serverList.length) {
				this.serverTimeParams.serverCode.unshift('全选')
			} else if (val.includes('全选') && (val.length - 1) < this.serverList.length) {
				this.serverTimeParams.serverCode = this.serverTimeParams.serverCode.filter((item) => {
					return item !== '全选'
				})
			}
		},
		removeTag (val) {
			if (val === '全选') {
				this.serverTimeParams.serverCode = []
			}
		},
		// 提交处理器
		submitHandler () {
			this.serverTimeParams.id ? this.editScheduleServer(() => { this.$emit('update:visible', false) }) : this.addScheduleServer(() => { this.$emit('update:visible', false) })
		}
	}
}
</script>

<style lang="scss" scoped>
.schedule {
	.save {
		margin-top: 15px;
	}
}
.server {
	border-top: 1px solid #ddd;
	margin-top: 20px;
	padding-top: 20px;
}
.filter {
	display: flex;
	align-items: center;
	margin-bottom: 10px;
}
.pagination-container {
	padding-bottom: 12px;
}
::v-deep .el-dialog {
	width: 900px;
	.el-dialog__header {
		z-index: 2;
	}
}
</style>
