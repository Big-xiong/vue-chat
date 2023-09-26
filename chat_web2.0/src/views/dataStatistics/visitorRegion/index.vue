<template>
  <div class="custom-container">
    <el-carousel ref="carousel" :autoplay="false" height="1000px" arrow="never" :initial-index="0">
      <el-carousel-item>
        <table-view :carousel="$refs.carousel" :platform-list="platformList" />
      </el-carousel-item>
      <el-carousel-item>
        <chart-view :carousel="$refs.carousel" :platform-list="platformList" />
      </el-carousel-item>
    </el-carousel>
  </div>
</template>

<script>
import { getPlatformList } from '@/api/common.js'
import tableView from './tableView.vue'
import chartView from './chartView.vue'
export default {
  name: 'VisitorRegion',
  components: { tableView, chartView },
  data() {
    return {
      activeName: 'table',
      platformList: []
    }
  },
  created() {
    this.getPlatformList()
  },
  methods: {
    getPlatformList() {
      getPlatformList().then(res => {
        const { code, data } = res
        if (code === 0) {
          this.platformList = [
            { domain_id: '', domain_title: this.$t('visitorRegion.all') },
            ...data
          ]
        }
      })
    }
  }
}
</script>

<style scoped>
.el-tabs__header {
  display: none;
}
::v-deep .el-carousel__indicators {
  display: none;
}
</style>
