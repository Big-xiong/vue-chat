<template>
  <div class="chat-footer">
    <!-- 翻译下拉框 -->
    <el-dropdown trigger="click" placement="top" @command="changeLang">
      <div class="lang-item">
        <span class="mr2"
          >{{
            curLang === "close"
              ? $t("contextmenu.closeTranslate")
              : langMap[curLang].lang
          }}
          <svg-icon icon-class="chat_lang" />
        </span>
      </div>
      <el-dropdown-menu slot="dropdown" class="lang-dropdown">
        <el-dropdown-item command="close">
          <div class="lang-item">
            {{ $t("contextmenu.closeTranslate") }}
          </div>
        </el-dropdown-item>
        <el-dropdown-item command="zh">
          <div class="lang-item">
            {{ $t("navbar.zh") }}
          </div>
        </el-dropdown-item>
        <el-dropdown-item command="en">
          <div class="lang-item">
            {{ $t("navbar.en") }}
          </div>
        </el-dropdown-item>
        <el-dropdown-item command="vi">
          <div class="lang-item">
            {{ $t("navbar.vi") }}
          </div>
        </el-dropdown-item>
        <el-dropdown-item command="th">
          <div class="lang-item">
            {{ $t("navbar.th") }}
          </div>
        </el-dropdown-item>
        <el-dropdown-item command="es">
          <div class="lang-item">
            {{ $t("navbar.es") }}
          </div>
        </el-dropdown-item>
        <el-dropdown-item command="pt">
          <div class="lang-item">
            {{ $t("navbar.pt") }}
          </div>
        </el-dropdown-item>
        <el-dropdown-item command="ms">
          <div class="lang-item">
            {{ $t("navbar.ms") }}
          </div>
        </el-dropdown-item>
      </el-dropdown-menu>
    </el-dropdown>
    <!-- 输入框 -->
    <!-- <el-input v-model="message" type="textarea" :rows="3" :placeholder="$t('chatServer.inputMenu.placeholder')" @keyup.enter.native="sendHandler" @pause.native="pasteHandler" /> -->
    <div
      id="inputArea"
      ref="textarea"
      :class="['textarea', { hasClickSend: hasClick }]"
      :style="{ paddingRight: paddingRight }"
      contenteditable
      :data-placeholder="$t('chatServer.inputMenu.placeholder')"
      @keydown="eventListen"
    />
    <!-- 底部菜单 -->
    <div class="menu">
      <div class="menu-icon">
        <!-- 表情 -->
        <!-- <i class="material-icons-round" @click.stop="emojiVisible=!emojiVisible">emoji_emotions</i> -->
        <svg-icon
          icon-class="emoji_emotions"
          class-name="light-icon"
          @click.stop="emojiVisible = !emojiVisible"
        />
        <el-popover
          v-model="customEmojiVisible"
          placement="top-start"
          trigger="click"
        >
          <div class="custom-emoji">
            <el-upload
              class="emoji-item upload"
              :class="{ right: customEmojiList.length }"
              :show-file-list="false"
              :action="`${baseUrl}/index/upload/uploademo`"
              :data="{ kefu_code: server.kefu_code }"
              :before-upload="uploadCustomEmojiCheck"
              :on-success="uploadCustomEmojiSuccess"
            >
              <i class="el-icon-plus" />
            </el-upload>
            <div
              v-for="(emoji, index) in customEmojiList"
              :key="index"
              class="emoji-item"
              @click="clickCustomEmoji(emoji)"
            >
              <img :src="`${baseUrl}${emoji.emo_name}`" />
              <div class="delete" @click.stop="delEmo(emoji)">
                <i class="el-icon-close" />
              </div>
            </div>
          </div>
          <!-- <i slot="reference" class="material-icons-round">face_retouching_natural</i> -->
          <svg-icon
            slot="reference"
            icon-class="face_retouching_natural"
            class-name="light-icon"
          />
        </el-popover>

        <!-- 文件 -->
        <!--<el-upload :disabled="uploadDisable" :show-file-list="false" style="display:inline-block" :on-success="uploadFileSuccess" :action="`${baseUrl}/index/upload/uploadFile`">-->
        <el-upload
          :disabled="uploadDisable"
          :show-file-list="false"
          style="display: inline-block"
          :before-upload="beforeUploadFn"
          :http-request="() => {}"
          action="#"
        >
          <!-- <i class="material-icons-round">satellite</i> -->
          <svg-icon icon-class="satellite" class-name="light-icon" />
        </el-upload>

        <!-- 录音 -->
        <!-- <i class="material-icons-round" @click="recordSound">mic</i> -->
        <svg-icon
          icon-class="mic"
          class-name="light-icon"
          @click="recordSound"
        />

        <el-button
          v-if="
            JSON.stringify(activeCustomer) != '{}' &&
            activeCustomer.offline &&
            activeSessionType == 'current'
          "
          class="clear-btn"
          type="primary"
          size="medium"
          @click="clearChatHandler"
        >
          <i>{{ $t("chatServer.inputMenu.clear") }}</i>
        </el-button>
      </div>
      <div v-if="isMobile()" class="wideBtn">
        <div id="btnAnimate" />
        <el-button
          :loading="translateLoading"
          class="send-btn"
          type="primary"
          size="medium"
          @click="sendHandler"
        >
          <svg-icon icon-class="service_send" />
          <i>{{ $t("chatServer.inputMenu.send") }}</i>
        </el-button>
      </div>
      <el-button
        v-else
        :loading="translateLoading"
        class="send-btn"
        type="primary"
        size="medium"
        @click="sendHandler"
      >
        <svg-icon icon-class="service_send" />
        <i>{{ $t("chatServer.inputMenu.send") }}</i>
      </el-button>
    </div>

    <!-- 表情 -->
    <emoji
      :visible.sync="emojiVisible"
      :emoji-style="emojiStyle"
      @select="$refs.textarea.innerHTML += $event"
    />

    <!-- 录音弹窗 -->
    <el-dialog
      class="sound-dialog"
      :title="$t('chatServer.inputMenu.soundDialog.title')"
      :visible.sync="recordVisible"
      width="300px"
      top="25vh"
      center
      append-to-body
      :close-on-click-modal="true"
      @close="recordLoading = false"
    >
      <div class="ta-c">
        <img src="@/assets/img/voice.gif" />
        <div>{{ $t("chatServer.inputMenu.soundDialog.tips") }}</div>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button
          size="medium"
          type="primary"
          :loading="recordLoading"
          @click="sendSound"
          >{{ $t("chatServer.inputMenu.soundDialog.send") }}</el-button
        >
        <el-button size="medium" @click="recordVisible = false">{{
          $t("chatServer.inputMenu.soundDialog.cancel")
        }}</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import Recorder from "js-audio-recorder";
