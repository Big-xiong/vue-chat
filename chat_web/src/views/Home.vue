<template>
	<div class="home">
		<!-- banner -->
		<div class="banner">
			<el-carousel :interval="8000" :height="!isMobile ?'550px': '100vh'" ref="elCarousel" indicator-position="none" arrow="never" @change="setIndicator">
				<el-carousel-item class="item1">
					<div class="el-carousel-item-content">
						<div class="text text1">
							<div class="title">{{$t('index.banner[0].title')}}</div>
							<div class="sub-title last">{{$t('index.banner[0].subTitle1')}}</div>
							<div class="tips">{{$t('index.banner[0].tips1')}}</div>
							<div class="tips">{{$t('index.banner[0].tips2')}}</div>
							<router-link class="btn" to="/register">{{$t('index.banner[0].btn')}}</router-link>
						</div>
						<div class="img img1">
							<img src="/images/home/home_banner_element_1.png">
						</div>
					</div>
				</el-carousel-item>
				<el-carousel-item class="item2">
					<div class="el-carousel-item-content">
						<div class="text text2">
							<div class="title" v-if="lang == 'cn'">{{$t('index.banner[1].title')}}</div>
							<div class="sub-title">{{$t('index.banner[1].subTitle1')}}</div>
							<div class="tips">{{$t('index.banner[1].tips1')}}</div>
							<div class="tips">{{$t('index.banner[1].tips2')}}</div>
							<router-link class="btn" to="/register">{{$t('index.banner[0].btn')}}</router-link>
						</div>
						<div class="img img2">
							<img src="/images/home/home_banner_element_2.png">
						</div>
					</div>
				</el-carousel-item>
				<el-carousel-item class="item3">
					<div class="el-carousel-item-content">
						<div class="text text3">
							<div class="title">{{$t('index.banner[2].title')}}</div>
							<div class="sub-title last">{{$t('index.banner[2].subTitle1')}}</div>
							<div class="tips">{{$t('index.banner[2].tips1')}}<span class="time">10760</span><span class="unit">{{$t('index.banner[2].unit')}}</span></div>
							<router-link class="btn" to="/register">{{$t('index.banner[0].btn')}}</router-link>
						</div>
						<div class="img img3">
							<img src="/images/home/home_banner_element_3.png">
						</div>
					</div>
				</el-carousel-item>
				<el-carousel-item class="item4">
					<div class="el-carousel-item-content">
						<div class="text text4">
							<div class="title">{{$t('index.banner[3].title')}}</div>
							<div class="sub-title last">{{$t('index.banner[3].subTitle1')}}</div>
							<router-link class="btn" to="/register">{{$t('index.banner[0].btn')}}</router-link>
						</div>
						<div class="img img4">
							<img src="/images/home/home_banner_element_4.png">
						</div>
					</div>
				</el-carousel-item>
			</el-carousel>
			<div class="indicator">
				<div class="indicator-item" :class="{'active':indicator === 0}" @click="chnageIndicator(0)"></div>
				<div class="indicator-item" :class="{'active':indicator === 1}" @click="chnageIndicator(1)"></div>
				<div class="indicator-item" :class="{'active':indicator === 2}" @click="chnageIndicator(2)"></div>
				<div class="indicator-item" :class="{'active':indicator === 3}" @click="chnageIndicator(3)"></div>
			</div>
		</div>
		<!-- 简介 -->
		<div class="features">
			<div class="app-content">
				<div class="feature wow bounceInUp">
					<img class="feature-img" alt src="/images/home/feature_1.png" />
					<div class="feature-info">{{$t('index.feature.buildInfo')}}</div>
					<div class="feature-desc">{{$t('index.feature.buildDesc')}}</div>
				</div>
				<div class="feature wow bounceInUp">
					<img class="feature-img" alt src="/images/home/feature_2.png" />
					<div class="feature-info">{{$t('index.feature.simpleInfo')}}</div>
					<div class="feature-desc">{{$t('index.feature.simpleDesc')}}</div>
				</div>
				<div class="feature wow bounceInUp">
					<img class="feature-img" alt src="/images/home/feature_3.png" />
					<div class="feature-info">{{$t('index.feature.privateInfo')}}</div>
					<div class="feature-desc">{{$t('index.feature.privateDesc')}}</div>
				</div>
			</div>
		</div>
		<!-- 文字 -->
		<div class="tip-register">
			<div class="tip-info">
				<div class="line"></div>
				<div class="info-item">{{$t('index.tip.info')}}</div>
				<div class="line"></div>
			</div>
			<div class="tip-desc">{{$t('index.tip.desc')}}</div>
			<img src="/images/home/home_bg_element_1.png" alt="" class="img-bg">
		</div>
		<!-- 左右布局的详细说明 -->
		<div class="func-bg">
			<div class="func-detail">
				<div class="func-title wow slideInLeft" style="margin-right: 20px">
					<img class="func-index" src="/images/home/index_1.png" alt="">
					<div class="func-info">{{$t('index.funcDetail.chatInfo')}}</div>
					<div class="func-desc">{{$t('index.funcDetail.chatDesc1')}}</div>
				</div>
				<div class="func-img wow slideInRight">
					<img alt src="/images/home/home_pic_01@2x.png" />
				</div>
			</div>
			<div class="func-detail reverse">
				<div class="func-img wow slideInLeft">
					<img alt src="/images/home/home_pic_02@2x.png" />
				</div>
				<div class="func-title wow slideInRight" style="margin-left: 20px">
					<img class="func-index" src="/images/home/index_2.png" alt="">
					<div class="func-info">{{$t('index.funcDetail.manageInfo')}}</div>
					<div class="func-desc">{{$t('index.funcDetail.manageDesc1')}}</div>
					<div class="func-desc">{{$t('index.funcDetail.manageDesc2')}}</div>
				</div>
			</div>
			<div class="func-detail" style="padding-bottom: 20px">
				<div class="func-title wow slideInLeft" style="margin-right: 20px">
					<img class="func-index" src="/images/home/index_3.png" alt="">
					<div class="func-info">{{$t('index.funcDetail.reportInfo')}}</div>
					<div class="func-desc">{{$t('index.funcDetail.reportDesc1')}}</div>
					<div class="func-desc">{{$t('index.funcDetail.reportDesc2')}}</div>
				</div>
				<div class="func-img wow slideInRight">
					<img alt src="/images/home/home_pic_03@2x.png" />
				</div>
			</div>
			<div class="func-detail reverse" style="padding-bottom: 20px">
				<div class="func-img wow slideInLeft">
					<img alt src="/images/home/home_pic_04@2x.png" />
				</div>
				<div class="func-title wow slideInRight" style="margin-right: 20px">
					<img class="func-index" src="/images/home/index_4.png" alt="">
					<div class="func-info">{{$t('index.funcDetail.dataInfo')}}</div>
					<div class="func-desc">{{$t('index.funcDetail.dataDesc1')}}</div>
					<div class="func-desc">{{$t('index.funcDetail.dataDesc2')}}</div>
					<div class="func-desc">{{$t('index.funcDetail.dataDesc3')}}</div>
					<div class="func-desc">{{$t('index.funcDetail.dataDesc4')}}</div>
				</div>

			</div>
			<div class="func-detail" style="padding-bottom: 20px">
				<div class="func-title wow slideInLeft" style="margin-right: 20px">
					<img class="func-index" src="/images/home/index_5.png" alt="">
					<div class="func-info" style="margin-bottom:0;">{{$t('index.funcDetail.tranInfo1')}}</div>
					<div class="func-info">{{$t('index.funcDetail.tranInfo2')}}</div>
					<div class="func-desc">{{$t('index.funcDetail.tranDesc1')}}</div>
					<div class="func-desc">{{$t('index.funcDetail.tranDesc2')}}</div>
					<div class="func-desc">{{$t('index.funcDetail.tranDesc3')}}</div>
				</div>
				<div class="func-img wow slideInRight">
					<img alt src="/images/home/home_pic_05@2x.png" />
				</div>
				<img src="/images/home/home_bg_element_3.png" alt="" class="img-bg">
			</div>
		</div>
		<!-- 数字区域 -->
		<div class="desc-content" ref="descContent">
			<img src="/images/home/home_cooperation_bg.png" alt="">
			<div class="title">{{$t('index.descContent.title')}}</div>
			<div class="details">
				<div class="item">
					<div class="number">
						<countTo :startVal="0" ref="countTo1" :endVal="3241" :duration="2000" :autoplay="false" />
					</div>
					<div class="item-title">{{$t('index.descContent.label1')}}</div>
				</div>
				<div class="item">
					<div class="number">
						<countTo :startVal="0" ref="countTo2" :endVal="4238" :duration="2000" :autoplay="false" />
					</div>
					<div class="item-title">{{$t('index.descContent.label2')}}</div>
				</div>
				<div class="item">
					<div class="number">
						<countTo :startVal="0" ref="countTo3" :endVal="9000" :duration="2000" :autoplay="false" />
						W+
					</div>
					<div class="item-title">{{$t('index.descContent.label3')}}</div>
				</div>
			</div>
		</div>
		<!-- 试用入口区域 -->
		<div class="exper">
			<div class="exper-title">{{$t('index.exper.title')}}</div>
			<div class="exper-buttons">
				<router-link class="wow slideInRight" to="/price">
					<el-button class="footer-btn ckjg" type="success" style="cursor:pointer;font-size:18px;">{{$t('index.exper.ckjg')}}
					</el-button>
				</router-link>
				<router-link class="wow slideInLeft" to="/register">
					<el-button class="footer-btn jkty" type="info" style="cursor:pointer;font-size:18px;">{{$t('index.exper.jkty')}}</el-button>
				</router-link>
			</div>
		</div>
	</div>
