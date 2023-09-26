<template>
	<div id="theme" v-loading="loading" class="dashboard">
		<el-select v-model="activePlatform" class="top-select-wrap" size="medium" @change="getHomeInfo">
			<el-option v-for="platform in platformList" :key="platform.domain_title" :label="platform.domain_title" :value="platform.domain_title" />
		</el-select>

		<!-- 接待量统计 -->
		<ul v-if="!loading" class="mt0 static-wrap">
			<li>
				<!-- <el-card shadow="never"> -->
				<svg-icon icon-class="cumulative" />
				<div>
					<div>{{ $t('dashboard.receptionVolume.cumulative') }}</div>
					<span>{{ homeInfo.total_num | numberSpliter }}</span>
				</div>
				<!-- </el-card> -->
			</li>
			<li>
				<!-- <el-card shadow="never"> -->
				<svg-icon icon-class="today" />
				<div>
					<div>{{ $t('dashboard.receptionVolume.today') }}</div>
					<span>{{ homeInfo.today_num | numberSpliter }}</span>
				</div>
				<!-- </el-card> -->
			</li>
			<li>
				<!-- <el-card shadow="never"> -->
				<svg-icon icon-class="current" />
				<div>
					<div>{{ $t('dashboard.receptionVolume.online') }}</div>
					<span>{{ homeInfo.online_kefu | numberSpliter }}</span>
				</div>
				<!-- </el-card> -->
			</li>
			<li>
				<!-- <el-card shadow="never"> -->
				<svg-icon icon-class="not" />
				<div>
					<div>{{ $t('dashboard.receptionVolume.unConsult') }}</div>
					<span>{{ homeInfo.customer_num | numberSpliter }}</span>
				</div>
				<!-- </el-card> -->
			</li>
		</ul>

		<!-- 客服列表 -->
		<el-card class="server-table" shadow="never">
			<div slot="header">{{ $t('dashboard.onlineServer.title') }}</div>
			<el-table :data="serverList" stripe>
				<el-table-column prop="kefu_username" :label="$t('dashboard.onlineServer.name')" width="210" align="center" />
				<el-table-column prop="group_name" :label="$t('dashboard.onlineServer.group')" width="210" align="center" />
				<el-table-column prop="last_login_time" :label="$t('dashboard.onlineServer.lastLoginTime')" align="center" />
				<el-table-column :label="$t('dashboard.onlineServer.status')" width="110" align="center">
					<el-tag slot-scope="{row}" size="small" :class="{invisible: row.online_status == 3}">
						{{ row.online_status == 1 ? $t('dashboard.onlineServer.online') : $t('dashboard.onlineServer.invisible') }}
					</el-tag>
				</el-table-column>
				<el-table-column prop="service_num" :label="$t('dashboard.onlineServer.serveredNumber')" align="center" />
				<el-table-column prop="total_service_num" :label="$t('dashboard.onlineServer.totalServeredNumber')" align="center" />
				<el-table-column :label="$t('action.label')" width="190" align="center">
                    <template  slot-scope="{row}">
                        <el-button v-waves size="mini" type="primary" @click="loginServer(row)">{{ $t('action.type.login') }}</el-button>
					    <el-button v-waves size="mini" type="primary" @click="offlineServer(row)">{{ $t('action.type.offline') }}</el-button>
                    </template>
				</el-table-column>
			</el-table>
		</el-card>

		<!-- 接待图表 -->
		<el-card class="recept-chart" shadow="never">
			<div slot="header">
				<!-- <div>{{ $t('dashboard.onlineServer.title') }}</div> -->
				<el-select v-model="activePeriod" size="medium" @change="getHomeInfo(false)">
					<el-option v-for="(period) in periodList" :key="period.value" :label="period.label" :value="period.value" />
				</el-select>
			</div>
			<chart :orign-data="homeInfo" />
		</el-card>
	</div>
</template>

