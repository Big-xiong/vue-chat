<template>
	<div class="pay-page">
		<div class="pay-header" :style="{height:lang == 'cn' && isMobile ? '260px': '320px'}">
			<div class="content">
				<div class="content-left">
					<div class="text-content">
						<div class="title">{{$t('buy.header[0]')}}</div>
						<div class="sub-title">{{$t('buy.header[1]')}}</div>
						<div class="tips">{{$t('buy.header[2]')}}</div>
					</div>
				</div>
				<div class="content-right">
					<img src="/images/pay/buy_banner_graphics@2x.png" alt="">
				</div>
			</div>
		</div>
		<div class="pay-combination">
			<img class="img-bg" src="/images/common/com_bg_decoration_1.png" alt="">
			<div class="combination-title">
				<el-button :class="{active:option.value==combination}" v-for="option in combinationTitleOps" :key="option.value" @click="combination=option.value">
					{{option.label}}
				</el-button>
			</div>
			<div class="combination-list">
				<template v-if="combination==1">
					<div class="combination-item">
						<el-checkbox v-model="basicEdition.basic.checked">{{$t('buy.combinationList[0]')}}</el-checkbox>
						<el-input-number v-model="basicEdition.basic.num" :min="1" :disabled="!basicEdition.basic.checked"></el-input-number>
					</div>
					<div class="combination-item">
						<el-checkbox v-model="basicEdition.sit.checked">{{$t('buy.combinationList[1]')}}</el-checkbox>
						<el-input-number v-model="basicEdition.sit.num" :min="1" :disabled="!basicEdition.sit.checked"></el-input-number>
					</div>
					<div class="combination-item">
						<el-checkbox v-model="basicEdition.robotMsg.checked">{{$t('buy.combinationList[2]')}}</el-checkbox>
						<el-input-number v-model="basicEdition.robotMsg.num" :min="1" :disabled="!basicEdition.robotMsg.checked"></el-input-number>
					</div>
					<div class="combination-item">
						<el-checkbox v-model="basicEdition.platform.checked">{{$t('buy.combinationList[3]')}}</el-checkbox>
						<el-input-number v-model="basicEdition.platform.num" :min="1" :disabled="!basicEdition.platform.checked"></el-input-number>
					</div>
					<div class="combination-item">
						<el-checkbox v-model="basicEdition.domain.checked">{{$t('buy.combinationList[4]')}}</el-checkbox>
						<el-input-number v-model="basicEdition.domain.num" :min="1" :disabled="!basicEdition.domain.checked"></el-input-number>
					</div>
				</template>
				<template v-else>
					<div class="combination-item">
						<el-checkbox :value="true">{{$t('buy.combinationList[5]')}}</el-checkbox>
					</div>
				</template>
			</div>
			<div class="combination-price">
				<div v-if="lang == 'cn'">
					<div>
						<span>{{$t('buy.totalAmount')}}：</span>
						<i class="symblo">¥</i>
						<span class="price">
							<span>{{totalPrice}}</span>
							<span v-if="combination == 1">{{$t('price.perYear')}}</span>
						</span>
						<span v-if="combination!=1">({{$t('buy.combinationList[6]')}})</span>
					</div>
					<div class="original-price" v-if="combination==2"><i>¥</i><span>19999</span></div>
				</div>
				<div v-else>
					<div>
						<span>{{$t('buy.totalAmount')}}：</span>
						<i class="symblo">$</i>
						<span class="price">
							<span>{{(totalPrice/6.75).toFixed(2)}}</span>
							<span v-if="combination == 1">{{$t('price.perYear')}}</span>
						</span>
						<span v-if="combination!=1">({{$t('buy.combinationList[6]')}})</span>
					</div>
					<!-- <div class="original-price" v-if="combination==2">${{(19999/6.75).toFixed(2)}}</div> -->
				</div>
			</div>
		</div>
		<div class="pay-channel">
			<span class="channel-title">{{$t('buy.payTitle')}}</span>
			<div class="channel-list">
				<!-- <div class="channel-item" :class="{'active':alipayCode == payCode}" @click="changePayCode(alipayCode)">
					<div class="select">
						<div class="inner"></div>
					</div>
					<img src="/images/pay/buy_card_ic_Alipay.png" alt="">
					<span class="item-title">{{$t('buy.payOps[0]')}}</span>
				</div> -->
				<div class="channel-item" :class="{'active':937 == payCode}" @click="changePayCode(937)">
					<div class="select">
						<div class="inner"></div>
					</div>
					<img src="/images/pay/buy_card_ic_erc.png" alt="">
					<span class="item-title">{{$t('buy.payOps[1]')}}</span>
				</div>
				<div class="channel-item" :class="{'active':938 == payCode}" @click="changePayCode(938)">
					<div class="select">
						<div class="inner"></div>
					</div>
					<img src="/images/pay/buy_card_ic_trc.png" alt="">
					<span class="item-title">{{$t('buy.payOps[2]')}}</span>
				</div>
				<!-- <div class="channel-item" :class="{'active':926 == payCode}" @click="changePayCode(926)">
					<div class="select">
						<div class="inner"></div>
					</div>
					<img src="/images/pay/buy_card_ic_bank.png" alt="">
					<span class="item-title">{{$t('buy.payOps[3]')}}</span>
				</div> -->
			</div>
		</div>
		<div class="pay-btns">
			<el-button type="primary" size="medium" @click="payHandler">{{$t('buy.payActions[1]')}}</el-button>
		</div>
	</div>
