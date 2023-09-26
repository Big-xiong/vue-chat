<template>
	<div class="ac-about">
		<div class="linear-gradient">
			<div class="header-bg" :style="{height:lang == 'cn' && isMobile ? '260px': '320px'}">
				<div class="content">
					<div class="content-left">
						<div class="text-content">
							<div class="title">{{$t('about.header.title')}}</div>
							<div class="tips">{{$t('about.header.text1')}}</div>
							<div class="tips">{{$t('about.header.text2')}}</div>
						</div>
					</div>
					<div class="content-right">
						<img src="/images/about/about_banner_graphics@2x.png" alt="">
					</div>
				</div>

			</div>
		</div>
		<div class="about-content">
			<img class="img-bg" src="/images/common/com_bg_decoration_1.png" alt="">
			<div class="card">
				<div class="card-img">
					<img src="/images/about/about_ic_team.png" alt="">
				</div>
				<div class="card-content">
					<div class="card-title">{{$t('about.features.title1')}}</div>
					<div class="card-desc">{{$t('about.features.desc1')}}</div>
				</div>
			</div>
			<div class="card">
				<div class="card-img">
					<img src="/images/about/about_ic_service.png" alt="">
				</div>
				<div class="card-content">
					<div class="card-title">{{$t('about.features.title2')}}</div>
					<div class="card-desc">{{$t('about.features.desc2')}}</div>
				</div>
			</div>
			<div class="card">
				<div class="card-img">
					<img src="/images/about/about_ic_culture.png" alt="">
				</div>
				<div class="card-content">
					<div class="card-title">{{$t('about.features.title3')}}</div>
					<div class="card-desc">{{$t('about.features.desc3')}}</div>
				</div>
			</div>
		</div>
		<ContactCustomerService />
	</div>
</template>
<script>
import { mapState } from 'vuex'
import ContactCustomerService from '@/components/common/ContactCustomerService.vue'

export default {
	name: 'About',
	components: {
		ContactCustomerService
	},
	computed: {
		...mapState("basic", ["lang"]),
	}
}
</script>
<style lang="scss" scoped>
.ac-about {
	width: 100%;
	background: #fff;
	position: relative;
	padding-top: 70px;
}

.linear-gradient {
	.header-bg {
		text-align: left;
		height: 320px;
		background-position: center;
		background-repeat: no-repeat;
		background-size: cover;
		background-image: url("/images/common/banner.png");
		display: flex;
		align-items: center;

		.content {
			width: 1200px;
			margin: 0 auto;
			display: flex;
			.content-left {
				// padding-top: 80px;
				display: flex;
				align-items: center;
				.text-content {
					.title {
						border-left: 8px solid #fff;
						color: #fff;
						font-size: 38px;
						padding-left: 16px;
						margin-bottom: 21px;
					}
					.sub-title {
						font-size: 30px;
						font-weight: 600;
						color: #ffffff;
						line-height: 48px;
					}
					.tips {
						font-size: 16px;
						line-height: 18px;
						color: #fff;
					}
				}
			}
			.content-right {
				margin-left: auto;
				img {
					// width: 460px;
					height: 320px;
				}
			}
		}
	}
}

.about-content {
	width: 1200px;
	margin: 0 auto;
	background: #fff;
	.img-bg {
		position: absolute;
		left: 0;
		top: 400px;
	}
	.card {
		display: flex;
		padding: 70px 54px 59px;
		border-bottom: 1px dashed #e7ebf2;
		.card-img {
			width: 78px;
			height: 78px;
			img {
				width: 100%;
				height: 100%;
			}
		}
		.card-content {
			margin-left: 42px;
			text-align: left;
			.card-title {
				color: #28324c;
				font-size: 20px;
				font-weight: bold;
				margin-bottom: 20px;
			}
			.card-desc {
				font-size: 14px;
				color: #72798c;
				line-height: 20px;
			}
		}
	}
}

