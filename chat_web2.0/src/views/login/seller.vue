<template>
	<div class="login-page">
		<el-button v-show="!$IS_ELECTRON" class="back-home" type="text" icon="el-icon-arrow-left">
			<a :href="domainLink" target="_blank">{{$t('sellerLogin.actions[4]')}}</a>
		</el-button>
		<div class="login-content">
			<h2 class="title">{{$t('sellerLogin.title')}}</h2>
			<el-form label-position="top" :model="loginData" ref="loginForm" class="login-form">
				<el-form-item prop="username" :rules="loginRules.username" :label="$t('sellerLogin.label.username')">
					<el-input v-model="loginData.username" :placeholder="$t('sellerLogin.placeholder.username')" />
				</el-form-item>
				<el-form-item :rules="loginRules.password" prop="password" :label="$t('sellerLogin.label.password')">
					<el-input :type="passwordType" v-model="loginData.password" :placeholder="$t('sellerLogin.placeholder.password')" />
					<span class="show-pwd" @click="passwordChange">
						<svg-icon :icon-class="passwordType === 'password' ? 'eye' : 'eye-open'" />
					</span>
				</el-form-item>
				<el-form-item style="margin-bottom:0px" prop="captcha" :rules="loginRules.captcha" class="form-item-captcha" :label="$t('sellerLogin.label.captcha')">
					<el-input class="captcha-input" v-model="loginData.captcha" :placeholder="$t('sellerLogin.placeholder.captcha')" @keyup.enter.native="sellerLoginHandler" />
					<div class="captcha-code">
						<img @click="getCaptcha" slot="append" :src="captchaurl" />
					</div>
				</el-form-item>
				<el-form-item style="margin-bottom:0px">
					<div class="form-redirect">
						<a class="btn-default btn-register" :href="`${domainLink}/register`" target="_blank">{{$t('sellerLogin.actions[1]')}}
						</a>
						<a class="btn-default btn-forget" :href="`${domainLink}/retrieve`" target="_blank">{{$t('sellerLogin.actions[2]')}}
						</a>
					</div>
				</el-form-item>
				<el-form-item>
					<el-button type="primary" :loading="loading" class="submit-btn" @click.native.prevent="sellerLoginHandler">{{$t('sellerLogin.actions[0]')}}</el-button>
				</el-form-item>
				<el-form-item>
					<el-button type="text" class="to-other">
						<a :href="kefuLink" target="_blank">{{$t('sellerLogin.actions[3]')}}</a>
					</el-button>
				</el-form-item>
			</el-form>
		</div>
		<GoogleModal ref="GoogleModal" />
	</div>
