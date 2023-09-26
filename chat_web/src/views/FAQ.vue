<template>
	<!-- <div v-if="footerType !== 1 && !isMobile" class="faq-content"> -->
	<div class="faq-content">
		<div class="linear-gradient">
			<div class="header-bg" :style="{height:lang == 'cn' && isMobile ? '260px': '320px'}">
				<div class="content">
					<div class="content-left">
						<div class="text-content">
							<div class="title">{{$t('faqObj.title')}}</div>
							<div class="tips">{{$t('faqObj.text')}}</div>
						</div>
					</div>

					<div class="content-right">
						<img src="/images/faq/help_banner_graphics@2x.png" alt="">
					</div>
				</div>

			</div>
		</div>
		<div class="faq-main">
			<img class="img-bg" src="/images/common/com_bg_decoration_1.png" alt="">
			<div class="main-crad" v-for="(cardItem, fix) in questionList" :key="fix">
				<div class="cd-name">
					<h2 class="name">{{cardItem.name}}</h2>
					<p class="desc">{{cardItem.desc}}</p>
				</div>
				<div class="cd-answer">
					<ul class="aswer-list" v-for="(questionItem, index) in cardItem.question" :key="index">
						<li class="aswer-item">
							<h2 class="name" :style="{ 'border-bottom': isShowIndex === (fix +'-'+ index) ? 'none': '' }">
								<span>{{questionItem.name}}</span>
								<img class="handler-icon" src="/images/common/swicht.png" :style="{ transform: isShowIndex === (fix +'-'+ index) ? 'rotate(-135deg)': '' }" @click="handlerShowItem(index, fix)" />
							</h2>
							<ul class="answer" :class="{show: isShowIndex === (fix +'-'+ index)}">
								<li class="text" v-for="(item, index) in questionItem.answer" :key="index">
									<p class="t">{{item}}</p>
								</li>
							</ul>
						</li>
					</ul>
				</div>
			</div>
		</div>
		<ContactCustomerService />
	</div>
</template>
<script>
import ContactCustomerService from "@/components/common/ContactCustomerService";
import { mapState } from "vuex";
export default {
	name: "FAQ",
	components: {
		ContactCustomerService
	},
	data () {
		return {
			isShowIndex: "",
			questionList: []
		};
	},
	created () {
		this.questionList = this.$t("FAQ");
	},
	computed: {
		...mapState("basic", ["lang"]),
	},
	methods: {
		handlerShowItem (index, fix) {
			let str = String(fix) + "-" + String(index);
			if (str === this.isShowIndex) return (this.isShowIndex = "");
			this.isShowIndex = str;
		}
	}
};
</script>
<style lang="scss" scoped>
.faq-content {
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
						line-height: 22px;
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
.faq-main {
	background: #fff;
	display: flex;
	flex-flow: column nowrap;
	text-align: left;
	align-items: center;
	padding: 80px 0 147px;
	.img-bg {
		position: absolute;
		left: 0;
		top: 400px;
	}
	.main-crad {
		transition: all 0.8s;

		&:nth-of-type(2n) {
			margin: 127px 0;
		}

		.cd-name {
			width: 1200px;
			.name {
				height: 56px;
				font-size: 30px;
				font-weight: 800;
				color: #3b5ff5;
				line-height: 56px;
			}

			.desc {
				margin-top: 20px;
				font-size: 16px;
				font-weight: 500;
				color: #1d2130;
				line-height: 30px;
				margin-bottom: 40px;
			}
		}

		.cd-answer {
			// margin-left: 160px;

			.aswer-list {
				&:last-of-type .aswer-item {
					.name {
						border-bottom: none;
					}
				}

				.aswer-item {
					width: 100%;
					background: #f2f8ff;
					margin-bottom: 30px;
					padding: 0 24px;
					border-radius: 10px;
					.name {
						padding: 12px 0 20px;
						height: 33px;
						font-size: 20px;
						font-weight: 800;
						color: #28324c;
						line-height: 28px;
						display: flex;
						align-items: center;
						&::before {
							content: "";
							width: 6px;
							height: 6px;
							background: #3b5ff5;
							border-radius: 3px;
							margin-right: 10px;
						}
						.handler-icon {
							margin-left: auto;
							transition: all 0.38s ease;
							width: 20px;
							height: 20px;
							cursor: pointer;
						}
					}

					.answer {
						transition: height 0.38s ease, opacity 0.8s ease;
						visibility: hidden;
						opacity: 0;
						height: 0;
					}

					.show {
						height: auto;
						opacity: 1;
						visibility: visible;
						padding-bottom: 20px;
					}

					.text {
						font-size: 20px;
						font-family: PingFangSC-Medium, PingFang SC;
						font-weight: 500;
						color: rgba(64, 64, 64, 1);
						line-height: 30px;
					}
				}
			}
		}
	}
}
@media (max-width: 750px) {
	.faq-content {
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
	.faq-main {
		background: #fff;
		display: flex;
		flex-flow: column nowrap;
		text-align: left;
		align-items: center;
		padding: 80px 0 147px;
		.img-bg {
			position: absolute;
			left: 0;
			top: 400px;
		}
		.main-crad {
			transition: all 0.8s;

			&:nth-of-type(2n) {
				margin: 127px 0;
			}

			.cd-name {
				width: 100vw;
				padding: 0 28px;
				box-sizing: border-box;
				.name {
					height: 56px;
					font-size: 30px;
					font-weight: 800;
					color: #3b5ff5;
					line-height: 56px;
				}

				.desc {
					margin-top: 20px;
					font-size: 16px;
					font-weight: 500;
					color: #1d2130;
					line-height: 30px;
					margin-bottom: 40px;
				}
			}

			.cd-answer {
				// margin-left: 160px;

				.aswer-list {
					width: 100%;
					padding: 0 28px;
					box-sizing: border-box;
					&:last-of-type .aswer-item {
						.name {
							border-bottom: none;
						}
					}

					.aswer-item {
						width: 100%;
						background: #f2f8ff;
						margin-bottom: 30px;
						padding: 0 24px;
						border-radius: 10px;
						box-sizing: border-box;
						.name {
							padding: 12px 0 20px;
							height: 33px;
							font-size: 20px;
							font-weight: 800;
							color: #28324c;
							line-height: 28px;
							display: flex;
							align-items: center;
							&::before {
								content: "";
								width: 6px;
								height: 6px;
								background: #3b5ff5;
								border-radius: 3px;
								margin-right: 10px;
							}
							.handler-icon {
								margin-left: auto;
								transition: all 0.38s ease;
								width: 20px;
								height: 20px;
								cursor: pointer;
							}
						}

						.answer {
							transition: height 0.38s ease, opacity 0.8s ease;
							visibility: hidden;
							opacity: 0;
							height: 0;
						}

						.show {
							height: auto;
							opacity: 1;
							visibility: visible;
							padding-bottom: 20px;
						}

						.text {
							font-size: 20px;
							font-family: PingFangSC-Medium, PingFang SC;
							font-weight: 500;
							color: rgba(64, 64, 64, 1);
							line-height: 30px;
						}
					}
				}
			}
		}
	}
}
</style>
