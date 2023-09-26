<template>
	<div class="check-page">
		<img class="img-bg1" src="/images/common/login_bg_left.png" alt="">
		<img class="img-bg2" src="/images/common/login_bg_right.png" alt="">
		<el-button class="back-home" type="text" icon="el-icon-arrow-left">
			<router-link to="/">{{$t('goHome')}}</router-link>
		</el-button>
		<div class="check-content">
			<h2 class="title">{{$t('googleCheck.title')}}</h2>
			<div class="step">
				<Steps :stepNumber="3" :active="1" />
			</div>
			<div class="tips">{{$t('googleCheck.step2.tips')}}</div>
			<div class="content-center">
				<div class="ewm">
					<div id="qRcode" class="qRcode"></div>
					<div class="label">{{$t('googleCheck.step2.action')}}</div>
				</div>
				<div class="secret-key">
					<div class="key">
						<div class="code">{{key}}</div>
						<el-button class="copy-btn" @click="copyCode">{{$t('googleCheck.btns[3]')}}</el-button>
					</div>
					<div class="desc">{{$t('googleCheck.step2.desc1')}}</div>
				</div>
			</div>
			<div class="footer">
				<div class="desc">{{$t('googleCheck.step2.desc2')}}</div>
				<el-button class="prev-btn" @click="prevStep">{{$t('googleCheck.btns[0]')}}</el-button>
				<el-button class="next-btn" @click="nextStep">{{$t('googleCheck.btns[1]')}}</el-button>
			</div>
		</div>
	</div>
</template>
<script>
import QRCode from 'qrcodejs2'
import Steps from '@/components/common/Steps.vue'
import { mapState } from 'vuex'
export default {
	name: 'Login',
	components: {
		Steps
	},
	data () {
		return {
			active: 0,
			key: 'XTRUHBBXHJKKWERTYUIO'
		}
	},
	computed: {
		...mapState("basic", ["lang", "userInfo"]),
	},
	methods: {
		creatQrCode (data) {
			new QRCode('qRcode', {
				width: 110,
				height: 110,
				colorDark: '#111',
				colorLight: '#f5f5f5',
				text: data
			})
		},
		copyCode () {
			this.$copyText(this.key).then(() => {
				this.$message.success('复制成功')
			}, () => {
				this.$message.success('复制失败')
			})
		},
		getGoogleQrcode () {
			let params = {
				username: this.userInfo.seller_name,
				seller: 'aichating'
			}
			this.$api.getGoogle(params).then(res => {
				const { code, data, msg } = res
				if (code === 0) {
					this.key = msg
					this.creatQrCode(data)
				}
			})
		},
		prevStep () {
			this.$router.push({
				path: '/GoogleCheckStep1'
			})
		},
		nextStep () {
			this.$router.push({
				path: '/GoogleCheckStep3',
                query:{
                    sercet:this.key
                }
			})
		}
	},
	mounted () {
		this.getGoogleQrcode()
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
			margin-bottom: 34px;
		}
		.tips {
			font-size: 16px;
			font-weight: 500;
			color: #31363e;
			line-height: 22px;
			margin-bottom: 34px;
		}
		.content-center {
			display: flex;
			justify-content: center;
			margin-bottom: 32px;
			.ewm {
				.qRcode {
					display: flex;
					justify-content: center;
					align-items: center;
					margin-bottom: 13px;
				}
				.label {
					font-size: 14px;
					font-weight: 500;
					color: #3b5ff5;
					line-height: 28px;
				}
			}
			.secret-key {
				margin-left: 70px;
				max-width: 420px;
				.key {
					width: 397px;
					height: 50px;
					background: #ffffff;
					border-radius: 10px;
					border: 1px solid #e7ebf2;
					margin-bottom: 16px;
					padding: 5px;
					box-sizing: border-box;
					display: flex;
					align-items: center;
					.code {
						font-size: 14px;
						font-weight: 500;
						color: #28324c;
						line-height: 20px;
					}
					.copy-btn {
						margin-left: auto;
						width: 74px;
						height: 40px;
						background: #3b5ff5;
						border-radius: 8px;
						color: #fff;
						border: none;
					}
				}
				.desc {
					font-size: 14px;
					font-weight: 500;
					color: #72798c;
					line-height: 24px;
				}
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
			.desc {
				position: absolute;
				left: 50px;
				top: 0;
				height: 100%;
				display: flex;
				align-items: center;
				color: #72798c;
				font-size: 14px;
			}
		}
	}
}
</style>