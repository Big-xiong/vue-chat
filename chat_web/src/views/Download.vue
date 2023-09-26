<template>
	<div class="down-content">
		<div class="linear-gradient">
			<div class="header-bg" :style="{height:lang == 'cn' && isMobile ? '260px': '320px'}">
				<div class="content">
					<div class="content-left">
						<div class="text-content">
							<div class="title">{{$t('download.header[0]')}}</div>
							<div class="tips">{{$t('download.header[1]')}}</div>
						</div>
					</div>
					<div class="content-right">
						<img src="/images/download/download_banner_graphics@2x.png" alt="">
					</div>
				</div>

			</div>
		</div>
		<div class="down-main">
			<img class="img-bg" src="/images/common/com_bg_decoration_1.png" alt="">
			<div class="card">
				<div class="img">
					<img src="/images/download/down_ic_win.png" alt="">
				</div>
				<div class="title">{{$t('download.card[0].title')}}</div>
				<div class="tip">{{$t('download.card[0].desc')}}</div>
				<a class="menu-item" href="https://download.aichat2022.com/aichat.rar">{{$t('download.card[0].btn')}}</a>
			</div>
			<div class="card">
				<div class="img">
					<img src="/images/download/down_ic_mac.png" alt="">
				</div>
				<div class="title">{{$t('download.card[1].title')}}</div>
				<div class="tip">{{$t('download.card[1].desc')}}</div>
				<a class="menu-item" href="https://download.aichat2022.com/macaichat.zip ">{{$t('download.card[1].btn')}}</a>
			</div>
		</div>
	</div>
</template>
<script>
import { mapState } from "vuex";
export default {
	name: "Download",
	data () {
		return {
		};
	},
	computed: {
		...mapState("basic", ["lang"]),
	}
};
</script>
<style lang="scss" scoped>
.down-content {
	width: 100%;
	position: relative;
	padding-top: 70px;
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
							line-height: 22px;
							color: #fff;
						}
					}
				}
				.content-right {
					margin-left: auto;
					img {
						width: 460px;
						height: 320px;
					}
				}
			}
		}
	}
	.down-main {
		background: #fff;
		display: flex;
		align-items: center;
		justify-content: center;
		padding: 90px 0;
		width: 1200px;
		margin: 0 auto;
		.img-bg {
			position: absolute;
			left: 0;
			top: 400px;
		}
		.card {
			width: 240px;
			height: 340px;
			background: #fff;
			box-shadow: 0px 10px 20px 0px rgba(75, 105, 250, 0.12);
			border-radius: 10px;
			border: 1px solid #e7ebf2;
			display: flex;
			flex-direction: column;
			align-items: center;
			padding-top: 39px;
			box-sizing: border-box;
			margin: 0 40px;
			&:hover {
				border: 2px solid #b6d7ff;
				background: #b6d7ff;
				.btn {
					background: #3b5ff5;
				}
			}
			.img {
				width: 70px;
				height: 70px;
				background: rgba(255, 255, 255, 0.8);
				border-radius: 50%;
				display: flex;
				align-items: center;
				justify-content: center;
				margin-bottom: 34px;
			}
			.title {
				font-size: 24px;
				font-weight: bold;
				color: #28324c;
				line-height: 33px;
				margin-bottom: 14px;
			}
			.tip {
				font-size: 16px;
				font-weight: 500;
				color: #72798c;
				line-height: 24px;
			}
			.menu-item {
				width: 100px;
				height: 40px;
				background: #5fd28e;
				border-radius: 24px;
				margin-top: 40px;
				color: #fff !important;
				border: none;
				outline: none;
				font-size: 16px;
				display: flex;
				align-items: center;
				justify-content: center;
			}
		}
	}
}
@media (max-width: 750px) {
	.down-content {
		width: 100%;
		position: relative;
		padding-top: 70px;
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
		.down-main {
			background: #fff;
			display: flex;
			align-items: center;
			justify-content: center;
			padding: 90px 0;
			width: 100vw;
			margin: 0 auto;
			padding: 28px 28px;
			box-sizing: border-box;
			.img-bg {
				position: absolute;
				left: 0;
				top: 400px;
				display: none;
			}
			.card {
				width: 46%;
				height: auto;
				background: #fff;
				box-shadow: 0px 10px 20px 0px rgba(75, 105, 250, 0.12);
				border-radius: 10px;
				border: 1px solid #e7ebf2;
				display: flex;
				flex-direction: column;
				align-items: center;
				padding: 40px 20px 60px;
				box-sizing: border-box;
				margin: 0 10px;
				&:hover {
					border: 2px solid #b6d7ff;
					background: #b6d7ff;
					.btn {
						background: #3b5ff5;
					}
				}
				.img {
					width: 70px;
					height: 70px;
					background: rgba(255, 255, 255, 0.8);
					border-radius: 50%;
					display: flex;
					align-items: center;
					justify-content: center;
					margin-bottom: 24px;
				}
				.title {
					font-size: 17px;
					font-weight: bold;
					color: #28324c;
					line-height: 17px;
					margin-bottom: 9px;
				}
				.tip {
					font-size: 12px;
					font-weight: 500;
					color: #72798c;
					line-height: 12px;
				}
				.menu-item {
					width: 100px;
					height: 40px;
					background: #5fd28e;
					border-radius: 24px;
					margin-top: 40px;
					font-size: 14px;
					color: #fff !important;
					border: none;
					outline: none;
					display: flex;
					align-items: center;
					justify-content: center;
				}
			}
		}
	}
}
</style>
