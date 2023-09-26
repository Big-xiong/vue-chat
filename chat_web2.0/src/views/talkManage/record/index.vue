<template>
	<div class="record custom-container">
		<div class="record-side">
			<el-form ref="form" :model="form" label-position="top" size="medium">
				<el-form-item :label="$t('sessionRecord.customerFilter.label.platformName')" prop="platformName">
					<el-select v-model="form.platformName" clearable :placeholder="$t('sessionRecord.customerFilter.placeholder.platformName')">
						<el-option v-for="platform in platformList" :key="platform.domain_id" :label="platform.domain_title" :value="platform.domain_title" />
					</el-select>
				</el-form-item>
				<el-form-item :label="$t('sessionRecord.customerFilter.label.customerName')" prop="customerName">
					<el-input v-model="form.customerName" clearable :placeholder="$t('sessionRecord.customerFilter.placeholder.customerName')" />
				</el-form-item>
				<el-form-item :label="$t('sessionRecord.customerFilter.label.serverName')" prop="serverName">
					<el-select v-model="form.serverName" clearable :placeholder="$t('sessionRecord.customerFilter.placeholder.serverName')">
						<el-option v-for="server in serverList" :key="server.kefu_id" :label="server.kefu_name" :value="server.kefu_code" />
					</el-select>
				</el-form-item>
				<el-form-item :label="$t('sessionRecord.customerFilter.label.serviceTime')" prop="serviceTime">
					<el-select v-model="form.serviceTime" clearable :placeholder="$t('sessionRecord.customerFilter.placeholder.serviceTime')">
						<el-option v-for="time in timeOptions" :key="time.value" :label="time.label" :value="time.value" />
					</el-select>
				</el-form-item>
				<el-form-item :label="$t('sessionRecord.customerFilter.label.customTime')" clearable prop="customTime">
					<el-date-picker v-model="form.customTime" type="daterange" value-format="yyyy-MM-dd" :range-separator="$t('sessionRecord.customerFilter.placeholder.customTime.separator')" :start-placeholder="$t('sessionRecord.customerFilter.placeholder.customTime.start')" :end-placeholder="$t('sessionRecord.customerFilter.placeholder.customTime.end')" />
				</el-form-item>
				<el-form-item :label="$t('sessionRecord.customerFilter.label.talkType')" prop="talkType">
					<el-select v-model="form.talkType" :placeholder="$t('sessionRecord.customerFilter.placeholder.talkType')">
						<el-option v-for="talkType in talkTypeOptions" :key="talkType.value" :label="talkType.label" :value="talkType.value" />
					</el-select>
				</el-form-item>
                <el-form-item :label="$t('sessionRecord.customerFilter.label.content')" prop="content">
					<el-input v-model="form.content"  :placeholder="$t('sessionRecord.customerFilter.placeholder.content')"></el-input>
				</el-form-item>
				<el-form-item :label="$t('sessionRecord.customerFilter.label.satisfaction')" prop="satisfaction">
					<el-select v-model="form.satisfaction" clearable :placeholder="$t('sessionRecord.customerFilter.placeholder.satisfaction')">
						<el-option v-for="satisfaction in satisfactionOptions" :key="satisfaction.value" :label="satisfaction.label" :value="satisfaction.value" />
					</el-select>
				</el-form-item>
				<el-form-item class="clearfix">
					<el-button v-waves class="fr" size="small" type="primary" @click="getCustomerList">{{ $t('sessionRecord.customerFilter.getCustomer') }}</el-button>
				</el-form-item>
			</el-form>
		</div>
		<div class="record-main">
			<div v-loading="listLoading" class="customer-wrap">
				<div class="customer-wrap__header">
					<span>{{ $t('sessionRecord.customerList.head[0]') }}</span>
				</div>
				<div v-if="hasGetCustomerList" class="customer-wrap__main">
					<div v-if="customerList.length" class="customer-list">
						<div v-for="customer in customerList" :key="customer.customer_id" :class="{'customer-list__item':true,'active':customerId==customer.customer_id}" @click="clickCustomer(customer)">
							{{ customer.real_name||customer.customer_name }}
						</div>
					</div>
					<div v-else-if="!customerList.length&&!listLoading" class="no-data">{{ $t('sessionRecord.noData') }}</div>
				</div>
			</div>
			<div v-loading="detailLoading" class="chat-content">
				<div class="chat-content__head">
					<el-input v-model="chatContent" clearable size="medium" :placeholder="$t('sessionRecord.chatContent.placeholder')">
						<el-button slot="append" v-waves size="medium" type="primary" icon="el-icon-search" @click="()=>{page=1;getChatRecord()}" />
					</el-input>
					<el-button type="primary" style="margin-left:10px;" @click="exportRecord">{{ $t('sessionRecord.chatContent.export') }}</el-button>
					<el-button type="primary" style="margin-left:10px;" @click="exportAllRecord">{{ $t('sessionRecord.customerList.head[1]') }}</el-button>
					<el-button v-show="!customerDetailVisible" type="text" size="medium" style="margin-left:auto;" @click="customerDetailVisible = !customerDetailVisible">
						{{ $t('sessionRecord.chatContent.seeCustomerDetail') }}<i class="el-icon-arrow-right" />
					</el-button>
				</div>
				<div v-if="hasGetCustomerDetail" ref="chatContent" class="chat-content__main">
					<div v-if="chatDataStatus=='no-more'" class="no-more">{{ $t('sessionRecord.noMore') }}</div>
					<div v-if="chatDataStatus=='no-data'" class="no-data">{{ $t('sessionRecord.noData') }}</div>
					<el-button v-if="chatDataStatus=='has-more'" v-waves size="small" type="info" class="get-more" @click="()=>{page++;getChatRecord(true)}">{{ $t('sessionRecord.noRecord') }}</el-button>
					<div class="content-list" :class="theme">
						<div v-for="(chat,index) in chatList" :key="index" :class="{'customer-content':chat.type!='mine','server-content':chat.type=='mine','leave-message':chat.leave == '1'}">
							<template v-if="chat.type=='mine'">
								<div class="title">
									<span class="name mr6" :style="`color:${serverColor(chat.from_name)}`">{{ chat.from_name }}</span>
									<span class="mr42">{{ chat.create_time }}</span>
									<img class="avatar" :src="`${baseUrl}${chat.from_avatar}`">
								</div>
								<div class="content" v-html="chat.content" />
							</template>
							<template v-else-if="chat.leave == '1'">
								<div class="title">
									{{ chat.create_time }}
								</div>
								<div>
									<div class="content" v-html="chat.content" />
								</div>
							</template>
							<template v-else>
								<div class="title">
									<span class="name mr6">{{ chat.from_name }}</span>
									{{ chat.create_time }}
								</div>
								<div class="flex-aic">
									<div class="content" v-html="chat.content" />
									<div class="status ml8">{{ chat.read_flag==2?$t('sessionRecord.chatContent.read'):$t('sessionRecord.chatContent.unRead') }}</div>
								</div>
							</template>
						</div>
					</div>
				</div>
			</div>
			<div :class="{'customer-detail':true,'spread':customerDetailVisible}">
				<i class="close el-icon-close" @click="customerDetailVisible=false" />
				<el-form label-width="100px">
					<el-form-item :label="$t('sessionRecord.customerDetail.id')">{{ customerDetail.cid }}</el-form-item>
					<el-form-item :label="$t('sessionRecord.customerDetail.userName')">{{ customerDetail.customer_name }}</el-form-item>
					<el-form-item :label="$t('sessionRecord.customerDetail.server')">{{ customerDetail.kefu_code }}</el-form-item>
					<el-form-item :label="$t('sessionRecord.customerDetail.area')">{{ customerDetail.province }}</el-form-item>
					<el-form-item :label="$t('sessionRecord.customerDetail.userIp')">{{ customerDetail.customer_ip }}</el-form-item>
					<el-form-item :label="$t('sessionRecord.customerDetail.phone')">{{ customerDetail.phone }}</el-form-item>
					<el-form-item :label="$t('sessionRecord.customerDetail.email')">{{ customerDetail.email }}</el-form-item>
					<el-form-item :label="$t('sessionRecord.customerDetail.browser')">{{ customerDetail.browser }}</el-form-item>
					<el-form-item :label="$t('sessionRecord.customerDetail.system')">{{ customerDetail.system }}</el-form-item>
					<el-form-item :label="$t('sessionRecord.customerDetail.enterTime')">{{ customerDetail.start_time }}</el-form-item>
					<el-form-item :label="$t('sessionRecord.customerDetail.duration')">{{ customerDetail.service_time }}</el-form-item>
					<el-form-item :label="$t('sessionRecord.customerDetail.source')">{{ customerDetail.from_url }}</el-form-item>
					<el-form-item :label="$t('sessionRecord.customerDetail.satisfaction')">{{ customerDetail.star | satisfactionFilter(that) }}</el-form-item>
				</el-form>
			</div>
		</div>
	</div>
