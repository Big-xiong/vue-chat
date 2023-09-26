<template>
  <div id="navbar">
    <div class="navbar-left">
      <!-- <hamburger :is-active="sidebar.opened" @toggleClick="toggleSideBar" /> -->
      <div class="navbar-wrapper">
        <!-- <a class="navbar-item mr30" :href="domainLink" target="_blank">
					<svg-icon icon-class="language" class="icon-language" />
				</a> -->
        <!-- <el-tooltip effect="dark" :content="$t('navbar.refresh')" placement="bottom">
					<i class="navbar-item material-icons-round fs-21 mr40" @click="refreshSelectedTag">refresh</i>
				</el-tooltip> -->
        <el-dropdown class="navbar-item ml30 mr30" trigger="click" ref="seller">
          <div class="seller-name">
            {{ seller.seller_name }}
            <i class="el-icon-arrow-down" />
          </div>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item>
              <div @click="passwordVisible = true">
                {{ $t("navbar.modifyPwd") }}
              </div>
            </el-dropdown-item>
            <el-dropdown-item>
              <a
                :href="`${domainLink}/pay/${seller.seller_code}`"
                target="_blank"
              >
                {{ $t("navbar.buyProd") }}
              </a>
            </el-dropdown-item>
            <el-dropdown-item>
              <a :href="`/video/AICHAT_setting.mp4`" target="_blank">
                {{ $t("navbar.howToUse") }}
              </a>
            </el-dropdown-item>
            <el-dropdown-item>
              <div @click="clickLogout">{{ $t("navbar.logout") }}</div>
            </el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
        <span class="navbar-item remaind" :class="{ expire: expireSoon }">
          <span>{{ $t("navbar.periodOfValidity") }}：</span>
          <span v-if="expireSoon || remaindShow" class="mr6">
            {{ seller.valid_time }}
            <template v-if="remainDate">
              {{ `${$t("navbar.remaind")} ${remainDate} ${$t("navbar.day")}` }}
            </template>
            <a class="renew" :href="`${domainLink}/contact`" target="_blank">
              {{ $t("navbar.renew") }}
            </a>
          </span>
          <span
            v-if="!expireSoon"
            class="remaind-toggle"
            @click="remaindShow = !remaindShow"
          >
            {{ remaindShow ? $t("navbar.hide") : $t("navbar.show") }}
          </span>
        </span>
      </div>
    </div>

    <div class="navbar-right">
      <div class="navbar-wrapper">
        <div class="flex-aic mr50">
          <span class="mr8">{{ $t("navbar.nightMode") }}</span>
          <el-switch
            v-model="theme"
            active-value="dark"
            inactive-value="light"
            active-color="#1890FF"
            @change="setTheme"
          />
        </div>
        <!-- <el-tooltip effect="dark" :content="$t('navbar.refresh')" placement="bottom">
					<svg-icon icon-class="refresh" class="icon-refresh mr30" @click="refreshSelectedTag" />
				</el-tooltip> -->
        <div class="navbar-item mr30">
          <el-badge :is-dot="messageBadge" class="message-badge">
            <el-tooltip
              effect="dark"
              :content="$t('navbar.messageList')"
              placement="bottom"
            >
              <router-link to="/talk/message">
                <!-- <i class="material-icons-round offset-top fs-20">mail_outline</i> -->
                <svg-icon icon-class="mail_outline" class="icon-mail_outline" />
              </router-link>
            </el-tooltip>
          </el-badge>
        </div>
        <screenfull class="navbar-item screenfull mr30" />

        <el-dropdown
          class="navbar-item mr30"
          trigger="hover"
          @command="changeLang"
        >
          <div class="lang-item">
            <img class="icon" :src="curLang.icon" />
            <span class="mr2">{{ curLang.lang }}</span>
            <i class="el-icon-arrow-down" />
          </div>
          <el-dropdown-menu slot="dropdown" class="lang-dropdown">
            <el-dropdown-item command="zh">
              <div class="lang-item">
                <img class="icon" src="@/assets/svg/zh.svg" />
                {{ $t("navbar.zh") }}
              </div>
            </el-dropdown-item>
            <el-dropdown-item command="en">
              <div class="lang-item">
                <img class="icon" src="@/assets/svg/en.svg" />
                {{ $t("navbar.en") }}
              </div>
            </el-dropdown-item>
            <el-dropdown-item command="vi">
              <div class="lang-item">
                <img class="icon" src="@/assets/svg/vi.svg" />
                {{ $t("navbar.vi") }}
              </div>
            </el-dropdown-item>
            <el-dropdown-item command="th">
              <div class="lang-item">
                <img class="icon" src="@/assets/svg/th.svg" />
                {{ $t("navbar.th") }}
              </div>
            </el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
        <!-- <i class="navbar-item iconfont icon-more mr20" @click="copyrightVisible=true" /> -->
        <svg-icon icon-class="more" @click="copyrightVisible = true" />
      </div>
    </div>

    <password :visible.sync="passwordVisible" />
    <copyright :visible.sync="copyrightVisible" />

    <span class="navbar-scroll hide" />
  </div>
