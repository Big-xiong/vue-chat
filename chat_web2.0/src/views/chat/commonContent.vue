<template>
  <div>
    <template v-if="chat.includeImg">
      <template v-for="(item, index) in chat.content">
        <template v-if="item.isImg">
          <viewer :key="index" :images="[item.src]">
            <img v-for="(src, index) in [item.src]" :key="index" :src="item.src" class="img" style="cursor:pointer">
          </viewer>
        </template>
        <span v-else :key="index" v-html="unescape(item)"></span>
      </template>
    </template>
    <div class="content-wrap"  v-else v-html="chat.content" />

  </div>
</template>

<script>
import { unescape } from 'html-escaper'
export default {
  props: {
    chat: {
      type: Object,
      default: () => ({})
    }
  },
  watch: {
    chat: {
      async handler(v) {
        if (!v.includeImg) {
          v.content = unescape(v.content)
          const httpReg = new RegExp("(http(s)?:\/\/)?(www\.)?[a-zA-Z\\.\\-]+\\.([a-zA-Z]{2,4})(:\\d+)?(/[a-zA-Z0-9\\.\\-~!@#$%^&amp;*+?:_/=<>]*)?", "gi");
          const flvReg =  /\.(zip|rar|txt|doc|docx|xls|xlsx|mp4|3gp|avi|mkv|flv|mov|MOV|jpg|png|gif|jpeg|wav)/gi
          // 判断聊天内容是否包含链接
          if(httpReg.test(v.content) && !v.content.includes('</a>')) {
            if(v.content.includes('<br>')) {
                v.content = v.content.replace('<br>', ' ')
            }
            if(!flvReg.test(v.content)){
                 v.content = v.content.replace(httpReg,(res) => {
                    return `<a href='${res.includes('https')?res:`https://${res}`}' target='_blank'>${res}</a>`
                })
            }
            // v.content = v.content.replace(httpReg,(res) => {
            //   return `<a href='${res.includes('https')?res:`https://${res}`}' target='_blank'>${res}</a>`
            // })
          }
          if(v.content.includes('\n')) {
            v.content = v.content.split('\n').join('<br>')
          }
        }
      },
      immediate: true
    }
  },
  methods:{
    unescape
  }
}
</script>

<style lang="scss" scoped>
.content-wrap{
  font-family: 'Mulish', 'PingFang SC', 'Microsoft YaHei', 'SimSun', Arial, sans-serif ;
  ::v-deep a{
    text-decoration: underline !important;
  }
}
</style>
