<template>
  <div class="chart">
    <el-card class="chart-side">
      <div slot="header">
        <span>{{ $t('visitorRegion.text[1]') }}</span>
      </div>
      <div class="platform-list">
        <div
          v-for="platform in platformList"
          :key="platform.domain_id"
          :class="{'platform-item':true,'active':activePlatform.domain_id==platform.domain_id}"
          @click="clickPlatform(platform)"
        >
          {{ platform.domain_title }}
        </div>
      </div>
    </el-card>
    <el-card class="chart-main">
      <div slot="header">
        <span class="mr10">{{ $t('visitorRegion.text[2]') }}</span>
        <span class="back" @click="carousel.prev()">{{ $t('visitorRegion.text[3]') }}</span>
      </div>
      <div ref="chart" v-loading="loading" class="chart" style="height: 800px" />
    </el-card>
  </div>
</template>

<script>
import echarts from 'echarts'
import { mapState } from 'vuex'
import { getVisitorRegionList } from '@/api/statistics.js'
import mapData from './china.json'
export default {
  props: {
    carousel: {
      type: Object,
      default: () => ({})
    },
    platformList: {
      type: Array,
      default: () => []
    }
  },
  data() {
    return {
      loading: false,
      regionList: [],
      activePlatform: {},
      options: {
        backgroundColor: '#FFFFFF',
        title: {
          text: this.$t('visitorRegion.chart[0]'),
          subtext: '',
          x: 'center',
          textStyle: {
            color: '#333'
          }
        },
        tooltip: {
          trigger: 'item'
        },
        // 左侧小导航图标
        visualMap: {
          show: true,
          x: 'left',
          y: 'center',
          text: [this.$t('visitorRegion.chart[1]'), this.$t('visitorRegion.chart[2]')],
          inRange: {
            color: ['#e0ffff', '#1c97f5']
          }
        },
        // 配置属性
        series: [
          {
            name: '数据',
            type: 'map',
            mapType: 'china',
            roam: false,
            top: 50,
            zoom: 1.15,
            label: {
              normal: {
                show: true
              },
              emphasis: {
                show: false
              }
            },
            itemStyle: {
              areaColor: '#eee'
            },
            data: []
          }
        ]
      }
    }
  },
  computed: {
    ...mapState('app', [
      'theme'
    ])
  },
  watch: {
    platformList(v) {
      if (v.length) {
        this.activePlatform = v[0]
        this.getVisitorRegionList()
      }
    },
    theme() {
      this.renderMap()
    }
  },
  methods: {
    renderMap() {
      setTimeout(() => {
        const color = {
          light: {
            bg: '#fff',
            title: '#333',
            areaBg: '#eee'
          },
          dark: {
            bg: '#2A2C33',
            title: '#A6A6A6',
            areaBg: '#666'
          }
        }[this.theme]
        this.options.backgroundColor = color.bg
        this.options.title.textStyle.color = color.title
        this.options.series[0].itemStyle.areaColor = color.areaBg

        const myChart = echarts.init(this.$refs.chart)
        echarts.registerMap('china', mapData)
        this.options.series[0].data = this.regionList
        myChart.setOption(this.options)
        this.loading = false
      }, 0)
    },
    getVisitorRegionList() {
      const { activePlatform: { domain_id }} = this
      getVisitorRegionList({ myselect: 1, domain_id }).then(res => {
        const { code, data } = res
        if (code === 0) {
          this.regionList = data
          this.renderMap()
        }
      })
    },
    clickPlatform(platform) {
      this.loading = true
      this.activePlatform = platform
      this.getVisitorRegionList()
    }
  }
}
</script>

<style lang="scss" scoped>
.chart {
  display: flex;
  .chart-side {
    width: 300px;
    margin-right: 20px;
    .platform-item {
      line-height: 50px;
      border-bottom: 1px solid var(--visitor-region-border);
      transition: all .3s;
      cursor: pointer;
      text-indent: 20px;
      &:hover, &.active {
        background: #2F4056;
        color: #fff;
      }
    }
  }
  .chart-main {
    flex: 1;
    .back {
      cursor: pointer;
    }
  }
}
</style>
