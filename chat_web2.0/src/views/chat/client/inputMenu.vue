<template>
  <div
    class="input-menu"
    :class="{
      special: theme.stylenum == 2,
      special3: theme.stylenum == 3,
      dark: !sunny,
      light: sunny,
      'not-special': theme.stylenum == 1,
    }"
  >
    <!-- :style="setColorOrGradient(theme.chatcolor)" -->
    <!-- 输入框 -->
    <!-- <el-input ref="input" v-model="message" class="input" type="textarea" :rows="3" :placeholder="$t('chatClient.inputMenu.placeholder')" @keyup.enter.native="sendMessage('input')" /> -->
    <div
      :class="['textarea', { hasClickSend: hasClick }]"
      id="inputAreaClient"
      ref="textareaClient"
      contenteditable
      :data-placeholder="$t('chatServer.inputMenu.placeholder')"
      @keydown="eventListen"
    ></div>
    <!-- 底部菜单 -->
    <div class="menu">
      <div class="menu-left">
        <!-- <i class="menu-left__switch material-icons-round" :style="theme.stylenum == 2?'color:#C2C2C2':`color:${theme.body_color.split(',')[0]}`" @click="menuVisible=!menuVisible">attachment</i> -->
        <svg-icon
          icon-class="service_link"
          :style="
            theme.stylenum == 2
              ? 'stroke:#C2C2C2'
              : `stroke:${theme.body_color.split(',')[0]}`
          "
          @click="menuVisible = !menuVisible"
        />
        <div
          :class="['transition-box', { 'transition-box-show': menuVisible }]"
        >
          <div
            class="menu-left__content"
            :class="sunny ? 'light' : 'dark'"
            :style="`color:${theme.body_color.split(',')[0]}`"
          >
            <!-- 表情 -->
            <el-tooltip
              effect="light"
              :disabled="isMobile()"
              :content="$t('chatClient.tooltip[2]')"
            >
              <!-- <i class="material-icons-round" :style="theme.stylenum == 2?'color:#C2C2C2':''" @click.stop="emojiVisible = !emojiVisible">emoji_emotions</i> -->
              <div>
                <svg-icon
                  :style="theme.stylenum == 2 ? 'fill:#C2C2C2' : ''"
                  @click.stop="emojiVisible = !emojiVisible"
                  icon-class="service_expression"
                />
              </div>
            </el-tooltip>

            <!-- 文件 -->
            <!-- <el-upload :show-file-list="false" :on-error="() => {setUploading(false);}" :on-progress="() => {setUploading(true);}" :on-success="uploadFileSuccess" style="display: inline-block" :before-upload="beforeUploadFn" :action="`${baseUrl}/index/upload/uploadFile`"> -->
            <el-upload
              :show-file-list="false"
              :on-error="
                () => {
                  setUploading(false);
                }
              "
              :on-progress="
                () => {
                  setUploading(true);
                }
              "
              style="display: inline-block"
              :before-upload="beforeUploadFn"
              :http-request="() => {}"
              action="#"
            >
              <el-tooltip
                effect="light"
                :disabled="isMobile()"
                :content="$t('chatClient.tooltip[3]')"
              >
                <!-- <i class="material-icons-round" @click="hasClickUpload" :style="theme.stylenum == 2?'color:#C2C2C2':''">satellite</i> -->
                <svg-icon
                  :style="theme.stylenum == 2 ? 'fill:#C2C2C2' : ''"
                  @click="hasClickUpload"
                  icon-class="service_pic"
                />
              </el-tooltip>
            </el-upload>

            <!-- 录音 -->
            <el-tooltip
              effect="light"
              :disabled="isMobile()"
              :content="$t('chatClient.tooltip[4]')"
            >
              <!-- <i class="material-icons-round" :style="theme.stylenum == 2?'color:#C2C2C2':''" @click="recordSound">mic</i> -->
              <div>
                <svg-icon
                  :style="theme.stylenum == 2 ? 'fill:#C2C2C2' : ''"
                  @click="recordSound"
                  icon-class="service_record"
                />
              </div>
            </el-tooltip>

            <!-- 评价 -->
            <el-tooltip
              v-if="
                platform &&
                platform.domainInfo &&
                platform.domainInfo.isevaluate
              "
              :disabled="isMobile()"
              effect="light"
              :content="$t('chatClient.tooltip[5]')"
            >
              <!-- <i class="material-icons-round" :style="theme.stylenum == 2?'color:#C2C2C2':''" @click="clickPraise">thumb_up_alt</i> -->
              <div>
                <svg-icon
                  :style="theme.stylenum == 2 ? 'fill:#C2C2C2' : ''"
                  @click="clickPraise"
                  icon-class="service_praise"
                />
              </div>
            </el-tooltip>
          </div>
        </div>
      </div>
      <div class="wideBtn" v-if="isMobile() || layer === 'yes'">
        <div
          id="btnAnimate"
          :style="
            platform.isblack
              ? `background:'#ccc'`
              : theme.stylenum === 3
              ? ''
              : setColorOrGradient(theme.body_color)
          "
        />
        <el-button
          class="menu-right"
          :class="{ special3: theme.stylenum == 3, dark: !sunny }"
          size="medium"
          :disabled="!!platform.isblack"
          :style="
            platform.isblack
              ? `background:'#ccc'`
              : theme.stylenum === 3
              ? ''
              : setColorOrGradient(theme.body_color)
          "
          @click="sendHandler"
        >
          <svg-icon icon-class="service_send" />
          <i>{{ $t("chatClient.inputMenu.send") }}</i>
        </el-button>
      </div>
      <el-button
        v-else
        class="menu-right"
        :class="{ special3: theme.stylenum == 3, dark: !sunny }"
        size="medium"
        :disabled="!!platform.isblack"
        :style="
          platform.isblack
            ? `background:'#ccc'`
            : theme.stylenum === 3
            ? ''
            : setColorOrGradient(theme.body_color)
        "
        @click="sendHandler"
      >
        <svg-icon icon-class="service_send" />
        <i>{{ $t("chatClient.inputMenu.send") }}</i>
      </el-button>
    </div>

    <!-- 表情 -->
    <emojiClient
      :visible.sync="emojiVisible"
      :emoji-style="emojiStyle"
      @select="$refs.textareaClient.innerHTML += $event"
    />

    <!-- 录音弹窗 -->
    <el-dialog
      class="sound-dialog"
      :title="$t('chatClient.inputMenu.soundDialog.title')"
      :visible.sync="recordVisible"
      width="300px"
      top="25vh"
      center
      append-to-body
      :close-on-click-modal="true"
      @close="closeRecord"
    >
      <div class="ta-c">
        <img src="@/assets/img/voice.gif" />
        <div>{{ $t("chatClient.inputMenu.soundDialog.tips") }}</div>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button
          size="medium"
          type="primary"
          :loading="recordLoading"
          @click="sendSound"
          >{{ $t("chatClient.inputMenu.soundDialog.actions[0]") }}</el-button
        >
        <el-button size="medium" @click="recordVisible = false">{{
          $t("chatClient.inputMenu.soundDialog.actions[1]")
        }}</el-button>
      </span>
    </el-dialog>

    <!-- 评价弹窗 -->
    <el-dialog
      class="prase-dialog"
      :visible="praiseVisible"
      width="300px"
      top="35vh"
      append-to-body
      :close-on-click-modal="true"
      @close="
        () => {
          setPraiseVisible(false);
          praiseLoading = false;
        }
      "
    >
      <div class="mb18">{{ $t("chatClient.inputMenu.praseDialog.tips") }}</div>
      <el-rate
        v-model="praise"
        show-text
        :texts="$t('chatClient.inputMenu.praseDialog.options')"
      />
      <span slot="footer" class="dialog-footer">
        <el-button
          size="small"
          type="primary"
          :loading="praiseLoading"
          @click="confirmPraise"
          >{{ $t("chatClient.inputMenu.praseDialog.actions[0]") }}</el-button
        >
        <el-button size="small" @click="setPraiseVisible(false)">{{
          $t("chatClient.inputMenu.praseDialog.actions[1]")
        }}</el-button>
      </span>
    </el-dialog>

    <!-- BackTop 按钮 -->
    <transition name="fade">
      <div v-show="showBackTop" class="back-top" @click="scrollTop">
        <i class="el-icon-top" />
      </div>
    </transition>
  </div>