import { eventBus } from "./eventBus.js";
import { mapState, mapGetters, mapActions, mapMutations } from "vuex";
import { getCustomEmojiList, delemo } from "@/api/chatServer.js";
import { uploadImg, uploadKFile, uploadVoice } from "@/api/common.js";
import { imgTool, isMobile, parseTime } from "@/utils/index";
import { unescape } from "html-escaper";
import md5 from "js-md5";
export default {
  data() {
    return {
      message: "",
      emojiVisible: false,
      recordVisible: false,
      recordLoading: false,
      customEmojiVisible: false,
      translateLoading: false,
      recorder: new Recorder(),
      customEmojiList: [],
      baseUrl: process.env.VUE_APP_BASE_URL,
      emojiStyle: {
        position: "absolute",
        left: "0px",
        right: "0px",
        borderRadius: "6px",
        background: "var(--chat-server-emoji-bg)",
      },
      curLang: 'close',
      langMap: {
        zh: {
          lang: this.$t("navbar.zh"),
          key: "zh-cn",
          bdTranslateKey: "zh",
        },
        en: {
          lang: this.$t("navbar.en"),
          key: "en",
          bdTranslateKey: "en",
        },
        vi: {
          lang: this.$t("navbar.vi"),
          key: "vi",
          bdTranslateKey: "vie",
        },
        th: {
          lang: this.$t("navbar.th"),
          key: "th",
          bdTranslateKey: "th",
        },
        es: {
          lang: this.$t("navbar.es"),
          key: "es",
          bdTranslateKey: "es",
        },
        pt: {
          lang: this.$t("navbar.pt"),
          key: "pt",
          bdTranslateKey: "pt",
        },
        ms: {
          lang: this.$t("navbar.ms"),
          key: "ms",
          bdTranslateKey: "ms",
        },
      },
      hasClick: false,
    };
  },
  computed: {
    ...mapState({
      server: (state) => state.auth.server,
      serverStatus: (state) => state.chatServer.serverStatus,
      activeSession: (state) => state.chatServer.activeSession,
      activeCustomer: (state) => state.chatServer.activeCustomer,
      clientLang: state => state.chatServer.clientLang,
    }),
    ...mapGetters("chatServer", ["activeSessionType"]),
    uploadDisable() {
      return !this.activeCustomer.customer_id;
    },
    sendDisable() {
      const {
        message,
        activeSessionType,
        activeCustomer: { customer_id },
        serverStatus,
      } = this;
      return (
        !message ||
        !customer_id ||
        activeSessionType == "waiting" ||
        serverStatus === "offline"
      );
    },
    paddingRight() {
      let _right = "";
      switch (this.curLang) {
        case "close":
          _right = "100px";
          break;
        case "zh":
          _right = "128px";
          break;
        case "en":
          _right = "72px";
          break;
        case "vi":
          _right = "86px";
          break;
        case "th":
          _right = "72px";
          break;
        default:
          _right = "100px";
          break;
      }
      return _right;
    },
  },
  watch: {
    message() {
      const {
        message,
        activeSessionType,
        activeCustomer: { customer_id },
        serverStatus,
      } = this;
      if (
        message.length &&
        customer_id &&
        (activeSessionType == "current" || activeSessionType == "history")
      ) {
        if (serverStatus === "offline") {
          this.onlineServer();
        }
      }
    },
  },
  methods: {
    isMobile,
    ...mapMutations('chatServer', [
      'setClientLang',
    ]),
    beforeUploadFn(file) {
      const before = imgTool.beforeUpload(file, 1);
      if (!file.type.includes("image")) {
        this.uploadCallInterface(file);
        return;
      }

      // 封装的全局方法
      before
        .then((processedFIle) => {
          const fileType = Object.prototype.toString.call(processedFIle); // 获取文件的格式

          if (fileType === "[object File]" || fileType === "[object Blob]") {
            this.uploadCallInterface(processedFIle, fileType);
          }
        })
        .catch((error) => {
          this.uploadCallInterface(file);
        });
    },
    // 上传-图片处理之后-调用接口
    uploadCallInterface(file, fileType) {
      let requestData = new FormData();
      if (fileType === "[object Blob]") {
        let blobfile = new File([file], `${new Date().getTime()}.jpg`, {
          type: "image/jpeg",
        });
        requestData.append("file", blobfile);
      } else {
        requestData.append("file", file);
      }
      uploadKFile(requestData).then((res) => {
        this.uploadFileSuccess(res, file.type);
      });
    },
    delEmo(emo) {
      delemo({ emo_id: emo.emo_id }).then((res) => {
        if (res.code === 0) {
          this.getCustomEmojiList();
        }
      });
    },
    changeLang(lang) {
      this.curLang = lang;
      this.setClientLang(lang)
      window.localStorage.setItem('chat-client-lang', lang)
    },
    // 键盘事件监听
    eventListen(event) {
      // let allowKey = [8, 13, 37, 38, 39, 40]; // 上下左右 回车 删除
      // enter发送
      if (event.keyCode === 13 && !event.shiftKey && !this.translateLoading) {
        event.preventDefault();
        this.sendHandler();
        return false;
      }
      // shift+回车-->换行
      if (event.shiftKey && event.keyCode == 13) {
        this.contenteditableDivRange();
        return false;
      }
    },
    // 处理换行
    contenteditableDivRange() {
      var docFragment = document.createDocumentFragment();
      // add the br, or p, or something else
      var newEle = document.createElement("br");
      docFragment.appendChild(newEle);

      // make the br replace selection
      var range = window.getSelection().getRangeAt(0);
      range.deleteContents(); // 从文档中移除 Range 包含的内容
      range.insertNode(docFragment); // 在 Range 的起点处插入一个节点

      // create a new range
      range = document.createRange();
      range.setStartAfter(newEle); // 以其它节点为基准，设置 Range 的起点
      range.collapse(true); // 将 Range 折叠至其端点之一

      // make the cursor there
      var sel = window.getSelection();
      sel.removeAllRanges(); // 将所有的区域都从选区中移除
      sel.addRange(range); // 一个区域（Range）对象将被加入选区
    },
    // 处理粘贴
    textPaste(event) {
      event.preventDefault();
      let newText;
      // let newHtml
      const clp = (event.originalEvent || event).clipboardData;
      // 兼容针对opera ie等浏览器
      if (clp === undefined || clp === null) {
        newText = window.clipboardData.getData("text") || "";
        if (newText !== "") {
          if (window.getSelection) {
            // 针对IE11 10 9 safari
            const newNode = document.createElement("span");
            newNode.innerHTML = newText;
            window.getSelection().getRangeAt(0).insertNode(newNode);
          } else {
            // 兼容ie 10 9 8 7 6 5
            document.selection.createRange().past;
          }
        }
      } else {
        // 兼容chrome或hotfire
        newText = clp.getData("text/plain") || "";
        const file = clp.items && clp.items[0];
        // newHtml=clp.getData('text/html')||""
        if (newText !== "") {
          document.execCommand("insertText", false, newText);
        } else if (file && /image\/\w+/i.test(file.type)) {
          // 类型为图片, 并且文件大小不为 0
          this.imgReader(file);
        } else {
          file.getAsString((text) => {
            text.replace(
              /<img [^>]*src=['"]([^'"]+)[^>]*>/gi,
              (match, capture) => {
                if (capture) {
                  // capture,返回每个匹配的字符串
                  const html = `<img style="max-width:50%;max-height:50%;" src="${capture}" alt="" />`;
                  this.$refs.textarea.innerHTML += html;
                }
              }
            );
          });
        }
      }
    },
    // 处理静默图片上传
    imgReader(item) {
      const params = new FormData();
      params.append("file", item.getAsFile());
      uploadImg(params).then((res) => {
        const { code, data, msg } = res;
        if (code === 0) {
          const ele = document.createElement("img");
          ele.src = process.env.VUE_APP_BASE_URL + data.src;
          ele.style.maxWidth = "50%";
          ele.style.maxHeight = "50%";
          this.$refs.textarea.appendChild(ele);
        } else {
          this.$notify.error({
            title: this.$t("notify.fail"),
            message: msg,
          });
        }
      });
    },
    // 百度翻译
    async bdTranslate({ query, to }) {
      const appid = "20220928001357940";
      const key = "B9Czga1xR0vb40vUD7YO";
      const salt = new Date().getTime();
      const from = "auto";
      const str1 = appid + query + salt + key;
      const sign = md5(str1);
      const response = await this.$jsonp(
        "https://api.fanyi.baidu.com/api/trans/vip/translate",
        {
          q: query,
          appid: appid,
          salt: salt,
          from: from,
          to: to,
          sign: sign,
        },
        {
          callbackQuery: "callbackParam", // 一定要加这两个参数
          callbackName: "jsonpCallback", // 一定要加这两个参数,要不然会报错 导致代码阻塞
        }
      );
      const res = response.trans_result.map((v) => {
        return v.dst;
      });
      return res.join("<br>");
    },
    // 发送消息
    async sendHandler() {
      // debugger
      if (document.getElementById("btnAnimate")) {
        const target = document.getElementById("btnAnimate").classList;
        target.remove("btnWave");
        setTimeout(() => {
          target.add("btnWave");
        }, 0);
      }

      // this.message = this.$refs.textarea.innerHTML

      if (!this.$refs.textarea.innerHTML && !this.hasClick) {
        this.hasClick = true;
        setTimeout(() => {
          this.hasClick = false;
        }, 2000);
        return;
      }
      // const { offline } = this.activeCustomer
      // if(offline) {
      //   this.$message({
      //     message: '当前访客已离线，不能发送留言信息',
      //     type: 'warning'
      //   })
      //   return
      // }
      // if(getLanguage() !== this.curLang) {

      if (this.curLang !== "close" && this.$refs.textarea.innerHTML) {
        this.translateLoading = true;
        const api_key = "AIzaSyBasriCvTd52vBxq5gXtd5wXuHKnjvtI5U";
        fetch(
          `https://translation.googleapis.com/language/translate/v2?target=${
            this.langMap[this.curLang].key
          }&key=${api_key}&q=${this.$refs.textarea.innerHTML}`
        )
          .then((res) => res.json())
          .then((data) => {
            const {
              data: { translations },
            } = data;
            this.message = translations[0].translatedText;
            this.translateLoading = false;
            this.handleMsg();
          });
      } else if (this.curLang === "close" && this.$refs.textarea.innerHTML) {
        this.message = this.$refs.textarea.innerHTML;
        this.handleMsg();
      }
      // }
    },
    handleMsg() {
      const {
        message,
        activeSessionType,
        activeCustomer: { customer_id },
      } = this;
      if ((message, customer_id && (activeSessionType == "current" || activeSessionType == "history"))) {
        const newContent = message.replace(
          /<img [^>]*src=['"]([^'"]+)[^>]*>/gi,
          function (match, capture) {
            // capture,返回每个匹配的字符串
            const newStr = `---<img src="${capture}" alt="" />---`;
            return newStr;
          }
        );
        const _msg = newContent.split("---");
        let wsmsg = "";
        for (let index = 0; index < _msg.length; index++) {
          if (!_msg[index]) {
            continue;
          }
          if (/<img [^>]*src=['"]([^'"]+)[^>]*>/i.test(_msg[index])) {
            const tempSrc = _msg[index].replace(
              /<img [^>]*src=['"]([^'"]+)[^>]*>/gi,
              function (match, capture) {
                // capture,返回每个匹配的字符串
                const newStr = capture;
                return newStr;
              }
            );
            const _content = `img[${tempSrc.replace(
              process.env.VUE_APP_BASE_URL,
              ""
            )}]`;
            wsmsg += _content;
          } else {
            wsmsg += _msg[index];
          }
        }
        const options = {
          msg: wsmsg,
          lang: this.$refs.textarea.innerHTML,
        };
        eventBus.$emit("handleSend", options);
        this.sendMessage({
          message: wsmsg,
          lang: this.$refs.textarea.innerHTML,
          cb: () => {
            eventBus.$emit("sendFailed", options);
          },
        });
        this.message = "";
        this.$refs.textarea.innerHTML = "";
      }
    },
    // 发送音频
    sendSound() {
      this.recordLoading = true;
      const params = new FormData();
      params.append("file", this.recorder.getWAVBlob());
      uploadVoice(params).then((res) => {
        const { code, data, msg } = res;
        if (code === 0) {
          this.sendMessage({
            message: `audio[${data.src}]`,
          });
          this.recordLoading = true;
        } else {
          this.$notify.error({
            title: this.$t("notify.fail"),
            message: msg,
          });
        }
        this.recordVisible = false;
      });
    },
    // 点击发送音频
    recordSound() {
      if (!this.uploadDisable) {
        this.recorder
          .start()
          .then(() => {
            this.recordVisible = true;
          })
          .catch(() => {
            this.$notify.error({
              title: this.$t("notify.fail"),
              message: this.$t("chatServer.inputMenu.soundNoPerm"),
            });
          });
      }
    },
    uploadFileSuccess(res, type) {
      //const { type } = file.raw
      const { code, data, msg } = res;
      if (code === 0) {
        if (type.includes("image")) {
          this.sendMessage({
            message: `img[${data.src}]`,
          });
        } else if (type.includes("video")) {
          this.sendMessage({
            message: `video[${data.src}]`,
          });
        } else {
          this.sendMessage({
            message: `file(${data.src})[${data.name}]`,
          });
        }
      } else {
        this.$notify.error({
          title: this.$t("notify.fail"),
          message: msg,
        });
      }
    },
    // 常用语的点击接收
    clickWordHandler(word) {
      const {
        activeCustomer: { customer_id },
        serverStatus,
      } = this;
      if (customer_id) {
        if (serverStatus === "offline") {
          this.onlineServer();
        }
        const _word = unescape(word)
          .replace(/\\/g, "")
          .replaceAll("\n", "<br>");
        this.$refs.textarea.innerHTML = _word;
      }
    },
    // 获取所有表情
    getCustomEmojiList() {
      getCustomEmojiList().then((res) => {
        const { code, data } = res;
        if (code == 0) {
          this.customEmojiList = data.reverse();
        }
      });
    },
    // 上传自定义表情
    uploadCustomEmojiSuccess(res) {
      const { code, msg } = res;
      const success = code === 0;
      if (success) {
        this.getCustomEmojiList();
      } else {
        this.$message({
          message: msg,
          type: "error",
        });
      }
    },
    // 上传的自定义表情检查
    uploadCustomEmojiCheck() {
      if (this.customEmojiList.length >= 19) {
        this.$notify({
          title: this.$t("chatServer.inputMenu.customEmoji.notify.title"),
          message: this.$t("chatServer.inputMenu.customEmoji.notify.message"),
          type: "warning",
        });
        return false;
      }
    },
    // 点击表情
    clickCustomEmoji(emoji) {
      const {
        activeSessionType,
        activeCustomer: { customer_id },
        serverStatus,
      } = this;
      if (
        customer_id &&
        (activeSessionType == "current" || activeSessionType == "history")
      ) {
        if (serverStatus === "offline") {
          this.onlineServer();
        }
        this.sendMessage({
          message: `<img src="${this.baseUrl}${emoji.emo_name}" />`,
        });
        this.customEmojiVisible = false;
      }
    },
    clearChatHandler() {
      eventBus.$emit("clearActiveCustomer", this.activeCustomer);
    },
    ...mapActions("chatServer", ["sendMessage", "onlineServer"]),
  },
  mounted() {
    eventBus.$on("clickWord", this.clickWordHandler);
    this.getCustomEmojiList();

    const target = document.getElementById("inputArea");
    target.addEventListener("paste", (event) => {
      this.textPaste(event);
    });
    this.curLang = window.localStorage.getItem('chat-client-lang') || 'close'
  },
};
</script>

<style lang="scss" scoped>
.chat-footer {
  height: 196px;
  padding: 10px;
  border-top: 4px solid var(--chat-server-content-bg);
  box-sizing: border-box;
  position: relative;
  > .el-dropdown {
    position: absolute;
    top: 10px;
    right: 15px;
    .lang-item {
      cursor: pointer;
      span {
        display: flex;
        align-items: center;
      }
      .svg-icon {
        width: 24px;
        height: 24px;
      }
    }
  }
  .textarea {
    padding: 0 90px 0 0;
    height: 110px;
    resize: none;
    border: none;
    overflow-x: hidden;
    overflow-y: auto;
    font-size: 14px;
    background: var(--chat-server-main-bg) !important;
    img {
      max-height: 50%;
      max-width: 50%;
    }
    &:empty:before {
      content: attr(data-placeholder);
      color: #dbdbdb;
    }
  }
  .menu {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0 10px;
    .svg-icon {
      width: 24px;
      height: 24px;
      margin-right: 20px;
      cursor: pointer;
      // font-size: 22px;
      // color: #999;
    }
    .light-icon {
      fill: #5082f4;
    }
    ::v-deep.el-button {
      border: 0;
      color: #fff;
      width: 120px;
      height: 48px;
      border-radius: 24px;
      background: var(--el-btn-primary-bg);
      span {
        display: flex;
        align-items: center;
        justify-content: center;
      }
    }
    .clear-btn {
      background: #5082f4;
      border-radius: 12px;
    }
    .send-btn {
      display: block;
      padding: 0;
      margin-right: 10px;
      font-size: 14px;
      border: 0;
      outline: none;
      border-radius: 3px;
      text-align: center;
      color: #fff;
      width: 120px;
      height: 48px;
      border-radius: 24px;
      background: var(--el-btn-primary-bg);
      &.is-disabled {
        color: var(--chat-server-send-btn-disabled);
        background-color: #f7f7f7;
      }
      i {
        font-style: normal;
      }
      .svg-icon {
        // display: none;
        margin-right: 10px;
      }
    }
    .menu-icon {
      display: flex;
      align-items: center;
    }
  }
}
.sound-dialog {
  ::v-deep.el-dialog {
    .el-dialog__header {
      padding-bottom: 8px;
    }
    .el-dialog__body {
      padding: 0 0 10px;
      img {
        width: 180px;
      }
    }
    .el-dialog__footer {
      padding-bottom: 25px;
    }
  }
}
.custom-emoji {
  display: flex;
  flex-wrap: wrap;
  max-width: 350px;
  margin-bottom: -10px;
  .emoji-item {
    width: 50px;
    height: 50px;
    // margin-right: 10px;
    margin-bottom: 10px;
    cursor: pointer;
    position: relative;
    &.right {
      margin-right: 10px;
    }
    &:hover {
      .delete {
        display: block;
      }
    }
    img {
      width: 100%;
      height: 100%;
    }
    .delete {
      position: absolute;
      top: 0px;
      right: 0px;
      background: #28324c;
      display: none;
      color: #fff;
      width: 14px;
      height: 14px;
      text-align: center;
      line-height: 14px;
      .el-icon-close {
        font-size: 13px;
      }
    }
    // .el-icon-close {
    // 	position: absolute;
    // 	font-size: 14px;
    // 	top: 0px;
    // 	right: 0px;
    // 	border: 1px solid var(--chat-server-chat-head);
    // 	border-radius: 50%;
    // 	opacity: 0.6;
    // 	display: none;
    // }
    &:nth-child(6n) {
      margin-right: 0;
    }
    &.upload {
      display: flex;
      align-items: center;
      justify-content: center;
      border: 1px dashed #d9d9d9;
      border-radius: 6px;
      font-size: 18px;
      .el-icon-plus {
        padding: 10px;
      }
    }
  }
}
@media (max-width: 600px) {
  .chat-footer {
    border-top: 1px solid var(--chat-server-content-bg);
    .menu {
      margin-top: 8px;
      .wideBtn {
        position: relative;
        left: -26px;

        .btnWave {
          position: absolute;
          width: 90px;
          height: 90px;
          animation: 0.5s ease-out 0s 1 normal none running buttonWave;
          animation-fill-mode: forwards;
          opacity: 0.5;
          border-radius: 50%;
          background: #6ecc94 !important;
          left: -45px;
          top: -45px;
        }
        .send-btn {
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
        }
      }
    }
    ::v-deep.send-btn {
      width: 56px !important;
      height: 56px !important;
      border-radius: 24px !important;
      i {
        display: none;
      }
      .svg-icon {
        display: inline-block !important;
        width: 28px;
        height: 28px;
        margin: 0 !important;
      }
    }
    .textarea {
      font-size: 14px !important;
      &.hasClickSend {
        animation: shake 800ms ease-in-out;
        transform-origin: center bottom;
      }
    }
  }
  @keyframes shake {
    10%,
    90% {
      transform: translate3d(-1px, 0, 0);
    }
    20%,
    80% {
      transform: translate3d(+2px, 0, 0);
    }
    30%,
    70% {
      transform: translate3d(-4px, 0, 0);
    }
    40%,
    60% {
      transform: translate3d(+4px, 0, 0);
    }
    50% {
      transform: translate3d(-4px, 0, 0);
    }
  }
  @keyframes buttonWave {
    0% {
      transform: scale(0);
      opacity: 1;
    }
    100% {
      transform: scale(1);
      opacity: 0;
    }
  }
}
</style>
