<template>
  <div class="login-container">
    <div class="login-container-wrap">
      <img :src="require('@/assets/img/login_pic@2x.png')" alt>
      <el-form ref="form" :model="form" :rules="rules" class="login-form" :class="{'padding20':needSellerCode}" auto-complete="on" label-position="top">
        <div class="title-container">
          <h3 class="title">{{ $t('serverLogin.title') }}</h3>
        </div>
        <el-form-item class="login-type">
          <el-tabs v-model="loginType">
            <el-tab-pane :label="$t('serverLogin.peopleType[0]')" name="0" />
            <!-- <el-tab-pane :label="$t('serverLogin.peopleType[1]')" name="1" /> -->
          </el-tabs>
          <span v-if="!isMobile" class="phone-login">
            <el-popover placement="right" :title="$t('serverLogin.phoneTips')" width="240" :offset="100" trigger="click" popper-class="server-popper">
              <div slot="reference" class="reference">
                <span>{{ $t('serverLogin.phone') }}</span>
                <span class="material-icons-round">qr_code_2</span>
                <i class="el-icon-arrow-right" />
              </div>

              <div id="qRcode" ref="qRcode" style="display:flex;justify-content: center;" />
            </el-popover>
          </span>
        </el-form-item>
        <el-form-item v-if="needSellerCode" prop="seller_code" :label="$t('serverLogin.placeholder.seller_code')">
          <el-input ref="seller_code" v-model="form.seller_code" :placeholder="$t('serverLogin.placeholder.seller_code')" name="seller_code" type="text" tabindex="1" auto-complete="on" />
        </el-form-item>
        <el-form-item prop="username" :label="$t('serverLogin.placeholder.username')">
          <el-input ref="username" v-model="form.username" :placeholder="$t('serverLogin.placeholder.username')" name="username" type="text" tabindex="1" auto-complete="on" />
        </el-form-item>

        <el-form-item prop="password" :label="$t('serverLogin.placeholder.password')">
          <el-input :key="passwordType" ref="password" v-model="form.password" :type="passwordType" :placeholder="$t('serverLogin.placeholder.password')" name="password" tabindex="2" auto-complete="on" />
          <span class="show-pwd" @click="showPwd">
            <svg-icon :icon-class="passwordType === 'password' ? 'eye' : 'eye-open'" />
          </span>
        </el-form-item>

        <el-form-item prop="captcha" :label="$t('serverLogin.placeholder.captcha')">
          <el-input v-model="form.captcha" :placeholder="$t('serverLogin.placeholder.captcha')" type="text" tabindex="3" auto-complete="on" @keyup.enter.native="loginHandler" />
          <img class="captcha" :src="`${baseUrl}/api/auth/verify?t=${timestamp}`" @click="timestamp=Date.now()">
        </el-form-item>
        <el-form-item class="checkbox" style="margin-bottom:0;">
          <el-checkbox v-model="isgoogleEnable">{{ $t('googleCheck.isgoogle') }}</el-checkbox>
        </el-form-item>
        <el-button :class="{'not-top':needSellerCode}" :loading="loading" type="primary" style="width: 100%; margin-bottom: 30px" @click.native.prevent="loginHandler">{{ $t('serverLogin.login') }}</el-button>
      </el-form>
    </div>
    <img class="img1" :src="require('@/assets/img/bg_element_1@2x.png')" alt>
    <img class="img2" :src="require('@/assets/img/bg_element_2@2x.png')" alt>
    <img class="img3" :src="require('@/assets/img/bg_element_3@2x.png')" alt>

    <GoogleModal ref="ServerGoogleModal" />
  </div>
</template>

