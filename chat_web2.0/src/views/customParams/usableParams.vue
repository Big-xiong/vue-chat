<template>
  <div>
    <p>{{ $t('customParams.text[0]') }}</p>
    <el-table v-loading="loading" :data="usableParamsList" stripe :element-loading-text="$t('table.loading')">
      <el-table-column :label="$t('customParams.table.id')" align="center" />
      <el-table-column prop="params_name" :label="$t('customParams.table.paramsName')" align="center" />
      <el-table-column prop="params_field" :label="$t('customParams.table.paramsField')" align="center" />
      <el-table-column :label="$t('action.label')" align="center">
        <el-button v-waves slot-scope="{row}" size="mini" type="primary" @click="invokeParams(row)">
          <i class="material-icons-round fs-14 mr6">api</i>{{ $t('action.type.invoke') }}
        </el-button>
      </el-table-column>
    </el-table>
    <pagination :total="total" :page.sync="page" :limit.sync="limit" @pagination="getUsableParams" />
  </div>
</template>

<script>
import { getUsableParams, invokeParams } from '@/api/params.js'
export default {
  data() {
    return {
      page: 1,
      limit: 20,
      total: 0,
      loading: true,
      usableParamsList: []
    }
  },
  created() {
    this.getUsableParams()
  },
  methods: {
    getUsableParams() {
      this.loading = true
      getUsableParams().then(res => {
        const { code, data, count } = res
        if (code === 0) {
          this.total = count
          this.usableParamsList = data
        }
        this.loading = false
      })
    },
    invokeParams(params) {
      invokeParams({ field: params.params_field }).then(res => {
        const { code, msg } = res
        const success = code === 0
        this.$notify({
          message: msg,
          title: success ? this.$t('notify.success') : this.$t('notify.fail'),
          type: success ? 'success' : 'error'
        })
      })
    }
  }
}
</script>

<style lang="less" scoped>

</style>
