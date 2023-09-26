<template>
	<div class="auto">
		<div class="title">
			{{ $t("connectServer.auto.text[0]") }}
		</div>
		<p class="tips">{{ $t("connectServer.auto.text[5]") }}</p>
		<div class="flex-aic mt20">
			<el-select v-model="platformId" class="w390" clearable filterable :placeholder="$t('connectServer.auto.text[1]')">
				<el-option v-for="(platform, index) in platformList" :key="index" :label="platform.domain_title" :value="platform.domain_id" />
			</el-select>
			<div class="ml10">{{ $t('connectServer.auto.text[1]') }}</div>
		</div>
		<div class="flex-aic mt20">
			<el-select v-model="groupId" clearable :placeholder="$t('connectServer.auto.placeholder.group')">
				<el-option v-for="group in groupList" :key="group.group_id" :label="group.group_name" :value="group.group_id" />
			</el-select>
			<div class="ml10">{{ $t('connectServer.auto.text[6]') }}</div>
		</div>
		<!-- 自定义参数 -->
		<div class="title mt40">{{ $t("connectServer.auto.text[2]") }}
      <el-tooltip effect="dark" :content="$t('connectServer.auto.log')" placement="bottom">
        <el-checkbox v-model="chatRecord" border>{{$t('connectServer.auto.logText')}}</el-checkbox>
      </el-tooltip>
    </div>
		<el-checkbox-group v-model="customParams" class="params-options" size="small">
			<el-checkbox v-for="params in customParamsList" :key="params.params_id" :label="params.params_field" border>
				{{ params.params_name }}
			</el-checkbox>
		</el-checkbox-group>
		<!-- 推荐参数 -->
		<div class="mt20">{{ $t("connectServer.auto.text[3]") }}</div>
		<el-checkbox-group v-model="recommendParams" class="params-options" size="small">
			<el-checkbox v-for="params in recommendParamsList" :key="params.params_id" :label="params.params_field" border>
				{{ params.params_name }}
			</el-checkbox>
		</el-checkbox-group>
    <div class="title mt40 mb44">
      <el-button class="SeverLink" v-waves type="primary" @click="genSeverLink">
        <i class="material-icons-round fs-14 mr6">insights</i>{{ $t("connectServer.auto.text[4]") }}
      </el-button>
      <!-- 生产环境生成域名切换 -->
      <el-tooltip v-for="d in domainList" :key="d" effect="dark" :content="$t('connectServer.auto.domain')" placement="bottom">
				<el-checkbox
          :value="domain === d"
          :label="d"
          border
          @change="(val)=>domainChange(val,d)"
        >
          {{ d }}
        </el-checkbox>
			</el-tooltip>
    </div>
		<el-table class="mt16" :data="serverLinkList" stripe>
			<el-table-column prop="strategy" :label="$t('connectServer.auto.table.strategy.title')" width="150" />
			<el-table-column prop="link" :label="$t('connectServer.auto.table.link')" />
			<el-table-column :label="$t('action.label')" align="center" width="200">
				<div slot-scope="{ row }" style="display: flex; align-items: center;justify-content: center;">
					<el-button size="mini" type="primary" @click="clickCopy(row.link)"><i class="material-icons-round fs-14 mr6">content_copy</i>{{ $t("connectServer.auto.text[8]") }}</el-button>
					<el-button size="mini" type="primary" @click="downloadQrCode(row)">{{ $t("connectServer.auto.text[7]") }}</el-button>
				</div>
			</el-table-column>
		</el-table>
		<div id="qRcodeAuto" ref="qRcode" style="display:none;" />
	</div>
</template>

