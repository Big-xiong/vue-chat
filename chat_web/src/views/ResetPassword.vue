<template>
	<!-- <div v-if="footerType !== 1 && !isMobile" class="reset-page"> -->
	<div class="reset-page">
		<el-button class="back-home" type="text" icon="el-icon-arrow-left">
			<router-link to="/">{{$t('goHome')}}</router-link>
		</el-button>
		<div class="reset-content">
			<h2 class="title">{{$t('resetPassword.title')}}</h2>
			<p class="desc">{{$t('resetPassword.desc')}}</p>
			<el-form label-position="top" :model="resetData" ref="resetForm" class="reset-form">
				<el-form-item required prop="email" :label="$t('resetPassword.label[0]')" :rules="rules.email">
					<el-input v-model="resetData.email" :placeholder="$t('resetPassword.placeholder[0]')" />
				</el-form-item>
				<el-form-item class="form-item-captcha" required prop="captcha" :label="$t('resetPassword.label[1]')" :rules="rules.captcha">
					<el-input class="captcha-input" v-model="resetData.captcha" :placeholder="$t('resetPassword.placeholder[1]')" />
					<el-button class="captcha-code" type="primary" :disabled="!isEnd" @click="sendEmaiCode('resetForm')">
						{{isEnd && seTime === 0?`${$t('resetPassword.btns[0]')}`:( seTime ? `${seTime}s${$t('resetPassword.btns[1]')}`:`$t('resetPassword.btns[1]')`)}}</el-button>
				</el-form-item>
				<el-form-item required prop="password" :rules="rules.password" :label="$t('resetPassword.label[2]')">
					<el-input type="password" v-model="resetData.password" :placeholder="$t('resetPassword.placeholder[2]')" />
				</el-form-item>
				<el-form-item required prop="repassword" :rules="rules.rePassword" :label="$t('resetPassword.label[3]')">
					<el-input type="password" v-model="resetData.repassword" :placeholder="$t('resetPassword.placeholder[3]')" />
				</el-form-item>
				<el-form-item>
					<el-button type="primary" class="submit-btn" @click="submitForm('resetForm')">{{$t('resetPassword.btn')}}</el-button>
				</el-form-item>
			</el-form>
		</div>
	</div>
</template>
<script>
import { mapState } from "vuex";
export default {
	name: "ResetPassword",
	data () {
		const validPassWord = (rule, val, cb) => {
			if (val.trim() === "") return cb("请输入密码！");
			if (!/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[^]{6,16}$/.test(val))
				return cb("6-16个字符，至少1个大写字母，1个小写字母和1个数字");
			return cb();
		};
		const reValidPassWord = (rule, val, cb) => {
			if (val.trim() === "") return cb("请输入重复密码！");
			if (this.resetData.password === val) return cb();
			return cb("两次输入密码不一致！");
		};
		return {
			seTime: 0,
			isEnd: true,
			resetData: {
				email: "",
				password: "",
				repassword: "",
				captcha: ""
			},
			rules: {
				email: [
					{ required: true, message: "请输入邮箱地址", trigger: "blur" },
					{
						type: "email",
						message: "请输入正确的邮箱地址",
						trigger: ["blur", "change"]
					}
				],
				captcha: {
					required: true,
					message: "请输入验证码",
					trigger: ["blur", "change"]
				},
				password: { validator: validPassWord, trigger: ["blur", "change"] },
				rePassword: { validator: reValidPassWord, trigger: ["blur", "change"] }
			}
		};
	},
	watch: {
		"resetData.captcha": (val, oldVal) => {
			if ((val.trim() || "").length < 5) return;
			return (this.resetData.captcha = oldVal);
		}
	},
	created () {
		if (this.$route.params.em) this.resetData.email = this.$route.params.em;
	},
	methods: {
		...mapState("basic", ["footerType"]),
		submitForm (formName) {
			this.$refs[formName].validate(valid => {
				if (!valid) return;
				this.resetPassWord();
			});
		},
		resetForm (formName) {
			this.$refs[formName].resetFields();
		},
		resetPassWord () {
			let data = {
				password: this.resetData.password,
				repassword: this.resetData.repassword,
				seller_email: this.resetData.email,
				captcha: this.resetData.captcha,
			};
			this.$api
				.repwd(data)
				.then(res => {
					console.log(res);
					if (res.code === 0) return this.$message.error(res.msg);
					this.resetForm("resetForm");
				})
				.catch(err => console.log(err));
		},
		sendEmaiCode (formName) {
			this.$refs[formName].validateField("email", vaild => {
				if (vaild || !this.isEnd) return;
				let data = {
					email: this.resetData.email
				};
				this.$api
					.sendEmailCode(data)
					.then(res => {
						if (res.code === 0 && res.msg !== "") {
							this.isEnd = false;
							this.seTime = 60;
							this.send2();
							this.$message.success("发送成功");
							return this.$message.error(res.msg);
						}
						if (res.code === -2 && res.msg !== "") {
							return this.$message.error(res.msg);
						}
					})
					.catch(err => {
						this.isEnd = true;
						console.log(err);
					});
			});
		},
		send2 () {
			if (this.seTime === 0) return;
			let timer = setInterval(() => {
				this.seTime -= 1;
				if (this.seTime !== 0 || this.seTime < 0) return;
				clearInterval(timer);
				this.isEnd = true;
			}, 1000);
		}
	}
};
</script>
<style lang="scss" scoped>
.reset-page {
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

	.reset-content {
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
		.reset-form {
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
		}
	}
}
@media (max-width: 750px) {
	.reset-page {
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

		.reset-content {
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
			.reset-form {
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
			&.el-button {
				background: #5fd28e;
			}
			img {
				width: 100%;
				height: 100%;
			}
		}
	}
}
.reset-content {
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
