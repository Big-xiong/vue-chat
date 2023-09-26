<template>
	<div class="forget-password">
		<a href="https://www.aichating.com/" target="_blank" class="back-home">
			<i class="material-icons-round">home</i>
			<div class="tips">{{ $t('forgetPassword.actions[3]') }}</div>
		</a>
		<div class="forget-password__center">
			<div class="title">{{ $t('forgetPassword.title') }}</div>
			<div class="desc">{{ $t('forgetPassword.subTitle') }}</div>

			<el-form ref="form" :model="form" :rules="rules">
				<el-form-item prop="email">
					<div class="icon-wrap">
						<svg-icon icon-class="email" />
					</div>
					<el-input v-model="form.email" :placeholder="$t('forgetPassword.placeholder.email')" />
				</el-form-item>
				<el-form-item prop="veriCode">
					<div class="icon-wrap">
						<svg-icon icon-class="password" />
					</div>
					<el-input v-model="form.veriCode" :placeholder="$t('forgetPassword.placeholder.veriCode')" />
					<el-button :disabled="disabled" @click="sendVeriCode">
						{{ disabled ? `${disableDuration}${$t('forgetPassword.veriCode[0]')}` : $t('forgetPassword.veriCode[1]') }}
					</el-button>
				</el-form-item>
				<el-form-item prop="password">
					<div class="icon-wrap">
						<svg-icon icon-class="password" />
					</div>
					<el-input v-model="form.password" :type="passwordType" autocomplete="new-password" :placeholder="$t('forgetPassword.placeholder.password')" />
					<div class="password-switch" @click="passwordType = passwordType === 'password' ? 'text' : 'password'">
						<svg-icon :icon-class="passwordType === 'password' ? 'eye' : 'eye-open'" />
					</div>
				</el-form-item>
				<el-form-item prop="repeatPassword">
					<div class="icon-wrap">
						<svg-icon icon-class="password" />
					</div>
					<el-input v-model="form.repeatPassword" :type="repeatPasswordType" autocomplete="new-password" :placeholder="$t('forgetPassword.placeholder.repeatPassword')" />
					<div class="password-switch" @click="repeatPasswordType = repeatPasswordType === 'password' ? 'text' : 'password'">
						<svg-icon :icon-class="repeatPasswordType === 'password' ? 'eye' : 'eye-open'" />
					</div>
				</el-form-item>
				<div class="action-btns">
					<el-button type="info" class="mr30" @click="$router.back()">{{ $t('forgetPassword.actions[0]') }}</el-button>
					<el-button type="primary" @click="resetPassword">{{ $t('forgetPassword.actions[1]') }}</el-button>
				</div>
			</el-form>
			<div class="contact-server">
				<a href="https://im.aichating.com/chat/client/seller_61356e3df2889/server_6135712ae9a03/domain_www.aichating.com" target="_blank">{{ $t('forgetPassword.actions[2]') }}</a>
			</div>
		</div>
	</div>
</template>

<script>
import { sampleSize } from 'lodash'
import { setTheme } from '@/utils/theme'
import { getSellerInfo, sendEmailVeriCode, resetPassword } from '@/api/auth.js'
const charSet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'