</template>

<script>
import { WOW } from 'wowjs'
import { mapState } from 'vuex'
import countTo from 'vue-count-to';
import _ from 'lodash'
export default {
	name: 'Home',
	components: {
		countTo
	},
	data () {
		return {
			feature: false,
			timer: '',
			indicator: 0,
			first: true
		}
	},
	mounted () {
		var wow = new WOW({
			live: false,
			boxClass: 'wow',
			animateClass: 'animated',
			offset: 0,
			mobile: true
		})
		wow.init()
		document.addEventListener('mouseup', this.handleMouseUp)
		let intersectionObserver = new IntersectionObserver((entries) => {
			if (entries[0].isIntersecting && this.first) {
				this.first = false
				this.$refs.countTo1?.start()
				this.$refs.countTo2?.start()
				this.$refs.countTo3?.start()
			}
		});
		intersectionObserver.observe(this.$refs.descContent);
	},
	computed: {
		...mapState("basic", ["lang", "headerType"]),
	},
	methods: {
		moveChange: _.debounce(function (type) {
			if (type == 1) {
				this.$refs.elCarousel.prev()
			}
			if (type == 2) {
				this.$refs.elCarousel.next()
			}
		}, 300),
		handleMouseUp () {
			this.startX = ''
		},
		chnageIndicator (index) {
			this.indicator = index
			this.$refs.elCarousel.setActiveItem(index)
		},
		setIndicator (index) {
			this.indicator = index
		}
	},
	beforeDestroy () {
		document.removeEventListener('mouseup', this.handleMouseUp)
	}
}
</script>
<style lang="scss" scoped>
@import "~@/styles/variable.scss";
.el-carousel__item {
	img {
		width: 100%;
		// height: 100%;
	}
}
.an {
	display: none;
}

