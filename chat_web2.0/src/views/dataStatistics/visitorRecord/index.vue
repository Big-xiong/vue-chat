<template>
	<div class="custom-container">
		<!-- 筛选器 -->
		<div class="filter-container">
			<!-- 平台 -->
			<el-select v-model="platformId" clearable class="filter-item mr10" :placeholder="$t('visitorRecord.placeholder[0]')">
				<el-option v-for="platform in platformList" :key="platform.domain_id" :label="platform.domain_title" :value="platform.domain_id" />
			</el-select>
			<!-- 接待时间 -->
			<el-date-picker v-model="visiterTime" class="filter-item mr10" type="date" value-format="yyyy-MM-dd" :placeholder="$t('visitorRecord.placeholder[1]')" />
			<!-- 选择天数 -->
			<el-select v-model="talkDate" clearable class="filter-item mr10" :placeholder="$t('visitorRecord.placeholder[4]')">
				<el-option label="3" :value="3" />
				<el-option label="7" :value="7" />
				<el-option label="15" :value="15" />
				<el-option label="30" :value="30" />
			</el-select>
			<!-- 访客ip -->
			<el-input v-model="visiterIp" clearable class="filter-item mr10" style="width:200px" :placeholder="$t('visitorRecord.placeholder[2]')" />
			<!-- 选择客服 -->
			<el-select v-model="server" clearable class="filter-item mr10" :placeholder="$t('visitorRecord.placeholder[3]')">
				<el-option v-for="server in serverList" :key="server.kefu_code" :label="server.kefu_name" :value="server.kefu_code" />
			</el-select>
			<el-button v-waves class="filter-item" type="primary" @click="()=>{page=1;getVisitorList()}">
				<i class="material-icons-round fs-18 mr6">search</i>{{ $t('action.type.search') }}
			</el-button>
		</div>

		<!-- 数据表格 -->
		<el-table v-loading="loading" :data="visitorList" stripe :element-loading-text="$t('table.loading')">
			<el-table-column prop="customer_name" :label="$t('visitorRecord.table.visitorName')" align="center" />
			<el-table-column prop="customer_ip" :label="$t('visitorRecord.table.visitorIp')" align="center" />
			<el-table-column prop="location" :label="$t('visitorRecord.table.area')" align="center" />
			<el-table-column prop="start_time" :label="$t('visitorRecord.table.startTime')" align="center" />
			<el-table-column prop="end_time" :label="$t('visitorRecord.table.endTime')" align="center" />
			<el-table-column prop="service_time" :label="$t('visitorRecord.table.serviceTime')" align="center" />
			<el-table-column prop="kefu_code" :label="$t('visitorRecord.table.server')" align="center" />
		</el-table>
		<pagination :total="total" :page.sync="page" :limit.sync="limit" @pagination="getVisitorList" layout="total, sizes, prev, pager, next, jumper,slot">
			<div class="page-slot">
				<div>{{$t('visitorRecord.table.total')}}：{{total}}</div>
				<div>{{$t('visitorRecord.table.customer')}}：{{customerNum}}</div>
			</div>
		</pagination>
	</div>
</template>

<script>
import { getPlatformList } from '@/api/common.js'
import { getVisitorList } from '@/api/statistics.js'
import { getServerList } from '@/api/server.js'
export default {
	name: 'VisitorRecord',
	data () {
		return {
			page: 1,
			limit: 10,
			server: '',
			visiterIp: '',
			visiterTime: undefined,
			platformId: '',
			talkDate: '',
			visitorList: [],
			total: 0,
			customerNum: 0,
			platformList: [],
			serverList: [],
			loading: false
		}
	},
	created () {
		this.getPlatformList()
		this.getVisitorList()
		this.getServerList()
	},
	methods: {
		getPlatformList () {
			getPlatformList().then(res => {
				const { code, data } = res
				if (code === 0) {
					this.platformList = data
				}
			})
		},
		getServerList () {
			getServerList().then(res => {
				const { code, data } = res
				if (code === 0) {
					this.serverList = data
				}
			})
		},
		getVisitorList () {
			this.loading = true
			const { page, limit, visiterIp: customer_ip, server: kefu_code, visiterTime: start_time, platformId: domain_id, talkDate: talk_date } = this
			getVisitorList({ page, limit, kefu_code, start_time, customer_ip, domain_id, talk_date }).then(res => {
				const { code, data, count, customerNum } = res
				if (code === 0) {
					this.total = count
					this.customerNum = customerNum
					this.visitorList = data
				}
				this.loading = false
			})
		}
	}
}
</script>

<style lang="scss" scoped>
.page-slot {
	margin-left: auto;
	display: flex;
	align-items: center;
	font-weight: normal;
	font-size: 14px;
	div:nth-child(1) {
		margin-left: auto;
		margin-right: 20px;
	}
}
</style>