</template>

<script>
import password from "@/components/password";
import copyright from "@/components/copyright";
import Hamburger from "@/components/Hamburger";
import Screenfull from "@/components/Screenfull";
import Breadcrumb from "@/components/Breadcrumb";
import { getUnreadMessage } from "@/api/message.js";
import { mapState, mapGetters, mapMutations, mapActions } from "vuex";
import { getLanguage } from "@/lang/index.js";
import { setTheme } from "@/utils/theme";
import { eventBus } from "./eventBus";
export default {
  components: {
    Breadcrumb,
    Hamburger,
    Screenfull,
    password,
    copyright,
  },
  watch: {
    $route(to, from) {
      if (to.name == "MessageList" && to.path == "/talk/message") {
        this.unreadMessage = 0;
      }
      if (from.name == "MessageList" && from.path == "/talk/message") {
        this.getUnreadMessage();
      }
    },
  },
  computed: {
    ...mapGetters(["sidebar"]),
    ...mapState({
      seller: (state) => state.auth.seller,
    }),
    remainDate() {
      let { valid_time } = this.seller;
      if (valid_time) {
        valid_time = valid_time.replace(/-/g, "/");
        const diff = new Date(valid_time).getTime() - Date.now();
        return parseInt(diff / (24 * 60 * 60 * 1000));
      } else {
        return "";
      }
    },
    expireSoon() {
      const { remainDate } = this;
      if (remainDate === "") {
        return false;
      } else if (remainDate <= 3) {
        return true;
      }
    },
    curTag() {
      return this.$store.state.tagsView.visitedViews;
    },
    messageBadge() {
      return !!this.unreadMessage;
    },
    curLang() {
      const lang = getLanguage();
      return {
        zh: {
          lang: this.$t("navbar.zh"),
          icon: require("@/assets/svg/zh.svg"),
        },
        en: {
          lang: this.$t("navbar.en"),
          icon: require("@/assets/svg/en.svg"),
        },
        vi: {
          lang: this.$t("navbar.vi"),
          icon: require("@/assets/svg/vi.svg"),
        },
        th: {
          lang: this.$t("navbar.th"),
          icon: require("@/assets/svg/th.svg"),
        },
      }[lang];
    },
  },
  data() {
    return {
      domainLink: "",
      theme: "light",
      unreadMessage: 0,
      mouseStatus: "leave",
      remaindShow: true,
      passwordVisible: false,
      copyrightVisible: false,
      eventBus: eventBus,
    };
  },
  methods: {
    toggleSideBar() {
      this.$store.dispatch("app/toggleSideBar");
    },
    clickLogout() {
      this.sellerLogout().then((res) => {
        const { code, msg } = res;
        if (code === 0) {
          this.$router.push({ path: "/login/seller" });
        } else {
          this.$message.error(msg);
        }
      });
    },
    changeLang(lang) {
      if (lang != getLanguage()) {
        sessionStorageCompatible.setItem("lang", lang);
        location.reload();
      }
    },
    refreshSelectedTag() {
      const curView = this.$store.state.tagsView.visitedViews.find((view) => {
        return view.path === this.$route.path;
      });
      if (curView) {
        this.$store.dispatch("tagsView/delCachedView", curView).then(() => {
          const { fullPath } = curView;
          this.$nextTick(() => {
            this.$router.replace({
              path: "/redirect" + fullPath,
            });
          });
        });
      }
    },
    getUnreadMessage() {
      getUnreadMessage().then((res) => {
        const { code, data } = res;
        if (code === 0) {
          this.unreadMessage = data.no_read;
        }
      });
    },
    setDocTitle() {
      const lang = getLanguage();
      document.title = {
        zh: "爱洽客服v2后台管理",
        en: "Aicha customer service v2 background management",
        vi: "Quản lý nền Aicha Customer Service v2",
        th: "การจัดการพื้นหลังการบริการลูกค้า Aicha v2",
      }[lang];
    },
    hoverNavbarItem() {
      const navbar = document.querySelector("#navbar");
      const navbarItems = document.querySelectorAll("#navbar .navbar-item");
      const navbarScroll = document.querySelector("#navbar .navbar-scroll");
      navbarItems.forEach((navbarItem) => {
        navbarItem.onmouseenter = () => {
          const beginTime = Date.now();
          const { left: wrapLeft } = navbar.getBoundingClientRect();
          const { left: targetLeft, width: targetWidth } =
            navbarItem.getBoundingClientRect();
          const { left: sourceLeft, width: sourceWidth } =
            navbarScroll.getBoundingClientRect();
          if (this.mouseStatus == "enter") {
            this.mouseStatus = "leave";
            navbarScroll.style.left = targetLeft - wrapLeft + "px";
            window.requestAnimationFrame(scale);
          } else {
            window.requestAnimationFrame(scroll);
          }
          function scroll() {
            const progress = (Date.now() - beginTime) / 100;
            if (progress < 1) {
              if (targetLeft > sourceLeft) {
                // 右移
                const leftDistance = (targetLeft - sourceLeft) * progress;
                navbarScroll.style.left =
                  sourceLeft - wrapLeft + leftDistance + "px";
              } else {
                // 左移
                const distance = (sourceLeft - targetLeft) * progress;
                navbarScroll.style.left =
                  sourceLeft - wrapLeft - distance + "px";
              }
              if (targetWidth > sourceWidth) {
                // 放大
                const distance = (targetWidth - sourceWidth) * progress;
                navbarScroll.style.width = sourceWidth + distance + "px";
              } else {
                // 缩小
                const distance = (sourceWidth - targetWidth) * progress;
                navbarScroll.style.width = sourceWidth - distance + "px";
              }
              window.requestAnimationFrame(scroll);
            } else {
              navbarScroll.style.left = targetLeft - wrapLeft + "px";
              navbarScroll.style.width = targetWidth + "px";
            }
          }
          function scale() {
            const progress = (Date.now() - beginTime) / 100;
            if (progress < 1) {
              if (targetWidth > sourceWidth) {
                // 放大
                const distance = (targetWidth - sourceWidth) * progress;
                navbarScroll.style.width = sourceWidth + distance + "px";
              } else {
                // 缩小
                const distance = (sourceWidth - targetWidth) * progress;
                navbarScroll.style.width = sourceWidth - distance + "px";
              }
              window.requestAnimationFrame(scale);
            } else {
              navbarScroll.style.width = targetWidth + "px";
            }
          }
        };
      });

      const navbarWrapper = document.querySelectorAll(
        "#navbar .navbar-wrapper"
      );
      navbarWrapper.forEach((wrapper) => {
        wrapper.onmouseenter = () => {
          this.mouseStatus = "enter";
          // navbarScroll.classList.replace('hide', 'show')
          const { classList } = navbarScroll;
          if (classList.contains("hide")) {
            classList.remove("hide");
            classList.add("show");
          }
        };
        wrapper.onmouseleave = () => {
          this.mouseStatus = "leave";
          // navbarScroll.classList.replace('show', 'hide')
          const { classList } = navbarScroll;
          if (classList.contains("show")) {
            classList.remove("show");
            classList.add("hide");
          }
        };
      });
    },
    ...mapActions({
      sellerLogout: "auth/sellerLogout",
    }),
    ...mapMutations({
      SET_THEME: "app/SET_THEME",
    }),
    setTheme(theme) {
      setTheme(theme);
      this.SET_THEME(theme);
    },
  },
  created() {
    this.domainLink = process.env.VUE_APP_DOMAIN;
    this.getUnreadMessage();
  },
  mounted() {
    this.setTheme("light");
    this.setDocTitle();
    this.hoverNavbarItem();
    // this.$refs.seller.show();
  },
};
</script>