</template>

<script>
import { mapState } from 'vuex'
export default {
	name: 'Pay',
	data () {
		return {
			payCode: undefined,
			combination: 1,
			basicEdition: {
				basic: {
					num: 1,
					price: 5999,
					checked: true
				},
				sit: {
					num: 1,
					checked: false,
					price: 1999
				},
				robotMsg: {
					num: 1,
					checked: false,
					price: 1000
				},
				platform: {
					num: 1,
					checked: false,
					price: 2888
				},
				domain: {
					num: 1,
					checked: false,
					price: 499
				},
			}
		}
	},
	computed: {
        ...mapState("basic", ["lang", "token", "userInfo"]),
		totalPrice () {
			let { basicEdition: { basic, sit, robotMsg, platform, domain }, combination } = this
			if (combination == 1) {
				let basicPrice = 0
				if (basic.checked) {
					basicPrice = basic.num * basic.price
				}

				let sitPrice = 0
				if (sit.checked) {
					sitPrice = sit.num * sit.price
				}
				let robotPrice = 0
				if (robotMsg.checked) {
					robotPrice = robotMsg.num * robotMsg.price
				}
				let platformPrice = 0
				if (platform.checked) {
					platformPrice = platform.num * platform.price
				}
				let domainPrice = 0
				if (domain.checked) {
					domainPrice = domain.num * domain.price
				}
				return basicPrice + sitPrice + robotPrice + platformPrice + domainPrice
			} else if (combination == 2) {
				return 15000
			}
			return 15000
		},
		customer () {
			return this.$store.state.basic.customer
		},
		combinationTitleOps () {
			return [
				{
					label: this.$t('buy.combinationTitleOps[0]'),
					value: 1
				},
				{
					label: this.$t('buy.combinationTitleOps[1]'),
					value: 2
				}
			]
		},
		alipayCode () {
			return this.isMobile ? 904 : 903
		}
	},
	methods: {
		changePayCode (code) {
			this.payCode = code
		},
		payHandler () {
			let sellerCode = this.userInfo.seller_code
			let { basicEdition, combination, totalPrice, payCode } = this
			if (!sellerCode) {
				this.$notify({
					title: this.$t('notify.fail'),
					message: this.$t('buy.notify[0]'),
					type: 'error'
				})
				this.$router.push('/register')
				return
			}
			if (totalPrice >= 20000) {
				return this.$notify({
					title: this.$t('notify.fail'),
					message: this.$t('buy.notify[1]'),
					type: 'error'
				})
			}
			let tempwindow = window.open()
			this.$api.pay({
				payment_code: payCode,
				sellercode: sellerCode,
				amount: totalPrice,
				year: 1,
				type: combination,
				defaultsys: basicEdition.basic.checked ? basicEdition.basic.num : 0,
				rootNO: basicEdition.sit.checked ? basicEdition.sit.num : 0,
				rootNum: basicEdition.robotMsg.checked ? basicEdition.robotMsg.num : 0,
				platform: basicEdition.platform.checked ? basicEdition.platform.num : 0,
				domain: basicEdition.domain.checked ? basicEdition.domain.num : 0
			}).then(res => {
				if (res?.data?.pay_url) {
					tempwindow.location = res.data.pay_url
					// window.open(res.data.pay_url)
				}
			})
		}
	},
	created () {
		this.payCode = this.alipayCode
	}
}
</script>

