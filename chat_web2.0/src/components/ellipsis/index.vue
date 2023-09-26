<template>
  <div ref="wrapper" class="content-wrapper" @click="showDialog">
    <template v-if="overflow">
      <div v-if="!isHtml" class="content" :class="{ 'single-line': singleLine }">
        {{ content }}
      </div>
      <div v-else v-html="content" class="content" :class="{ 'single-line': singleLine }"></div>
      <i
        class="arrow el-icon-caret-bottom"
        v-if="arrowIsdialog"
        @click.stop="showDialog"
      />
      <i
        class="arrow"
        v-else
        :class="singleLine ? 'el-icon-caret-bottom' : 'el-icon-caret-top'"
        @click.stop="singleLine = !singleLine"
      />
    </template>
    <template v-else>{{ content }}</template>
  </div>
</template>

<script>
export default {
  props: {
    content: {
      type: String,
      default: "",
    },
    arrowIsdialog: {
      type: Boolean,
      default: false,
    },
    isHtml:{
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      singleLine: false,
      overflow: false,
    };
  },
  watch: {
    content: {
      handler(v) {
        if (v) {
          this.$nextTick(() => {
            this.overflowHandler();
          });
        }
      },
      immediate: true,
    },
  },
  methods: {
    showDialog() {
      this.$emit("showDialog", this.content);
    },
    overflowHandler() {
      const { wrapper } = this.$refs;
      if (wrapper) {
        const { height } = wrapper.getBoundingClientRect();
        if (height > 24) {
          this.singleLine = true;
          this.overflow = true;
        }
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.content-wrapper {
  position: relative;
  line-height: 24px;
  cursor: pointer;
  .content {
    padding-right: 20px;
  }
  .single-line {
    height: 24px;
    overflow: hidden;
  }
  .arrow {
    position: absolute;
    z-index: 1;
    top: 4px;
    right: 0;
    cursor: pointer;
  }
}
</style>
