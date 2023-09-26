<template>
	<div class="check-page">
		<div class="check-content">
			<h2 class="title">{{$t('googleCheck.title')}}</h2>
			<div class="step">
				<Steps :stepNumber="3" :active="0" />
			</div>
			<div class="tips">{{$t('googleCheck.step1.tips')}}</div>
			<div id="qRcode" class="qRcode"></div>
			<div class="label" @click="download">{{$t('googleCheck.step1.action')}}</div>
			<div class="footer">
				<div class="desc">{{$t('googleCheck.step1.desc')}}</div>
				<el-button class="btn" @click="nextStep">{{$t('googleCheck.btns[1]')}}</el-button>
			</div>
		</div>
	</div>
</template>
<script>
import QRCode from 'qrcodejs2'
import Steps from '@/components/Step/index.vue'
export default {
	name: 'Login',
	components: {
		Steps
	},
	data () {
		return {
			active: 0,
			iosUrl: 'https://apps.apple.com/cn/app/google-authenticator/id388497605',
			androidUrl: "https://jms-pkg.oss-cn-beijing.aliyuncs.com/Google%20Authenticator_v5.10_apkpure.com.apk"
		}
	},
	methods: {
		creatQrCode () {
			new QRCode('qRcode', {
				width: 110,
				height: 110,
				colorDark: '#111',
				colorLight: '#f5f5f5',
				text: 'https://download.aichat2022.com/demo.html'
			})
		},
		nextStep () {
			this.$router.push({
				path: '/GoogleCheckStep2'
			})
		},
		async getUrl () {
			/* 智能机浏览器版本信息: */
			let browser = {
				versions: function () {
					let u = navigator.userAgent;
					return {
						//移动终端浏览器版本信息
						trident: u.indexOf('Trident') > -1, //IE内核
						presto: u.indexOf('Presto') > -1, //opera内核
						webKit: u.indexOf('AppleWebKit') > -1, //苹果、谷歌内核
						gecko: u.indexOf('Gecko') > -1 && u.indexOf('KHTML') == -1, //火狐内核
						mobile: !!u.match(/AppleWebKit.*Mobile.*/) || !!u.match(/AppleWebKit/), //是否为移动终端
						ios: !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/), //ios终端
						android: u.indexOf('Android') > -1 || u.indexOf('Linux') > -1, //android终端或者uc浏览器
						iPhone: u.indexOf('iPhone') > -1 || u.indexOf('Mac') > -1, //是否为iPhone或者QQHD浏览器
						iPad: u.indexOf('iPad') > -1, //是否iPad
						webApp: u.indexOf('Safari') == -1 //是否web应该程序，没有头部与底部
					};
				}(),
				language: (navigator.browserLanguage || navigator.language).toLowerCase()
			}
			if (browser.versions.ios || browser.versions.iPhone || browser.versions.iPad) {
				// 此处写iOS的下载地址
				return this.iosUrl
			} else if (browser.versions.android) {
				// 此处写Andoird 的下载地址
				return this.androidUrl
			}
			return ''
		},
		async download () {
			let url = await this.getUrl()
			if (!url) {
				return
			}
			const skypeA = document.createElement('a')
			skypeA.setAttribute('href', url)
			skypeA.setAttribute('target', '_blank')
			skypeA.style.position = 'relative'
			skypeA.style.zIndex = 1
			document.body.appendChild(skypeA)
			skypeA.click()
			setTimeout(() => {
				skypeA.parentNode.removeChild(skypeA)
			})
		}
	},
	mounted () {
		this.creatQrCode()
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
			margin-bottom: 32px;
            cursor: pointer;
		}
		.footer {
			padding: 15px 0 16px;
			border-top: 1px solid #e7ebf2;
			position: relative;
			align-items: center;
			box-sizing: border-box;
			.btn {
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
				margin-bottom: 32px;
			}
			.footer {
				padding: 15px 0 16px;
				border-top: 1px solid #e7ebf2;
				align-items: center;
				box-sizing: border-box;
                display: flex;
                flex-direction: column;
                align-items: center;
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
				}
				.btn {
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
}
</style>