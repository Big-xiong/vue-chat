<template>
	<div class="fixed">
		<div class="title">
			{{ $t('connectServer.fixed.text[0]') }}
		</div>
		<p class="tips">{{ $t('connectServer.fixed.text[7]') }}</p>
		<el-button class="mt4" type="text" icon="el-icon-info" @click="courseVisible=true">{{ $t('connectServer.fixed.text[1]') }}</el-button>
		<div class="flex-aic">
			<el-select v-model="domainList" class="w390" clearable size="medium" :placeholder="$t('connectServer.fixed.placeholder.platform')">
				<el-option v-for="platform in platformList" :key="platform.label" :label="platform.label" :value="platform.children" />
			</el-select>
			<div class="ml10">{{ $t('connectServer.fixed.text[2]') }}</div>
		</div>
		<div class="flex-aic mt20">
			<el-select v-model="groupId" class="w190 mr10" clearable size="medium" value-key="group_id" :placeholder="$t('connectServer.fixed.placeholder.group')" @change="genServerList">
				<el-option v-for="group in groupList" :key="group.group_id" :label="group.group_name" :value="group" />
			</el-select>
			<el-select v-model="server" class="w190" size="medium" clearable value-key="kefu_code" :placeholder="$t('connectServer.fixed.placeholder.server')">
				<el-option v-for="server in serverList" :key="server.kefu_code" :label="server.kefu_name" :value="server" />
			</el-select>
			<div class="ml10">{{ $t('connectServer.fixed.text[3]') }}</div>
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
      <el-tooltip v-for="d in domainListChange" :key="d" effect="dark" :content="$t('connectServer.auto.domain')" placement="bottom">
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
			<el-table-column prop="name" :label="$t('connectServer.fixed.table.name')" width="150" />
			<el-table-column prop="link" :label="$t('connectServer.fixed.table.link')" />
			<el-table-column :label="$t('action.label')" align="center" width="200">
				<el-button slot-scope="{row}" size="mini" type="primary" @click="clickCopy(row.link)">
					<i class="material-icons-round fs-14 mr6">content_copy</i>{{ $t('action.type.copy') }}
				</el-button>
				<div slot-scope="{ row }" style="display: flex; align-items: center;justify-content: center;">
					<el-button size="mini" type="primary" @click="clickCopy(row.link)"><i class="material-icons-round fs-14 mr6">content_copy</i>{{ $t("connectServer.auto.text[8]") }}</el-button>
					<el-button size="mini" type="primary" @click="downloadQrCode(row)">{{ $t("connectServer.auto.text[7]") }}</el-button>
				</div>
			</el-table-column>
		</el-table>
		<fixed-course :visible.sync="courseVisible" />
		<div id="qRcodeFixed" ref="qRcode" style="display:none;" />
	</div>
</template>

<script>
import fixedCourse from './fixedCourse.vue'
import QRCode from 'qrcodejs2-fix'
export default {
	components: { fixedCourse },
	props: {
		useInfo: {
			type: Object,
			default: () => ({})
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
			// options
			groupList: [],
			paramsList: [],
			serverList: [],
			platformList: [],
			serverLinkList: [],
			// params
			domainList: [],
			groupId: '',
			server: null,
			sellerCode: '',
			customParams: [],
			recommendParams: [],
			// other
			courseVisible: false,
			qrcode: null,
      chatRecord: true,
      domain:'v8',
      domainListChange:['v8','v9','v10','v11'],
		}
	},
	watch: {
		useInfo (v) {
			if (v) {
				const { groupList, domainList: tempPlatformList } = v
				this.groupList = groupList
				// this.paramsList = paramsList
				const platformList = []

				if (tempPlatformList.length) {
					platformList.push({
						label: tempPlatformList[0].domain_title,
						children: [tempPlatformList[0]]
					})
					for (let i = 1; i < tempPlatformList.length; i++) {
						const index = platformList.findIndex(platform => {
							return platform.label == tempPlatformList[i].domain_title
						})
						if (index === -1) {
							platformList.push({
								label: tempPlatformList[i].domain_title,
								children: [tempPlatformList[i]]
							})
						} else {
							platformList[index].children.push(tempPlatformList[i])
						}
					}
				}
				this.platformList = platformList
			}
		}
	},
	mounted () {
		this.qrcode = new QRCode('qRcodeFixed', {
			width: 200,
			height: 200,
			colorDark: '#111',
			colorLight: '#f5f5f5',
			text: ''
		})
	},
	methods: {
		downloadClick () {
			let myCanvas = document.getElementById("qRcodeFixed").getElementsByTagName("canvas");
			let a = document.createElement("a");
			a.href = myCanvas[0].toDataURL("image/png");
			a.download = "fixed-link-qrcode";
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
		getUsableParams () {
			getUsableParams().then(res => {
				const { code, data } = res
				if (code === 0) {
					this.paramsList = data
				}
			})
		},
		genServerList (group) {
			if (group) {
				this.serverList = group.kefuList
			} else {
				this.serverList = []
			}
			this.server = null
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
			const serverLinkList = []
			let { groupId, server, domainList, serverList, customParams, recommendParams } = this
			if (!domainList) {
				return this.$message({
					message: this.$t('connectServer.fixed.tips.platform'),
					type: 'error'
				})
			}
			if (!groupId) {
				return this.$message({
					message: this.$t('connectServer.fixed.tips.group'),
					type: 'error'
				})
			}

			if (server) {
				serverList = [server]
			}

			const firstDomain = domainList.length ? domainList[0] : null
			const tempParams = [...customParams, ...recommendParams].map(params => `"${params}":""`).join(',')
			const params = tempParams ? `/custom_{${tempParams}}` : ''
      const ChatLog = this.chatRecord ? `` : '/NoChatLog_1'
      // const domain = 'https://www.aichatv7.com'.replace('v7', this.domain)
      const domain = process.env.VUE_APP_LINK.replace('v7', this.domain)

			if (firstDomain) {
				serverList.forEach(server => {
					serverLinkList.push({
						name: server.kefu_name,
						link: `${domain}/chat/client/seller_${firstDomain.seller_code}/server_${server.kefu_code}/domain_${firstDomain.domain_name}${params}${ChatLog}`
					})
				})
			}
			this.serverLinkList = serverLinkList
		}
	}
}
</script>

<style lang="scss" scoped>
.fixed {
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
	.w190 {
		width: 190px;
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
