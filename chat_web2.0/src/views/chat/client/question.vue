<template>
  <div v-if="compVisible" class="common-question" :class="{'dark':!sunny,'special':theme.stylenum == 3,'special3':theme.stylenum == 4, 'new': isNew}">
    <div v-if="platform.domainInfo&&platform.domainInfo.extension_bg" class="promote-img">
      <template>
        <div v-for="(item,index) in platform.domainInfo.extension_bg.split(';')" :key="index" class="promote-item">
          <a v-if="platform.domainInfo.extensionUrl" :href="`${platform.domainInfo.extensionUrl.split(';')[index]}`" target="_blank">
            <img :src="`${baseUrl}${item}`" @load="loadImage">
          </a>
          <img v-else :src="`${baseUrl}${item}`" @load="loadImage">
        </div>
      </template>
    </div>
    <div v-if="splitVisible" class="split" />
    <template v-if="platform.question && platform.question.length">
      <div class="question-head" :style="questionHeadStyle">
        <i class="material-icons-round" :style="theme.stylenum == 4?'color:#F26D6D':''">lightbulb_outline</i>{{ $t('chatClient.chatBody.question') }}
      </div>
      <div class="question-body">
        <el-collapse>
          <template v-for="(item,idx) in questionCate.slice(pageNo*pageSize-pageSize,pageNo*pageSize)">
            <el-collapse-item v-if="item.cate_id" :key="idx" :name="item.cate_id">
              <div
                v-for="question in item.question"
                :key="question.question_id"
                class="question-item ellipsis"
                style="background:transparent;"
                @click="clickQuestion(question)"
              >
                {{ question.question }}
              </div>
              <template slot="title">
                <span v-show="theme.stylenum !== 1" class="border-left" :style="setColorOrGradient(theme.body_color)" />
                <svg-icon v-show="theme.stylenum === 1" icon-class="client_arrow" />
                <span>{{ item.cate_name }}</span>
              </template>
            </el-collapse-item>
            <div
              v-else
              :key="item.question_id"
              class="question-item ellipsis no-cate"
              style="background:transparent;"
              @click="clickQuestion(item)"
            >
              <template v-if="!item.cate_id">
                <div v-show="theme.stylenum !== 1" class="border-left" :style="setColorOrGradient(theme.body_color)" />
                <svg-icon v-show="theme.stylenum === 1" icon-class="client_arrow" />
              </template>
              <span>{{ item.question }}</span>
            </div>
          </template>
        </el-collapse>
        <div v-if="total > 1" class="page">
          <div :class="['changePage', {'spcial-new': theme.stylenum === 1}]" :style="setColorOrGradient(theme.body_color)" @click="pageDown">
            <i class="el-icon-arrow-left" />
          </div>
          <div class="current">{{ total }}/{{ pageNo }}</div>
          <div :class="['changePage', {'spcial-new': theme.stylenum === 1}]" :style="setColorOrGradient(theme.body_color)" @click="pageUp">
            <i class="el-icon-arrow-right" />
          </div>
        </div>
      </div>
    </template>
  </div>
</template>

<script>
import { mapState, mapMutations } from 'vuex'
import { eventBus } from './eventBus.js'
import { setColorOrGradient } from '@/utils/index'
export default {
  props: {
    theme: {
      type: Object,
      default: () => {}
    },
    sunny: {
      type: Boolean,
      default: true
    },
    isNew: {
      type: Boolean,
      default: false
    },
    isMobile: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      pageNo: 1,
      pageSize: 5,
      total: undefined,
      baseUrl: process.env.VUE_APP_BASE_URL
    }
  },
  mounted() {
    this.$nextTick(() => {
      this.$emit('scrollTo', 'bottom')
    })
  },
  computed: {
    questionHeadStyle() {
      if (this.theme.stylenum == 4) {
        if (this.sunny) {
          return 'color:#293FFF'
        } else {
          return 'color:#B3B3B3'
        }
      } else {
        return `color:${this.theme.body_color.split(',')[0]}`
      }
    },
    compVisible() {
      const { platform } = this
      return platform?.domainInfo?.extension_bg || platform?.question?.length
    },
    splitVisible() {
      const { platform } = this
      return platform?.domainInfo?.extension_bg && platform?.question?.length
    },
    questionCate() {
      const { platform } = this
      const questionCate = []
      let flag
      platform && platform.question.forEach(item => {
        flag = true
        for (let index = 0; index < questionCate.length; index++) {
          if (questionCate[index].cate_id == item.cate_id) {
            flag = false
            questionCate[index].question.push({
              question: item.question,
              question_id: item.question_id
            })
          }
        }
        if (flag) {
          if (item.cate_id) {
            questionCate.push({
              cate_id: item.cate_id,
              cate_name: item.cate_name,
              question: [
                {
                  question: item.question,
                  question_id: item.question_id
                }
              ]
            })
          } else {
            questionCate.push({
              question: item.question,
              question_id: item.question_id
            })
          }
        }
      })
      this.total = Math.ceil(questionCate.length / 5)
      return questionCate
    },
    ...mapState('chatClient', [
      'platform', 'themeColor'
    ])
  },
  methods: {
    setColorOrGradient,
    loadImage() {
      this.$emit('scrollTo', 'bottom')
    },
    pageDown() {
      if (this.pageNo != 1) {
        this.pageNo--
      }
    },
    pageUp() {
      if (this.pageNo < this.total) {
        this.pageNo++
      }
    },
    clickQuestion(question) {
      this.sendQuestion(question)
      eventBus.$emit('sendQuestion', question.question)
    },
    ...mapMutations('chatClient', [
      'sendQuestion'
    ])
  }
}
</script>
<style lang="scss">
.el-dropdown-menu .el-dropdown-menu__item:hover {
    background: none !important;
}
</style>
<style lang="scss" scoped>