<script>
import GoogleModal from '@/components/GoogleModal/index.vue'
import QRCode from 'qrcodejs2-fix'
import { mapActions, mapMutations } from 'vuex'
import { getLanguage } from '@/lang/index.js'
export default {
  name: 'ServerLogin',
  components: {
    GoogleModal
  },
  data() {
    return {
      form: {
        seller_code: '',
        username: '',
        password: '',
        captcha: ''
      },
      rules: {
        username: [{ required: true, trigger: 'blur', message: this.$t('serverLogin.tips.username') }],
        password: [{ required: true, trigger: 'blur', message: this.$t('serverLogin.tips.password') }],
        captcha: [{ required: true, trigger: 'blur', message: this.$t('serverLogin.tips.captcha') }]
      },
      isgoogleEnable: false,
      loading: false,
      loginType: '0',
      passwordType: 'password',
      timestamp: Date.now(),
      baseUrl: process.env.VUE_APP_BASE_URL
    }
  },
  computed: {
    // 判断是否在移动端
    isMobile() {
      const info = navigator.userAgent
      const agents = ['Android', 'iPhone', 'SymbianOS', 'Windows Phone', 'iPod', 'iPad']
      for (let i = 0; i < agents.length; i++) {
        if (info.indexOf(agents[i]) >= 0) return true
      }
      return false
    },
    needSellerCode() {
      return this.$IS_ELECTRON || !this.$route.params.sellerCode
    }
  },
  methods: {
    creatQrCode() {
      new QRCode('qRcode', {
        width: 200,
        height: 200,
        colorDark: '#111',
        colorLight: '#f5f5f5',
        text: `${window.location.origin}/login/server/${this.$route.params.sellerCode}`
      })
    },
    showPwd() {
      if (this.passwordType === 'password') {
        this.passwordType = ''
      } else {
        this.passwordType = 'password'
      }
      this.$nextTick(() => {
        this.$refs.password.focus()
      })
    },
    loginHandler() {
      this.$refs.form.validate(valid => {
        if (valid) {
          this.loading = true
          const { form: { username: kefu_username, password, captcha, seller_code }, loginType: type } = this
          const params = { kefu_username, password, captcha, customer_id: '', type, seller_code: this.needSellerCode ? seller_code : this.$route.params.sellerCode }
          this.serverLogin(params).then(res => {
            const { code, KfToken, data, msg } = res
            if (code === 0) {
              // 添加判断是否进行二次谷歌验证
              if (data.isgoole == 1 && data.secret) {
                // 需要二次验证
                // 保存token和data传入谷歌验证弹窗
                const params = {
                  token: KfToken,
                  userInfo: data,
                  from: 'server'
                }
                this.$refs.ServerGoogleModal.show(params)
              } else {
                if (this.isgoogleEnable) {
                  // 需要绑定谷歌二次验证
                  this.setServerToken(KfToken)
                  this.setServer(data)
                  // 保存 会话设置
                  this.$store.commit('chatServer/setSessionConfig', {
                    sort: data.sort,
                    retain: data.retain
                  })
                  this.$router.push({ path: `/GoogleCheckStep1` })
                } else {
                  // 不需要二次验证
                  this.setServerToken(KfToken)
                  this.setServer(data)
                  this.$router.push({ path: `/chat/server/${data.seller_code}` })
                  // 保存 会话设置
                  this.$store.commit('chatServer/setSessionConfig', {
                    sort: data.sort,
                    retain: data.retain
                  })
                }
              }
              // this.$router.push({ path: `/chat/server/${data.seller_code}` })
              // 保存 会话设置
              // this.$store.commit('chatServer/setSessionConfig', {
              // 	sort: data.sort,
              // 	retain: data.retain
              // })
            } else {
              this.$message.error(msg)
              this.timestamp = Date.now()
            }
            this.loading = false
          })
        }
      })
    },
    setDocTitle() {
      const lang = getLanguage()
      document.title = {
        'zh': '客服登录',
        'en': 'Customer service login',
        'vi': 'Mã nhập dịch vụ',
        'th': 'ล็อกอิน'
      }[lang]
    },
    ...mapMutations({
      setServerToken: 'auth/setServerToken',
      setServer: 'auth/setServer'
    }),
    ...mapActions({
      serverLogin: 'auth/serverLogin'
    })
  },
  mounted() {
    this.setDocTitle()
    this.creatQrCode()
  }
}
</script>

