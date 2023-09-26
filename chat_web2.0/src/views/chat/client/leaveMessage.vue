<template>
	<el-drawer class="leave-message" size="400px" :title="$t('chatClient.leaveMsg.title')" :visible="leaveMsgVisible" @close="closeHandler">
		<el-form v-if="leaveMsgVisible" ref="form" :model="params" :rules="rules" hide-required-asterisk>
			<el-form-item :label="$t('chatClient.leaveMsg.label.name')" prop="name">
				<el-input v-model="params.name" :placeholder="$t('chatClient.leaveMsg.placeholder.name')" />
			</el-form-item>
			<el-form-item :label="$t('chatClient.leaveMsg.label.phone')" prop="phone">
				<el-input v-model="params.phone" :placeholder="$t('chatClient.leaveMsg.placeholder.phone')" />
			</el-form-item>
			<el-form-item :label="$t('chatClient.leaveMsg.label.content')" prop="content">
				<el-input v-model="params.content" type="textarea" :rows="6" :placeholder="$t('chatClient.leaveMsg.placeholder.content')" />
			</el-form-item>
		</el-form>
		<div class="btn-box">
			<el-button type="primary" :loading="buttonLoading" size="medium" class="mr6" @click="submitHandler">{{ $t('action.type.submit') }}</el-button>
			<el-button size="medium" @click="$refs.form.resetFields()">{{ $t('action.type.reset') }}</el-button>
		</div>
	</el-drawer>
</template>

<script>
import { mapState, mapMutations } from 'vuex'
import { leaveMessage } from '@/api/chatClient.js'
export default {
	data () {
		const phoneValid = (rule, value, callback) => {
			const phonePattern = /((\d{11})|^((\d{7,8})|(\d{4}|\d{3})-(\d{7,8})|(\d{4}|\d{3})-(\d{7,8})-(\d{4}|\d{3}|\d{2}|\d{1})|(\d{7,8})-(\d{4}|\d{3}|\d{2}|\d{1}))$)/
			const emailPattern = /^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/
			if (phonePattern.test(value) || emailPattern.test(value)) {
				callback()
			} else {
				callback(new Error(this.$t('chatClient.leaveMsg.tips.phone[0]')))
			}
		}
		return {
			params: {
				name: '',
				phone: '',
				content: ''
			},
			rules: {
				name: [
					{ required: true, trigger: 'blur', message: this.$t('chatClient.leaveMsg.tips.name') }
				],
				phone: [
					{ required: true, trigger: 'blur', message: this.$t('chatClient.leaveMsg.tips.phone[1]') },
					// { validator: phoneValid, trigger: 'blur' }
				],
				content: [
					{ required: true, trigger: 'blur', message: this.$t('chatClient.leaveMsg.tips.content') }
				]
			},
			buttonLoading: false
		}
	},
	computed: {
		...mapState({
			platform: state => state.chatClient.platform,
			leaveMsgVisible: state => state.chatClient.leaveMsgVisible
		})
	},
	methods: {
		submitHandler () {
			this.$refs.form.validate((valid) => {
				if (valid) {
					this.buttonLoading = true
					const { params: { name: username, phone, content }, platform: { domainInfo: { seller_code, domain_name: domain } } } = this
					leaveMessage({ username, phone, content, seller_code, domain }).then((res) => {
						const { code, msg } = res
						const success = code === 0
						if (success) {
							this.closeHandler()
						}
						this.$notify({
							message: msg,
							title: success ? this.$t('notify.success') : this.$t('notify.fail'),
							type: success ? 'success' : 'error'
						})
						this.buttonLoading = false
					})
				}
			})
		},
		closeHandler () {
			this.buttonLoading = false
			this.params = { name: '', phone: '', content: '' }
			this.setLeaveMsgVisible(false)
		},
		...mapMutations({
			setLeaveMsgVisible: 'chatClient/setLeaveMsgVisible'
		})
	}
}
</script>

<style lang="scss" scoped>
.leave-message {
	::v-deep.el-drawer__header {
		padding: 18px 20px 10px;
		border-bottom: 1px solid #f6f6f6;
		margin-bottom: 0;
		color: #333;
		font-size: 14px;
	}
	::v-deep.el-drawer__body {
		padding: 15px 55px 0;
		.el-form-item {
			margin-bottom: 16px;
		}
		.btn-box {
			margin: 20px 0 30px;
		}
	}
}
::v-deep :focus {
	outline: 0;
}
</style>
