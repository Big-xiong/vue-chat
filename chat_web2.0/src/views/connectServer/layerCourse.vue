<template>
  <el-dialog :title="$t('connectServer.layer.course.title')" :visible="visible" :close-on-click-modal="true" @close="$emit('update:visible',false)">
    <p>{{ $t('connectServer.layer.course.content[0]') }}</p>
    <p>{{ $t('connectServer.layer.course.content[1]') }}</p>
    <p>{{ $t('connectServer.layer.course.content[2]') }}</p>
    <img src="@/assets/img/connect-course/layer-1.png">
    <p>{{ $t('connectServer.layer.course.content[3]') }}</p>
    <img src="@/assets/img/connect-course/layer-2.png">
    <p>{{ $t('connectServer.layer.course.content[4]') }}</p>
    <img src="@/assets/img/connect-course/layer-3.png">
    <p>{{ $t('connectServer.layer.course.content[5]') }}</p>
    <img src="@/assets/img/connect-course/layer-4.png">
    <p>{{ $t('connectServer.layer.course.content[6]') }}</p>
    <p>{{ $t('connectServer.layer.course.content[7]') }}</p>
    <img src="@/assets/img/connect-course/layer-5.png">
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
