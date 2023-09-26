<template>
  <el-dialog :title="$t('connectServer.fixed.course.title')" :visible="visible" :close-on-click-modal="true" @close="$emit('update:visible',false)">
    <p>{{ $t('connectServer.fixed.course.content[0]') }}</p>
    <p>{{ $t('connectServer.fixed.course.content[1]') }}</p>
    <p>{{ $t('connectServer.fixed.course.content[2]') }}</p>
    <img src="@/assets/img/connect-course/fixed-1.png">
    <p>{{ $t('connectServer.fixed.course.content[3]') }}</p>
    <img src="@/assets/img/connect-course/fixed-2.png">
    <p>{{ $t('connectServer.fixed.course.content[4]') }}</p>
    <img src="@/assets/img/connect-course/fixed-3.png">
    <p>{{ $t('connectServer.fixed.course.content[5]') }}</p>
    <img src="@/assets/img/connect-course/fixed-4.png">
    <p>{{ $t('connectServer.fixed.course.content[6]') }}</p>
    <img src="@/assets/img/connect-course/fixed-5.png">
    <p>{{ $t('connectServer.fixed.course.content[7]') }}</p>
    <img src="@/assets/img/connect-course/fixed-6.png">
  </el-dialog>
</template>

<script>
export default {
  props: {
    visible: {
      type: Boolean,
      default: false
    }
  }
}
</script>

<style lang="scss" scoped>
img {
  width: 100%;
}
</style>