<style lang="scss">
.server-popper {
	background: #fff;
	border: none;
	.popper__arrow {
		display: none;
	}
}
.login-container {
	background: #f2f8ff;
	.el-input {
		display: inline-block;
		height: 46px;
		width: 85%;

		input {
			background: transparent;
			border: 0px;
			-webkit-appearance: none;
			border-radius: 0px;
			padding: 12px 5px 12px 15px;
			color: #333;
			height: 46px;
			caret-color: #333;

			&:-webkit-autofill {
				box-shadow: 0 0 0px 1000px #fff inset !important;
				-webkit-text-fill-color: #333 !important;
			}
		}
	}
	.el-form-item {
		// border: 1px solid #ddd;
		// border-radius: 5px;
		.el-form-item__label {
			padding: 0;
		}
		.el-form-item__content {
			height: 48px;
			border: 1px solid #e7ebf2;
			border-radius: 6px;
		}
        &.checkbox{
            margin-bottom: 0;
            .el-form-item__content {
				border: 0;
			}
        }
		&.login-type {
			.el-form-item__content {
				border: 0;
			}
			.el-tabs {
				width: 50%;
				display: inline-block;
				.el-tabs__item {
					font-size: 16px;
					color: #72798c;
					&.is-active {
						font-size: 20px;
						color: #31363e;
					}
				}
				.el-tabs__active-bar {
					height: 4px;
					width: 36px !important;
					background: #3b5ff5;
				}
			}
		}
	}
	.login-type {
		border: none;
		margin-bottom: 2px;
		.phone-login {
			float: right;
			cursor: pointer;
		}
	}
}
</style>

<style lang="scss" scoped>
.login-container {
	min-height: 100%;
	width: 100%;
	overflow: hidden;
	position: relative;
	.reference {
		display: flex;
		align-items: center;
		.material-icons-round {
			font-size: 16px;
			color: #2d50e2;
		}
	}

	&-wrap {
		width: 1080px;
		height: 654px;
		position: absolute;
		top: 50%;
		left: 50%;
		margin-top: -327px;
		margin-left: -540px;
		display: flex;
		align-items: center;
		z-index: 9;
		> img {
			width: 500px;
		}
	}

	.login-form {
		width: 580px;
		height: 100%;
		max-width: 100%;
		padding: 30px 95px;
		// margin: 125px auto 0;
		border-radius: 10px;
		overflow: hidden;
		background: #fff;
        &.padding20{
            padding: 20px 95px;
        }
		.el-form-item:not(.login-type) {
			margin-bottom: 16px;
		}
	}

	.tips {
		font-size: 14px;
		color: #fff;
		margin-bottom: 10px;

		span {
			&:first-of-type {
				margin-right: 16px;
			}
		}
	}
	.captcha {
		position: absolute;
		right: 6px;
		top: 3px;
		width: 100px;
		height: 40px;
		border-radius: 4px;
		cursor: pointer;
		border: 1px solid #eee;
	}

	.svg-container {
		padding: 6px 5px 6px 15px;
		color: #5082f4;
		vertical-align: middle;
		width: 30px;
		display: inline-block;
	}

	.title-container {
		position: relative;

		.title {
			font-size: 30px;
			margin: 0px auto 40px auto;
			text-align: center;
			font-weight: bold;
			color: #2d50e2;
		}
	}

	.show-pwd {
		position: absolute;
		right: 10px;
		top: 7px;
		font-size: 16px;
		color: #5082f4;
		cursor: pointer;
		user-select: none;
	}
	.el-button--primary {
		height: 48px;
		border-radius: 24px;
		margin-top: 40px;
        &.not-top{
            margin-top: 0;
        }
	}
	.img1,
	.img2,
	.img3 {
		position: absolute;
	}
	.img {
		width: 99px;
		top: 142px;
		left: 281px;
	}
	.img2 {
		width: 330px;
		left: 0;
		bottom: 135px;
	}
	.img3 {
		width: 620px;
		right: 0;
		bottom: 0;
	}
}
@media (max-width: 600px) {
	.login-container-wrap {
		margin: 0;
		top: 50%;
		width: 90%;
		transform: translate(-50%, -50%);
		left: 50%;
		> img {
			display: none;
		}
		.title-container {
			margin-top: 40px;
		}
		.el-form {
			padding: 0 10px;
			.login-type {
				.el-tabs {
					width: 60%;
				}
			}
		}
	}
}
</style>
