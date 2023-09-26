<template>
	<el-card shadow="never">
		<div slot="header">{{ $t('sessionAssign.head') }}</div>
		<div style="margin-bottom: 15px;display:flex;align-items:center;">
			<span style="margin-right: 10px;">{{ $t('sessionAssign.isoff') }}</span>
			<el-switch v-model="isoff" @change="changeAssginIsoff" :inactive-value="0" :active-value="1"></el-switch>
		</div>
		<div v-loading="loading" :element-loading-text="$t('sessionAssign.loading')">
			<el-radio-group v-model="assignType" @change="changeAssginType">
				<el-radio v-for="assgin in assginList" :key="assgin.value" :label="assgin.value">
					<h3>{{ assgin.title }}</h3>
					<p>{{ assgin.content }}</p>
				</el-radio>
			</el-radio-group>
		</div>
	</el-card>
</template>

<script>
import { changeAssginType, getCurAssginType } from '@/api/talk.js'
export default {
	name: 'TalkAssign',
	data () {
		return {
			assignType: 1,
			isoff: 0,
			assginList: [
				/*{
					value: 1,
					title: this.$t('sessionAssign.options[0].title'),
					content: this.$t('sessionAssign.options[0].content')
				},
				{
					value: 2,
					title: this.$t('sessionAssign.options[1].title'),
					content: this.$t('sessionAssign.options[1].content')
				},*/
				{
					value: 3,
					title: this.$t('sessionAssign.options[2].title'),
					content: this.$t('sessionAssign.options[2].content')
				},
				{
					value: 4,
					title: this.$t('sessionAssign.options[3].title'),
					content: this.$t('sessionAssign.options[3].content')
				},
				{
					value: 5,
					title: this.$t('sessionAssign.options[4].title'),
					content: this.$t('sessionAssign.options[4].content')
				}
			],
			loading: false
		}
	},
	created () {
		this.getCurAssginType()
	},
	methods: {
		changeAssginIsoff (isoff) {
			this.loading = true
			let params = {
				type: this.assignType,
				isoff: isoff
			}
			changeAssginType(params).then(res => {
				const { code, msg } = res
				const success = code === 0
				this.$notify({
					message: msg,
					title: success ? this.$t('notify.success') : this.$t('notify.fail'),
					type: success ? 'success' : 'error'
				})
				this.loading = false
			})
		},
		changeAssginType (type) {
			this.loading = true
			let params = {
				type,
				isoff: this.isoff
			}
			changeAssginType(params).then(res => {
				const { code, msg } = res
				const success = code === 0
				this.$notify({
					message: msg,
					title: success ? this.$t('notify.success') : this.$t('notify.fail'),
					type: success ? 'success' : 'error'
				})
				this.loading = false
			})
		},
		getCurAssginType () {
			getCurAssginType().then(res => {
				const { code, data } = res
				if (code === 0) {
					this.assignType = data.type || 1
					this.isoff = data.isoff || 0
				}
			})
		}
	}
}
</script>

<style lang="scss" scoped>
::v-deep.el-card {
	.el-card__header {
		padding: 12px 20px;
		font-size: 16px;
		color: var(--talk-assign-head);
	}
	.el-radio {
		display: flex;
		margin-bottom: 10px;
		.el-radio__inner {
			width: 13px;
			height: 13px;
		}
		.el-radio__label {
			h3 {
				font-weight: normal;
				font-size: 14px;
				color: var(--talk-assign-name);
			}
			p {
				font-size: 14px;
				color: var(--talk-assign-desc);
			}
		}
	}
}
</style>
