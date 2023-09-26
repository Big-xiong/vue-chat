<template>
	<div class="custom-container">
		<!-- 筛选器 -->
		<div class="filter-container">
			<el-input v-model="serverName" clearable class="filter-item mr10" style="width:200px" :placeholder="$t('server.search.placeholder.serverName')" />
			<el-select v-model="groupId" clearable class="filter-item mr10" :placeholder="$t('server.search.placeholder.serverGroup')">
				<el-option v-for="(group, index) in allGroupList" :key="index" :label="group.group_name" :value="group.group_id" />
			</el-select>
			<el-button v-waves class="filter-item" type="primary" @click="()=>{page=1;getServerList()}">
				<i class="material-icons-round fs-18 mr6">search</i>{{ $t('action.type.search') }}
			</el-button>
			<el-button v-waves class="filter-item" type="primary" @click="openDialog('add')">
				<i class="material-icons-round fs-18 mr6">add</i>{{ $t('action.type.add') }}
			</el-button>
		</div>

		<!-- 结果表格 -->
		<el-table v-loading="loading" :data="serverList" stripe :element-loading-text="$t('table.loading')">
			<el-table-column prop="kefu_code" :label="$t('server.table.serverCode')" align="center" />
			<el-table-column prop="kefu_username" :label="$t('server.table.userName')" align="center" />
			<el-table-column :label="$t('server.table.serverName')" align="center">
				<template slot-scope="{ row }">{{ row.kefu_name }}{{ row.type === 1 ? `(${$t('server.table.assist')})` : '' }}</template>
			</el-table-column>
			<el-table-column :label="$t('server.table.serverAvatar')" align="center">
				<img slot-scope="{row}" :src="`${baseUrl}${row.kefu_avatar}`" class="server-avatar">
			</el-table-column>
			<el-table-column prop="group_name" :label="$t('server.table.serverGroup')" align="center" />
			<el-table-column prop="max_service_num" :label="$t('server.table.maxServedNumber')" align="center" />
			<el-table-column :label="$t('server.table.serverStatus')" align="center">
				<el-tag slot-scope="{row}" size="small" :type="row.kefu_status==1 ? '' : 'info'">{{ row.kefu_status==1 ? $t('server.table.activated') : $t('server.table.prohibited') }}</el-tag>
			</el-table-column>
			<el-table-column :label="$t('server.table.onlineStatus')" align="center">
				<el-tag slot-scope="{row}" size="small" :class="
            row.online_status == 1
              ? 'online'
              : row.online_status == 3
                ? 'invisible'
                : 'offline'
          ">
					{{
            row.online_status == 1
              ? $t('server.table.online')
              : row.online_status == 3
                ? $t('server.table.invisible')
                : $t('server.table.offline')
          }}
				</el-tag>
			</el-table-column>
			<el-table-column :label="$t('action.label')" align="center" width="220">
				<template slot-scope="{row}">
					<!-- <el-button v-waves size="mini" type="primary" @click="loginServer(row)">
                        <i class="material-icons-round fs-14 mr6">assignment_ind</i>{{ $t('action.type.login') }}
                    </el-button> -->
					<el-button v-waves size="mini" type="primary" @click="openDialog('edit',row)">
						<i class="material-icons-round fs-14 mr6">drive_file_rename_outline</i>{{ $t('action.type.edit') }}
					</el-button>
					<el-button v-waves size="mini" type="danger" @click="deleteServer(row)">
						<i class="material-icons-round fs-14 mr6">delete_outline</i>{{ $t('action.type.delete') }}
					</el-button>
				</template>
			</el-table-column>
		</el-table>
		<pagination :total="total" :page.sync="page" :limit.sync="limit" @pagination="getServerList" />

		<!-- 新增、编辑弹窗 -->
		<form-dialog v-bind="dialog" :group-list="groupList" @visibleChange="dialog.visible = $event" @reloadServerList="reloadServerList" />
	</div>
</template>