::v-deep.el-collapse{
  border: none!important;;
  max-height: 150px;
  overflow-y: auto;
  margin-bottom: 20px;
  &::-webkit-scrollbar {
    display: none; /* Chrome Safari */
  }
  .el-collapse-item__header{
    font-size: 14px;
  }
  .border-left{
    width: 3px;
    height: 50%;
    background: rgb(53, 99, 227);
    margin-right: 10px;
  }
}
::v-deep.el-collapse .el-collapse-item .el-collapse-item__wrap{
  border: none!important;
  background: transparent!important;;
}
::v-deep.el-collapse .el-collapse-item .el-collapse-item__wrap .el-collapse-item__content{
  background: transparent !important;
  padding-bottom: 0 !important;
}
::v-deep.el-collapse .el-collapse-item .el-collapse-item__header{
  border: none !important;
  background: transparent !important;
  height: 24px;
  line-height: 24px;
  color: #808080;
  .svg-icon{
    width: 6px;
    height: 8px;
    margin-right: 8px;
  }
}
.common-question {
	height: 100%;
	display: flex;
	flex-direction: column;
	.promote-img {
		max-height: 50%;
		overflow-y: auto;
		padding: 8px;
		box-sizing: border-box;
		&::-webkit-scrollbar{
			display: none;
		}
		.promote-item{
			margin-bottom: 6px;
		}
		img {
			display: block;
			width: 100%;
			border-radius: 4px;
		}
	}
	.split {
		position: relative;
		&:before{
			content: '';
			position: absolute;
			height: 1px;
			left: 8px;
			right: 8px;
			top: 0;
			border-top: 1px dashed #B3B3B3;
		}
	}
  	.question-head {
		display: flex;
		align-items: center;
		padding: 16px 6px 0;
		cursor: pointer;
		.material-icons-round {
		margin-right: 12px;
		font-size: 22px;
		}
  	}
	.question-body {
		flex: 1;
		padding: 10px 16px 15px;
		overflow-y: auto;
		.question-item {
			// margin-bottom: 9px;
			margin: 3px 0;
			line-height: 23px;
			padding-left: 13px;
			color: #808080;
			cursor: pointer;
			&.no-cate{
				padding-left:0;
				display: flex;
				align-items: center;
				.border-left{
					width: 3px;
					height: 12px;
					background: rgb(53, 99, 227);
					margin-right: 10px;
				}
			}
      .svg-icon{
        width: 6px;
        height: 8px;
        margin-right: 8px;
      }
		}
  }
  &.new{
    height: 58%;
    background: #F6F7FB;
    margin-bottom: 30px;
    border-radius: 10px;
    &.dark{
      background: #33353C;
    }
    .promote-img{
      max-height: 40%;
    }
    .question-body{
      .el-collapse{
        margin-bottom: 0;
      }
    }
  }
}
.page{
  position: relative;
  left: 50%;
  display: inline-flex;
  align-items: center;
  transform: translateX(-50%);
  .changePage{
    width: 20px;
    height: 20px;
    display: flex;
    align-items: center;
    justify-content: center;
    color: #fff;
    cursor: pointer;
    border-radius: 3px;
    &.spcial-new{
      background: #6ecc94 !important;
      i{
        color: #fff !important;
      }
    }
  }
  .current{
    margin: 0 30px;
  }
}
@media screen and (max-width: 600px) {
  .common-question {
    &.new{
      height: unset !important;
      .promote-img{
        max-height: 180px;
      }
    }
  }
}
</style>
