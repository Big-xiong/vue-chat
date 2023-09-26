<template>
	<div class="check-page">
		<div class="check-content">
			<h2 class="title">{{$t('googleCheck.title')}}</h2>
			<div class="step">
				<Steps :stepNumber="3" :active="2" />
			</div>
			<el-form label-position="top-left" :model="promotData" ref="promotForm" class="promot-form">
				<el-form-item prop="code" :rules="rules.code" :label="$t('googleCheck.step3.label')">
					<el-input v-model="promotData.code" :placeholder="$t('googleCheck.step3.placeholder')" />
				</el-form-item>
			</el-form>
			<div class="footer">
				<el-button class="prev-btn" @click="prevStep">{{$t('googleCheck.btns[0]')}}</el-button>
				<el-button class="next-btn" @click="submitPromot">{{$t('googleCheck.btns[2]')}}</el-button>
			</div>
		</div>
	</div>
</template>
<script>
import Steps from '@/components/Step/index.vue'
import { mapState } from 'vuex'
import { checkGoogle, isKfInfosecret } from "@/api/auth";
export default {
	name: 'Login',
	components: {
		Steps
	},
	data () {
		return {
			active: 0,
			promotData: {
				code: ''
			},
			rules: {
				code: [
					{ required: true, message: '请输入双重验证码', trigger: 'blur' },
				],
			}
		}
	},
	computed: {
		...mapState("auth", ["lang", "server"]),
	},
	methods: {
		prevStep () {
			this.$router.push({
				path: '/GoogleCheckStep2'
			})
		},
		submitPromot () {
			this.$refs.promotForm.validate(valid => {
				if (valid) {
					let params = {
						code: this.promotData.code,
						secret: this.$route.query?.secret
					}
					checkGoogle(params).then(res => {
						const { code, data } = res
						if (code === 0 && data == 'SUCCESS') {
							// 验证成功调用绑定接口
							let _params = {
								secret: this.$route.query.secret,
								seller_id: this.server.kefu_id
							}
							isKfInfosecret(_params).then(res => {
								const { code } = res
								if (code === 0) {
									this.$message.success('验证成功')
									setTimeout(() => {
										this.$router.push({
											path: `/chat/server/${this.server.seller_code}`
										})
									}, 2000)
								} else {
									this.$message.error('绑定失败')
								}
							})
						} else {
							this.$message.error('验证码不正确')
						}
					})
				}

			})
		}
	},
	mounted () {

	}
}

</script>
<style lang="scss" scoped>
.check-page {
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
	.check-content {
		margin: 143px auto 0;
		width: 950px;
		text-align: center;
		background: #fff;
		padding: 34px 50px 0;
		border-radius: 30px;
		box-sizing: border-box;
		.title {
			font-size: 30px;
			font-weight: bold;
			color: #3b5ff5;
			margin-bottom: 30px;
		}
		.step {
			display: flex;
			justify-content: center;
			margin-bottom: 56px;
		}
		.promot-form {
			margin: 0 auto 132px;
			width: 390px;
			.el-form-item__label {
				color: #72798c;
				font-size: 14px;
			}
		}

		.footer {
			padding: 15px 0 16px;
			border-top: 1px solid #e7ebf2;
			position: relative;
			align-items: center;
			justify-content: center;
			box-sizing: border-box;
			.prev-btn {
				width: 186px;
				height: 48px;
				background: #e5f0fd;
				border-radius: 24px;
				border: none;
				color: #31363e;
			}
			.next-btn {
				margin-left: 18px;
				width: 186px;
				height: 48px;
				background: #5fd28e;
				border-radius: 24px;
				font-size: 16px;
				color: #ffffff;
				border: none;
			}
		}
	}
}
@media (max-width: 750px) {
	.check-page {
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
		.check-content {
			margin: 40px auto 40px;
			width: 90vw;
			text-align: center;
			background: #fff;
			padding: 34px 50px 0;
			border-radius: 30px;
			box-sizing: border-box;
			.title {
				font-size: 30px;
				font-weight: bold;
				color: #3b5ff5;
				margin-bottom: 30px;
			}
			.step {
				display: flex;
				justify-content: center;
				margin-bottom: 56px;
			}
			.promot-form {
				margin: 0 auto 132px;
				width: auto;
				.el-form-item__label {
					color: #72798c;
					font-size: 14px;
				}
			}

			.footer {
				padding: 15px 0 16px;
				border-top: 1px solid #e7ebf2;
				position: relative;
				align-items: center;
				justify-content: center;
				box-sizing: border-box;
				.prev-btn {
					width: 30vw;
					height: 48px;
					background: #e5f0fd;
					border-radius: 24px;
					border: none;
					color: #31363e;
				}
				.next-btn {
					margin-left: 8px;
					width: 30vw;
					height: 48px;
					background: #5fd28e;
					border-radius: 24px;
					font-size: 16px;
					color: #ffffff;
					border: none;
				}
			}
		}
	}
}
</style>