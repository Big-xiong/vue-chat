<template>
	<div class="check-page">
		<div class="check-content">
			<h2 class="title">{{$t('googleCheck.title')}}</h2>
			<div class="step">
				<Steps :stepNumber="3" :active="1" />
			</div>
			<div class="tips">{{$t('googleCheck.step2.tips')}}</div>
			<div class="content-center">
				<div class="ewm">
					<img class="qRcode" :src="imgSrc" alt="">
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
import Steps from '@/components/Step/index.vue'
import { mapState } from 'vuex'
import { getGoogle } from "@/api/auth";
export default {
	name: 'Login',
	components: {
		Steps
	},
	data () {
		return {
			active: 0,
			imgSrc: '',
			key: 'XTRUHBBXHJKKWERTYUIO'
		}
	},
	computed: {
		...mapState("auth", ["lang", "server"]),
	},
	methods: {
		copyCode () {
			this.$copyText(this.key).then(() => {
				this.$message.success('复制成功')
			}, () => {
				this.$message.success('复制失败')
			})
		},
        
		getGoogleQrcode () {
			let params = {
				username: this.server.kefu_name,
				seller: 'aichating'
			}
			getGoogle(params).then(res => {
				const { code, data, msg } = res
				if (code === 0) {
					this.imgSrc = data
					this.key = msg
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
				query: {
					secret: this.key
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
					width: 110px;
					height: 110px;
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
			margin: 40px auto 0;
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
                flex-direction: column;
                align-items: center;
				justify-content: center;
				margin-bottom: 32px;
				.ewm {
					.qRcode {
						width: 110px;
						height: 110px;
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
					margin-left: 0;
					max-width: 100%;
                    display: flex;
                    flex-direction: column;
                    align-items: center;
					.key {
						width: 100%;
						height: 50px;
						background: #ffffff;
						border-radius: 10px;
						border: 1px solid #e7ebf2;
						margin-bottom: 16px;
						padding: 5px;
                        padding-right: 74px;
						box-sizing: border-box;
						display: flex;
						align-items: center;
                        position: relative;
						.code {
							font-size: 14px;
							font-weight: 500;
							color: #28324c;
							line-height: 20px;
						}
						.copy-btn {
                            position: absolute;
							margin-left: auto;
							width: 74px;
							height: 40px;
                            top: 5px;
                            right: 5px;
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
                display: flex;
				align-items: center;
				justify-content: center;
                flex-wrap: wrap;
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
				.desc {
					position: relative;
					left: auto;
					top: auto;
					height: auto;
					display: flex;
					align-items: center;
					color: #72798c;
					font-size: 14px;
                    margin-bottom: 20px;
                    width: 100%;
                    justify-content: center;
				}
			}
		}
	}
}
</style>