</template>
<script>
import GoogleModal from "@/components/GoogleModal/index.vue";
import { mapActions, mapMutations } from 'vuex'
import { getLanguage } from '@/lang/index.js'
// import { setTheme } from '@/utils/theme'
export default {
	name: 'Login',
	components: {
		GoogleModal
	},
	data () {
		// const validPassWord = (rule, val, cb) => {
		// 	if (val.trim() === '') return cb('请输入密码！')
		// 	if (val.trim().length < 6) return cb('6-16个字符!')
		// 	return cb()
		// }
		return {
			domainLink: '',
			chatLink: '',
            kefuLink:"",
			captchaurl: '',
			dialogVisible: false,
			googleCode: '',
			loginData: {
				username: '',
				password: '',
				captcha: ''
			},
			loginRules: {
				username: [{ required: true, trigger: 'blur', message: this.$t('sellerLogin.tips.username') }],
				password: [{ required: true, trigger: 'blur', message: this.$t('sellerLogin.tips.password') }],
				captcha: [{ required: true, trigger: 'blur', message: this.$t('sellerLogin.tips.captcha') }]
			},
			// rules: {
			// 	username: [
			// 		{ required: true, message: '请输入邮箱地址', trigger: 'blur' },
			// 	],
			// 	password: { validator: validPassWord, trigger: ['blur', 'change'] },
			// 	captcha: { required: true, message: '请输入验证码', trigger: 'blur' },
			// },
			loading: false,
			captchaurl: '',
			passwordType: 'password'
		}
	},
	methods: {
		...mapMutations({
			setToken: 'auth/setToken',
			setSeller: 'auth/setSeller'
		}),
		...mapActions({
			sellerLogin: 'auth/sellerLogin'
		}),
		passwordChange () {
			if (this.passwordType === 'password') {
				this.passwordType = ''
			} else {
				this.passwordType = 'password'
			}
		},
		getCaptcha () {
			this.captchaurl = `${process.env.VUE_APP_BASE_URL}/captcha.html?t=${Date.now()}`
		},
		sellerLoginHandler () {
			this.$refs.loginForm.validate(valid => {
				if (valid) {
					this.loading = true
					this.sellerLogin(this.loginData).then(res => {
						const { code, data, token, msg } = res
						if (code === 0) {
							//添加判断是否进行二次谷歌验证
							if (data.isgoole == 1 && data.secret) {
								//需要二次验证
								// 保存token和data传入谷歌验证弹窗
								let params = {
									token: token,
									userInfo: data,
									from: 'seller'
								}
								this.$refs.GoogleModal.show(params)
							} else {
								// 不需要二次验证
								this.setToken(token)
								this.setSeller(data)
								this.$router.push({ path: '/' })
							}
							// this.$router.push({ path: '/' })
						} else {
							this.$message.error(msg)
							this.timestamp = Date.now()
						}
						this.loading = false
					})
				}
			})
		},
		setDocTitle () {
			const lang = getLanguage()
			document.title = {
				'zh': '爱洽客服v2后台管理',
				'en': 'Aicha customer service v2 background management',
				'vi': 'Quản lý nền Aicha Customer Service v2',
				'th': 'การจัดการพื้นหลังการบริการลูกค้า Aicha v2'
			}[lang]
		},
	},
	mounted () {
		this.setDocTitle()
		this.getCaptcha()
		// setTheme('light')
	},
    created(){
        this.domainLink = process.env.VUE_APP_DOMAIN
        this.chatLink = process.env.VUE_APP_LINK
        this.kefuLink = process.env.NODE_ENV == 'development' ? `${process.env.VUE_APP_LINK}/chat/client/seller_61356e3df2889/server_61d52c7c39074/domain_www.kaifa.com` : `${process.env.VUE_APP_LINK}/chat/client/seller_61356e3df2889/server_6135712ae9a03/domain_aichat360.com`
    }
}