.ab-content {
	background-color: #fff;
	display: flex;
	justify-content: center;

	.ct-card {
		display: flex;
		flex-flow: column nowrap;
		align-items: center;
		margin: 100px 60px 100px 0;
		width: 360px;
		background: rgba(255, 255, 255, 1);
		border-radius: 10px;
		border: 1px solid rgba(0, 0, 0, 0.1);
		text-align: center;

		&:hover {
			box-shadow: 0 4px 10px 0 rgba(0, 0, 0, 0.1);
		}

		&:last-of-type {
			margin-right: 0;
		}
	}

	.cd-icon {
		display: block;
		margin: 50px auto;
	}

	.cd-name {
		width: 300px;
		font-size: 24px;
		font-family: PingFangSC-Heavy, PingFang SC;
		font-weight: 800;
		color: rgba(34, 34, 34, 1);
		line-height: 33px;
	}

	.cd-desc {
		margin: 20px auto;
		width: 300px;
		font-size: 20px;
		font-family: PingFangSC-Regular, PingFang SC;
		font-weight: 400;
		color: #9c9c9c;
		line-height: 28px;
	}
}
@media (max-width: 750px) {
	.ac-about {
		width: 100%;
		background: #fff;
		position: relative;
		padding-top: 70px;
	}

	.linear-gradient {
		.header-bg {
			text-align: left;
			height: 320px;
			background-position: center;
			background-repeat: no-repeat;
			background-size: cover;
			background-image: url("/images/common/banner.png");
			display: flex;
			align-items: center;

			.content {
				// width: 1200px;
				width: 100vw;
				height: 100%;
				// margin: 0 auto;
				display: flex;
				.content-left {
					max-width: 50vw;
					// padding-top: 70px;
					padding-left: 30px;
					display: flex;
					align-items: center;
					.text-content {
						.title {
							border-left: 4px solid #fff;
							color: #fff;
							font-size: 24px;
							padding-left: 16px;
							margin-bottom: 21px;
						}
						.sub-title {
							font-size: 16px;
							font-weight: 600;
							color: #ffffff;
							line-height: 24px;
							margin-bottom: 10px;
						}
						.tips {
							font-size: 14px;
							line-height: 18px;
							color: #fff;
						}
					}
				}
				.content-right {
					width: 50vw;
					display: flex;
					align-items: baseline;
					img {
						margin-top: auto;
						width: 48vw;
						height: auto;
						max-height: 260px;
					}
				}
			}
		}
	}

	.about-content {
		width: 100vw;
		margin: 0 auto;
		background: #fff;
		padding: 0 28px;
		box-sizing: border-box;
		.img-bg {
			position: absolute;
			left: 0;
			top: 400px;
		}
		.card {
			display: flex;
			padding: 70px 0 59px;
			box-sizing: border-box;
			border-bottom: 1px dashed #e7ebf2;
			.card-img {
				width: 78px;
				height: 78px;
				img {
					width: 78px;
					height: 78px;
				}
			}
			.card-content {
				margin-left: 42px;
				text-align: left;
				.card-title {
					color: #28324c;
					font-size: 20px;
					font-weight: bold;
					margin-bottom: 20px;
				}
				.card-desc {
					font-size: 14px;
					color: #72798c;
					line-height: 20px;
				}
			}
		}
	}

	.ab-content {
		background-color: #fff;
		display: flex;
		justify-content: center;

		.ct-card {
			display: flex;
			flex-flow: column nowrap;
			align-items: center;
			margin: 100px 60px 100px 0;
			width: 360px;
			background: rgba(255, 255, 255, 1);
			border-radius: 10px;
			border: 1px solid rgba(0, 0, 0, 0.1);
			text-align: center;

			&:hover {
				box-shadow: 0 4px 10px 0 rgba(0, 0, 0, 0.1);
			}

			&:last-of-type {
				margin-right: 0;
			}
		}

		.cd-icon {
			display: block;
			margin: 50px auto;
		}

		.cd-name {
			width: 300px;
			font-size: 24px;
			font-family: PingFangSC-Heavy, PingFang SC;
			font-weight: 800;
			color: rgba(34, 34, 34, 1);
			line-height: 33px;
		}

		.cd-desc {
			margin: 20px auto;
			width: 300px;
			font-size: 20px;
			font-family: PingFangSC-Regular, PingFang SC;
			font-weight: 400;
			color: #9c9c9c;
			line-height: 28px;
		}
	}
}
</style>