<script>
import { getServerList, deleteServer } from '@/api/server.js'
import { getGroupList } from '@/api/group.js'
import formDialog from './formDialog.vue'
import { mapActions } from 'vuex'
export default {
	name: 'ServerList',
	components: { formDialog },
	data () {
		return {
			page: 1,
			limit: 20,
			serverName: '',
			groupId: '',
			total: 0,
			serverList: [],
			groupList: [],
			dialog: {
				type: '',
				title: '',
				serverType: '',
				visible: false,
				serverDetail: {}
			},
			loading: false,
			baseUrl: process.env.VUE_APP_BASE_URL
		}
	},
	computed: {
		allGroupList () {
			const groupList = JSON.parse(JSON.stringify(this.groupList))
			groupList.unshift({
				group_id: 'selectAll',
				group_name: '全部'
			})
			return groupList
		}
	},
	created () {
		this.getGroupList()
		this.getServerList()
	},
	methods: {
        ...mapActions({
			sellerServerLogin: 'auth/sellerServerLogin'
		}),
		getGroupList () {
			getGroupList({limit: 50}).then(res => {
				const { code, data } = res
				if (code === 0) {
					this.groupList = data
				}
			})
		},
		getServerList () {
			this.loading = true
			const { page, limit, serverName: kefu_name, groupId: group_id } = this
			getServerList({
				page, limit, kefu_name, group_id: group_id == 'selectAll' ? undefined : group_id
			}).then(res => {
				const { code, data, count } = res
				if (code === 0) {
					this.total = count
					this.serverList = data
				}
				this.loading = false
			})
		},
        loginServer(service){
            const { kefu_code } = service;
            this.sellerServerLogin({kefu_code}).then(res => {
                const { code, data, msg } = res
                if (code === 0) {
                    this.$router.push({
                        path: `/chat/server/${data.seller_code}`,
                        query:{
                            redirect:this.$route.fullPath
                        }
                    })
                    // 保存 会话设置
                    this.$store.commit('chatServer/setSessionConfig', {
                        sort: data.sort,
                        retain: data.retain
                    })
                } else {
                    this.$message.error(msg)
                }
            })
        },
		openDialog (type, group = {}) {
			const {
				kefu_username: userName,
				kefu_name: serverName,
				kefu_password: serverPwd,
				group_id: groupId,
				kefu_status: isActive,
				max_service_num: maxServedNumber,
				kefu_avatar: serverAvatar,
				kefu_id: serverId
			} = group
			const { groupList } = this
			let serverDetail
			if (group.type === 1) {
				// 助手
				serverDetail = type == 'edit'
					? { id: serverId, userName, nickName: serverName, password: '', isActive, avatar: serverAvatar }
					: { userName: '', nickName: '', password: '', isActive: 1, avatar: '/img/server-avatar/default.png' }
			} else {
				// 客服
				serverDetail = type == 'edit'
					? { userName, serverName, serverPwd: '', groupId: groupId.split(',').map(id => id * 1), isActive, maxServedNumber, serverAvatar, serverId }
					: { userName: '', serverName: '', serverPwd: '', groupId: groupList[0] ? [groupList[0].group_id] : [], isActive: 1, maxServedNumber: '10', serverAvatar: '/img/server-avatar/default.png', serverId: undefined }
			}
			this.dialog = {
				type, visible: true, serverDetail,
				serverType: group.type === 1 ? 'assist' : 'server',
				title: type == 'edit' ? this.$t('server.form.editTitle') : this.$t('server.form.addTitle')
			}
		},
		reloadServerList () {
			if (this.dialog.type == 'add') {
				this.page = 1
			}
			this.getServerList()
		},
		deleteServer (server) {
			const h = this.$createElement;
			this.$confirm(this.$t('server.delete.message', { serverName: server.kefu_name }), this.$t('server.delete.tips'), {
				confirmButtonText: this.$t('server.delete.confirm'),
				cancelButtonText: this.$t('server.delete.cancel'),
				dangerouslyUseHTMLString: true,
				message: h('p', [
					h('svg-icon', {
						props: {
							iconClass: 'warning'
						}
					}),
					h('span', this.$t('server.delete.message', { serverName: server.kefu_name }))
				])
			}).then(() => {
				deleteServer({
					kefu_id: server.kefu_id
				}).then(res => {
					const { code, msg } = res
					const success = code === 0
					if (success) {
						if (this.page > 1 && this.serverList.length === 1) {
							this.page--
						}
						this.getServerList()
					}
					this.$notify({
						message: msg,
						title: success ? this.$t('notify.success') : this.$t('notify.fail'),
						type: success ? 'success' : 'error'
					})
				})
			})
		}
	}
}
</script>

<style lang="scss" scoped>
.server-avatar {
	width: 28px;
	height: 28px;
	border-radius: 50%;
}
.online {
	background-color: #eaf3fc;
	border-color: #d4e6fa;
	color: #5082f4;
}
.offline {
	background-color: #f4f4f5;
	border-color: #e9e9eb;
	color: #909399;
}
.invisible {
	background-color: #eaf3fc;
	border-color: #d4e6fa;
	color: #ffc300;
}
</style>