<script>
import QRCode from 'qrcodejs2-fix'
export default {
	props: {
		useInfo: {
			type: Object,
			default: () => {
				return {}
			}
		},
		customParamsList: {
			type: Array,
			default: () => {
				return []
			}
		},
		recommendParamsList: {
			type: Array,
			default: () => {
				return []
			}
		}
	},
	data () {
		return {
			platformId: '',
			groupId: '',
			groupList: [],
			customParams: [],
			recommendParams: [],
			serverLinkList: [],
			platformList: [],
			qrcode: null,
      chatRecord: true,
      domain:'v8',
      domainList:['v8','v9','v10','v11'],
		}
	},
	computed: {
		platform () {
			return this.platformList.find(platform => platform.domain_id === this.platformId) || {}
		}
	},
	watch: {
		useInfo (v) {
			if (v) {
				this.groupList = v.groupList
				this.platformList = v.platformList
			}
		}
	},
	mounted () {
		this.qrcode = new QRCode('qRcodeAuto', {
			width: 200,
			height: 200,
			colorDark: '#111',
			colorLight: '#f5f5f5',
			text: ''
		})
	},
	methods: {
		downloadClick () {
			let myCanvas = document.getElementById("qRcodeAuto").getElementsByTagName("canvas");
			let a = document.createElement("a");
			a.href = myCanvas[0].toDataURL("image/png");
			a.download = "auto-link-qrcode";
			a.click();
			a.remove()
		},
		createQrCode (link) {
			this.qrcode.clear()
			this.qrcode.makeCode(link)
		},
		downloadQrCode (row) {
			this.createQrCode(row.link)
			setTimeout(() => {
				this.downloadClick()
			}, 500)
		},
		clickCopy (link) {
			this.$copyText(link).then(() => {
				this.$notify({
					title: this.$t('notify.success'),
					message: this.$t('notify.copySuccess'),
					type: 'success'
				})
			})
		},
    domainChange(val,domain){
      if(val){
        this.domain = domain
      }
    },
		genSeverLink () {
			const { platform, groupId, customParams, recommendParams } = this

			if (!Object.keys(platform).length) {
				return this.$message({
					message: this.$t('connectServer.auto.tips.platform'),
					type: 'error'
				})
			}
      const joinArr = [...customParams, ...recommendParams]
			const tempParams = joinArr.map(params => `"${params}":""`).join(',')

			const params = tempParams ? `/custom_{${tempParams}}` : ''
			const group = groupId ? `/group_${groupId}` : ''
			const ChatLog = this.chatRecord ? `` : '/NoChatLog_1'
      // 'https://www.aichatv7.com'
      // const domain = 'https://www.aichatv7.com'.replace('v7', this.domain)
      const domain = process.env.VUE_APP_LINK.replace('v7', this.domain)
			const strategyOptions = this.$t('connectServer.auto.table.strategy.options')
			this.serverLinkList = [
				{
					strategy: groupId ? strategyOptions[1] : strategyOptions[0],
					link: `${domain}/chat/client/seller_${platform.seller_code}/domain_${platform.domain_name}${group}${params}${ChatLog}/source_0`
				}
			]
		}
	}
}
</script>

<style lang="scss" scoped>
.auto {
	margin-top: 12px;
	.title {
		color: var(--connect-server-title);
		font-size: 16px;
		.tips {
			font-size: 14px;
		}
	}
	.params-options {
		margin-top: 14px;
		::v-deep.el-checkbox {
			margin-right: 14px;
			& + .el-checkbox {
				margin-left: 14px;
			}
		}
	}
	.w390 {
		width: 390px;
	}
	.flex-aic {
		.ml10 {
			opacity: 0.5;
		}
	}
	.SeverLink {
		width: 170px;
		height: 48px;
    margin-right: 5px;
		border-radius: 24px;
		background: var(--el-btn-primary-bg);
		border: 0;
	}
	#qRcode {
		width: 200px;
		height: 200px;
		border: 10px solid #fff;
		position: relative;
		.logo {
			position: absolute;
			left: 50%;
			top: 50%;
			width: 28px;
			transform: translate(-50%, -50%);
			width: 30px;
			background: #fff;
			border-radius: 6px;
		}
	}
}
</style>
