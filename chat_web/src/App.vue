<template>
	<div id="app">
		<Header />
		<router-view></router-view>
		<Footer v-if="!$route.meta.hideFooter" />
		<div class="toTelegram">
			<el-link href="https://t.me/aichat_vip" :underline="false" class="link">
				<img src="/images/contact/telegram.png" />
			</el-link>
		</div>
	</div>
</template>

<script>
import { getAccess, removeAccess, saveAccess } from '@/api/cache'
import { sampleSize } from 'lodash'
import { loadScript } from '@/utils'
import Header from '@/views/Header.vue'
import Footer from '@/views/Footer.vue'
export default {
	data () {
		return {
			maxHeight: window.screen.availHeight - 48 + "px",
			maxWidth: window.screen.availWidth + "px"
		};
	},
	components: {
		Header,
		Footer
	},
	methods: {
		initCustomerId () {
			if (!localStorage.getItem('uid')) {
				const charSet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
				const uid = sampleSize(charSet.split(''), 13).join('')
				localStorage.setItem('uid', uid)
			}
		},
		createIframeServer () {
			let url = `${process.env.VUE_APP_CHAT_URL}/index/index/chatBoxJs/u/61356e3df2889`
			let id = "aichat_script"
			let custom = ""
			loadScript({
				url: url,
				id: id,
				custom: custom
			})
		}
	},
	created () {
		let access = getAccess()
		if (access) return
		removeAccess()
		this.$api.getSellerInfo().then(res => {
			if (res.code !== 200) return
			let token = res.data.token
			let timeStamp = res.data.t
			let sellerCode = res.data.seller_code
			let customerId = localStorage.getItem('uid')
			saveAccess({ token, timeStamp, sellerCode, customerId })
		})
	},
	mounted () {
		this.initCustomerId()
		this.createIframeServer()
	},
	watch: {
		$route () {
			// console.log(val, process.env.VUE_APP_CHAT_URL)
			window.addEventListener(
				"message",
				function (event) {
					// console.log('app', event)
					if (event.data.body_color) {
						window.body_color = event.data.body_color
						document.querySelector('#WS-SHOW-CHAT').style.backgroundColor = event.data.body_color
					}
					if (event.data.body_color !== undefined || event.data === 201 || event.data === 'xxx') {
						document.querySelector('#WS-SHOW-CHAT').style.display = 'block'
						return ''
					}
					if (
						event.origin === 'https://chat.aichating.com'
					) {
						// console.log(event.data);
						localStorage.setItem("socketCId", event.data);
					}
				},
				false
			);
		}
	}
};
</script>
<style lang="scss">
.el-carousel__arrow {
	background-color: rgba(0, 0, 0, 0.5) !important;
	color: rgba(0, 0, 0, 0.66) !important;
	font-size: 18px !important;
	margin-top: -25px !important;
	font-weight: bold;
	display: flex;
	align-items: center;
	justify-content: center;
}
.el-carousel__arrow:hover {
	color: #fff !important;
	background-color: rgba(255, 255, 255, 0.3) !important;
}
.el-card__body {
	padding: 5px !important;
}
.el-message {
	top: 100px;
}
#app {
	overflow-x: hidden !important;
}
.toTelegram {
	position: fixed;
	right: 20px;
	bottom: 50px;
	width: 60px;
	height: 60px;
	border-radius: 50%;
	overflow: hidden;
	box-shadow: rgb(127 186 253 / 30%) -14px 11px 20px 0px;
	z-index: 99;
	.link {
		width: 100%;
		height: 100%;
		display: flex;
		align-items: center;
		border-radius: 50%;
		.el-link--inner {
			width: 100%;
			height: 100%;
			background: #3B5FF5;
			box-shadow: 0px 15px 30px 0px rgba(59,95,245,0.33);
			border-radius: 45px;
			display: flex;
			align-items: center;
			justify-content: center;
			img {
				width: 50%;
				height: 50%;
			}
		}
	}
}
</style>
