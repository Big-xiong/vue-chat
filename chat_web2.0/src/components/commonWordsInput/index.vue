<template>
  <div class="Area_upload_box">
    <div
      id="inputArea"
      ref="textarea"
      class="textarea"
      contenteditable
      :data-placeholder="$t('chatServer.inputMenu.placeholder')"
      @keydown="eventListen"
    />
    <div class="upload">
      <el-upload
        class="upload"
        :show-file-list="false"
        :action="`${baseUrl}/index/upload/uploadImg`"
        :before-upload="uploadCheck"
        :on-success="uploadSuccess"
      >
        <el-button size="small" type="primary">插入图片</el-button>
      </el-upload>
    </div>
  </div>
</template>

<script>
import { uploadImg } from "@/api/common.js";
import { unescape } from "html-escaper";

export default {
  name: "CommonWordsInput",
  props: {
    content: {
      type: String,
      default: "",
    },
  },
  data() {
    return {
      baseUrl: process.env.VUE_APP_BASE_URL,
    };
  },
  mounted() {
    const target = document.getElementById("inputArea");
    target.addEventListener("paste", (event) => {
      this.textPaste(event);
    });
  },
  watch: {
    content(val) {
      console.log("value -> val", val);
      this.$nextTick(() => {
        this.$refs.textarea.innerHTML = val.replace(/\\/g, "");
      });
    },
  },
  methods: {
    // 键盘事件监听
    eventListen(event) {
      // let allowKey = [8, 13, 37, 38, 39, 40]; // 上下左右 回车 删除
      // enter发送
      if (event.keyCode === 13) {
        this.contenteditableDivRange();
        return false;
      }
      // if (event.keyCode === 13 && !(event.shiftKey)) {
      //   event.preventDefault()
      //   return false
      // }
      // // shift+回车-->换行
      // if (event.shiftKey && event.keyCode == 13) {
      // this.contenteditableDivRange()
      // return false
      // }
    },
    // 处理换行
    contenteditableDivRange() {
      var docFragment = document.createDocumentFragment();
      // add the br, or p, or something else
      var newEle = document.createElement("br");
      docFragment.appendChild(newEle);

      // 进行br替换选择
      var range = window.getSelection().getRangeAt(0);
      range.deleteContents(); // 从文档中移除 Range 包含的内容
      range.insertNode(docFragment); // 在 Range 的起点处插入一个节点

      // 创建一个新范围
      range = document.createRange();
      range.setStartAfter(newEle); // 以其它节点为基准，设置 Range 的起点
      range.collapse(true); // 将 Range 折叠至其端点之一

      // 把光标放在这里
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
          if (this.uploadCheck(file)) {
            this.imgReader(file);
          }
        } else {
          file.getAsString((text) => {
            text.replace(
              /<img [^>]*src=['"]([^'"]+)[^>]*>/gi,
              (match, capture) => {
                if (capture) {
                  // capture,返回每个匹配的字符串
                  // const html = `<img style="max-width:50%;max-height:50%;" src="${capture}" alt="" />`;
                  if (window.getSelection) {
                    // 针对IE11 10 9 safari
                    const newNode = document.createElement("img");
                    newNode.style.maxWidth = "50%";
                    newNode.style.maxHeight = "50%";
                    newNode.src = capture;
                    window.getSelection().getRangeAt(0).insertNode(newNode);
                  } else {
                    // 兼容ie 10 9 8 7 6 5
                    document.selection.createRange().past;
                  }
                  // this.$refs.textarea.innerHTML += html;
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
          this.insertImg(data);
        } else {
          this.$notify.error({
            title: this.$t("notify.fail"),
            message: msg,
          });
        }
      });
    },
    insertImg(data) {
      const ele = document.createElement("img");
      ele.src = process.env.VUE_APP_BASE_URL + data.src;
      ele.style.maxWidth = "50%";
      ele.style.maxHeight = "50%";
      this.$refs.textarea.appendChild(ele);
    },
    // 上传的自定义检查
    uploadCheck(file) {
      const name = file.name;
      if (!/\.(jpg|jpeg|png|GIF|JPG|PNG|bmp)$/.test(name)) {
        this.$message.error("选择的文件中包含不支持的格式");
        return false;
      }
      var fileSize = file.size / (1024 * 1024);
      if (fileSize > 10) {
        this.$message.error("选择的图片大小不能超过10MB!");
        return false;
      }
      return true;
    },
    uploadSuccess(res) {
      const { code, msg, data } = res;
      if (code === 0) {
        this.insertImg(data);
      } else {
        this.$notify.error({
          title: this.$t("notify.fail"),
          message: msg,
        });
      }
    },
    getContent() {
      return this.$refs.textarea.innerHTML;
    },
    setContent(val) {
      this.$refs.textarea.innerHTML = unescape(val).replace(/\\/g, "");
    },
  },
};
</script>

<style lang="scss" scoped>
.Area_upload_box {
  display: flex;
  width: 100%;
  align-items: flex-end;
  .upload {
    margin-left: 10px;
  }
}
.textarea {
  padding: 10px 15px;
  width: 100%;
  height: 110px;
  resize: none;
  overflow-x: hidden;
  overflow-y: auto;
  font-size: 14px;
  line-height: 16px;
  background: #fff !important;
  border: 1px solid #dcdfe6;
  border-radius: 4px;
  &.hasClickSend {
    animation: shake 800ms ease-in-out;
    transform-origin: center bottom;
  }
}
</style>
