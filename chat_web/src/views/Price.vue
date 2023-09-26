<template>
	<!-- <div v-if="footerType !== 1 && !isMobile" class="ac-price"> -->
	<div class="ac-price">
		<div class="header-bg" :style="{height:lang == 'cn' && isMobile ? '260px': '320px'}">
			<div class="content">
				<div class="content-left">
					<div class="text-content">
						<div class="title">{{$t('price.title')}}</div>
						<div class="sub-title">{{$t('price.slogan')}}</div>
					</div>
				</div>
				<div class="content-right">
					<img src="/images/price/price_bg.png" alt="">
				</div>
			</div>
		</div>
		<div class="pr-content clearfix">
			<img class="img-bg1" src="/images/common/com_bg_decoration_1.png" alt="">
			<img class="img-bg2" src="/images/common/com_bg_decoration_2.png" alt="">
			<img class="img-bg3" src="/images/common/com_bg_decoration_3.png" alt="">
			<img class="img-bg4" src="/images/common/com_bg_decoration_4.png" alt="">
			<div class="pc-price-card">
				<div class="img">
					<img src="/images/price/price_card_ic_enterprise.png" alt="">
				</div>
				<h2 class="cd-name">{{$t('price.edition')}}</h2>
				<div class="original-price" v-if="lang == 'cn'"><small>¥</small>8999{{$t('price.perYear')}}</div>
				<div class="original-price" v-else><small>$</small>{{(8999/6.75).toFixed(2)}}{{$t('price.perYear')}}</div>
				<div class="now-price" v-if="lang == 'cn'">
					<i class="symblo">¥</i>
					<span class="price">5999</span>
					<span class="company">{{$t('price.perYear')}}</span>
				</div>
				<div class="now-price" v-else>
					<i class="symblo">$</i>
					<span class="price">{{(5999/6.75).toFixed(2)}}</span>
					<span class="company">{{$t('price.perYear')}}</span>
				</div>
				<div class="two-year-price" v-if="lang == 'cn'"><small>¥</small>9999{{$t('price.twoYear')}}</div>
				<div class="two-year-price" v-else><small>$</small>{{(9999/6.75).toFixed(2)}}{{$t('price.twoYear')}}</div>
				<ul class="fnc-list">
					<li>
						<i class="icon">
							<img src="/images/price/tick.png" />
						</i>
						<span class="name">{{$t('price.method')}}</span>
					</li>
					<li>
						<i class="icon">
							<img src="/images/price/tick.png" />
						</i>
						<span class="name">{{$t('price.kb')}}</span>
					</li>
					<li>
						<i class="icon">
							<img src="/images/price/tick.png" />
						</i>
						<span class="name">{{$t('price.multiple')}}</span>
					</li>
					<li>
						<i class="icon">
							<img src="/images/price/tick.png" />
						</i>
						<span class="name">{{$t('price.custom')}}</span>
					</li>
					<li>
						<i class="icon">
							<img src="/images/price/tick.png" />
						</i>
						<span class="name">{{$t('price.quick')}}</span>
					</li>
					<li>
						<i class="icon">
							<img src="/images/price/tick.png" />
						</i>
						<span class="name">{{$t('price.safe')}}</span>
					</li>
				</ul>
				<router-link to="/pay">
					<button type="button" class="cd-btn">{{$t('price.immdiatePlugin')}}</button>
				</router-link>
			</div>
			<div class="pc-price-card">
				<div class="img">
					<img src="/images/price/price_card_ic_flagship.png" alt="">
				</div>
				<h2 class="cd-name">{{$t('price.edition1')}}</h2>
				<div class="original-price" v-if="lang == 'cn'"><small>¥</small>88888{{$t('price.perYear')}}</div>
				<div class="original-price" v-else><small>$</small>{{(88888/6.75).toFixed(2)}}{{$t('price.perYear')}}</div>
				<div class="now-price" v-if="lang == 'cn'">
					<i class="symblo">¥</i>
					<span class="price">60000</span>
					<span class="company">{{$t('price.perYear')}}</span>
				</div>
				<div class="now-price" v-else>
					<i class="symblo">$</i>
					<span class="price">{{(60000/6.75).toFixed(2)}}</span>
					<span class="company">{{$t('price.perYear')}}</span>
				</div>
				<!-- <div class="two-year-price"><small>¥</small>9999{{$t('price.twoYear')}}</div> -->
				<ul class="fnc-list">
					<li>
						<i class="icon">
							<img src="/images/price/tick.png" />
						</i>
						<span class="name">{{$t('price.all')}}</span>
					</li>
					<li>
						<i class="icon">
							<img src="/images/price/tick.png" />
						</i>
						<span class="name">{{$t('price.desc')}}</span>
					</li>
				</ul>
				<router-link to="/pay">
					<button type="button" class="cd-btn">{{$t('price.immdiatePlugin')}}</button>
				</router-link>
			</div>
		</div>
		<div class="all-fnc-tannir">
			<h2 class="al-title">
				<div class="title-content">
					<div class="line"></div>
					<div class="title-item">{{$t('price.allList')}}</div>
					<div class="line"></div>
				</div>
			</h2>
			<ul class="all-fnc-list">
				<li class="fnc-item">
					<img src="/images/price/price_ic_1.png" alt="">
					<div class="fnc-item-content">
						<h3 class="name">{{$t('price.functions[0].title')}}</h3>
						<span class="desc">{{$t('price.functions[0].desc')}}</span>
					</div>
				</li>
				<li class="fnc-item">
					<img src="/images/price/price_ic_2.png" alt="">
					<div class="fnc-item-content">
						<h3 class="name">{{$t('price.functions[1].title')}}</h3>
						<span class="desc">{{$t('price.functions[1].desc')}}</span>
					</div>
				</li>
				<li class="fnc-item">
					<img src="/images/price/price_ic_3.png" alt="">
					<div class="fnc-item-content">
						<h3 class="name">{{$t('price.functions[2].title')}}</h3>
						<span class="desc">{{$t('price.functions[2].desc')}}</span>
					</div>
				</li>
				<li class="fnc-item">
					<img src="/images/price/price_ic_4.png" alt="">
					<div class="fnc-item-content">
						<h3 class="name">{{$t('price.functions[3].title')}}</h3>
						<span class="desc">{{$t('price.functions[3].desc')}}</span>
					</div>
				</li>
				<li class="fnc-item">
					<img src="/images/price/price_ic_5.png" alt="">
					<div class="fnc-item-content">
						<h3 class="name">{{$t('price.functions[4].title')}}</h3>
						<span class="desc">{{$t('price.functions[4].desc')}}</span>
					</div>
				</li>
				<li class="fnc-item">
					<img src="/images/price/price_ic_6.png" alt="">
					<div class="fnc-item-content">
						<h3 class="name">{{$t('price.functions[5].title')}}</h3>
						<span class="desc">{{$t('price.functions[5].desc')}}</span>
					</div>
				</li>
				<li class="fnc-item">
					<img src="/images/price/price_ic_7.png" alt="">
					<div class="fnc-item-content">
						<h3 class="name">{{$t('price.functions[6].title')}}</h3>
						<span class="desc">{{$t('price.functions[6].desc')}}</span>
					</div>
				</li>
				<li class="fnc-item">
					<img src="/images/price/price_ic_8.png" alt="">
					<div class="fnc-item-content">
						<h3 class="name">{{$t('price.functions[7].title')}}</h3>
						<span class="desc">{{$t('price.functions[7].desc')}}</span>
					</div>
				</li>
			</ul>
		</div>
		<ContactCustomerService style="margin: 100px 0 0" />
	</div>
