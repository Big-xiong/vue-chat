<template>
  <div class="custom-container">
    <manageParams />
    <!-- <usableParams /> -->
  </div>
</template>

<script>
import manageParams from './manageParams.vue'
import usableParams from './usableParams.vue'
export default {
  name: 'CustomParams',
  components: { manageParams, usableParams }
}
</script>

<style lang="scss" scoped>
.custom-container {
  color: var(--custom-params-content);
}
</style>
