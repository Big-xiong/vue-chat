<template>
  <el-dialog title="添加关键词" :visible="visible" :close-on-click-modal="true" @close="$emit('update:visible',false)">
    <el-input v-model="keyword" placeholder="请输入内容">
      <el-button slot="append" icon="el-icon-plus" @click="addKeyword" />
    </el-input>
    <div v-if="keywords.length" class="keyword">
      <div v-for="(item, index) in keywords" :key="index" class="keyword-item">
        <span>{{ item.keyword }}</span>
        <span class="close" @click="deleteKeyword(item)">
          <i class="el-icon-close" />
        </span>
      </div>
    </div>
    <div slot="footer" class="btns">
      <el-button v-waves type="info" @click="$emit('update:visible',false)">
        取消
      </el-button>
      <el-button v-waves type="primary" @click="saveKeywords">
        提交
      </el-button>
    </div>
  </el-dialog>
</template>

<script>
import { getKeywords, getkeydelworks, saveKeywords } from '@/api/qualityTest.js'
export default {
  props: {
    visible: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      keyword: '',
      keywords: []
    }
  },
  watch: {
    visible(v) {
      if (v) {
        this.keyword = ''
        this.keywords = []
        this.getKeywords()
      }
    }
  },
  methods: {
    async getKeywords() {
      const { code, data } = await getKeywords()
      if (code === 0) {
        this.keywords = data
      }
    },
    addKeyword() {
      let { keyword } = this
      keyword = keyword.trim()
      if (keyword) {
        this.keywords.push({ keyword })
        this.keyword = ''
      }
    },
    deleteKeyword(item) {
      const { keywordid } = item
      getkeydelworks({ keywordid }).then(res => {
        const { code, msg } = res
        if (code === 0) {
          this.$message({
            type: 'success',
            message: msg
          })
          this.getKeywords()
        }
      })
    },
    saveKeywords() {
      const { keywords } = this
      saveKeywords({
        keyword: keywords.map(({ keyword }) => keyword)
      }).then(res => {
        const { code } = res
        if (code === 0) {
          this.$emit('update:visible', false)
        }
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.keyword {
  border: 1px solid #eee;
  margin-top: 20px;
  border-radius: 3px;
  line-height: 1.7em;
  .keyword-item {
    padding: 5px 14px;
    border-bottom: 1px dashed #eee;
    display: flex;
    align-items: center;
    &:last-child {
      border: none;
    }
    .close{
      margin-left: auto;
      cursor: pointer;
    }
  }
}
.btns {
  // margin-top: 20px;
  text-align: center;
  .el-button {
    width: 100px;
    &:last-child {
      margin-left: 60px;
    }
  }
}
</style>
