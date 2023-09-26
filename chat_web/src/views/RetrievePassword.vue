<template>
	<!-- <div v-if="footerType !== 1 && !isMobile" class="retrieve-page"> -->
	<div class="retrieve-page">
		<el-button class="back-home" type="text" icon="el-icon-arrow-left">
			<router-link to="/">{{$t('goHome')}}</router-link>
		</el-button>
		<div class="retrieve-content">
			<h2 class="title">{{$t('retrievePassword.title')}}</h2>
			<p class="desc">{{$t('retrievePassword.desc')}}</p>
			<el-form label-position="top" :model="formData" @submit.native.prevent ref="sendEmailForm" class="retrieve-form">
				<el-form-item prop="email" :label="$t('retrievePassword.label[0]')" :rules="rules.email">
					<el-input v-model="formData.email" :placeholder="$t('retrievePassword.placeholder[0]')" />
				</el-form-item>
				<el-form-item>
					<div class="footer-btn">
						<el-button type="primary" class="btn back-btn" @click="$router.go(-1)">{{$t('retrievePassword.btn1')}}</el-button>
						<el-button type="primary" class="btn submit-btn" @click="submitForm('sendEmailForm')">{{$t('retrievePassword.btn2')}}</el-button>
					</div>
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

export default {
	name: 'RetrievePassword',
	data () {
		return {
			formData: {
				email: '',
				captcha: ''
			}
		}
	},
	computed: {
		rules: () => ({
			email: [
				{ required: true, message: '请输入邮箱地址', trigger: 'blur' },
				{
					type: 'email',
					message: '请输入正确的邮箱地址',
					trigger: ['blur', 'change']
				}
			]
		})
	},
	methods: {
		submitForm (formName) {
			this.$refs[formName].validate(valid => {
				if (valid) return this.sendEmaiCode()
			})
		},
		resetForm (formName) {
			this.$refs[formName].resetFields()
		},
		sendEmaiCode () {
			if (!this.formData.email.trim()) return
			let data = {
				captcha: this.formData.captcha,
				email: this.formData.email
			}
			this.$api
				.sendEmailCode(data)
				.then(res => {
					if (res.code === 0 && res.msg !== '') {
						return this.$message.error(res.msg)
					} else {
						this.$message.success('发送成功')
						setTimeout(() => {
							this.$router.push({
								name: 'ResetPassword',
								params: {
									em: this.formData.email
								}
							})
						}, 2000)
					}

				})
				.catch(err => console.log(err))
		}
	}
}
</script>
<style lang="scss" scoped>
.retrieve-page {
	height: 100vh;
	position: relative;
	overflow: auto;
	background: #f2f8ff;
	padding-top: 70px;
	box-sizing: border-box;
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

	.retrieve-content {
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
			margin-bottom: 20px;
		}
		.desc {
			font-size: 16px;
			font-weight: 500;
			color: #31363e;
			margin-bottom: 34px;
		}
		.retrieve-form {
			width: 100%;
			text-align: left;
			.el-form-item {
				margin-bottom: 20px;
				&:last-child {
					margin-bottom: 0;
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
			.footer-btn {
				display: flex;
				align-items: center;
				.btn {
					width: 48%;
					border: none;
					outline: none;
					&.back-btn {
						height: 48px;
						background: #e5f0fd;
						border-radius: 24px;
						display: flex;
						align-items: center;
						justify-content: center;
						color: #31363e;
						font-weight: bold;
						font-size: 16px;
					}
					&.submit-btn {
						margin-left: auto;
						height: 48px;
						background: #5fd28e;
						border-radius: 24px;
						display: flex;
						align-items: center;
						justify-content: center;
						color: #fff;
						font-weight: bold;
						font-size: 16px;
					}
				}
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
	.retrieve-page {
		height: 100vh;
		position: relative;
		overflow: auto;
		background: #f2f8ff;
		padding: 70px 28px 28px;
		box-sizing: border-box;
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

		.retrieve-content {
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
				margin-bottom: 20px;
			}
			.desc {
				font-size: 16px;
				font-weight: 500;
				color: #31363e;
				margin-bottom: 34px;
			}
			.retrieve-form {
				width: 100%;
				text-align: left;
				.el-form-item {
					margin-bottom: 20px;
					&:last-child {
						margin-bottom: 0;
					}
				}

				.el-form-item__label {
					width: 100%;
					height: 28px;
					font-size: 14px;
					font-weight: bold;
					color: #72798c;
					line-height: 28px;
					padding: 0;
					// margin-bottom: 10px;
				}
				.footer-btn {
					display: flex;
					align-items: center;
					.btn {
						width: 48%;
						border: none;
						outline: none;
						&.back-btn {
							height: 48px;
							background: #e5f0fd;
							border-radius: 24px;
							display: flex;
							align-items: center;
							justify-content: center;
							color: #31363e;
							font-weight: bold;
							font-size: 16px;
						}
						&.submit-btn {
							margin-left: auto;
							height: 48px;
							background: #5fd28e;
							border-radius: 24px;
							display: flex;
							align-items: center;
							justify-content: center;
							color: #fff;
							font-weight: bold;
							font-size: 16px;
						}
					}
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
	padding-top: 70px;
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
.retrieve-content {
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

