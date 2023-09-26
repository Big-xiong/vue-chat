<template>
  <div ref="chart" class="chart" />
</template>

<script>
import echarts from 'echarts'
import { mapState } from 'vuex'
export default {
  props: {
    orignData: {
      type: Object,
      defualt: () => ({})
    }
  },
  data() {
    return {
      options: {
        grid: {
          top: 50,
          left: 30,
          right: 30
        },
        tooltip: {
          trigger: 'axis'
        },
        xAxis: {
          type: 'category',
          data: [],
          axisLine: {
            lineStyle: {
              color: '#5082F4',
              width: 2
            }
          },
          axisTick: {
            show: false
          },
          splitLine: {
            show: true,
            lineStyle: {
              color: ['#ddd'],
              width: 1,
              type: 'solid'
            }
          }
        },
        yAxis: {
          type: 'value',
          minInterval: 1,
          axisLine: {
            show: true,
            lineStyle: {
              color: '#5082F4',
              width: 1
            }
          },
          splitLine: {
            show: true,
            lineStyle: {
              color: ['#ddd'],
              width: 1,
              type: 'solid'
            }
          }
        },
        series: [
          {
            name: '访客数',
            type: 'line',
            data: [],
            // smooth: true,
            itemStyle: {
              normal: {
                color: '#00BAAD',
                lineStyle: {
                  color: '#00BAAD'
                }
              }
            },
            markPoint: {
              data: [
                { type: 'max', name: 'Max' },
                { type: 'min', name: 'Min' }
              ]
            },
            markLine: {
              data: [{ type: 'average', name: 'Avg' }]
            }
          },
          {
            name: '接待人数',
            type: 'line',
            data: [],
            // smooth: true,
            itemStyle: {
              normal: {
                color: '#5082F4',
                lineStyle: {
                  color: '#5082F4'
                }
              }
            },
            markPoint: {
              data: [
                { type: 'max', name: 'Max' },
                { type: 'min', name: 'Min' }
              ]
            },
            markLine: {
              data: [{ type: 'average', name: 'Avg' }]
            }
          }
        ]
      },
      echarts: null
    }
  },
  computed: {
    ...mapState('app', [
      'theme'
    ])
  },
  watch: {
    orignData(v) {
      const color = {
        'light': '#ddd',
        'dark': '#404040'
      }[this.theme]
      this.options.xAxis.splitLine.lineStyle.color[0] = color
      this.options.yAxis.splitLine.lineStyle.color[0] = color

      const x = JSON.parse(v.fifteenDays)
      const y = JSON.parse(v.fifteenNum)
      const z = JSON.parse(v.fifteenNumcount)
      this.options.xAxis.data = x
      this.options.series[0].data = z
      this.options.series[1].data = y
      if (Math.max.apply(Math, z) <= 5) {
        this.options.yAxis.max = 5
      } else {
        this.options.yAxis.max = 'dataMax'
      }
      if (this.echarts) {
        this.echarts.setOption(this.options)
      } else {
        this.echarts = echarts.init(this.$refs.chart)
        this.echarts.setOption(this.options)
      }
    },
    theme(theme) {
      const color = {
        'light': '#ddd',
        'dark': '#404040'
      }[theme]
      this.options.xAxis.splitLine.lineStyle.color[0] = color
      this.options.yAxis.splitLine.lineStyle.color[0] = color
      if (this.echarts) {
        this.echarts.setOption(this.options)
      } else {
        this.echarts = echarts.init(this.$refs.chart)
        this.echarts.setOption(this.options)
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.chart {
  width: 100%;
  height: 400px;
}
</style>
