<template>
	<!-- <div v-if="footerType !== 1 && !isMobile" class="ac-contact"> -->
	<div class="ac-contact">
		<div class="linear-gradient">
			<div class="header-bg" :style="{height:lang == 'cn' && isMobile ? '260px': '320px'}">
				<div class="content">
					<div class="content-left">
						<div class="text-content">
							<div class="title">{{$t('contact.contactus')}}</div>
							<div class="tips">{{$t('contact.text1')}}</div>
							<div class="tips">{{$t('contact.text2')}}</div>
						</div>
					</div>
					<div class="content-right">
						<img src="/images/contact/contact_banner_graphics@2x.png" alt="">
					</div>
				</div>
			</div>
		</div>
		<section class="main-list">
			<img class="img-bg" src="/images/common/com_bg_decoration_1.png" alt="">
			<div class="ml-item" style="float:right !important;margin-right: 180px;">
				<el-link href="https://t.me/aichat_vip" :underline="false" class="link">
					<i class="icon">
						<img src="/images/contact/contact_ic_tel@2x.png" />
					</i>
					<div class="desc">
						<p>Telegram</p>
						<p>aichat_vip</p>
					</div>
				</el-link>
        <div>
          <p class="copy-btn" @click.stop="copyCode('telegram')">{{$t('googleCheck.btns[3]')}}</p>
        </div>
			</div>
			<div class="ml-item">
				<el-link href="https://join.skype.com/invite/ycH6TOAoptBR" :underline="false" class="link">
					<i class="icon">
						<img src="/images/contact/contact_ic_sky@2x.png" />
					</i>
					<div class="desc">
						<p>Skype</p>
						<p>live:.cid.99667b201fa80677</p>
					</div>
				</el-link>
        <div>
          <p class="copy-btn" @click.stop="copyCode('skype')">{{$t('googleCheck.btns[3]')}}</p>
        </div>
			</div>
			<!-- <div class="ml-item">
				<el-link href="mailto:tim@aichating.com" :underline="false" class="link">
					<i class="icon">
						<img src="/images/contact/contact_ic_ema@2x.png" />
					</i>
					<div class="desc">
						<p>Email</p>
						<p>tim@aichating.com</p>
					</div>
				</el-link>
			</div> -->
		</section>
		<ContactCustomerService />
	</div>
</template>
<script>
import { mapState } from 'vuex'
import ContactCustomerService from '@/components/common/ContactCustomerService'

export default {
	name: 'Contact',
	components: {
		ContactCustomerService
	},
  data() {
    return {
      contactInfo: {
        telegram: 'TELE: @taofendashu',
        skype: 'live: .cid.c2ec56522e7b6d1b'
      }
    }
  },
	computed: {
		...mapState("basic", ["lang"]),
	},
  methods: {
    copyCode(type) {
      this.$copyText(this.contactInfo[type]).then(() => {
        this.$message.success('复制成功')
      }, () => {
        this.$message.success('复制失败')
      })
    },
  }
}
</script>
<style lang="scss" scoped>
.ac-contact {
	overflow: hidden;
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

.main-list {
	margin: 0 auto;
	width: 1020px;
	padding: 100px 0 50px;
	display: flex;
	flex-flow: row wrap;
	justify-content: flex-start;
	.img-bg {
		position: absolute;
		top: 400px;
		left: 0;
	}
	.ml-item {
		width: 300px;
		height: 120px;
		background: rgba(255, 255, 255, 1);
		border-radius: 10px;
		border: 1px solid rgba(0, 0, 0, 0.1);
		margin-bottom: 50px;
		transition: all 0.2s;
		&:nth-of-type(3n-1) {
			margin: 0 50px;
		}
		&:hover {
			box-shadow: 0px 5px 5px 5px rgba(0, 0, 0, 0.1);
			// background: #b6d7ff;
			transform: translateY(-4px);
		}
		.icon {
			padding: 15px;
			border-radius: 50%;
			img {
				width: 20px;
				height: 20px;
			}
		}
    .copy-btn {
      width: 60px;
      height: 25px;
      line-height: 25px;
      color: rgb(25, 10, 244);
      font-size: 13px;
      text-align: center;
      position: relative;
      top: -30px;
      left: 84px;
      cursor: pointer;
    }
	}
}
@media (max-width: 750px) {
	.ac-contact {
		overflow: hidden;
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

	.main-list {
		margin: 0 auto;
		width: 100vw;
		padding: 100px 28px 50px;
		display: flex;
		flex-flow: row wrap;
		justify-content: flex-start;
		flex-wrap: wrap;
		box-sizing: border-box;
		.img-bg {
			position: absolute;
			top: 400px;
			left: 0;
		}
		.ml-item {
			width: 100%;
			height: 120px;
			background: rgba(255, 255, 255, 1);
			border-radius: 10px;
			border: 1px solid rgba(0, 0, 0, 0.1);
			margin-bottom: 50px;
			transition: all 0.2s;
			&:nth-of-type(3n-1) {
				margin: 0 0 50px 0;
			}
			&:hover {
				box-shadow: 0px 5px 5px 5px rgba(0, 0, 0, 0.1);
				// background: #b6d7ff;
				transform: translateY(-4px);
			}
		}
	}
}
</style>
<style lang="scss">
.ac-contact {
	.link {
		width: 100%;
		height: 100%;
		.el-link--inner {
			width: 100%;
			height: 100%;
			display: flex;
			align-items: center;
			padding: 0 20px;
			.desc {
				text-align: left;
				margin-left: 20px;
				p:first-child {
					margin-bottom: 10px;
					font-weight: bold;
					font-size: 18px;
				}
			}
		}
	}
}
</style>