export default {
	name: 'ForgetPassword',
	data () {
		return {
			form: {
				email: '',
				veriCode: '',
				password: '',
				repeatPassword: ''
			},
			rules: {
				email: [
					{ required: true, message: this.$t('forgetPassword.tips.email[0]') },
					{ type: 'email', message: this.$t('forgetPassword.tips.email[1]') }
				],
				veriCode: { required: true, message: this.$t('forgetPassword.tips.veriCode') },
				password: { required: true, message: this.$t('forgetPassword.tips.password') },
				repeatPassword: { required: true, message: this.$t('forgetPassword.tips.repeatPassword') }
			},
			passwordType: 'password',
			repeatPasswordType: 'password',
			sellerInfo: {},
			disabled: false,
			disableDuration: 60
		}
	},
	created () {
		this.getSellerInfo()
		setTheme('light')
	},
	methods: {
		resetPassword () {
			this.$refs.form.validate(valid => {
				if (valid) {
					const { email: seller_email, veriCode: captcha, password, repeatPassword: repassword } = this.form
					resetPassword({ seller_email, captcha, password, repassword, customer_id: localStorageCompatible.getItem('uid') }).then(res => {
						const { code, msg } = res
						const success = code === 200
						this.$notify({
							title: success ? this.$t('forgetPassword.resetResult[0]') : this.$t('forgetPassword.resetResult[1]'),
							message: msg,
							type: success ? 'success' : 'error'
						})
						if (success) {
							setTimeout(() => {
								this.$router.replace('/login/seller')
							}, 1500)
						}
					})
				}
			})
		},
		getSellerInfo () {
			getSellerInfo().then(res => {
				const { code, data } = res
				if (code === 200) {
					this.sellerInfo = data
				}
			})
		},
		sendVeriCode () {
			this.$refs.form.validateField('email', err => {
				if (!err) {
					const { sellerInfo: { seller_code, t, token: tk }, form: { email } } = this
					const uid = sampleSize(charSet.split(''), 13).join('')
					sendEmailVeriCode({ t, tk, seller_code, email, customer_id: uid }).then(res => {
						const { code, msg } = res
						const success = code === 0
						this.$notify({
							title: success ? this.$t('forgetPassword.sendResult[0]') : this.$t('forgetPassword.sendResult[0]'),
							message: msg,
							type: success ? 'success' : 'error'
						})
						if (success) {
							this.disabled = true
							const timer = setInterval(() => {
								this.disableDuration--
								if (this.disableDuration === 0) {
									this.disabled = false
									this.disableDuration = 60
									clearInterval(timer)
								}
							}, 1000)
							localStorageCompatible.setItem('uid', uid)
						}
					})
				}
			})
		}
	}
}
</script>

<style lang="scss" scoped>
.forget-password {
	position: relative;
	display: flex;
	justify-content: center;
	background: #2d3a4b;
	height: 100vh;
	color: #eee;
	text-align: center;
	.back-home {
		position: absolute;
		z-index: 1;
		top: 40px;
		left: 120px;
		width: 34px;
		height: 34px;
		display: flex;
		align-items: center;
		justify-content: center;
		border-radius: 50%;
		background: rgba(172, 211, 255, 0.1);
		color: rgb(133, 191, 255);
		cursor: pointer;
		.material-icons-round {
			font-size: 22px;
		}
		.tips {
			display: none;
			position: absolute;
			top: 40px;
			z-index: 1;
			height: 30px;
			padding: 0 10px;
			white-space: nowrap;
			line-height: 30px;
			text-align: center;
			cursor: default;
			background: #fff;
			border-radius: 10px;
		}
		&:hover {
			.tips {
				display: block;
			}
		}
	}
	&__center {
		width: 400px;
		padding-top: 160px;
		.title {
			margin-bottom: 40px;
			font-size: 26px;
			font-weight: bold;
		}
		.desc {
			margin-bottom: 40px;
		}
		::v-deep.el-form {
			.el-form-item {
				.el-form-item__content {
					display: flex;
					align-items: center;
					height: 48px;
					border-radius: 5px;
					border: 1px solid rgba(255, 255, 255, 0.1);
					background: rgba(0, 0, 0, 0.1);
					.el-input__inner {
						border: none;
						color: #eee;
						background: transparent !important;
						&:-webkit-autofill {
							box-shadow: 0 0 0px 1000px #283443 inset !important;
							-webkit-text-fill-color: #fff !important;
						}
					}
					.icon-wrap {
						padding: 0 5px 0 15px;
						color: #889aa4;
					}
					.password-switch {
						margin-right: 10px;
						font-size: 16px;
						color: #889aa4;
						cursor: pointer;
						user-select: none;
					}
				}
				&:last-of-type {
					margin-bottom: 0;
				}
			}
		}
		.action-btns {
			display: flex;
			justify-content: space-between;
			margin-top: 40px;
			.el-button {
				flex: 1;
			}
		}
		.contact-server {
			margin-top: 52px;
			color: #ccc;
		}
	}
}
</style>