</script>
<style lang="scss" scoped>
.login-page {
	height: 100vh;
	position: relative;
	overflow: auto;
	background: #f2f8ff;
	padding-top: 70px;
	box-sizing: border-box;
	.img-bg1 {
		position: absolute;
		left: 0;
		top: 0;
	}
	.img-bg2 {
		position: absolute;
		right: 0;
		bottom: 0;
	}
	.back-home {
		position: absolute;
		z-index: 1;
		top: 95px;
		left: 120px;
		font-size: 16px;
		color: #3b5ff5;

		a {
			color: #3b5ff5 !important;
		}
	}

	.login-content {
		width: 530px;
		margin: 80px auto 0;
		background: linear-gradient(180deg, #ffffff 0%, #ffffff 100%);
		box-shadow: 1px 20px 40px 0px rgba(226, 231, 239, 0.45);
		border-radius: 30px;
		padding: 50px 50px 20px;
		box-sizing: border-box;
		.title {
			font-size: 20px;
			font-weight: 600;
			color: #3b5ff5;
			margin-bottom: 50px;
			text-align: center;
		}
		.login-form {
			width: 100%;
			text-align: left;
			.el-form-item {
				margin-bottom: 20px;
				position: relative;
				&:last-child {
					margin-bottom: 0;
				}
				.form-redirect {
					display: flex;
					justify-content: flex-end;
					color: #3b5ff5;
					.btn-default {
						margin-left: 10px;
					}
				}

				.show-pwd {
					position: absolute;
					right: 10px;
					top: 7px;
					font-size: 16px;
					color: #889aa4;
					cursor: pointer;
					user-select: none;
				}
			}

			.el-form-item__label {
				width: 100%;
				height: 28px;
				font-size: 14px;
				font-weight: bold;
				color: #72798c;
				line-height: 28px;
				// margin-bottom: 10px;
			}
			.submit-btn {
				width: 100%;
				height: 48px;
				background: #5fd28e;
				border-radius: 24px;
				display: flex;
				justify-content: center;
				align-items: center;
				font-size: 16px;
				border: none;
				outline: none;
				margin: 30px 0 0;
			}

			.to-other {
				color: #3b5ff5;
				font-weight: 500;
				width: 100%;
				display: flex;
				justify-content: center;
				align-items: center;

				a {
					color: #3b5ff5 !important;
				}
			}
		}
	}
}
@media (max-width: 750px) {
	.login-page {
		height: 100vh;
		position: relative;
		overflow: auto;
		background: #f2f8ff;
		padding: 70px 28px 28px;
		box-sizing: border-box;
		.img-bg1 {
			position: absolute;
			left: 0;
			top: 0;
			display: none;
		}
		.img-bg2 {
			position: absolute;
			right: 0;
			bottom: 0;
			display: none;
		}
		.back-home {
			position: absolute;
			z-index: 1;
			top: 95px;
			left: 120px;
			font-size: 16px;
			color: #3b5ff5;
			display: none;

			a {
				color: #3b5ff5 !important;
			}
		}

		.login-content {
			width: 100%;
			margin: 28px auto 0;
			background: linear-gradient(180deg, #ffffff 0%, #ffffff 100%);
			box-shadow: 1px 20px 40px 0px rgba(226, 231, 239, 0.45);
			border-radius: 30px;
			padding: 50px 50px 20px;
			box-sizing: border-box;
			.title {
				font-size: 20px;
				font-weight: 600;
				color: #3b5ff5;
				margin-bottom: 50px;
			}
			.login-form {
				width: 100%;
				text-align: left;
				.el-form-item {
					margin-bottom: 20px;
					position: relative;
					&:last-child {
						margin-bottom: 0;
					}
					.form-redirect {
						display: flex;
						justify-content: flex-end;
						color: #3b5ff5;
						.btn-default {
							margin-left: 10px;
						}
					}
					.show-pwd {
						position: absolute;
						right: 10px;
						top: 7px;
						font-size: 16px;
						color: #889aa4;
						cursor: pointer;
						user-select: none;
					}
				}

				.el-form-item__label {
					width: 100%;
					height: 28px;
					font-size: 14px;
					font-weight: bold;
					color: #72798c;
					line-height: 28px;
					// margin-bottom: 10px;
				}
				.submit-btn {
					width: 100%;
					height: 48px;
					background: #5fd28e;
					border-radius: 24px;
					display: flex;
					justify-content: center;
					align-items: center;
					font-size: 16px;
					border: none;
					outline: none;
					margin: 30px 0 0;
				}

				.to-other {
					color: #3b5ff5;
					font-weight: 500;
					width: 100%;
					display: flex;
					justify-content: center;
					align-items: center;

					a {
						color: #3b5ff5 !important;
					}
				}
			}
		}
	}
}
</style>

<style lang="scss">
.form-item-captcha {
	.el-form-item__content {
		display: flex;
		flex-wrap: nowrap;
		.captcha-input {
			flex: 2;
			.el-input__inner {
				border-radius: 10px 0 0 10px;
			}
		}
		.captcha-code {
			flex: 1;
			height: 48px;
			border-radius: 0 10px 10px 0;
			border: 1px solid #e7ebf2;
			border-left: none;
			box-sizing: border-box;
			cursor: pointer;
			overflow: hidden;
			img {
				width: 100%;
				height: 100%;
			}
		}
	}
}
.login-content {
	.el-input__inner {
		height: 48px;
		background: linear-gradient(180deg, #ffffff 0%, #ffffff 100%);
		border-radius: 10px;
		border: 1px solid #e7ebf2 !important;
		height: 48px;
		box-sizing: border-box;
		&::placeholder {
			font-size: 14px;
			font-weight: 500;
			color: #72798c;
		}
	}
}
</style>
