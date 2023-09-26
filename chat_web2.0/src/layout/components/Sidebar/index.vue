<template>
  <div class="has-logo">
    <logo :collapse="isCollapse" />
    <el-scrollbar wrap-class="scrollbar-wrapper" :style="{paddingTop:$IS_ELECTRON?'30px':'0px'}">
      <div v-show="!$IS_ELECTRON" class="flex-jcs">
        <a :href="`/login/server/${sellerCode}`" target="_blank" @click="checkSellerCode">
          <div class="server-desk" :class="isCollapse?'hide':'show'">
            <el-tooltip v-if="isCollapse" effect="dark" :content="$t('router.serverWorkbench')" placement="right" />
            <span v-show="!isCollapse" class="mr30">{{ $t('router.serverWorkbench') }}</span>
            <svg-icon v-show="isCollapse" icon-class="member" />
            <i class="el-icon-arrow-right" />
          </div>
        </a>
        <div v-show="!isCollapse" :class="['flex-aic-jcc', {'isCollapse': isCollapse}]">
          <el-popover placement="left" :title="$t('router.ewm')" width="240" :offset="100" trigger="click">
            <svg-icon slot="reference" icon-class="qr_code_2" />
            <div id="qRcode1" ref="qRcode" style="display:flex;justify-content: center;" />
          </el-popover>
        </div>
      </div>
      <div v-show="!$IS_ELECTRON && isCollapse" class="flex-jcs">
        <div :class="['flex-aic-jcc', {'isCollapse': isCollapse}]">
          <el-popover placement="left"  :title="$t('router.ewm')" width="240" :offset="100" trigger="click">
            <svg-icon slot="reference" icon-class="qr_code_2" />
            <div id="qRcode2" ref="qRcode" style="display:flex;justify-content: center;" />
          </el-popover>
        </div>
      </div>

      <!-- <div v-show="isCollapse && !$IS_ELECTRON" class="flex-aic-jcc isCollapse">
				<el-popover placement="right"  :title="$t('router.ewm')" width="240" :offset="100" trigger="click">
					<span slot="reference" class="material-icons-round">qr_code_2</span>
					<div id="qRcode1" ref="qRcode" style="display:flex;justify-content: center;" />
				</el-popover>
			</div> -->
      <el-menu :default-active="activeMenu" :collapse="isCollapse" :background-color="variables.menuBg" :text-color="variables.menuText" :unique-opened="true" :active-text-color="variables.menuActiveText" :collapse-transition="false" mode="vertical">
        <sidebar-item v-for="route in routes" :key="route.path" :item="route" :base-path="route.path" />
      </el-menu>
      <!-- <span class="navbar hide" /> -->
    </el-scrollbar>
    <hamburger :is-active="sidebar.opened" @toggleClick="toggleSideBar" />
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import Logo from './Logo'
import SidebarItem from './SidebarItem'
import variables from '@/styles/variables.scss'
import { getUseInfo } from '@/api/common.js'
import QRCode from 'qrcodejs2-fix'
import { eventBus } from '../eventBus'
import Hamburger from '@/components/Hamburger'

