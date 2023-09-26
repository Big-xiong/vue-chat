<template>
  <div class="avatar-container">
    <div v-if="isCustom">
      <img class="avatar-img" :src="imgSrc" width="100" height="100">
    </div>
    <div v-else v-genParams>
      <img id="img" class="avatar-img" :src="imgSrc" width="100" height="100">
      <canvas id="canvas" width="100" height="100" />
    </div>
  </div>
</template>

<script>
import { uploadImg } from '@/api/common.js'
export default {
  directives: {
    genParams: {
      inserted(el, binding, vnode) {
        vnode.context.initParams(el)
      },
      update(el, binding, vnode) {
        vnode.context.initParams(el)
      }
    }
  },
  props: {
    imgPath: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      params: {},
      imgSrc: '',
      fileName: '',
      isCustom: ''
    }
  },
  watch: {
    imgPath: {
      immediate: true,
      handler(v) {
        if (v.startsWith('/img/server-avatar')) {
          this.imgSrc = v
          this.fileName = v.split('server-avatar')[1]
          this.isCustom = false
        } else {
          this.imgSrc = `${process.env.VUE_APP_BASE_URL}${v}`
          this.isCustom = true
        }
      }
    }
  },
  mounted() {
    // this.initParams()
  },
  methods: {
    // clickHandler() {
    //   uploadImg(this.params).then(res => {
    //     this.$emit("uploadSuccess", res)
    //   })
    // },
    initParams(el) {
      setTimeout(() => {
        const img = el.querySelector('img')
        const canvas = el.querySelector('canvas')
        const ctx = canvas.getContext('2d')
        ctx.drawImage(img, 0, 0, 100, 100)

        setTimeout(() => {
          canvas.toBlob(blob => {
            const formData = new FormData()
            const file = new File([blob], this.fileName, { type: 'image/png' })
            formData.append('file', file)
            this.params = formData
          })
        }, 1000)
      }, 1000)
    },
    upload() {
      return uploadImg(this.params)
    }
  }
}
</script>

<style lang="scss" scoped>
.avatar-container {
  position: relative;
  width: 100px;
  height: 100px;
  #img {
    position: absolute;
    z-index: -1;
  }
  .avatar-img {
    border-radius: 50%;
  }
}
</style>