</template>

<script>
import Recorder from "js-audio-recorder";
import { eventBus } from "./eventBus.js";
import { mapState, mapMutations } from "vuex";
import { uploadImg, uploadVoice, uploadKFile } from "@/api/common.js";
import { sendToRobot, confirmPraise } from "@/api/chatClient.js";
import { setColorOrGradient, isMobile, imgTool } from "@/utils/index";

export default {
  props: {
    theme: {
      type: Object,
      default: () => {},
    },
    sunny: {
      type: Boolean,
      default: true,
    },
    layer: {
      type: String,
      default: "",
    },
  },
  data() {
    return {
      praise: 5,
      message: "",
      menuVisible: false,
      emojiVisible: false,
      recordVisible: false,
      recordLoading: false,
      praiseLoading: false,
      sessionId: undefined,
      recorder: new Recorder(),
      baseUrl: process.env.VUE_APP_BASE_URL,
      firstMsg: 0,
      emojiStyle: {
        position: "absolute",
        top: "-455px",
        left: "0px",
        right: "0px",
        borderRadius: "6px",
      },
      showBackTop: false,
      hasClick: false,
      xss: [
        "javascript",
        "vbscript",
        "expression",
        "applet",
        "meta",
        "xml",
        "blink",
        "link",
        "style",
        "script",
        "embed",
        "object",
        "iframe",
        "frame",
        "frameset",
        "ilayer",
        "layer",
        "bgsound",
        "title",
        "base",
        "onabort",
        "onactivate",
        "onafterprint",
        "onafterupdate",
        "onbeforeactivate",
        "onbeforecopy",
        "onbeforecut",
        "onbeforedeactivate",
        "onbeforeeditfocus",
        "onbeforepaste",
        "onbeforeprint",
        "onbeforeunload",
        "onbeforeupdate",
        "onblur",
        "onbounce",
        "oncellchange",
        "onchange",
        "onclick",
        "oncontextmenu",
        "oncontrolselect",
        "oncopy",
        "onplay",
        "oncut",
        "ondataavailable",
        "ondatasetchanged",
        "ondatasetcomplete",
        "ondblclick",
        "ondeactivate",
        "ondrag",
        "ondragend",
        "ondragenter",
        "ondragleave",
        "ondragover",
        "ondragstart",
        "ondrop",
        "onerror",
        "onerrorupdate",
        "onfilterchange",
        "onfinish",
        "onfocus",
        "onfocusin",
        "onfocusout",
        "onhelp",
        "onkeydown",
        "onkeypress",
        "onkeyup",
        "onlayoutcomplete",
        "onload",
        "onlosecapture",
        "onmousedown",
        "onmouseenter",
        "onmouseleave",
        "onmousemove",
        "onmouseout",
        "onmouseover",
        "onmouseup",
        "onmousewheel",
        "onmove",
        "onmoveend",
        "onmovestart",
        "onpaste",
        "onpropertychange",
        "onreadystatechange",
        "onreset",
        "onresize",
        "onresizeend",
        "onresizestart",
        "onrowenter",
        "onrowexit",
        "onrowsdelete",
        "onrowsinserted",
        "onscroll",
        "onselect",
        "onselectionchange",
        "onselectstart",
        "onstart",
        "onstop",
        "onsubmit",
        "onunload",
        "ontoggle",
      ],
    };
  },
  computed: {
    ...mapState("chatClient", [
      "sp",
      "ws",
      "wsMsg",
      "customer",
      "platform",
      "themeColor",
      "hasPraised",
      "sessionStatus",
      "praiseVisible",
      "serverInfo",
    ]),
  },
  watch: {
    wsMsg(v) {
      const { cmd, data } = v;
      console.log("inputMenu-wsMsg -> cmd", cmd, data);
      switch (cmd) {
        // 发出客服评价回调
        case "praiseKfCB":
          // this.clickPraiseHandler(data)
          this.closeWindow();
          break;

        // 初始化成功
        case "userInit":
          this.firstMsg = 1;
          this.userInitHandler(data);
          break;
        // 被转接
        // case 'reLink':
        //   this.reLinkHandler(data)
        //   break
        default:
          break;
      }
    },
    sunny: {
      handler(v) {
        if (v) {
          this.emojiStyle.background = "#efefef";
        } else {
          this.emojiStyle.background = "#595959";
        }
      },
      immediate: true,
    },
  },
  methods: {
    closeWindow() {
      this.closeCustomer();
      if (top == window) {
        // if (confirm(this.$t('chatClient.closeWindow'))) {
        const userAgent = navigator.userAgent;
        if (
          userAgent.indexOf("Firefox") != -1 ||
          userAgent.indexOf("Chrome") != -1 ||
          userAgent.indexOf("Safari") != -1
        ) {
          location.href = "about:blank";
        } else {
          window.opener = null;
          window.open("", "_self");
        }
        window.close();
        // }
      } else {
        top.postMessage({ cmd: "hideChat" }, "*");
      }
    },
    setColorOrGradient,
    isMobile,
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
    hasClickUpload() {
      this.$emit("handleUpload", true);
    },
    scrollTop() {
      document.getElementById("chat-content").scrollTop = 0;
    },
    // 键盘事件监听
    eventListen(event) {
      // let allowKey = [8, 13, 37, 38, 39, 40]; // 上下左右 回车 删除
      // enter发送
      if (event.keyCode === 13 && !event.shiftKey) {
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
      //add the br, or p, or something else
      var newEle = document.createElement("br");
      docFragment.appendChild(newEle);

      //make the br replace selection
      var range = window.getSelection().getRangeAt(0);
      range.deleteContents(); //从文档中移除 Range 包含的内容
      range.insertNode(docFragment); //在 Range 的起点处插入一个节点

      //create a new range
      range = document.createRange();
      range.setStartAfter(newEle); //以其它节点为基准，设置 Range 的起点
      range.collapse(true); //将 Range 折叠至其端点之一

      //make the cursor there
      var sel = window.getSelection();
      sel.removeAllRanges(); //将所有的区域都从选区中移除
      sel.addRange(range); //一个区域（Range）对象将被加入选区
    },
    //处理粘贴
    textPaste(event) {
      event.preventDefault();
      let newText;
      // let newHtml
      let clp = (event.originalEvent || event).clipboardData;
      //兼容针对opera ie等浏览器
      if (clp === undefined || clp === null) {
        newText = window.clipboardData.getData("text") || "";
        if (newText !== "") {
          if (window.getSelection) {
            //针对IE11 10 9 safari
            let newNode = document.createElement("span");
            newNode.innerHTML = newText;
            window.getSelection().getRangeAt(0).insertNode(newNode);
          } else {
            //兼容ie 10 9 8 7 6 5
            document.selection.createRange().past;
          }
        }
      } else {
        // 兼容chrome或hotfire
        newText = clp.getData("text/plain") || "";
        let file = clp.items && clp.items[0];
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
                  //capture,返回每个匹配的字符串
                  let html = `<img style="max-width:50%;max-height:50%;" src="${capture}" alt="" />`;
                  this.$refs.textareaClient.innerHTML += html;
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
          let ele = document.createElement("img");
          ele.src = process.env.VUE_APP_BASE_URL + data.src;
          ele.style.maxWidth = "50%";
          ele.style.maxHeight = "50%";
          this.$refs.textareaClient.appendChild(ele);
        } else {
          this.$notify.error({
            title: this.$t("notify.fail"),
            message: msg,
          });
        }
      });
    },
    // 发送消息
    sendHandler() {
      if (document.getElementById("btnAnimate")) {
        const target = document.getElementById("btnAnimate").classList;
        target.remove("btnWave");
        setTimeout(() => {
          target.add("btnWave");
        }, 0);
      }

      this.message = this.$refs.textareaClient.innerHTML;
      this.xss.forEach((v) => {
        if (this.message.indexOf(v) != -1) {
          this.message = this.message.replace(v, `${v}1`);
        }
      });
      console.log(this.message, "this.message");
      if (!this.message && !this.hasClick) {
        this.hasClick = true;
        setTimeout(() => {
          this.hasClick = false;
        }, 2000);
        return;
      }

      const {
        sessionStatus,
        platform: { isblack },
      } = this;
      // 黑名单不能发送消息
      if (isblack) {
        return;
      }
      // 会话关闭重刷页面
      if (sessionStatus == "close") {
        return location.reload();
      }
      let newContent = this.message.replace(
        /<img [^>]*src=['"]([^'"]+)[^>]*>/gi,
        function (match, capture) {
          //capture,返回每个匹配的字符串
          let newStr = `---<img src="${capture}" alt="" />---`;
          return newStr;
        }
      );
      let _msg = newContent.split("---");
      for (let index = 0; index < _msg.length; index++) {
        let content = _msg[index];
        if (!content) {
          continue;
        }
        if (this.sp == "robot") {
          //机器人不允许带标签
          content = content.replace(/<|>|document.createElement/gi, "");
        }
        if (/<img [^>]*src=['"]([^'"]+)[^>]*>/i.test(content)) {
          let tempSrc = content.replace(
            /<img [^>]*src=['"]([^'"]+)[^>]*>/gi,
            function (match, capture) {
              //capture,返回每个匹配的字符串
              let newStr = capture;
              return newStr;
            }
          );
          let _content = `img[${tempSrc.replace(
            process.env.VUE_APP_BASE_URL,
            ""
          )}]`;
          this.sendMessage(_content);
        } else {
          this.sendText(content);
        }
      }
      this.message = "";
      this.$refs.textareaClient.innerHTML = "";
      this.firstMsg = 0;
    },
    // 发送文字
    sendText(message) {
      const {
        sp,
        platform: {
          domainInfo: { seller_id, domain_id },
        },
        customer: { name },
      } = this;
      if (sp == "robot") {
        eventBus.$emit("robotQuestion", message);
        if (
          message != "人工" &&
          message != "人工服务" &&
          message != "人工客服"
        ) {
          sendToRobot({
            seller_id,
            domian_id: domain_id,
            q: message,
            from_name: name,
          }).then((res) => {
            eventBus.$emit("robotAnwer", res);
          });
        } else {
          eventBus.$emit("transferMaunal");
        }
      } else if (sp == "server") {
        this.sendToServer({ message, chatNo: this.firstMsg });
        eventBus.$emit("noResponse");
      } else if (sp == "transferServer") {
        this.sendToTransferServer(message);
        eventBus.$emit("noResponse");
      }
    },
    // 上传和录音发送
    sendMessage(sourceContent) {
      const {
        sp,
        sessionStatus,
        platform: {
          domainInfo: { seller_id, domain_id },
          isblack,
        },
        customer: { name },
      } = this;
      // 黑名单不能发送消息
      if (isblack) {
        return;
      }
      // 会话关闭重刷页面
      if (sessionStatus == "close") {
        return location.reload();
      }
      if (sourceContent) {
        if (sp == "robot") {
          eventBus.$emit("robotQuestion", sourceContent);
          sendToRobot({
            seller_id,
            domian_id: domain_id,
            q: sourceContent,
            from_name: name,
          }).then((res) => {
            eventBus.$emit("robotAnwer", res);
          });
        } else if (sp == "server") {
          this.sendToServer({ message: sourceContent, chatNo: this.firstMsg });
          eventBus.$emit("noResponse");
        } else if (sp == "transferServer") {
          this.sendToTransferServer(sourceContent);
          eventBus.$emit("noResponse");
        }
      }
    },
    recordSound() {
      this.recorder
        .start()
        .then(() => {
          this.recordVisible = true;
        })
        .catch(() => {
          this.$notify.error({
            title: this.$t("notify.fail"),
            message: this.$t("chatClient.inputMenu.soundNoPerm"),
          });
        });
    },
    closeRecord() {
      this.recordVisible = false;
      this.recorder.stop();
    },
    clickPraise() {
      const { customer, sessionId, hasPraised } = this;
      if (hasPraised) {
        this.$message(this.$t("chatClient.inputMenu.prased"));
      } else if (sessionId) {
        this.sendPraise({
          sessionId: sessionId,
          customerId: customer.id,
        });
      }
    },
    confirmPraise() {
      const {
        serverInfo: { kefu_code },
        platform: {
          domainInfo: { domain_id, seller_code },
        },
        customer: { id },
        praise,
        sessionId,
      } = this;
      if (sessionId) {
        this.praiseLoading = true;
        confirmPraise({
          kefu_code,
          domain_id,
          seller_code,
          star: praise,
          customer_id: id,
          service_log_id: sessionId,
        }).then((res) => {
          this.setHasPraised(true);
          this.setPraiseVisible(false);
          eventBus.$emit("praiseSuccess", res.msg);
          this.praiseLoading = false;
        });
      }
    },
    clickPraiseHandler(res) {
      const { code, msg } = res;
      if (code === 0) {
        this.setPraiseVisible(true);
      } else {
        this.$notify.error({
          title: this.$t("notify.fail"),
          message: msg,
        });
      }
    },
    sendSound() {
      this.recordLoading = true;
      const params = new FormData();
      params.append("file", this.recorder.getWAVBlob());
      uploadVoice(params).then((res) => {
        const { code, data, msg } = res;
        if (code === 0) {
          this.sendMessage(`audio[${data.src}]`);
        } else {
          this.$notify.error({
            title: this.$t("notify.fail"),
            message: msg,
          });
        }
        this.recordVisible = false;
        this.recordLoading = false;
      });
    },
    uploadFileSuccess(res, type) {
      // const { type } = file.raw
      const { code, data, msg } = res;
      if (code === 0) {
        if (type.includes("image")) {
          this.sendMessage(`img[${data.src}]`);
        } else if (type.includes("video")) {
          this.sendMessage(`video[${data.src}]`);
        } else {
          this.sendMessage(`file(${data.src})[${data.name}]`);
        }
      } else {
        this.$notify.error({
          title: this.$t("notify.fail"),
          message: msg,
        });
      }
      this.$emit("handleUpload", false);
      this.setUploading(false);
    },
    userInitHandler(res) {
      const { code, data } = res;
      if (code === 0) {
        this.sessionId = data.logId;
      }
    },
    inputEventHandler() {
      const inputBox = document.querySelector(".input-menu .textarea");
      inputBox.onmouseenter = () => {
        this.setMouseOnInput(true);
      };
      inputBox.onmouseleave = () => {
        this.setMouseOnInput(false);
      };
    },
    ...mapMutations("chatClient", [
      "sendPraise",
      "sendToServer",
      "setHasPraised",
      "setUploading",
      "setPraiseVisible",
      "setMouseOnInput",
      "sendToTransferServer",
      "closeCustomer",
    ]),
    toggleShowBackTo() {
      const $content = document.getElementById("chat-content");
      if (!$content) {
        return;
      }
      $content.addEventListener(
        "scroll",
        () => (this.showBackTop = $content.scrollTop > 0)
      );
    },
  },
  mounted() {
    this.inputEventHandler();
    this.toggleShowBackTo();

    let target = document.getElementById("inputAreaClient");
    target.addEventListener("paste", (event) => {
      this.textPaste(event);
    });
  },
};
</script>

<style lang="scss">
// .el-tooltip__popper.is-light{
//   border-color: #ccc;
//   .popper__arrow{
//     display: none;
//   }
// }
.fade-enter-active,
.fade-leave-active {
  transition: all 0.3s ease;
}
.fade-enter {
  opacity: 0;
}
.fade-enter-to {
  opacity: 1;
  transition-delay: 2s;
}
.fade-leave {
  opacity: 1;
}
.fade-leave-to {
  opacity: 0;
}
</style>
<style lang="scss" scoped>
::v-deep.el-button {
  outline: none !important;
}
.input-menu {
  margin: 0 20px 14px;
  position: relative;
  &.dark {
    .textarea {
      // border-top: 1px solid #54586d;
    }
  }
  .textarea {
    padding: 0;
    height: 74px;
    resize: none;
    border: none;
    overflow-x: hidden;
    overflow-y: auto;
    font-size: 14px;
    background: transparent !important;
    font-family: "Mulish", "PingFang SC", "Microsoft YaHei", "SimSun", Arial,
      sans-serif;
    // border-top: 1px solid #dcdfe6;
    padding: 5px 0;
    box-sizing: border-box;
    color: #999999;
    img {
      max-height: 50%;
      max-width: 50%;
    }
    &:empty:before {
      content: attr(data-placeholder);
      color: #dbdbdb;
    }
  }
  .back-top {
    position: absolute;
    right: 15px;
    top: -50px;
    width: 25px;
    height: 25px;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    background: rgba(225, 225, 225, 0.3);
    cursor: pointer;
    font-size: 18px;
    .el-icon-top {
      padding: 2px 1px 0 0;
      color: #a5a5a5;
    }
  }
}
.menu {
  display: flex;
  align-items: center;
  justify-content: space-between;
  ::v-deep .el-textarea__inner {
    border: none;
    background: red;
  }
  .menu-left {
    display: flex;
    align-items: center;
    height: 36px;
    .transition-box {
      width: 0;
      opacity: 0;
      transition: all 0.5s;
      overflow: hidden;
      &-show {
        width: 184px;
        opacity: 1;
        // .menu-left__content{
        //   >div{
        //     width: 40px;
        //     height: 24px;
        //   }
        // }
      }
    }
    .svg-icon {
      width: 24px;
      height: 24px;
    }
    .menu-left__content {
      display: flex;
      align-items: center;
      padding: 5px 20px;
      border-radius: 18px;
      background: rgba(250, 250, 250, 1);
      &.dark {
        background: rgba(10, 14, 24, 1);
      }
      ::v-deep .el-upload {
        display: flex;
      }
      > div {
        margin-right: 16px;
        &:last-child {
          margin-right: 0;
        }
      }
      // >div{
      //   animation: all 10s;
      //   width: 0;
      //   height: 0;
      // }
    }
  }
  .menu-right {
    padding: 0;
    width: 98px;
    height: 42px;
    border-radius: 24px;
    border: none;
    color: #fff;
    background: transparent;
    &.special2 {
      background: #ec7676;
      border-color: #ec7676;
      box-shadow: 0px 2px 4px 0px rgba(255, 184, 184, 0.5);
      &.dark {
        box-shadow: 0px 1px 5px 0px rgba(74, 27, 27, 1);
      }
    }
    &.special3 {
      background: #ec7676;
      // box-shadow: 0px 1px 5px 0px rgba(127, 186, 253, 0.5);
      // &.dark {
      // 	box-shadow: 0px 1px 5px 0px rgba(127, 186, 253, 0);
      // }
    }
    ::v-deep span {
      display: inline-flex;
      align-items: center;
      font-size: 14px;
      .svg-icon {
        width: 24px;
        height: 24px;
        margin-right: 8px;
        // color: rgba(255, 255, 255, 0.8);
      }
      i {
        font-style: normal;
      }
    }
  }
  .material-icons-round {
    margin-right: 16px;
    cursor: pointer;
    font-size: 22px;
  }
  ::v-deep.el-upload--text {
    &:focus {
      color: inherit !important;
    }
  }
}
.prase-dialog {
  color: #000;
  ::v-deep.el-dialog {
    .el-dialog__body {
      padding: 14px 15px 26px;
      color: #000;
      .mb18,
      .el-rate {
        text-align: center;
      }
    }
    .el-dialog__footer {
      padding-bottom: 16px;
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
</style>

<style lang="scss" scoped>
@media screen and (max-width: 600px) {
  .sound-dialog {
    ::v-deep.el-dialog {
      width: 250px !important;
      .el-dialog__header {
        padding-bottom: 0;
      }
      .el-dialog__body {
        img {
          width: 110px;
        }
      }
      .el-dialog__footer {
        padding-bottom: 20px;
        .el-button {
          width: 90px;
        }
        .el-button + .el-button {
          margin-left: 20px;
        }
      }
    }
  }
  ::v-deep.special3 {
    .btnWave {
      background: #ec7676 !important;
    }
  }
  ::v-deep.not-special {
    .btnWave {
      background: #6ecc94 !important;
    }
  }
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
      left: -45px;
      top: -45px;
    }
    .menu-right {
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
    }
  }
  .menu-right {
    // border-radius: 10px !important;
    // padding: 8px 16px !important;
    width: 56px !important;
    height: 56px !important;
    position: relative;
    span {
      .svg-icon {
        width: 28px !important;
        height: 28px !important;
        margin: 2px 2px 0 0 !important;
      }
      i {
        display: none;
      }
    }
  }
  .input-menu {
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