.animated {
	display: block;
}

.el-button--primary {
	color: #fff;
	background-color: #345eea;
	border-color: #345eea;
}

.el-button--primary:hover {
	background-color: #4e72eb;
	border-color: #4e72eb;
}

.el-button--primary:focus {
	background-color: #4e72eb;
	border-color: #4e72eb;
}

.el-button--info {
	color: #fff;
	background-color: #21325b;
	border-color: #fff;
}

.el-button--info:hover {
	background-color: #2b395c;
	border-color: #2b395c;
}

.el-button--info:focus {
	background-color: #2b395c;
	border-color: #2b395c;
}

.el-button--success {
	color: #2b395c;
	background-color: #fff;
	border-color: #fff;
}

.el-button--success:hover {
	color: #fff;
	background-color: #345eea;
	border-color: #345eea;
}

.el-button--success:focus {
	color: #fff;
	background-color: #345eea;
	border-color: #345eea;
}
#parentIframe {
	position: fixed;
	bottom: 30px;
	right: 30px;
}

.home {
	width: 100%;
	padding-top: 70px;
	.banner {
		user-select: none;
		position: relative;
		.el-carousel__item {
			&.item1 {
				background-size: cover;
				background-position: center;
				background-image: url("/images/home/home_banner_1.png");
			}
			&.item2 {
				background-size: cover;
				background-position: center;
				background-image: url("/images/home/home_banner_2.png");
			}
			&.item3 {
				background-size: cover;
				background-position: center;
				background-image: url("/images/home/home_banner_3.png");
			}
			&.item4 {
				background-size: cover;
				background-position: center;
				background-image: url("/images/home/home_banner_4.png");
			}
			.el-carousel-item-content {
				width: 1200px;
				margin: 0 auto;
				display: flex;
				height: 100%;
				align-items: center;
				.text {
					text-align: left;
					max-width: 650px;
					.title {
						color: #fff;
						font-size: 54px;
						margin-bottom: 21px;
						margin-bottom: 8px;
						// line-height: 75px;
						line-height: 48px;
					}
					.sub-title {
						font-size: 30px;
						font-weight: bold;
						color: #ffffff;
						// line-height: 42px;
						&.last {
							margin-bottom: 40px;
						}
					}
					.tips {
						font-weight: 500;
						color: rgba(255, 255, 255, 0.8);
						// line-height: 22px;
						font-size: 16px;
						margin-top: 10px;
						.time {
							font-weight: 600;
							color: #5fd28e;
							line-height: 72px;
							font-size: 60px;
						}
						.unit {
							font-weight: bold;
							color: rgba(255, 255, 255, 0.8);
							line-height: 56px;
							font-size: 40px;
						}
					}
					a.btn {
						display: flex;
						align-items: center;
						justify-content: center;
						width: 200px;
						height: 48px;
						background: #5fd28e;
						border-radius: 24px;
						color: #fff !important;
						margin-top: 30px;
						border: none;
						outline: none;
						font-weight: bold;
						line-height: 22px;
						font-size: 16px;
					}
				}
				.img {
					margin-left: auto;
					width: 580px;
					height: 410px;
					margin-top: 86px;
				}
			}
		}
		.indicator {
			position: absolute;
			left: 50%;
			bottom: 30px;
			transform: translateX(-50%);
			z-index: 10;
			display: flex;
			align-items: center;
			.indicator-item {
				width: 10px;
				height: 10px;
				background: #ffffff;
				border-radius: 50%;
				opacity: 0.5;
				margin: 0 7px;
				cursor: pointer;
				&.active {
					width: 12px;
					height: 12px;
					background: #5fd28e;
					opacity: 1;
				}
			}
		}
	}

	.features {
		background-color: white;
		.app-content {
			width: 1200px;
			margin: 0 auto;
			display: flex;
		}

		.feature {
			margin: 100px 60px 0 0;
			padding: 40px 50px;
			text-align: left;
			// display: flex;
			// flex-direction: column;
			// align-items: center;
			// text-align: center;
			width: 360px;
			// height: 380px;
			// border: 1px solid rgba(0, 0, 0, 0.1);
			transition: box-shadow 0.5s;
			background: #ffffff;
			box-shadow: 0 4px 10px 0 rgba(0, 0, 0, 0.1);

			border-radius: 10px;
			&:hover {
				box-shadow: 0px 20px 40px 0px rgba(59, 95, 245, 0.14);
			}
			&:last-of-type {
				margin-right: 0;
			}

			&:first-child {
				margin-left: 0;
			}

			.feature-img {
				width: 60px;
				height: 60px;
				margin-top: 20px;
			}

			.feature-info {
				margin-top: 30px;
				font-weight: 800;
				font-size: 20px;
				color: #28324c;
				line-height: 33px;
			}

			.feature-desc {
				margin-top: 20px;
				font-size: 14px;
				font-weight: 400;
				color: #72798c;
				line-height: 28px;
			}
		}
	}

	.tip-register {
		padding: 150px 0 50px;
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		position: relative;
		.img-bg {
			position: absolute;
			left: 116px;
			top: 30px;
		}

		.tip-info {
			display: flex;
			align-items: center;
			max-width: 1200px;
			.line {
				width: 36px;
				height: 4px;
				background: #28324c;
				margin: 0 34px;
			}
			.info-item {
				margin: 0 auto;
				font-size: 40px;
				font-weight: 800;
				color: #28324c;
			}
		}

		.tip-desc {
			margin-top: 20px;
			font-size: 16px;
			// width: 900px;
		}

		.tip-btn {
			margin-top: 40px;
			width: 200px;
			height: 56px;
			box-shadow: 0px 10px 20px 0px $primary-color;
			border-radius: 6px;
			border: 1px solid $primary-color;
			font-size: 22px;
			color: white;
			background: $primary-color;
		}
	}

	.func-bg {
		background: white;

		.func-detail {
			margin: 0 auto;
			width: 100%;
			max-width: 1200px;
			padding-top: 50px;
			display: flex;
			align-items: center;
			text-align: center;
			padding-left: 30px;
			padding-right: 30px;
			position: relative;
			.img-bg {
				position: absolute;
				left: -150px;
				top: 13px;
			}
			.func-title {
				padding-left: 12px;
				text-align: left;
			}

			&:nth-child(2n + 1) {
				.func-img {
					margin-left: 0;
					margin-right: 80px;
				}
			}
			.func-index {
				width: 56px;
				height: 28px;
				text-align: left;
			}
			.func-info {
				text-align: left;
				font-size: 30px;
				font-weight: 800;
				color: #3b5ff5;
				margin-bottom: 20px;
			}

			.func-desc {
				text-align: left;
				font-size: 16px;
				color: #72798c;
				// margin-top: 20px;
				width: 500px;
			}

			.func-img {
				/*margin-left: 70px;*/
				/*width: calc(100% - 640px);*/
				// border: 1px dashed #72798c;
				&.slideInRight {
					margin-left: auto;
				}
				img {
					width: 100%;
					// box-shadow: 0 4px 10px 0 rgba(0, 0, 0, 0.1);
				}
				// &:hover {
				// 	box-shadow: 0 4px 10px 0 rgba(0, 0, 0, 0.1);
				// }
			}
		}
	}

	.desc-content {
		width: 100%;
		padding: 70px 0 109px;
		background: #eef6ff;
		backdrop-filter: blur(36.78796768188477px);
		position: relative;
		display: flex;
		flex-direction: column;
		align-items: center;
		img {
			position: absolute;
			left: 121px;
			bottom: 0;
		}
		.title {
			font-weight: bold;
			color: #28324c;
			line-height: 42px;
			font-size: 30px;
			margin-bottom: 48px;
		}
		.details {
			display: flex;
			z-index: 1;
			.item {
				padding-bottom: 14px;
				border-bottom: 1px solid #28324c;
				width: 260px;
				margin-right: 80px;
				text-align: left;
				&:last-child {
					margin-right: 0;
				}
				.number {
					font-weight: 600;
					color: #28324c;
					line-height: 60px;
					font-size: 48px;
				}
				.item-title {
					font-weight: 500;
					color: #28324c;
					line-height: 28px;
					font-size: 16px;
				}
			}
		}
	}

	.exper {
		height: 180px;
		background-size: cover;
		background-position: center;
		background-image: url("/images/home/home_blue_bg.png");
		display: flex;
		flex-direction: column;
		align-items: center;
		// justify-content: center;
		color: white;

		.exper-title {
			margin-top: 26px;
			font-size: 30px;
			font-weight: 800;
		}

		// .exper-subTitle {
		// 	margin-top: 40px;
		// 	font-size: 26px;
		// }

		.exper-buttons {
			margin-top: 26px;
			font-size: 22px;
			display: flex;
			.wow {
				flex: 1;
				&:last-child {
					margin-left: 40px;
				}
			}
			.footer-btn {
				width: 200px;
				height: 48px;
				border-radius: 24px;
				font-weight: bold;
				color: #ffffff;
				border: none;
				outline: none;
				box-shadow: 0px 10px 20px 0px rgba(52, 94, 234, 0.2);
				&.ckjg {
					background: #8199ff;
				}

				&.jkty {
					background: #5fd28e;
				}
			}
		}
	}
}
@media (max-width: 750px) {
	.home {
		padding-top: 0;
		width: 100vw;
		.banner {
			user-select: none;
			position: relative;
			.el-carousel__item {
				&.item1 {
					background-size: cover;
					background-position: center;
					background-image: url("/images/home/home_banner_1.png");
				}
				&.item2 {
					background-size: cover;
					background-position: center;
					background-image: url("/images/home/home_banner_2.png");
				}
				&.item3 {
					background-size: cover;
					background-position: center;
					background-image: url("/images/home/home_banner_3.png");
				}
				&.item4 {
					background-size: cover;
					background-position: center;
					background-image: url("/images/home/home_banner_4.png");
				}
				.el-carousel-item-content {
					width: 100vw;
					display: flex;
					flex-direction: column-reverse;
					height: 100%;
					padding-top: 70px;
					padding-bottom: 42px;
					box-sizing: border-box;
					.text {
						text-align: left;
						padding: 0 20px;
						max-width: 100vw;
						height: 50%;
						.title {
							color: #fff;
							font-size: 30px;
							margin-bottom: 21px;
							margin-bottom: 8px;
							// line-height: 75px;
							line-height: 38px;
						}
						.sub-title {
							font-size: 17px;
							font-weight: bold;
							color: #ffffff;
							// line-height: 42px;
							&.last {
								margin-bottom: 20px;
							}
						}
						.tips {
							font-weight: 500;
							color: rgba(255, 255, 255, 0.8);
							// line-height: 22px;
							font-size: 12px;
							margin-top: 10px;
							.time {
								font-weight: 600;
								color: #5fd28e;
								line-height: 30px;
								font-size: 30px;
							}
							.unit {
								font-weight: bold;
								color: rgba(255, 255, 255, 0.8);
								line-height: 40px;
								font-size: 20px;
							}
						}
						a.btn {
							margin: 0 auto;
							display: flex;
							align-items: center;
							justify-content: center;
							width: 200px;
							height: 48px;
							background: #5fd28e;
							border-radius: 24px;
							color: #fff !important;
							margin-top: 30px;
							border: none;
							outline: none;
							font-weight: bold;
							line-height: 22px;
							font-size: 14px;
						}
					}
					.img {
						width: 100vw;
						height: 50%;
						margin-top: 0;
						display: flex;
						align-items: center;
						justify-content: center;
						padding: 0 15px;
						box-sizing: border-box;
					}
				}
			}
			.indicator {
				position: absolute;
				left: 50%;
				bottom: 30px;
				transform: translateX(-50%);
				z-index: 10;
				display: flex;
				align-items: center;
				.indicator-item {
					width: 10px;
					height: 10px;
					background: #ffffff;
					border-radius: 50%;
					opacity: 0.5;
					margin: 0 7px;
					cursor: pointer;
					&.active {
						width: 12px;
						height: 12px;
						background: #5fd28e;
						opacity: 1;
					}
				}
			}
		}

		.features {
			background-color: white;
			.app-content {
				width: 100vw !important;
				padding: 28px 28px;
				display: flex;
				flex-wrap: wrap;
			}

			.feature {
				margin: 0 0 28px;
				padding: 30px;
				text-align: left;
				width: calc(100vw - 56px);
				transition: box-shadow 0.5s;
				background: #ffffff;
				box-shadow: 0 4px 10px 0 rgba(0, 0, 0, 0.1);
				border-radius: 10px;
				box-sizing: border-box;
				text-align: center;
				&:hover {
					box-shadow: 0px 20px 40px 0px rgba(59, 95, 245, 0.14);
				}
				&:last-of-type {
					margin-right: 0;
				}

				&:first-child {
					margin-left: 0;
				}

				.feature-img {
					width: 60px;
					height: 60px;
					margin-top: 20px;
				}

				.feature-info {
					margin-top: 30px;
					font-weight: 800;
					font-size: 20px;
					color: #28324c;
					line-height: 33px;
				}

				.feature-desc {
					margin-top: 20px;
					font-size: 14px;
					font-weight: 400;
					color: #72798c;
					line-height: 28px;
					text-align: left;
				}
			}
		}

		.tip-register {
			padding: 150px 0 50px;
			display: flex;
			flex-direction: column;
			justify-content: center;
			align-items: center;
			position: relative;
			.img-bg {
				position: absolute;
				left: 116px;
				top: 30px;
			}

			.tip-info {
				display: flex;
				align-items: center;
				// max-width: 1200px;
				width: 100vw;
				box-sizing: border-box;
				.line {
					width: 36px;
					height: 4px;
					background: #28324c;
					margin: 0 34px 0;
				}
				.info-item {
					margin: 0 auto;
					font-size: 22px;
					font-weight: 800;
					color: #28324c;
				}
			}

			.tip-desc {
				width: 100vw;
				box-sizing: border-box;
				padding: 0 28px;
				margin-top: 20px;
				font-size: 14px;
				// width: 900px;
			}

			.tip-btn {
				margin-top: 40px;
				width: 200px;
				height: 56px;
				box-shadow: 0px 10px 20px 0px $primary-color;
				border-radius: 6px;
				border: 1px solid $primary-color;
				font-size: 22px;
				color: white;
				background: $primary-color;
			}
		}

		.func-bg {
			background: white;

			.func-detail {
				margin: 0 auto;
				width: 100vw;
				padding-top: 50px;
				display: flex;
				align-items: center;
				text-align: center;
				flex-direction: column;
				padding-left: 30px;
				padding-right: 30px;
				box-sizing: border-box;
				position: relative;
				&.reverse {
					flex-direction: column-reverse;
				}
				.img-bg {
					position: absolute;
					left: -150px;
					top: 13px;
				}
				.func-title {
					width: 100%;
					padding-left: 12px;
					text-align: left;
					box-sizing: border-box;
				}

				&:nth-child(2n + 1) {
					.func-img {
						margin-left: 0;
						margin-right: 80px;
					}
				}
				.func-index {
					width: 56px;
					height: 28px;
					text-align: left;
				}
				.func-info {
					text-align: left;
					font-size: 28px;
					font-weight: 800;
					color: #3b5ff5;
					margin-bottom: 20px;
					width: 100%;
				}

				.func-desc {
					width: 100%;
					text-align: left;
					font-size: 16px;
					color: #72798c;
					// margin-top: 20px;
					// width: 500px;
				}

				.func-img {
					/*margin-left: 70px;*/
					/*width: calc(100% - 640px);*/
					// border: 1px dashed #72798c;
					&.slideInRight {
						margin-left: auto;
					}
					img {
						width: 100%;
						// box-shadow: 0 4px 10px 0 rgba(0, 0, 0, 0.1);
					}
					// &:hover {
					// 	box-shadow: 0 4px 10px 0 rgba(0, 0, 0, 0.1);
					// }
				}
			}
		}

		.desc-content {
			width: 100%;
			padding: 35px 0 0;
			background: #eef6ff;
			backdrop-filter: blur(36.78796768188477px);
			position: relative;
			display: flex;
			flex-direction: column;
			align-items: center;
			img {
				display: none;
				position: absolute;
				left: 121px;
				bottom: 0;
			}
			.title {
				font-weight: bold;
				color: #28324c;
				line-height: 42px;
				font-size: 20px;
				margin-bottom: 24px;
			}
			.details {
				width: 100vw;
				display: flex;
				flex-direction: column;
				align-items: center;
				z-index: 1;
				.item {
					padding-bottom: 14px;
					border-bottom: 1px solid #28324c;
					width: 260px;
					margin-right: 80px;
					margin-right: 0;
					text-align: left;
					margin-bottom: 25px;
					&:last-child {
						margin-right: 0;
					}
					.number {
						font-weight: 600;
						color: #28324c;
						line-height: 60px;
						font-size: 28px;
					}
					.item-title {
						font-weight: 500;
						color: #28324c;
						line-height: 28px;
						font-size: 14px;
					}
				}
			}
		}

		.exper {
			height: auto;
			background-size: cover;
			background-position: center;
			background-image: url("/images/home/home_blue_bg.png");
			display: flex;
			flex-direction: column;
			align-items: center;
			// justify-content: center;
			color: white;
			padding: 28px 0;

			.exper-title {
				margin-top: 0;
				font-size: 20px;
				font-weight: 800;
			}

			// .exper-subTitle {
			// 	margin-top: 40px;
			// 	font-size: 26px;
			// }

			.exper-buttons {
				margin-top: 26px;
				font-size: 22px;
				display: flex;
				padding: 0 20px;
				.wow {
					flex: 1;
					&:last-child {
						margin-left: 5px;
					}
				}
				.footer-btn {
					width: 160px;
					height: 40px;
					border-radius: 24px;
					font-weight: bold;
					color: #ffffff;
					border: none;
					outline: none;
					box-shadow: 0px 10px 20px 0px rgba(52, 94, 234, 0.2);
					font-size: 14px;
					&.ckjg {
						background: #8199ff;
					}

					&.jkty {
						background: #5fd28e;
					}
				}
			}
		}
	}
}
</style>