</template>

<script>
import { mapState } from "vuex";
import ContactCustomerService from "@/components/common/ContactCustomerService.vue";
export default {
	name: "Price",
	components: {
		ContactCustomerService
	},
	computed: {
		...mapState("basic", ["lang"]),
	}
};
</script>

<style lang="scss" scoped>
.ac-price {
	width: 100%;
	padding-top: 70px;
	position: relative;
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

.pr-content {
	width: 1200px;
	margin: 0 auto;
	padding: 90px 0;
	display: flex;
	justify-content: space-around;
	.img-bg1 {
		position: absolute;
		left: 0;
		top: 400px;
	}
	.img-bg2 {
		position: absolute;
		left: 89px;
		top: 802px;
	}
	.img-bg3 {
		position: absolute;
		right: -100px;
		top: 796px;
	}
	.img-bg4 {
		position: absolute;
		left: 0;
		bottom: 281px;
	}
	.pc-price-card {
		position: relative;
		width: 380px;
		padding: 40px 30px 48px;
		background: #fff;
		box-shadow: 0px 20px 40px 0px rgba(59, 95, 245, 0.14);
		border-radius: 30px;
		display: flex;
		flex-direction: column;
		align-items: center;
		box-sizing: border-box;
		transition: all 0.2s;
		// float: left;
		&:hover {
			// background: #b6d7ff;
			box-shadow: 0px 40px 80px 0px rgba(59, 95, 245, 0.14);
			transform: translateY(-4px);
			.cd-btn {
				background: #3b5ff5;
			}
		}
		&:last-child {
			margin-left: 50px;
		}
		.img {
			margin-top: 44px;
		}
		.cd-name {
			margin-top: 25px;
			font-weight: bold;
			color: #28324c;
			line-height: 33px;
			font-size: 24px;
		}
		.original-price {
			font-weight: 500;
			color: #72798c;
			line-height: 28px;
			font-size: 16px;
			text-decoration: line-through;
			margin-top: 16px;
		}
		.now-price {
			font-weight: bold;
			color: #3b5ff5;
			line-height: 42px;
			font-size: 30px;
		}
		.two-year-price {
			font-weight: 500;
			color: #28324c;
			line-height: 22px;
			font-size: 16px;
		}
		.fnc-list {
			margin-top: 44px;
			text-align: left;
			li {
				margin-bottom: 20px;
				display: flex;
				align-items: flex-start;

				&:last-child {
					margin-bottom: 70px;
				}
			}

			.icon {
				width: 16px;
				height: 16px;
				img {
					width: 100%;
				}
			}

			.name {
				flex: 1;
				margin-left: 20px;
				font-weight: 500;
				color: #28324c;
				line-height: 20px;
				font-size: 16px;
			}
		}

		.cd-btn {
			position: absolute;
			bottom: 40px;
			left: 50%;
			margin-left: -100px;
			width: 200px;
			height: 48px;
			background: #5fd28e;
			border-radius: 24px;
			color: #fff;
			cursor: pointer;
			transition: all 0.2s;
		}

		.bg-petal {
			position: absolute;
			z-index: -1;
			bottom: 0;
			left: 50%;
			transform: translate(-200%, 55%);
		}
	}
}

.all-fnc-tannir {
	margin: 100px auto 0;
	box-sizing: border-box;
	width: 100%;
	padding: 0 100px;
	.al-title {
		display: flex;
		justify-content: center;
		.title-content {
			display: flex;
			align-items: center;
			.line {
				width: 36px;
				height: 4px;
				background: #28324c;
				margin: 0 34px;
			}
			.title-item {
				height: 62px;
				font-size: 44px;
				font-family: PingFangSC-Heavy, PingFang SC;
				font-weight: 800;
				color: rgba(34, 34, 34, 1);
				line-height: 62px;
				margin: 0 auto;
				font-size: 40px;
				font-weight: 800;
				color: #28324c;
			}
		}
	}

	.all-fnc-list {
		margin: 60px auto 0;
		width: 1170px;
		display: flex;
		flex-flow: row wrap;
		justify-content: space-between;

		.fnc-item {
			width: 560px;
			padding: 32px 20px 20px 36px;
			box-sizing: border-box;
			margin-bottom: 50px;
			background: rgba(255, 255, 255, 1);
			border-radius: 6px;
			// border: 1px solid rgba(0, 0, 0, 0.1);
			display: flex;
			align-items: flex-start;
			// &:hover {
			// 	box-shadow: 0px 4px 10px 0px rgba(0, 0, 0, 0.1);
			// }
			img {
				width: 70px;
				height: 70px;
			}
			.fnc-item-content {
				width: 100%;
				height: 100%;
				text-align: left;
				margin-left: 30px;
				.name {
					font-weight: bold;
					color: #28324c;
					line-height: 28px;
					font-size: 20px;
					margin-bottom: 15px;
				}

				.desc {
					font-weight: 500;
					color: #72798c;
					line-height: 24px;
					font-size: 16px;
				}
			}
		}
	}
}
@media (max-width: 750px) {
	.ac-price {
		width: 100%;
		padding-top: 70px;
		position: relative;
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

	.pr-content {
		width: 100vw;
		// width: 1200px;
		// width: 100vw;
		// margin: 0 auto;
		padding: 45px 28px;
		box-sizing: border-box;
		display: flex;
		flex-direction: column;
		justify-content: normal;
		.img-bg1 {
			position: absolute;
			left: 0;
			top: 400px;
			z-index: 1;
		}
		.img-bg2 {
			position: absolute;
			left: 89px;
			top: 802px;
			z-index: 1;
		}
		.img-bg3 {
			position: absolute;
			right: -100px;
			top: 796px;
			z-index: 1;
		}
		.img-bg4 {
			position: absolute;
			left: 0;
			bottom: 281px;
			z-index: 1;
		}
		.pc-price-card {
			flex-shrink: 0;
			position: relative;
			width: 100%;
			padding: 40px 30px 48px;
			background: #fff;
			box-shadow: 0px 20px 40px 0px rgba(59, 95, 245, 0.14);
			border-radius: 30px;
			display: flex;
			flex-direction: column;
			align-items: center;
			box-sizing: border-box;
			transition: all 0.2s;
			z-index: 2;
			margin-bottom: 20px;
			&:hover {
				// background: #b6d7ff;
				box-shadow: 0px 40px 80px 0px rgba(59, 95, 245, 0.14);
				transform: translateY(-4px);
				.cd-btn {
					background: #3b5ff5;
				}
			}
			&:last-child {
				margin-left: 0;
			}
			.img {
				margin-top: 44px;
			}
			.cd-name {
				margin-top: 25px;
				font-weight: bold;
				color: #28324c;
				line-height: 33px;
				font-size: 24px;
			}
			.original-price {
				font-weight: 500;
				color: #72798c;
				line-height: 28px;
				font-size: 16px;
				text-decoration: line-through;
				margin-top: 16px;
			}
			.now-price {
				font-weight: bold;
				color: #3b5ff5;
				line-height: 42px;
				font-size: 30px;
			}
			.two-year-price {
				font-weight: 500;
				color: #28324c;
				line-height: 22px;
				font-size: 16px;
			}
			.fnc-list {
				margin-top: 44px;
				text-align: left;
				li {
					margin-bottom: 20px;
					display: flex;
					align-items: flex-start;

					&:last-child {
						margin-bottom: 70px;
					}
				}

				.icon {
					width: 16px;
					height: 16px;
					img {
						width: 100%;
					}
				}

				.name {
					flex: 1;
					margin-left: 20px;
					font-weight: 500;
					color: #28324c;
					line-height: 20px;
					font-size: 16px;
				}
			}

			.cd-btn {
				position: absolute;
				bottom: 40px;
				left: 50%;
				margin-left: -100px;
				width: 200px;
				height: 48px;
				background: #5fd28e;
				border-radius: 24px;
				color: #fff;
				cursor: pointer;
				transition: all 0.2s;
			}

			.bg-petal {
				position: absolute;
				z-index: -1;
				bottom: 0;
				left: 50%;
				transform: translate(-200%, 55%);
			}
		}
	}

	.all-fnc-tannir {
		margin: 100px auto 0;
		box-sizing: border-box;
		width: 100%;
		padding: 0;
		z-index: 2;
		.al-title {
			display: flex;
			justify-content: center;
			.title-content {
				display: flex;
				align-items: center;
				.line {
					width: 36px;
					height: 4px;
					background: #28324c;
					margin: 0 34px;
				}
				.title-item {
					font-size: 22px;
					font-family: PingFangSC-Heavy, PingFang SC;
					font-weight: 800;
					color: rgba(34, 34, 34, 1);
					line-height: 62px;
					margin: 0 auto;
					font-weight: 800;
				}
			}
		}

		.all-fnc-list {
			margin: 30px auto 0;
			width: 100vw;
			display: flex;
			flex-flow: row wrap;
			justify-content: space-between;

			.fnc-item {
				width: 50%;
				padding: 30px;
				box-sizing: border-box;
				margin-bottom: 50px;
				background: rgba(255, 255, 255, 1);
				border-radius: 6px;
				// border: 1px solid rgba(0, 0, 0, 0.1);
				display: flex;
				flex-direction: column;
				align-items: flex-start;
				z-index: 2;
				// &:hover {
				// 	box-shadow: 0px 4px 10px 0px rgba(0, 0, 0, 0.1);
				// }
				img {
					width: 50px;
					height: 50px;
					margin-bottom: 15px;
				}
				.fnc-item-content {
					width: 100%;
					height: 100%;
					text-align: left;
					margin-left: 0;
					.name {
						font-weight: bold;
						color: #28324c;
						line-height: 28px;
						font-size: 16px;
						margin-bottom: 15px;
					}

					.desc {
						font-weight: 500;
						color: #72798c;
						line-height: 24px;
						font-size: 14px;
					}
				}
			}
		}
	}
}
</style>