export default {
  components: { SidebarItem, Logo, Hamburger },
  computed: {
    ...mapGetters([
      'sidebar'
    ]),
    routes() {
      return this.$router.options.routes
    },
    activeMenu() {
      const route = this.$route
      const { meta, path } = route
      // if set path, the sidebar will highlight the path you set
      if (meta.activeMenu) {
        return meta.activeMenu
      }
      return path
    },
    showLogo() {
      return this.$store.state.settings.sidebarLogo
    },
    variables() {
      return variables
    },
    isCollapse() {
      return !this.sidebar.opened
    }
  },
  data() {
    return {
      sellerCode: '',
      dialogVisible: false,
      isCreated: false
    }
  },
  watch: {
    sidebar: {
      handler({ opened }) {
        if (opened) {
          this.$nextTick(() => {
            // this.hoverMenuItem()
          })
        }
      },
      deep: true
    }
  },
  created() {
    this.getUseInfo()
  },
  mounted() {
    eventBus.$on('deleteCode', () => {
      this.deleteSellerCode()
    })
    // this.hoverMenuItem()
    // console.log(this.$IS_ELECTRON)
  },
  methods: {
    toggleSideBar () {
			this.$store.dispatch('app/toggleSideBar')
		},
    checkSellerCode() {
      if (this.sellerCode) {
        return true
      } else {
        return this.$notify.error({
          title: '失败',
          message: '接口暂未返回。请刷新重试！'
        })
      }
    },
    creatQrCode() {
      new QRCode('qRcode1', {
        width: 200,
        height: 200,
        colorDark: '#111',
        colorLight: '#f5f5f5',
        text: `${window.location.origin}/login/server/${this.sellerCode}`
      })
      new QRCode('qRcode2', {
        width: 200,
        height: 200,
        colorDark: '#111',
        colorLight: '#f5f5f5',
        text: `${window.location.origin}/login/server/${this.sellerCode}`
      })
    },
    hoverMenuItem() {
      const navbar = document.querySelector('.navbar')
      const menuWrapper = document.querySelector('.el-menu')
      const menuList = [
        ...document.querySelectorAll('.el-submenu__title'),
        ...document.querySelectorAll('.submenu-title-noDropdown')
      ]
      menuList.forEach(menu => {
        menu.onmouseenter = () => {
          const beginTime = Date.now()
          const { top: menuTop } = menu.getBoundingClientRect()
          const { top: navbarTop } = navbar.getBoundingClientRect()
          function scroll() {
            const progress = (Date.now() - beginTime) / 200
            if (progress < 1) {
              if (menuTop > navbarTop) {
                // 下滑
                const distance = (menuTop - navbarTop) * progress
                navbar.style.top = navbarTop + distance + 'px'
              } else if (menuTop < navbarTop && navbarTop - menuTop != 28) {
                // 上滑
                const distance = (navbarTop - menuTop) * progress
                navbar.style.top = navbarTop - distance + 'px'
              }
              window.requestAnimationFrame(scroll)
            } else {
              navbar.style.top = menuTop + 'px'
            }
          }
          window.requestAnimationFrame(scroll)
        }
      })
      menuWrapper.onmouseenter = () => {
        // navbar.classList.replace('hide', 'show')
        const { classList } = navbar
        if (classList.contains('hide')) {
          classList.remove('hide')
          classList.add('show')
        }
      }
      menuWrapper.onmouseleave = () => {
        // navbar.classList.replace('show', 'hide')
        const { classList } = navbar
        if (classList.contains('show')) {
          classList.remove('show')
          classList.add('hide')
        }
      }
    },
    getUseInfo() {
      getUseInfo().then(res => {
        const { code, data } = res
        if (code === 0) {
          this.sellerCode = data.seller_code || ''
          this.$nextTick(() => {
            this.creatQrCode()
          })
        }
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.scrollbar-wrapper {
	position: relative;
	.flex-jcs {
		display: flex;
		justify-content: space-between;
		.flex-aic-jcc {
			// margin-right: 10px;
		}
	}
	.flex-aic-jcc {
		display: flex;
		align-items: center;
		justify-content: center;
		width: 28px;
		height: 28px;
		// margin: 58px 5px 14px 0;
		font-size: 20px;
		cursor: pointer;
		color: #f5f5f5;
		&.isCollapse {
			// margin: 55px auto 0;
		}
	}
	.navbar {
		position: absolute;
		z-index: 1;
		top: 0;
		left: 0;
		height: 56px;
		width: 5px;
		background: #345eea;
		transition: transform 0.2s;
		&.show {
			transform: scaleY(1);
		}
		&.hide {
			transform: scaleY(0);
		}
	}
  .el-scrollbar__view{
    >.ercode{
      width: 24px;
      height: 24px;
      display: block;
      margin: 0 auto;
    }
  }
}
.server-desk {
	display: flex;
	align-items: center;
	height: 48px;
	width: 164px;
	padding: 0 24px;
	border-radius: 5px;
	margin: 0 auto;
	font-size: 14px;
	background: #5082f4;
	color: #fff;
	border-radius: 24px;
	cursor: pointer;
	white-space: nowrap;
	.el-icon-arrow-right {
		margin-top: 2px;
	}
  .svg-icon{
    width: 20px;
    height: 20px;
    margin-right: 0 !important;
  }
	// .material-icons-round {
	// 	font-size: 14px;
	// }
	&.show {
		display: flex;
	}
	&.hide {
		width: 48px;
		margin-top: 0;
		padding:0;
		justify-content: center;
		.el-icon-arrow-right {
			display: none;
		}
	}
}
.flex-jcs {
	display: flex;
	justify-content: space-between;
	// position: absolute;
	// bottom: 10px;
	// left: 0;
	width: 100%;
	align-items: center;
	padding: 10px 0;
	background: transparent;
	.flex-aic-jcc {
		margin-right: 10px;
	}
}
.flex-aic-jcc {
	display: flex;
	align-items: center;
	justify-content: center;
	width: 28px;
	height: 28px;
	// margin: 58px 5px 14px 0;
	font-size: 20px;
	cursor: pointer;
	color: #f5f5f5;
	&.isCollapse {
		// margin: 55px auto 0;
		margin: 0 auto;
    span{
      display: flex;
      justify-content: center;
      .svg-icon{
        margin-right: -4px !important;
      }
    }
		// .material-icons-round{
		// 	font-size:24px;
		// }
	}
}

</style>
<style lang="scss">
.el-popover__title {
	text-align: center;
}
</style>
