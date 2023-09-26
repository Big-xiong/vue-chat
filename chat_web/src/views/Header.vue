<template>
	<div class="header">
		<div class="header-content">
			<div class="logo">
				<router-link to="/" class="lg-box">
					<img v-if="lang == 'cn'" class="logo-img" src="/images/common/nav_logo@2x.png" />
					<img v-else class="logo-img" src="/images/common/nav_logo_us@2x.png" />
				</router-link>
			</div>
			<div class="menu" v-if="!isMobile">
				<router-link class="menu-item" :class="{'active':$route.path == '/'}" to="/">{{$t('menu.home')}}</router-link>
				<router-link class="menu-item" :class="{'active':$route.path == '/price'}" to="/price">{{$t('menu.price')}}</router-link>
				<router-link class="menu-item" :class="{'active':$route.path == '/pay'}" to="/pay">{{$t('menu.buy')}}</router-link>
				<router-link class="menu-item" :class="{'active':$route.path == '/download'}" to="/download">{{$t('menu.download')}}</router-link>
				<router-link class="menu-item" :class="{'active':$route.path == '/about'}" to="/about">{{$t('menu.about')}}</router-link>
				<router-link class="menu-item" :class="{'active':$route.path == '/contact'}" to="/contact">{{$t('menu.contact')}}</router-link>
				<a class="menu-item" @click="handleDialog">{{$t('menu.tutorial')}}</a>
			</div>
			<div class="header-right" v-if="!isMobile">
				<div class="login-box" v-if="!isLogin">
					<router-link to="/register" class="button register">
						{{$t('register')}}
					</router-link>
					<router-link to="/login" class="button login">
						{{$t('login')}}
					</router-link>
				</div>
				<div v-else>
					<el-button @click="gotoTenantSite()" round type="primary" style="height: 34px;padding-top:9px;background-color:transparent;color:#4e72eb">
						<i class="el-icon-user" style="margin-right:4px;"></i>{{userInfo.seller_name}}
					</el-button>
					<el-button class="login" @click="logout()" round type="default" style="height: 34px;padding-top:9px;background-color:transparent;">
						<i class="el-icon-upload2" style="margin-right:4px;"></i>{{$t('logout')}}
					</el-button>
				</div>
				<!-- 语言选择 -->
				<el-dropdown class="langs" trigger="click" @command="changeLang">
					<div class="lang-item">
						<img class="icon" :src="curLang.icon" />
						<span style="marginRight:2px">{{curLang.lang}}</span>
						<i class="el-icon-arrow-down" />
					</div>
					<el-dropdown-menu slot="dropdown" class="lang-dropdown">
						<el-dropdown-item command="cn">
							<div class="lang-item">
								<img class="icon" src="/images/langs/com_nav_btn_china.png" />
								{{$t('lang.cn')}}
							</div>
						</el-dropdown-item>
						<el-dropdown-item command="us">
							<div class="lang-item">
								<img class="icon" src="/images/langs/com_nav_ic_english.png" />
								{{$t('lang.us')}}
							</div>
						</el-dropdown-item>

						<el-dropdown-item command="th">
							<div class="lang-item">
								<img class="icon" src="/images/langs/com_nav_ic_thai.png" />
								{{$t('lang.th')}}
							</div>
						</el-dropdown-item>
						<el-dropdown-item command="vi">
							<div class="lang-item">
								<img class="icon" src="/images/langs/com_nav_ic_Vietnam.png" />
								{{$t('lang.vi')}}
							</div>
						</el-dropdown-item>
					</el-dropdown-menu>
				</el-dropdown>
			</div>
			<div class="header-right" v-else>
				<!-- <div v-if="!!isLogin" @click="gotoTenantSite()">
					<div class="user">
						<i class="el-icon-user" style="margin-right:4px;"></i>{{isLogin}}
					</div>
				</div> -->
				<!-- 语言选择 -->
				<el-dropdown class="langs" trigger="click" @command="changeLang">
					<div class="lang-item">
						<img class="icon" :src="curLang.icon" />
						<span style="marginRight:2px">{{curLang.lang}}</span>
						<i class="el-icon-arrow-down" />
					</div>
					<el-dropdown-menu slot="dropdown" class="lang-dropdown">
						<el-dropdown-item command="cn">
							<div class="lang-item">
								<img class="icon" src="/images/langs/com_nav_btn_china.png" />
								{{$t('lang.cn')}}
							</div>
						</el-dropdown-item>
						<el-dropdown-item command="us">
							<div class="lang-item">
								<img class="icon" src="/images/langs/com_nav_ic_english.png" />
								{{$t('lang.us')}}
							</div>
						</el-dropdown-item>

						<el-dropdown-item command="th">
							<div class="lang-item">
								<img class="icon" src="/images/langs/com_nav_ic_thai.png" />
								{{$t('lang.th')}}
							</div>
						</el-dropdown-item>
						<el-dropdown-item command="vi">
							<div class="lang-item">
								<img class="icon" src="/images/langs/com_nav_ic_Vietnam.png" />
								{{$t('lang.vi')}}
							</div>
						</el-dropdown-item>
					</el-dropdown-menu>
				</el-dropdown>
				<div class="menu-dropdown" @click="changeDropDownShow">
					<img src="/images/common/com_nav_ic_menu@2x.png" alt="">
				</div>
				<div class="dropdown-content" :class="{'show':dropdownShow}" @click="dropdownShow = false">
					<router-link class="dropdown-item" :class="{'active':$route.path == '/'}" to="/">
						<span>{{$t('menu.home')}}</span>
						<i class="el-icon-arrow-right"></i>
					</router-link>
					<router-link class="dropdown-item" :class="{'active':$route.path == '/price'}" to="/price">
						<span>{{$t('menu.price')}}</span>
						<i class="el-icon-arrow-right"></i>
					</router-link>
					<router-link class="dropdown-item" :class="{'active':$route.path == '/pay'}" to="/pay">
						<span>{{$t('menu.buy')}}</span>
						<i class="el-icon-arrow-right"></i>
					</router-link>
					<router-link class="dropdown-item" :class="{'active':$route.path == '/download'}" to="/download">
						<span>{{$t('menu.download')}}</span>
						<i class="el-icon-arrow-right"></i>
					</router-link>
					<router-link class="dropdown-item" :class="{'active':$route.path == '/about'}" to="/about">
						<span>{{$t('menu.about')}}</span>
						<i class="el-icon-arrow-right"></i>
					</router-link>
					<router-link class="dropdown-item" :class="{'active':$route.path == '/contact'}" to="/contact">
						<span>{{$t('menu.contact')}}</span>
						<i class="el-icon-arrow-right"></i>
					</router-link>
					<template v-if="!!isLogin">
						<div @click="gotoTenantSite()" class="dropdown-item">
							<span>{{userInfo.seller_name}}</span>
							<i class="el-icon-arrow-right"></i>
						</div>
						<div @click="logout()" class="dropdown-item">
							<span>{{$t('logout')}}</span>
							<i class="el-icon-arrow-right"></i>
						</div>
					</template>
					<template v-else>
						<router-link class="dropdown-item" :class="{'active':$route.path == '/login'}" to="/login">
							<span>{{$t('login')}}</span>
							<i class="el-icon-arrow-right"></i>
						</router-link>
						<router-link class="dropdown-item" :class="{'active':$route.path == '/register'}" to="/register">
							<span>{{$t('register')}}</span>
							<i class="el-icon-arrow-right"></i>
						</router-link>
					</template>
				</div>
			</div>
		</div>
		<tenant-site ref="tenantSite" />
		<el-dialog class="tutorial-dialog" append-to-body :title="$t('menu.tutorial')" :visible="tutorialVisible" :close-on-click-modal="true" @close="handleDialog">
			<video style="width: 100%;" ref="videoRef" controls="controls" autoplay="autoplay" src="/video/register.mp4" />
		</el-dialog>
	</div>
