<template>
	<div class="footer">
		<div class="footer-container">
			<div class="links">
				<div class="link">
					<div class="link-title">{{$t('footer.links[0].title')}}</div>
					<router-link tag="div" to="/" class="link-item">{{$t('footer.links[0].item1')}}</router-link>
				</div>
				<div class="link">
					<div class="link-title">{{$t('footer.links[1].title')}}</div>
					<router-link tag="div" to="/about" class="link-item">{{$t('footer.links[1].item1')}}</router-link>
				</div>
				<!-- <div class="link">
					<div class="link-title">{{$t('footer.links[2].title')}}</div>
					<router-link tag="div" to="/faq" class="link-item">{{$t('footer.links[2].item1')}}</router-link>
				</div> -->
				<div class="link">
					<div class="link-title">{{$t('footer.links[3].title')}}</div>
					<router-link tag="div" to="/contact" class="link-item">{{$t('footer.links[3].item1')}}</router-link>
				</div>
			</div>
			<div class="footer-web">
				<div class="logo">
					<!-- <img class="logo-img" src="~@/assets/home/logo.png" /> -->
					{{$t('websiteTitle')}}
				</div>
				<div class="signature">@2022 proinity LLC Made in USA</div>
				<img src="/images/home/bot_logo@2x.png" alt="" class="img-acb">
			</div>
		</div>
		<img src="/images/home/home_bot_bg.png" alt="" class="img-bg">
	</div>
</template>

<script>
import { mapState } from "vuex";
export default {
	name: "Footer",
	computed: {
		...mapState("basic", ["footerType"]),
		isHome () {
			return this.$route.path === "/";
		}
	}
};
</script>

<style scoped lang="scss">
.footer {
	display: flex;
	justify-content: center;
	align-items: center;
	background: #eef6ff;
	position: relative;
	.img-bg {
		position: absolute;
		right: 0;
		bottom: 0;
	}
	.footer-container {
		max-width: 1200px;
		width: 100%;
		text-align: center;
		display: flex;
		align-items: center;
		flex-direction: column;
		padding: 60px 0 56px;
		.links {
			display: flex;
			align-items: center;
			justify-content: space-between;
			width: 100%;
			.link {
				text-align: center;
				.link-title {
					font-size: 20px;
					font-weight: 800;
				}
				.link-item {
					margin-top: 30px;
					font-size: 18px;
					cursor: pointer;
				}
			}
		}
		.footer-web {
			margin-top: 60px;
			.logo {
				font-weight: 500;
				color: #3b5ff5;
				line-height: 28px;
				font-size: 14px;
			}
			.signature {
				margin-top: 4px;
				font-weight: 500;
				color: #72798c;
				line-height: 28px;
				font-size: 14px;
			}
			.img-acb{
				width: 90px;
				margin: 36px 0 0 0;
			}
		}
	}
}
@media (max-width: 750px) {
	.footer {
		display: flex;
		justify-content: center;
		align-items: center;
		background: #eef6ff;
		position: relative;
		.img-bg {
			position: absolute;
			right: 0;
			bottom: 0;
			z-index: 1;
		}
		.footer-container {
			width: 100vw;
			text-align: center;
			display: flex;
			align-items: center;
			flex-direction: column;
			padding: 50px 10px 56px;
			box-sizing: border-box;
			z-index: 2;
			.links {
				display: flex;
				flex-wrap: wrap;
				align-items: center;
				justify-content: space-between;
				width: 100%;
				.link {
					width: 50%;
					text-align: center;
					margin-bottom: 20px;
					.link-title {
						font-size: 18px;
						font-weight: 600;
						color: #28324c;
					}
					.link-item {
						margin-top: 30px;
						font-size: 16px;
						color: #72798c;
						cursor: pointer;
					}
				}
			}
			.footer-web {
				margin-top: 60px;
				.logo {
					font-weight: 500;
					color: #3b5ff5;
					line-height: 28px;
					font-size: 14px;
				}
				.signature {
					margin-top: 4px;
					font-weight: 500;
					color: #72798c;
					line-height: 28px;
					font-size: 14px;
				}
			}
		}
	}
}
</style>
