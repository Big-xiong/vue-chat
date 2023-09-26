<template>
	<div class="login-page">
		<img class="img-bg1" src="/images/common/login_bg_left.png" alt="">
		<img class="img-bg2" src="/images/common/login_bg_right.png" alt="">
		<el-button class="back-home" type="text" icon="el-icon-arrow-left">
			<router-link to="/">{{$t('goHome')}}</router-link>
		</el-button>
		<div class="login-content">
			<h2 class="title" v-if="!service">{{$t('loginObj.business')}}</h2>
			<h2 class="title" v-if="service">{{$t('loginObj.desk')}}</h2>
			<!-- <p class="lg-desc">{{$t('loginObj.desc')}}</p> -->
			<el-form label-position="top" :model="loginData" ref="loginForm" class="login-form">
				<el-form-item prop="email" :rules="rules.email" :label="$t('loginObj.mail')">
					<el-input v-model="loginData.email" :placeholder="$t('loginObj.placeholderM')" />
				</el-form-item>
				<el-form-item :rules="rules.password" prop="password" :label="$t('loginObj.password')">
					<el-input type="password" v-model="loginData.password" :placeholder="$t('loginObj.placeholderP')" />
				</el-form-item>
				<el-form-item style="margin-bottom:0px" prop="captcha" :rules="rules.captcha" class="form-item-captcha" :label="$t('registerObj.vcode')">
					<el-input class="captcha-input" v-model="loginData.captcha" :placeholder="$t('registerObj.placeholderV')" />
					<div class="captcha-code">
						<img @click="getCaptcha" slot="append" :src="captchaurl" />
					</div>
				</el-form-item>
				<el-form-item style="margin-bottom:0px">
					<div class="form-redirect">
						<router-link v-if="!service" class="btn-default btn-register" tag="span" to="/register">{{$t('loginObj.regTeam')}}
						</router-link>
						<router-link v-if="!service" class="btn-default btn-forget" tag="span" to="/retrieve">{{$t('loginObj.forgetPwd')}}
						</router-link>
					</div>
				</el-form-item>
				<el-form-item>
					<el-button type="primary" class="submit-btn" @click="submitForm('loginForm')">{{$t('loginObj.loginNow')}}</el-button>
				</el-form-item>
				<el-form-item>
					<el-button type="text" class="to-other">
						<router-link to="/contact">{{$t('retrievePassword.btn3')}}</router-link>
					</el-button>
				</el-form-item>
			</el-form>
		</div>
	</div>
</template>
<script>
import { mapMutations } from 'vuex'
import { getAccess } from '@/api/cache'

export default {
	name: 'Login',
	props: {
		service: {
			type: Boolean,
			default: false
		}
	},
	data () {
		const validPassWord = (rule, val, cb) => {
			if (val.trim() === '') return cb('请输入密码！')
			if (val.trim().length < 6) return cb('6-16个字符!')
			return cb()
		}
		return {
			captchaurl: '',
			loginData: {
				email: '',
				password: '',
				captcha: ''
			},
			rules: {
				email: [
					{ required: true, message: '请输入邮箱地址', trigger: 'blur' },
				],
				password: { validator: validPassWord, trigger: ['blur', 'change'] },
				captcha: { required: true, message: '请输入验证码', trigger: 'blur' },
			}
		}
	},

	methods: {
		...mapMutations("basic", ["setToken", "setUserInfo"]),
		getCaptcha () {
			const exData = getAccess()
			this.captchaurl = process.env.VUE_APP_API_BASE + '/index/seller/verify?t='
				+ exData.time + '&tk=' + exData.token + '&seller_code=' + exData.seller
				+ '&customer_id=' + localStorage.getItem('uid') + '&' + new Date().getTime()
		},
		submitForm (formName) {
			this.$refs[formName].validate(valid => {
				if (!valid) return
				if (this.service) {
					this.serviceLogin()
				} else {
					this.login()
				}
			})
		},
		resetForm (formName) {
			this.$refs[formName].resetFields()
		},
		// 官网登录
		login () {
			let data = {
				captcha: this.loginData.captcha,
				password: this.loginData.password,
				username: this.loginData.email,
			}
			this.$api.doLogin(data).then(res => {
				if (res.code !== 0) {
					this.getCaptcha()
					this.$message.error(res.msg)
					return
				}

				localStorage.setItem('uid', res.data.seller_code)
				localStorage.setItem('userName', res.data.seller_name)
				localStorage.setItem('uName', res.data.seller_name)
				localStorage.setItem('avatar', res.data.seller_avatar)

				this.setToken(res.token)
				this.setUserInfo(res.data)

				this.$message.success('登录成功')
				setTimeout(() => {
					this.$router.push({
						path: '/'
					})
				}, 2000)
			})
		},
		// 商户端登录
		serviceLogin (data) {
			this.$api.doLogin(data).then(res => {
				if (res.code !== 200) {
					this.getCaptcha()
					this.$message.error(res.msg)
					return
				}
				this.$message.success('登录成功')
				setTimeout(() => {
					window.location.href = process.env.VUE_APP_API_BASE + '?token=' + res.token + '?data=' + JSON.stringify(res.data);
				}, 2000)
			})
		}
	},
	mounted () {
		this.getCaptcha()
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
		}
		.login-form {
			width: 100%;
			text-align: left;
			.el-form-item {
				margin-bottom: 20px;
				&:last-child {
					margin-bottom: 0;
				}
				.form-redirect {
					display: flex;
					justify-content: flex-end;
					color: #3b5ff5;
					span {
						margin-left: 10px;
					}
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
					&:last-child {
						margin-bottom: 0;
					}
					.form-redirect {
						display: flex;
						justify-content: flex-end;
						color: #3b5ff5;
						span {
							margin-left: 10px;
						}
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
		border: 1px solid #e7ebf2;
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