</template>

<script>
import { mapState } from 'vuex'
import { formatContent } from '@/utils/chat.js'
import { getServerList } from '@/api/server.js'
import { getPlatformList } from '@/api/common.js'
import { getCustomerList, getChatRecord, getCustomerDetail, getChattxt, getchattxtAll } from '@/api/talk.js'
export default {
	name: 'TalkRecord',
	filters: {
		satisfactionFilter (star, that) {
			return that.$t('sessionRecord.satisfactionOptions')[star - 1]
		}
	},
	data () {
		return {
			that: this,
			form: {
				// customer
				platformName: '',
				customerName: '',
				serverName: '',
				serviceTime: '',
				customTime: '',
				talkType: '0',
                content:"",
				satisfaction: ''
			},
			timeOptions: [
				{
					label: this.$t('sessionRecord.customerFilter.timeOptions[0]'),
					value: '-7'
				},
				{
					label: this.$t('sessionRecord.customerFilter.timeOptions[1]'),
					value: '-30'
				}
			],
			talkTypeOptions: [
				{
					label: this.$t('sessionRecord.customerFilter.talkTypeOptions[0]'),
					value: '0'
				},
				{
					label: this.$t('sessionRecord.customerFilter.talkTypeOptions[1]'),
					value: '1'
				},
				{
					label: this.$t('sessionRecord.customerFilter.talkTypeOptions[2]'),
					value: '2'
				},
				{
					label: this.$t('sessionRecord.customerFilter.talkTypeOptions[3]'),
					value: '3'
				},
				{
					label: this.$t('sessionRecord.customerFilter.talkTypeOptions[4]'),
					value: '4'
				}
			],
			satisfactionOptions: [
				{
					label: this.$t('sessionRecord.satisfactionOptions[4]'),
					value: 5
				},
				{
					label: this.$t('sessionRecord.satisfactionOptions[3]'),
					value: 4
				},
				{
					label: this.$t('sessionRecord.satisfactionOptions[2]'),
					value: 3
				},
				{
					label: this.$t('sessionRecord.satisfactionOptions[1]'),
					value: 2
				},
				{
					label: this.$t('sessionRecord.satisfactionOptions[0]'),
					value: 1
				}
			],
			serverList: [],
			customerList: [],
			platformList: [],
			customerTotal: 0,
			// chat content
			page: 1,
			chatContent: '',
			customerId: '',
			chatList: [],
			chatDataStatus: '',
			customerDetail: {},
			customerDetailVisible: false,
			listLoading: false,
			detailLoading: false,
			hasGetCustomerList: false,
			hasGetCustomerDetail: false,
			serverThemeConfig: {
				index: 0,
				options: ['#505050', '#00AB9F', '#E33C64', '#FF8D1A'],
				cacheMap: {}
			},
			baseUrl: process.env.VUE_APP_BASE_URL
		}
	},
	computed: {
		...mapState({
			theme: state => state.app.theme
		})
	},
	watch: {
		form: {
			handler (v) {
				localStorageCompatible.setItem('sessionRecordFilter', JSON.stringify(v))
			},
			deep: true
		}
	},
	created () {
		this.getServerList()
		this.getPlatformList()
		this.form = JSON.parse(localStorageCompatible.getItem('sessionRecordFilter')) || {
			platformName: '',
			customerName: '',
			serverName: '',
			serviceTime: '',
			customTime: '',
			talkType: '0',
            content:'',
			satisfaction: ''
		}
	},
	methods: {
		getServerList () {
			getServerList({}).then(res => {
				const { code, data } = res
				if (code === 0) {
					this.serverList = data
				}
			})
		},
		getPlatformList () {
			getPlatformList().then(res => {
				const { code, data } = res
				if (code === 0) {
					this.platformList = data
				}
			})
		},
		getCustomerList () {
			if (this.valid()) {
				const {
					platformName: groupid,
					customerName: kefu_name,
					serverName: kefu_code,
					satisfaction: prise,
					talkType: type,
                    content,
					serviceTime, customTime
				} = this.form
				const params = {
					kefu_code, prise, kefu_name, groupid, type, content,
					talk_date: customTime ? customTime.join(' - ') : serviceTime
				}
				this.listLoading = true
				this.hasGetCustomerList = true
				this.chatList = []
				this.customerId = ''
				this.chatDataStatus = ''
				this.customerDetail = {}
				getCustomerList(params).then(res => {
					const { code, data, mum } = res
					const success = code === 0
					if (success) {
						this.customerList = data
						this.customerTotal = mum
					}
					this.listLoading = false
				})
			}
		},
		// 批量导出会话记录
		exportAllRecord () {
			const { page, customerList } = this
			if (!customerList.length) {
				this.$message.warning('缺少必要信息')
				return
			}
			const params = {
				page,
				kefu_code: '',
				content: '',
				customerALL: customerList?.map(v => v.customer_id).join(',')
			}
			getchattxtAll(params).then(res => {
				const { code, file, msg } = res
				if (code === 0) {
					const a = document.createElement('a')
					document.body.appendChild(a)
					a.href = file
					a.click()
					a.remove()
					this.$message.success(msg)
				} else {
					this.$message.warning(msg)
				}
			})
		},
		// 导出历史会话记录
		exportRecord () {
			const { page, chatContent: content, form: { serverName: kefu_code }, customerId: customer_id } = this
			if (!kefu_code || !customer_id) {
				this.$message.warning('缺少必要信息')
				return
			}
			getChattxt({ page, content, kefu_code, customer_id }).then(res => {
				const { code, file, msg } = res
				if (code === 0) {
					const a = document.createElement('a')
					document.body.appendChild(a)
					a.href = file
					a.click()
					a.remove()
					this.$message.success(msg)
				} else {
					this.$message.warning(msg)
				}
			})
		},
		getChatRecord (append) {
			this.detailLoading = true
			this.hasGetCustomerDetail = true
			const { page, chatContent: content, form: { serverName: kefu_code }, customerId: customer_id } = this
			getChatRecord({ page, content, kefu_code, customer_id }).then(res => {
				const { code, data, msg, total } = res
				if (code === 0) {
					if (total == 0) this.chatDataStatus = 'no-data'
					if (total > msg) this.chatDataStatus = 'has-more'
					if (total == msg) this.chatDataStatus = 'no-more'
					data.forEach(chat => chat.content = formatContent(chat.content))
					this.chatList = append ? data.concat(this.chatList) : data
				}
				this.detailLoading = false
			}).catch(error => {
        console.log(error)
        this.detailLoading = false
      })
		},
		clickCustomer (customer) {
			this.page = 1
			this.customerId = customer.customer_id
			this.getChatRecord()
			this.getCustomerDetail()
			this.$nextTick(() => {
				this.$refs.chatContent.scrollTop = 0
			})
		},
		getCustomerDetail () {
			const { customerId: customer_id } = this
			getCustomerDetail({ customer_id }).then(res => {
				const { code, data } = res
				if (code === 0) {
					this.customerDetail = data
				}
			})
		},
		serverColor (serverName) {
			const { serverThemeConfig, serverThemeConfig: { index, options, cacheMap } } = this
			if (serverName in cacheMap) {
				return cacheMap[serverName]
			} else {
				cacheMap[serverName] = options[index]
				if (index === options.length - 1) {
					serverThemeConfig.index = 0
				} else {
					serverThemeConfig.index++
				}
				return cacheMap[serverName]
			}
		},
		valid () {
			const {
				platformName, serviceTime, customTime
			} = this.form
			if (!platformName) {
				this.$message.error(this.$t('sessionRecord.customerFilter.tips.platformName'))
				return
			}
			if (!serviceTime && !customTime) {
				this.$message.error(this.$t('sessionRecord.customerFilter.tips.serviceTime'))
				return
			}
			return true
		}
	}
}
</script>

