<template>
  <transition name="el-fade-in">
    <div v-show="visible" ref="emojiBox" class="emoji" :style="emojiStyle != {}?emojiStyle:'width: 383px;'">
      <div class="inner clearfix">
        <div v-for="emoji in emojiList" :key="emoji" class="emoji-item fl" @click="clickEmoji(emoji)">
          <img :src="`/img/emoji/${emoji}.png`">
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
import { mapMutations } from 'vuex'
export default {
  props: {
    visible: {
      type: Boolean,
      default: false
    },
    emojiStyle: {
      type: Object,
      default: () => {
        return {}
      }
    }
  },
  data() {
    return {
      emojiList: [
        '1f600',
        '1f601',
        '1f602',
        '1f603',
        '1f604',
        '1f605',
        '1f606',
        '1f607',
        '1f609',
        '1f60a',
        '1f60b',
        '1f60c',
        '1f60d',
        '1f60e',
        '1f60f',
        '1f31a',
        '1f31d',
        '1f444',
        '1f445',
        '1f448',
        '1f44a',
        '1f44b',
        '1f44c',
        '1f44d',
        '1f44e',
        '1f44f',
        '1f450',
        '1f466',
        '1f467',
        '1f46e',
        '1f47b',
        '1f596',
        '1f610',
        '1f611',
        '1f612',
        '1f613',
        '1f614',
        '1f615',
        '1f616',
        '1f617',
        '1f618',
        '1f619',
        '1f61a',
        '1f61b',
        '1f61c',
        '1f61d',
        '1f61e',
        '1f61f',
        '1f620',
        '1f621',
        '1f622',
        '1f623',
        '1f624',
        '1f625',
        '1f626',
        '1f627',
        '1f628',
        '1f629',
        '1f62a',
        '1f62b',
        '1f62c',
        '1f62d',
        '1f62e',
        '1f62f',
        '1f630',
        '1f631',
        '1f632',
        '1f633',
        '1f634',
        '1f635',
        '1f636',
        '1f637',
        '1f641',
        '1f642',
        '1f643',
        '1f644',
        '1f64a',
        '1f64c',
        '1f910',
        '1f911',
        '1f912',
        '1f913',
        '1f914',
        '1f915',
        '1f916',
        '1f917',
        '1f91a',
        '1f91b',
        '1f91d',
        '1f91e',
        '1f91f',
        '1f920',
        '1f921',
        '1f922',
        '1f923',
        '1f924',
        '1f925',
        '1f926',
        '1f927',
        '1f928',
        '1f929',
        '1f92a',
        '1f92b',
        '1f92c',
        '1f92d',
        '1f92e',
        '1f92f',
        '1f937',
        '1f970',
        '1f973',
        '1f974',
        '1f975',
        '1f976',
        '1f97a',
        '1f9d0'
      ]
    }
  },
  mounted() {
    document.onclick = () => {
      if (this.visible) {
        this.$emit('update:visible', false)
      }
    }
    const { emojiBox } = this.$refs
    emojiBox.onmouseenter = () => {
      this.setMouseOnEmoji(true)
    }
    emojiBox.onmouseleave = () => {
      this.setMouseOnEmoji(false)
    }
  },
  methods: {
    clickEmoji(emoji) {
      this.$emit('select', ` face[${emoji}]  `)
    },
    ...mapMutations('chatClient', [
      'setMouseOnEmoji'
    ])
  }
}
</script>

<style lang="scss" scoped>
.emoji {
  position: fixed;
  z-index: 10;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  margin: auto;
  height: 300px;
  padding: 10px;
  overflow-x: auto;
  background: #fff;
  box-shadow: 0 0 20px rgb(0 0 0 / 20%);
  .inner {
    // border-top: 1px solid #eee;
    // border-left: 1px solid #eee;
    .emoji-item {
      width: 32px;
      height: 32px;
      padding: 3px;
      // border-right: 1px solid #eee;
      // border-bottom: 1px solid #eee;
      cursor: pointer;
      img {
        width: 26px;
        vertical-align: bottom;
      }
      &:hover {
        border: 1px solid #eb7350;
        background: #fff9ec;
      }
      box-sizing: border-box;
    }
  }
}

@media screen and (max-width: 600px) {
  .emoji {
    width: 360px;
  }
}
</style>