<style lang="scss" scoped>
#navbar {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 60px;
  overflow: hidden;
  color: var(--navbar-content);
  background: var(--navbar-bg);
  border-left: 2px solid var(--navbar-border);
  // border-bottom: 1px solid var(--navbar-border);
  .navbar-left {
    display: flex;
    align-items: center;
    .seller-name {
      color: #01aaed;
      cursor: pointer;
    }
    .navbar-wrapper {
      display: flex;
      align-items: center;
      .svg-icon {
        width: 24px;
        height: 24px;
      }
    }
    .remaind {
      cursor: default;
      &.expire {
        color: red;
      }
      .renew {
        padding: 3px 6px;
        margin-left: 4px;
        border-radius: 4px;
        color: #fff;
        background: #01aaed;
        cursor: pointer;
        user-select: none;
        font-size: 12px;
      }
      .remaind-toggle {
        margin-top: 2px;
        margin-left: 2px;
        color: #01aaed;
        font-size: 12px;
        cursor: pointer;
      }
    }
  }

  .navbar-right {
    .navbar-wrapper {
      display: flex;
      align-items: center;
      .svg-icon {
        width: 24px;
        height: 24px;
      }
      .icon-refresh {
        cursor: pointer;
      }
      .icon-more {
        cursor: pointer;
      }
      .screenfull {
        font-size: 24px;
        cursor: pointer;
      }

      .message-badge {
        padding-right: 2px;
      }
      .lang-item {
        display: flex;
        align-items: center;
        cursor: pointer;
        .icon {
          width: 18px;
          height: 14px;
          margin-right: 5px;
        }
      }
    }
  }

  .navbar-scroll {
    position: absolute;
    z-index: 1;
    top: 0;
    left: 0;
    height: 2px;
    background: #20222a;
    transition: width 0.2s;
    &.show {
    }
    &.hide {
      width: 0 !important;
    }
  }
  ::v-deep .material-icons-round {
    cursor: pointer;
    color: var(--navbar-content);
    &.offset-top {
      transform: translateY(1.5px);
    }
  }
}
.lang-dropdown {
  .lang-item {
    display: flex;
    align-items: center;
    .icon {
      width: 18px;
      height: 14px;
      margin-right: 10px;
    }
  }
}
</style>