</template>

<script>
import { mapState, mapMutations } from 'vuex'
import tenantSite from './tenantSite'
export default {
	name: "Header",
	components: {
		tenantSite
	},
	data () {
		return {
			dropdownShow: false,
			tenantSiteVisible: false,
			tutorialVisible: false
		};
	},
	computed: {
		...mapState("basic", ["lang", "token", "userInfo"]),
		curLang () {
			let lang = this.$i18n.locale
			return {
				'cn': {
					lang: this.$t('lang.cn'),
					icon: '/images/langs/com_nav_btn_china.png'
				},
				'us': {
					lang: this.$t('lang.us'),
					icon: '/images/langs/com_nav_ic_english.png'
				},
				'th': {
					lang: this.$t('lang.th'),
					icon: '/images/langs/com_nav_ic_thai.png'
				},
				'vi': {
					lang: this.$t('lang.vi'),
					icon: '/images/langs/com_nav_ic_Vietnam.png'
				}
			}[lang]
		},
		isLogin () {
			return this.$store.state.basic.userInfo?.seller_name && this.$store.state.basic.token
		}
	},
	created () {
		let language = navigator.language;
		if (language.indexOf('zh') != -1) {
			this.setLang('cn')
		} else if (language.indexOf('th') != -1) {
			this.setLang('th')
		} else if (language.indexOf('vi') != -1) {
			this.setLang('vi')
		} else {
			this.setLang('us')
		}
	},
	methods: {
		...mapMutations("basic", ["setLang", "setToken", "setUserInfo"]),
		handleDialog () {
			this.tutorialVisible = !this.tutorialVisible
			if (this.tutorialVisible) {
				this.$refs.videoRef.play()
			} else this.$refs.videoRef.pause()
		},
		changeDropDownShow () {
			this.dropdownShow = !this.dropdownShow;
			// if (this.dropdownShow) {
			// 	document.querySelector('body').style.overflow = 'hidden'
			// } else {
			// 	document.querySelector('body').style.overflow = ''
			// }
		},
		percent2percent25 (URI) {
			if (URI.indexOf('%') > -1) {
				return URI.replace(/%/g, '%25')
			} else {
				return URI;
			}
		},
		changeLang (lang) {
			this.$i18n.locale = lang
			this.setLang(lang)
		},
		clearUserInfo () {
			this.setToken("")
			this.setUserInfo("")
			localStorage.removeItem('uid');
			localStorage.removeItem('userName')
			localStorage.removeItem('uName')
			localStorage.removeItem('avatar')
		},
		logout () {
			this.$api.logout().then(resp => {
				if (resp.code === 200) {
					this.$message.success('退出成功')
					this.clearUserInfo()
					if (this.$route.path != '/') {
						setTimeout(() => {
							this.$router.push({
								path: '/'
							})
						}, 2000)
					}
				}
			});
		},
		gotoTenantSite () {
			if (this.isMobile) {
				this.$refs.tenantSite.show()
			} else {
				const data = JSON.stringify(this.userInfo)
				// window.location.href = `http://localhost:9528?token=${this.token}&data=${data}`
				window.location.href = `${process.env.VUE_APP_BASE_URL}?token=${this.token}&data=${data}`
			}
		}
	}
};
</script>
<style lang="scss">
.el-dropdown-menu.el-popper a {
	color: #000000;
	text-decoration: none;
}
</style>
<style scoped lang="scss">
.el-dropdown {
	font-size: 16px;
}
@import "~@/styles/variable.scss";
.el-button--primary {
	color: #fff;
	background-color: #5fd28e;
	border-color: #5fd28e;
}
.el-button--default {
	color: #3b5ff5;
	border: 1px solid #3b5ff5;
	background-color: transparent;
}
.header {
	position: fixed;
	background: #fff;
	width: 100%;
	font-size: 16px;
	text-align: center;
	.header-content {
		width: 100%;
		max-width: 1200px;
		height: 70px;
		margin: 0 auto;
		display: flex;
		align-items: center;
	}
	.logo {
		font-size: 24px;
		font-weight: bold;
		display: flex;
		align-items: center;
		.logo-img {
			margin-right: 10px;
			margin-top: 5px;
			width: 140px;
			height: 30px;
		}
		.lg-box {
			cursor: pointer;
			display: flex;
			align-items: center;
		}
	}
	.menu {
		margin-left: 40px;
		.menu-item {
			vertical-align: middle;
			margin-right: 30px;
			color: #28324c !important;
			font-size: 18px;
			cursor: pointer;
			&:hover {
				color: #3b5ff5 !important;
			}
			&.active {
				color: #3b5ff5 !important;
			}
		}
	}
	.header-right {
		margin-left: auto;
		display: flex;
		align-items: center;
		margin-right: 30px;
		.login-box {
			display: flex;
			.button {
				width: 90px;
				height: 34px;
				border-radius: 17px;
				display: flex;
				align-items: center;
				justify-content: center;
				margin-left: 20px;
				border: 1px solid #3b5ff5;
				color: #3b5ff5 !important;
				font-size: 14px;
				&.login {
					background: #5fd28e;
					border-color: #5fd28e;
					color: #fff !important;
				}
				&:hover {
					background: #3b5ff5;
					color: #fff !important;
					border-color: #3b5ff5;
				}
			}
		}
		.langs {
			margin-left: 40px;
			margin-right: 20px;
			cursor: pointer;
			.lang-item {
				display: flex;
				align-items: center;
				.icon {
					width: 24px;
					height: 18px;
					margin-right: 10px;
					border-radius: 5px;
					overflow: hidden;
					object-fit: cover;
				}
			}
		}
	}
}
.lang-dropdown {
	.lang-item {
		display: flex;
		align-items: center;
		.icon {
			width: 24px;
			height: 18px;
			margin-right: 10px;
			border-radius: 5px;
			overflow: hidden;
			object-fit: cover;
		}
	}
}
@media (max-width: 750px) {
	.header {
		position: fixed;
		background: #fff;
		width: 100%;
		font-size: 16px;
		text-align: center;
		.header-content {
			width: 100%;
			padding: 0 20px;
			height: 70px;
			display: flex;
			align-items: center;
		}
		.logo {
			font-size: 24px;
			font-weight: bold;
			display: flex;
			align-items: center;
			.logo-img {
				margin-right: 10px;
				margin-top: 5px;
				width: 140px;
				height: 30px;
			}
			.lg-box {
				cursor: pointer;
				display: flex;
				align-items: center;
			}
		}
		.menu {
			margin-left: 40px;
			.menu-item {
				vertical-align: middle;
				margin-right: 30px;
				color: #28324c !important;
				font-size: 18px;
				&:hover {
					color: #3b5ff5 !important;
				}
				&.active {
					color: #3b5ff5 !important;
				}
			}
		}
		.header-right {
			margin-left: auto;
			display: flex;
			align-items: center;
			margin-right: 30px;
			.login-box {
				display: flex;
				.button {
					width: 90px;
					height: 34px;
					border-radius: 17px;
					display: flex;
					align-items: center;
					justify-content: center;
					margin-left: 20px;
					border: 1px solid #3b5ff5;
					color: #3b5ff5 !important;
					font-size: 14px;
					&.login {
						background: #5fd28e;
						border-color: #5fd28e;
						color: #fff !important;
					}
					&:hover {
						background: #3b5ff5;
						color: #fff !important;
						border-color: #3b5ff5;
					}
				}
			}
			.langs {
				margin: 0 5px 0 10px;
				cursor: pointer;
				.lang-item {
					display: flex;
					align-items: center;
					span {
						white-space: nowrap;
					}
					.icon {
						width: 24px;
						height: 18px;
						margin-right: 10px;
						border-radius: 5px;
						overflow: hidden;
						object-fit: cover;
					}
				}
			}
			.menu-dropdown {
				width: 70px;
				height: 70px;
				display: flex;
				align-items: center;
				justify-content: center;
				img {
					width: 50px;
					height: 50px;
				}
			}
			.dropdown-content {
				position: fixed;
				left: 100vw;
				top: 70px;
				width: 100vw;
				height: calc(100vh - 70px);
				background: rgba(59, 95, 245, 0.9);
				display: flex;
				flex-direction: column;
				padding-top: 65px;
				box-sizing: border-box;
				overflow: scroll;
				transition: all 0.5s;
				&.show {
					left: 0;
				}
				.dropdown-item {
					display: flex;
					width: 100%;
					padding: 0 60px;
					box-sizing: border-box;
					align-items: center;
					height: 50px;
					color: #fff !important;
					&.active {
						background: #2d50e2;
					}
					i {
						margin-left: auto;
					}
				}
			}
		}
	}
}
</style>