<style lang="scss" scoped>
@import "@/styles/element-variables.scss";

.record {
	display: flex;
	padding: 0;
	height: calc(100vh - 130px);
	.record-side {
		width: 260px;
		padding: 20px;
		border-right: 4px solid var(--main-bg);
		// border: 1px solid var(--talk-record-border);
		::v-deep.el-form {
			.el-select,
			.el-date-editor {
				width: 100%;
			}
			.el-icon-date {
				display: none;
			}
			.el-form-item__label {
				line-height: 1;
				padding-bottom: 10px;
				color: var(--talk-record-side-label);
				font-weight: 500;
			}
		}
		.el-button--primary {
			background: var(--el-btn-primary-bg);
			border: 0;
		}
	}
	.record-main {
		flex: 1;
		display: flex;
		// border: 1px solid var(--talk-record-border);
		.customer-wrap {
			display: flex;
			flex-direction: column;
			min-width: 240px;
			height: 100%;
			border-right: 4px solid var(--main-bg);
			cursor: default;
			.customer-wrap__header {
				display: flex;
				align-items: center;
				justify-content: space-between;
				// flex-wrap: wrap;
				padding: 9px 20px;
				// border-bottom: 1px solid var(--talk-record-border);
				line-height: 25px;
				font-size: 18px;
				font-weight: bold;
				color: var(--talk-record-title);
				// background: var(--talk-record-customer-head-bg);
				.el-button--primary {
					background: var(--filter-button-bg);
					border: 0;
				}
			}
			.customer-wrap__main {
				overflow-y: auto;
				height: 100%;
				scrollbar-width: none; /* firefox */
				-ms-overflow-style: none; /* IE 10+ */
				overflow-x: hidden;
				overflow-y: auto;
				&::-webkit-scrollbar {
					display: none; /* Chrome Safari */
				}
			}
			.customer-list__item {
				padding-left: 20px;
				border-bottom: 1px solid var(--talk-record-border);
				line-height: 40px;
				background: var(--talk-record-customer-bg);
				transition: all 0.3s;
				cursor: pointer;
				color: var(--talk-record-content);
				&:hover,
				&.active {
					background: #2f4056;
					color: #fff;
				}
			}
			.no-data {
				padding: 10px 20px;
				color: red;
				font-size: 14px;
				border-bottom: 1px solid var(--talk-record-border);
			}
		}
		.chat-content {
			display: flex;
			flex-direction: column;
			flex: 1;
			.chat-content__head {
				display: flex;
				// justify-content: space-between;
				padding: 15px;
				// border-bottom: 1px solid var(--talk-record-border);
				::v-deep.el-input {
					width: 300px;
					.el-input__inner {
						border-right: none;
					}
					.el-input-group__append {
						border: 0;
						border-radius: 6px;
						width: 36px;
						height: 36px;
						padding: 0;
						position: relative;
						left: -4px;
						text-align: center;
						.el-icon-search {
							color: #fff;
						}
						.el-button {
							padding: 0;
							margin: 0;
						}
					}
				}
				// .el-button--text {
				// 	&:hover {
				// 		color: $--color-primary;
				// 	}
				// }
				.el-button--primary {
					background: var(--filter-button-bg);
					border: 0;
				}
			}
			.chat-content__main {
				height: 100%;
				padding: 15px;
				overflow-y: auto;
				scrollbar-width: none; /* firefox */
				-ms-overflow-style: none; /* IE 10+ */
				overflow-x: hidden;
				overflow-y: auto;
				&::-webkit-scrollbar {
					display: none; /* Chrome Safari */
				}
				.no-more {
					margin: 20px 0;
					color: #999;
				}
				.no-data {
					margin: 20px 0;
					color: red;
					text-align: center;
				}
				.get-more {
					margin: 20px 0;
				}
				::v-deep.content {
					.img {
						width: 100%;
						vertical-align: bottom;
					}
					.emoji {
						width: 26px;
						vertical-align: bottom;
					}
					.video {
						width: 200px;
						vertical-align: bottom;
					}
					.audio {
						width: 200px;
						height: 20px;
						vertical-align: bottom;
					}
				}
				.dark {
					.customer-content,
					.server-content {
						.title {
							color: #a6a6a6;
							.name {
								color: #a6a6a6 !important;
							}
						}
						.content {
							color: #808080;
							background: #333;
							border-color: #333;
						}
					}
				}
				.customer-content {
					margin-bottom: 24px;
					&.leave-message {
						text-align: center;
						.title {
							margin-bottom: 0;
						}
						.content {
							border: none;
						}
					}
					.title {
						margin-bottom: 10px;
						font-size: 12px;
						color: #999;
					}
					.content {
						display: inline-block;
						min-height: 14px;
						max-width: 452px;
						line-height: 1.5;
						padding: 8px 12px;
						border: 1px solid rgba(0, 0, 0, 0.1);
						border-radius: 6px;
						word-wrap: break-word;
						background: #ffffff;
					}
					.status {
						font-size: 12px;
						color: #999;
					}
				}
				.server-content {
					margin-bottom: 24px;
					text-align: right;
					.title {
						position: relative;
						margin-bottom: 7px;
						font-size: 12px;
						color: #999;
						.avatar {
							position: absolute;
							z-index: 1;
							width: 38px;
							height: 38px;
							right: 0;
							top: -3px;
							border-radius: 50%;
						}
					}
					.content {
						display: inline-block;
						min-height: 14px;
						max-width: 452px;
						line-height: 1.5;
						padding: 8px 12px;
						border: 1px solid rgba(0, 0, 0, 0.1);
						border-radius: 6px;
						word-wrap: break-word;
						text-align: left;
						background: $--color-primary;
						color: #fff;
						margin-right: 42px;
					}
				}
			}
		}
		.customer-detail {
			position: relative;
			width: 0;
			// border-left: 1px solid var(--talk-record-border);
			overflow-x: hidden;
			overflow-y: auto;
			white-space: nowrap;
			transition: all 0.5s;
			.close {
				position: absolute;
				right: 20px;
				top: 20px;
				font-size: 18px;
				cursor: pointer;
				color: #666;
				&:hover {
					color: #409eff;
				}
			}
			&.spread {
				width: 310px;
			}
			::v-deep.el-form {
				margin: 54px 20px 0 0;
				padding: 24px;
				background: var(--main-bg);
				height: calc(100% - 108px);
				box-sizing: border-box;
				.el-form-item {
					margin-bottom: 24px;
					&:last-child {
						margin-bottom: 0;
					}
				}
				.el-form-item--medium .el-form-item__content,
				.el-form-item--medium .el-form-item__label {
					line-height: 20px;
				}
				.el-form-item__label {
					color: var(--talk-record-detail-label);
				}
				.el-form-item__content {
					color: var(--talk-record-detail-content);
				}
			}
		}
	}
}
</style>
