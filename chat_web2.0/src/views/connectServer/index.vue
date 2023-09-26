<template>
	<div class="custom-container">
		<el-tabs v-model="connectType">
			<el-tab-pane :label="$t('connectServer.type.auto')" name="auto">
				<auto :use-info="useInfo" :customParamsList="customParamsList" :recommendParamsList="recommendParamsList" />
			</el-tab-pane>
			<el-tab-pane :label="$t('connectServer.type.fixed')" name="fixed">
				<fixed :use-info="useInfo" :customParamsList="customParamsList" :recommendParamsList="recommendParamsList" />
			</el-tab-pane>
			<!--<el-tab-pane :label="$t('connectServer.type.halfFixed')" name="halfFixed">
				<halfFixed :use-info="useInfo" :customParamsList="customParamsList" :recommendParamsList="recommendParamsList" />
			</el-tab-pane>-->
			<el-tab-pane :label="$t('connectServer.type.layer')" name="layer">
				<layer :use-info="useInfo" :customParamsList="customParamsList" :recommendParamsList="recommendParamsList" />
			</el-tab-pane>
		</el-tabs>
	</div>
</template>

<script>
import auto from './auto.vue'
import fixed from './fixed.vue'
import halfFixed from './halfFixed.vue'
import layer from './layer.vue'
import { getUseInfo } from '@/api/common.js'
import { getUsableParams, getParamsList } from '@/api/params.js'
export default {
	name: 'ConnectServer',
	components: { auto, fixed, layer, halfFixed },
	data () {
		return {
			useInfo: {},
			connectType: 'auto',
			customParamsList: [],
			recommendParamsList: []
		}
	},
	created () {
		this.getUseInfo()
		this.getParamsList()
		this.getUsableParams()
	},
	methods: {
		getUseInfo () {
			getUseInfo().then(res => {
				const { code, data } = res
				if (code === 0) {
					this.useInfo = data
				}
			})
		},
		getParamsList () {
			getParamsList({
				page: 1, limit: 100
			}).then(res => {
				const { code, data } = res
				if (code === 0) {
					this.customParamsList = data
				}
			})
		},
		getUsableParams () {
			getUsableParams().then(res => {
				const { code, data } = res
				if (code === 0) {
					this.recommendParamsList = data
				}
			})
		}
	}
}
</script>

<style lang="scss" scoped>
.custom-container {
	padding: 8px 0 40px 0;
	color: var(--connect-server-content);
	::v-deep.el-dialog__body {
		padding-top: 5px;
	}
	::v-deep.el-tabs {
		.el-tabs__nav-wrap:after {
			height: 0;
		}
		.el-tabs__content {
			padding: 0 30px;
		}
		.el-tabs__header {
			border-bottom: 4px solid var(--el-tabs-border);
		}
		.el-tabs__nav-scroll {
			padding: 0 30px;
		}
		.el-tabs__item {
			font-size: 16px;
			padding: 10px 30px 10px 0;
			height: auto;
			&.is-active {
				font-size: 18px;
			}
		}
		// .el-tabs__header{
		//   padding: 18px 30px;
		// }
		.el-tabs__active-bar {
			width: 22px !important;
			height: 3px;
			background: #5082f4;
		}
	}
}
</style>