<style lang="scss" scoped>
.pay-page {
	font-size: 14px;
	color: #1e1e1e;
	position: relative;
	padding-top: 70px;
	.pay-header {
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
	.pay-combination {
		width: 1000px;
		margin: 0 auto;
		.img-bg {
			position: absolute;
			left: 0;
			top: 400px;
			z-index: 1;
		}
		.combination-title {
			margin: 60px 0;
			z-index: 10;
			.el-button {
				padding: 20px 30px;
				box-sizing: border-box;
				border-radius: 10px 0px 0px 10px;
				color: #345eea;
				font-size: 16px;
				background-color: #fff;
				border: 1px solid #3b5ff5;
				font-weight: bold;
				box-shadow: 0 10px 20px 0 rgb(52 94 234 / 20%);
				z-index: 2;
				&.active {
					color: #fff;
					background-color: #345eea;
					border-color: #345eea;
				}
				&.first-child {
					border-radius: 10px 0px 0px 10px;
				}
				&:last-child {
					border-radius: 0px 10px 10px 0px;
					margin-left: 0;
				}
			}
		}
		.combination-list {
			border-bottom: 1px solid #ddd;
			.combination-item {
				display: flex;
				justify-content: space-between;
				margin-bottom: 30px;
				.el-checkbox__input.is-checked .el-checkbox__inner {
					background-color: #5fd28e;
					border-color: #5fd28e;
				}
			}
		}
		.combination-price {
			display: flex;
			align-items: center;
			margin-top: 30px;
			font-weight: bold;
			color: #28324c;
			line-height: 42px;
			font-size: 30px;
			.original-price {
				margin-left: 92px;
				text-align: left;
				color: #a6a6a6;
				font-size: 24px;
				font-weight: normal;
				span {
					text-decoration: line-through;
				}
			}
		}
	}
	.pay-channel {
		width: 1000px;
		padding: 30px 0;
		border-radius: 10px;
		margin: 50px auto 0;
		text-align: left;
		.channel-title {
			display: block;
			margin-bottom: 16px;
			font-size: 20px;
		}
		.channel-list {
			display: flex;
			padding: 20px 0;
			.channel-item {
				width: 260px;
				height: 160px;
				background: #ffffff;
				box-shadow: 1px 10px 20px 0px rgba(226, 231, 239, 0.3);
				border-radius: 10px;
				position: relative;
				display: flex;
				align-items: center;
				flex-direction: column;
				user-select: none;
				margin-right: 20px;
				cursor: pointer;
				box-sizing: border-box;
				&.active {
					background: rgba(59, 95, 245, 0.1);
					.select {
						background: #3b5ff5;
					}
				}
				.select {
					position: absolute;
					left: 16px;
					top: 16px;
					width: 18px;
					height: 18px;
					border: 1px solid #bec6d4;
					background: #fff;
					border-radius: 50%;
					display: flex;
					align-items: center;
					justify-content: center;
					.inner {
						width: 6px;
						height: 6px;
						background: #fff;
						border-radius: 50%;
					}
				}
				img {
					margin-top: 36px;
					width: 54px;
					// border: 1px dashed #bec6d4;
				}
				.item-title {
					margin-top: 20px;
					font-size: 16px;
					font-weight: 500;
					color: #28324c;
					line-height: 24px;
				}
			}
			// ::v-deep.el-radio-group {
			// 	.el-radio {
			// 		margin-right: 40px;
			// 		.el-radio__label {
			// 			padding-left: 14px;
			// 		}
			// 	}
			// }
		}
	}
	.pay-btns {
		display: flex;
		justify-content: flex-start;
		width: 1000px;
		margin: 50px auto 120px;
		.el-button {
			width: 200px;
			height: 48px;
			background: #5fd28e;
			border-radius: 24px;
			border: none;
			outline: none;
		}
	}
	::v-deep.el-input-number {
		width: 80px;
		line-height: 25px;
		.el-input__inner {
			line-height: 25px;
			height: 25px;
			padding: 0;
			border: none;
		}
		span[class^="el-input-number__"] {
			width: 25px;
			line-height: 25px;
			border: none;
		}
		&.is-disabled {
			.el-input__inner {
				background: transparent;
			}
		}
	}
}
</style>

<style lang="scss">
.el-checkbox__label {
	white-space: pre-wrap;
}
.el-checkbox__input {
	vertical-align: top;
	margin-top: 2px;
}
.combination-item {
	.el-checkbox__input.is-checked .el-checkbox__inner {
		background-color: #5fd28e;
		border-color: #5fd28e;
	}
}
</style>
<style lang="scss" scoped>
@media (max-width: 750px) {
	.pay-page {
		font-size: 14px;
		color: #1e1e1e;
		position: relative;
		padding-top: 70px;
		.pay-header {
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
		.pay-combination {
			width: 100vw;
			margin: 0 auto;
			.img-bg {
				position: absolute;
				left: 0;
				top: 400px;
				z-index: 1;
				display: none;
			}
			.combination-title {
				margin: 60px 0;
				z-index: 2;
				.el-button {
					padding: 15px 30px;
					box-sizing: border-box;
					border-radius: 10px 0px 0px 10px;
					color: #345eea;
					font-size: 16px;
					background-color: #fff;
					border: 1px solid #3b5ff5;
					font-weight: bold;
					box-shadow: 0 10px 20px 0 rgb(52 94 234 / 20%);
					z-index: 2;
					&.active {
						color: #fff;
						background-color: #345eea;
						border-color: #345eea;
					}
					&.first-child {
						border-radius: 10px 0px 0px 10px;
					}
					&:last-child {
						border-radius: 0px 10px 10px 0px;
						margin-left: 0;
					}
				}
			}
			.combination-list {
				z-index: 2;
				border-bottom: 1px solid #ddd;
				padding: 0 28px;
				box-sizing: border-box;
				.combination-item {
					display: flex;
					justify-content: space-between;
					margin-bottom: 30px;
					.el-checkbox {
						width: 70%;
						padding-right: 10%;
						text-align: left;
					}

					.el-input-number {
						flex: 1;
					}
				}
			}
			.combination-price {
				z-index: 2;
				display: flex;
				align-items: center;
				margin-top: 30px;
				font-weight: bold;
				color: #28324c;
				line-height: 42px;
				font-size: 20px;
				padding: 0 28px;
				box-sizing: border-box;
				.original-price {
					margin-left: 60px;
					text-align: left;
					color: #a6a6a6;
					font-size: 20px;
					font-weight: normal;
					span {
						text-decoration: line-through;
					}
				}
			}
		}
		.pay-channel {
			width: 100vw;
			padding: 30px 0;
			border-radius: 10px;
			margin: 25px auto 0;
			text-align: left;
			.channel-title {
				display: block;
				margin-bottom: 16px;
				font-size: 20px;
				padding: 0 28px;
			}
			.channel-list {
				display: flex;
				flex-wrap: wrap;
				padding: 20px 28px;
				.channel-item {
					width: 46%;
					height: calc((100vw - 56px) * 46 / 100);
					background: #ffffff;
					box-shadow: 1px 10px 20px 0px rgba(226, 231, 239, 0.3);
					border-radius: 10px;
					position: relative;
					display: flex;
					align-items: center;
					flex-direction: column;
					user-select: none;
					margin-right: 2%;
					margin-bottom: 10px;
					cursor: pointer;
					box-sizing: border-box;
					&.active {
						background: rgba(59, 95, 245, 0.1);
						.select {
							background: #3b5ff5;
						}
					}
					.select {
						position: absolute;
						left: 16px;
						top: 16px;
						width: 18px;
						height: 18px;
						border: 1px solid #bec6d4;
						background: #fff;
						border-radius: 50%;
						display: flex;
						align-items: center;
						justify-content: center;
						.inner {
							width: 6px;
							height: 6px;
							background: #fff;
							border-radius: 50%;
						}
					}
					img {
						margin-top: 36px;
						// border: 1px dashed #bec6d4;
					}
					.item-title {
						margin-top: 20px;
						font-size: 16px;
						font-weight: 500;
						color: #28324c;
						line-height: 24px;
					}
				}
				// ::v-deep.el-radio-group {
				// 	.el-radio {
				// 		margin-right: 40px;
				// 		.el-radio__label {
				// 			padding-left: 14px;
				// 		}
				// 	}
				// }
			}
		}
		.pay-btns {
			display: flex;
			justify-content: flex-start;
			width: 100vw;
			margin: 25px auto 60px;
			.el-button {
				width: 200px;
				height: 48px;
				background: #5fd28e;
				border-radius: 24px;
				border: none;
				outline: none;
				margin: 0 auto;
			}
		}
		::v-deep.el-input-number {
			width: 80px;
			line-height: 25px;
			.el-input__inner {
				line-height: 25px;
				height: 25px;
				padding: 0;
				border: none;
			}
			span[class^="el-input-number__"] {
				width: 25px;
				line-height: 25px;
				border: none;
			}
			&.is-disabled {
				.el-input__inner {
					background: transparent;
				}
			}
		}
	}
}
</style>