<script>
import chart from './chart.vue'
import { getHomeInfo, getServerList } from '@/api/home.js'
import { offlineServer } from '@/api/server.js'
import { mapActions } from 'vuex'
export default {
	name: 'Dashboard',
	components: { chart },
	filters: {
		numberSpliter (number, spliter = ',') {
			if (isNaN(number = parseInt(number))) {
				return ''
			}

			const tempArr = []
			const revNumArr = number.toString().split('').reverse()
			for (let i = 0; i < revNumArr.length; i++) {
				tempArr.unshift(revNumArr[i])
				if (i !== revNumArr.length - 1 && i % 3 === 2) {
					tempArr.unshift(spliter)
				}
			}
			return tempArr.join('')
		}
	},
	data () {
		return {
			homeInfo: {},
			serverList: [],
			platformList: [],
			activePeriod: 30,
			activePlatform: this.$t('dashboard.total'),
			periodList: [
				{
					label: this.$tc('dashboard.receptionOptions[0]'),
					value: 30
				},
				{
					label: this.$tc('dashboard.receptionOptions[1]'),
					value: 7
				},
				{
					label: this.$tc('dashboard.receptionOptions[2]'),
					value: 15
				}
			],
			loading: true,
			timer: null
		}
	},
	created () {
		this.getHomeInfo()
		this.getServerList()
	},
	destroyed () {
		clearInterval(this.timer)
	},
	methods: {
        ...mapActions({
			sellerServerLogin: 'auth/sellerServerLogin'
		}),
		getHomeInfo (loading = true) {
			this.loading = loading
			let { activePeriod, activePlatform } = this
			if (activePlatform == this.$t('dashboard.total')) {
				activePlatform = '全部'
			}
			getHomeInfo({
				days: activePeriod,
				currentPlatformId: activePlatform
			}).then(res => {
				const { data, code } = res
				if (code === 0) {
					this.homeInfo = data
					this.serverList = data.kefu
					this.platformList = [
						{ domain_title: this.$t('dashboard.total') }, ...data.platformList
					]
				}
				this.loading = false
			})
		},
        loginServer(service){
            const { kefu_code } = service;
            this.sellerServerLogin({kefu_code}).then(res => {
                const { code, data, msg } = res
                if (code === 0) {
                    this.$router.push({ 
                        path: `/chat/server/${data.seller_code}`,
                        query:{
                            redirect:this.$route.fullPath
                        }
                    })
                    // 保存 会话设置
                    this.$store.commit('chatServer/setSessionConfig', {
                        sort: data.sort,
                        retain: data.retain
                    })
                } else {
                    this.$message.error(msg)
                }
            })
        },
		offlineServer (service) {
			this.$confirm(this.$t('dashboard.offlineServer.message'), this.$t('dashboard.offlineServer.tips'), {
				confirmButtonText: this.$t('dashboard.offlineServer.confirm'),
				cancelButtonText: this.$t('dashboard.offlineServer.cancel'),
				dangerouslyUseHTMLString: true
			}).then(() => {
				offlineServer({
					kefuCode: service.kefu_code,
					sellerCode: service.seller_code
				}).then(res => {
					const { code, msg } = res
					if (code === 0) {
						this.getHomeInfo()
					} else {
						this.$notify.error({
							title: this.$t('notify.fail'),
							message: msg
						})
					}
				})
			})
		},
		getServerList () {
			this.timer = setInterval(() => {
				getServerList().then(res => {
					const { code, data } = res
					if (code === 0) {
						this.serverList = data
					}
				})
			}, 3000)
		}
	}
}
</script>

<style lang="scss" scoped>
.dashboard {
	position: relative;
	.top-select-wrap {
		position: fixed;
		top: 67px;
		left: 254px;
		z-index: 99;
	}
	.static-wrap {
		width: 100%;
		height: 140px;
		background-size: cover;
		background-repeat: no-repeat;
		background-position: center right;
		background-image: url("../../assets/img/banner@2x.png");
		border-radius: 10px;
		display: flex;
		align-items: center;
		padding-left: 113px;
		li {
			margin-right: 126px;
			.svg-icon {
				width: 40px;
				height: 40px;
				margin-right: 24px;
			}
			color: #fff;
			display: flex;
			align-items: center;
			> div {
				display: flex;
				align-items: center;
				flex-direction: column;
				div {
					font-size: 14px;
				}
				span {
					font-size: 34px;
					font-weight: 500;
					line-height: 40px;
				}
			}
		}
	}
	.server-table {
		margin-top: 12px;
		::v-deep.el-card__body {
			padding: 10px 15px;
		}
		::v-deep.el-table {
			&:before {
				height: 0;
			}
			.el-table__header-wrapper {
				th {
					padding: 8px 0;
					font-size: 14px;
					color: var(--dashboard-th) !important;
					background: var(--dashboard-th-bg) !important;
					border: 0;
					.cell {
						padding: 0 15px;
					}
				}
			}
			.el-table__body-wrapper {
				.invisible {
					color: #ffc300;
				}
				td {
					padding: 8px 0;
					.cell {
						padding: 0 15px;
					}
				}
			}
		}
	}
	.recept-chart {
		margin-top: 20px;
		background: var(--dashboard-chart-bg);
	}
}
::v-deep.el-card {
	border-radius: 10px;
	border: none;
	// box-shadow: 0 2px 12px 0 rgba(0,0,0,.1);
	.el-card__header {
		padding: 13px 15px;
		color: var(--dashboard-statistics-title);
		> div {
			display: flex;
			align-items: center;
			justify-content: space-between;
		}
	}
	.el-card__body {
		font-size: 36px;
		color: var(--dashboard-statistics-num);
	}
}
::v-deep.el-select {
	width: 180px;
}
</style>
