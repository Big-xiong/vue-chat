<template>
  <div class="menu-bar" @click="toggleClick">
    <!-- <svg
      :class="{'is-active':isActive}"
      class="hamburger"
      viewBox="0 0 1024 1024"
      xmlns="http://www.w3.org/2000/svg"
      width="64"
      height="64"
    >
      <path d="M408 442h480c4.4 0 8-3.6 8-8v-56c0-4.4-3.6-8-8-8H408c-4.4 0-8 3.6-8 8v56c0 4.4 3.6 8 8 8zm-8 204c0 4.4 3.6 8 8 8h480c4.4 0 8-3.6 8-8v-56c0-4.4-3.6-8-8-8H408c-4.4 0-8 3.6-8 8v56zm504-486H120c-4.4 0-8 3.6-8 8v56c0 4.4 3.6 8 8 8h784c4.4 0 8-3.6 8-8v-56c0-4.4-3.6-8-8-8zm0 632H120c-4.4 0-8 3.6-8 8v56c0 4.4 3.6 8 8 8h784c4.4 0 8-3.6 8-8v-56c0-4.4-3.6-8-8-8zM142.4 642.1L298.7 519a8.84 8.84 0 0 0 0-13.9L142.4 381.9c-5.8-4.6-14.4-.5-14.4 6.9v246.3a8.9 8.9 0 0 0 14.4 7z" />
    </svg> -->

    <!-- <i v-if="isActive" class="iconfont icon-shrink-right ml2"></i>
    <i v-else class="iconfont icon-spread-left ml2"></i> -->
    <svg-icon icon-class="menu_open" class="icon-menu_open" />
    <!-- <i v-if="isActive" class="material-icons-round offset-top">menu_open</i>
    <i v-else class="material-icons-round offset-top reverse">menu_open</i> -->
  </div>
</template>

<script>
export default {
  name: 'Hamburger',
  props: {
    isActive: {
      type: Boolean,
      default: false
    }
  },
  methods: {
    toggleClick() {
      this.$emit('toggleClick')
    }
  }
}
</script>

<style lang="scss" scoped>
.hamburger {
  display: inline-block;
  vertical-align: middle;
  width: 20px;
  height: 20px;
}

.svg-icon{
  width: 24px !important;
  height: 24px !important;
}
.material-icons-round {
  cursor: pointer;
  &.offset-top {
    transform: rotate(0) translateY(1.5px);
  }
  &.reverse {
    transform: rotate(180deg) translateY(-1.5px);
  }
}
.hamburger.is-active {
  transform: rotate(180deg);
}
.menu-bar{
  margin-top: 10px;
  display: flex;
  justify-content: center;
  .svg-icon{
    margin: 0 !important;
  }
}
</style>
