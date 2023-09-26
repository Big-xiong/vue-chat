<template>
	<div class="layer">
		<!-- 自定义参数 -->
		<div class="title mb20">{{ $t("connectServer.auto.text[2]") }}</div>
		<el-checkbox-group v-model="customParams" class="params-options" size="small">
			<el-checkbox v-for="params in customParamsList" :key="params.params_id" :label="params.params_field" border>
				{{ params.params_name }}
			</el-checkbox>
		</el-checkbox-group>
		<!-- 推荐参数 -->
		<div class="mb20">{{ $t("connectServer.auto.text[3]") }}</div>
		<el-checkbox-group v-model="recommendParams" class="params-options" size="small">
			<el-checkbox v-for="params in recommendParamsList" :key="params.params_id" :label="params.params_field" border>
				{{ params.params_name }}
			</el-checkbox>
		</el-checkbox-group>

		<div class="title mt40">{{ $t('connectServer.layer.text[1]') }}</div>
		<div class="code-wrap">
			<div>{{ code }}</div>
		</div>
		<div class="flex-aic">
			<el-button type="text" icon="el-icon-info" @click="courseVisible=true">{{ $t('connectServer.layer.text[0]') }}</el-button>
			<span class="ml14">{{ $t('connectServer.layer.text[4]') }}</span>
		</div>
		<el-button v-waves class="mt2 mb40" type="primary" @click="clickCopy"><i class="material-icons-round fs-14 mr6">content_copy</i>{{ $t('connectServer.layer.text[2]') }}</el-button>
		<div class="title mt16">{{ $t('connectServer.layer.text[3]') }}</div>
		<layer-course :visible.sync="courseVisible" />
	</div>
</template>

<script>
import layerCourse from './layerCourse.vue'
export default {
	components: { layerCourse },
	props: {
		useInfo: {
			type: Object,
			default: () => ({})
		},
		customParamsList: {
			type: Array,
			default: () => {
				return []
			}
		},
		recommendParamsList: {
			type: Array,
			default: () => {
				return []
			}
		}
	},
	data () {
		return {
			courseVisible: false,
			customParams: [],
			recommendParams: []
		}
	},
	computed: {
		code () {
			let custom = {}
			const { customParams, recommendParams } = this
			let params = [...customParams, ...recommendParams]
			params.forEach(item => {
				custom[item] = ""
			})
			if (params.length) {
				return `<script id="aichat_script" custom='${JSON.stringify(custom)}' src="${process.env.VUE_APP_BASE_URL}/index/index/chatBoxJs/u/${this.useInfo.seller_code}"><\/script>`
			} else {
				return `<script id="aichat_script" src="${process.env.VUE_APP_BASE_URL}/index/index/chatBoxJs/u/${this.useInfo.seller_code}"><\/script>`
			}

		}
	},
	methods: {
		clickCopy () {
			this.$copyText(this.code).then(() => {
				this.$notify({
					title: this.$t('notify.success'),
					message: this.$t('notify.copySuccess'),
					type: 'success'
				})
			})
		}
	}
}
</script>

<style lang="scss" scoped>
.layer {
	.title {
		color: var(--connect-server-title);
		font-size: 16px;
	}
	.code-wrap {
		position: relative;
		margin: 14px 0 10px;
		padding: 15px;
		line-height: 20px;
		border: 1px solid var(--connect-server-code-border);
		border-left-width: 6px;
		color: var(--connect-server-code);
		background: var(--connect-server-code-bg);
		font-family: Courier New;
		font-size: 12px;
	}
	.el-button--primary.mt2 {
		width: 170px;
		height: 48px;
		border-radius: 24px;
		background: var(--el-btn-primary-bg);
		border: 0;
	}
}
</style>
