<template>
	<!-- <div v-if="footerType !== 1 && !isMobile" class="register-page"> -->
	<div class="register-page">
		<img class="img-bg1" src="/images/common/login_bg_left.png" alt="">
		<img class="img-bg2" src="/images/common/login_bg_right.png" alt="">
		<el-button class="back-home" type="text" icon="el-icon-arrow-left">
			<router-link to="/">{{$t('goHome')}}</router-link>
		</el-button>
		<div class="register-content">
			<h2 class="title">{{$t("registerObj.register")}}</h2>
			<el-form label-position="top" :model="registerData" ref="reForm" class="register-form">
				<el-form-item required prop="customerName" :rules="rules.customerName" :label="$t('registerObj.enterprise')">
					<el-input v-model="registerData.customerName" :placeholder="$t('registerObj.placeholderE')" />
				</el-form-item>
				<el-form-item required prop="email" :label="$t('registerObj.loginMail')" :rules="rules.email">
					<el-input v-model="registerData.email" :placeholder="$t('registerObj.placeholderM')" />
				</el-form-item>
				<el-form-item required prop="password" :rules="rules.password" :label="$t('registerObj.password')">
					<el-input v-model="registerData.password" type="password" :placeholder="$t('registerObj.placeholderP')" />
				</el-form-item>
				<el-form-item prop="captcha" required :rules="rules.captcha" class="form-item-captcha" :label="$t('registerObj.vcode')">
					<el-input class="captcha-input" v-model="registerData.captcha" :placeholder="$t('registerObj.placeholderV')" />
					<div class="captcha-code">
						<img :src="captchaurl" ref="vcode" @click="loadCode" />
					</div>
				</el-form-item>
                <!-- <el-form-item required style="margin-bottom:0;">
					<el-checkbox v-model="isgoogle">{{$t('googleCheck.isgoogle')}}</el-checkbox>
				</el-form-item> -->
				<el-form-item>
					<el-button type="primary" class="submit-btn" @click="submitForm('reForm')">{{$t("registerObj.slogan")}}</el-button>
				</el-form-item>
				<el-form-item>
					<el-button type="text" class="to-other">
						<router-link to="/login">{{$t('registerObj.footerBtn')}}</router-link>
					</el-button>
				</el-form-item>
			</el-form>
		</div>
	</div>
</template>
<script>
import { mapMutations } from "vuex";
import { getAccess } from '@/api/cache'
export default {
	name: "Register",
	data () {
		const validPassWord = (rule, val, cb) => {
			if (val.trim() === "") return cb("请输入密码！");
			if (!/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[^]{6,16}$/.test(val))
				return cb("6-16个字符，至少1个大写字母，1个小写字母和1个数字");
			return cb();
		};
		return {
			registerData: {
				countryType: "1",
				customerName: "",
				captcha: "",
				email: "",
				password: ""
			},
			captchaurl: '',
            isgoogle:false,
			rules: {
				customerName: [
					{
						required: true,
						message: "请输入公司名称",
						trigger: ["blur", "change"]
					}
				],
				email: [
					{ required: true, message: "请输入邮箱地址", trigger: "blur" },
					{
						type: "email",
						message: "请输入正确的邮箱地址",
						trigger: ["blur", "change"]
					}
				],
				password: { validator: validPassWord, trigger: ["blur", "change"] },
				captcha: { required: true, message: "请输入验证码", trigger: "blur" }
			}
		};
	},
	watch: {},
	mounted () {
		this.loadCode();
	},
	methods: {
		...mapMutations("basic", ["setToken", "setUserInfo"]),
		submitForm (formName) {
			this.$refs[formName].validate(valid => {
				if (!valid) return console.log(valid);
				this.register();
			});
		},
		resetForm (formName) {
			this.$refs[formName].resetFields();
		},
		loadCode () {
			const exData = getAccess()
			this.captchaurl = process.env.VUE_APP_API_BASE + '/index/seller/verify?t='
				+ exData.time + '&tk=' + exData.token + '&seller_code=' + exData.seller
				+ '&customer_id=' + localStorage.getItem('uid') + '&' + new Date().getTime()
		},
		register () {
			let data = {
				seller_type: this.registerData.countryType,
				seller_name: this.registerData.customerName,
				seller_password: this.registerData.password,
				seller_email: this.registerData.email,
				captcha: this.registerData.captcha,
			};
			this.$api.register(data).then(res => {
				if (res.code !== 0) {
					this.loadCode()
					this.$message.error(res.msg)
					return
				}
				this.$message.success("注册成功")

				localStorage.setItem('uid', res.data.seller_code)
				localStorage.setItem('userName', res.data.seller_name)
				localStorage.setItem('uName', res.data.seller_name)
				localStorage.setItem('avatar', res.data.seller_avatar)

				this.setToken(res.token)
				this.setUserInfo(res.data)
                 setTimeout(() => {
                    this.$router.push({
                        path: '/'
                    })
                }, 2000)
				// if(this.isgoogle){
                //     setTimeout(() => {
                //         this.$router.push({
                //             path: '/GoogleCheckStep1'
                //         })
                //     }, 2000)
                // }else{
                //     setTimeout(() => {
                //         this.$router.push({
                //             path: '/'
                //         })
                //     }, 2000)
                // }
			});
		}
	}
};
</script>
<style lang="scss" scoped>
.register-page {
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

	.register-content {
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
		.register-form {
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
	.register-page {
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
			z-index: 1;
			display: none;
		}
		.img-bg2 {
			position: absolute;
			right: 0;
			bottom: 0;
			z-index: 1;
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

		.register-content {
			width: 100%;
			margin: 28px auto 0;
			background: linear-gradient(180deg, #ffffff 0%, #ffffff 100%);
			box-shadow: 1px 20px 40px 0px rgba(226, 231, 239, 0.45);
			border-radius: 30px;
			padding: 50px 50px 20px;
			box-sizing: border-box;
			z-index: 10;
			.title {
				font-size: 20px;
				font-weight: 600;
				color: #3b5ff5;
				margin-bottom: 50px;
			}
			.register-form {
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
.register-content {
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