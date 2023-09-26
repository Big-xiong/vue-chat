<template>
	<div>
		<div class="filter-container">
			<el-select v-model="platformId" clearable class="filter-item mr10">
				<el-option v-for="platform in platformList" :key="platform.domain_id" :label="platform.domain_title" :value="platform.domain_id" />
			</el-select>
			<el-select v-model="order" class="filter-item mr10">
				<el-option v-for="order in orderOptions" :key="order.value" :label="order.label" :value="order.value" />
			</el-select>
			<el-button v-waves class="filter-item" type="primary" @click="()=>{page=1;getVisitorRegionList()}"><i class="material-icons-round fs-18 mr6">search</i>{{ $t('action.type.search') }}</el-button>
			<el-button class="filter-item map" type="text" @click="carousel.next()">
				{{ $t('visitorRegion.text[0]') }}
				<i class="material-icons-round fs-16 ml8">travel_explore</i>
			</el-button>
		</div>
		<el-table v-loading="loading" :data="regionList" stripe :element-loading-text="$t('table.loading')">
			<el-table-column prop="name" :label="$t('visitorRegion.table.province')" />
			<el-table-column prop="value" :label="$t('visitorRegion.table.number')" />
		</el-table>
		<pagination :total="total" :page.sync="page" :limit.sync="limit" @pagination="getVisitorRegionList" />
	</div>
</template>

<script>
import { getVisitorRegionList } from '@/api/statistics.js'
import { getServerList } from '@/api/server.js'
export default {
	props: {
		carousel: {
			type: Object,
			default: () => ({})
		},
		platformList: {
			type: Array,
			default: () => []
		}
	},
	data () {
		return {
			page: 1,
			limit: 10,
			order: 0,
			server: '',
			visiterIp: '',
			platformId: '',
			visiterTime: undefined,
			visitorList: [],
			total: 0,
			serverList: [],
			loading: false,
			orderOptions: [
				{
					label: this.$t('visitorRegion.orderOptions[0]'),
					value: 0
				},
				{
					label: this.$t('visitorRegion.orderOptions[1]'),
					value: 1
				}
			],
			regionList: []
		}
	},
	created () {
		this.getServerList()
		this.getVisitorRegionList()
	},
	methods: {
		getServerList () {
			getServerList().then(res => {
				const { code, data } = res
				if (code === 0) {
					this.serverList = data
				}
			})
		},
		getVisitorRegionList () {
			this.loading = true
			const { page, limit, order: myselect, platformId: domain_id } = this
			getVisitorRegionList({ page, limit, myselect, domain_id }).then(res => {
				const { code, data, count } = res
				if (code === 0) {
					this.total = count
					this.regionList = data
				}
				this.loading = false
			})
		}
	}
}
</script>

<style lang="scss" scoped>
.filter-item.map {
	padding: 0 10px;
}
.el-button--text {
	padding: 0 0px;
	margin-left: 18px;
	color: var(--visitor-region-title);
	.icon-website {
		display: inline-block;
		transform: translate(2px, 1px);
		font-size: 14px;
	}
}
</style>
