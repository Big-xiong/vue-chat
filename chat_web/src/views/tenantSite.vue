<template>
	<el-dialog class="tenant-site" :title="$t('tenantSite.title')" :visible.sync="visible" :close-on-click-modal="true" @close="$emit('update:visible',false)" append-to-body>
		<div class="info">{{$t('tenantSite.info')}}</div>
		<div class="link">
			<div class="link-text" style="color:teal">{{this.link}}</div>
			<el-button style="margin-left:10px;" size="mini" type="text" @click="clickCopy()">
				<i class="el-icon-copy-document"></i>{{$t('tenantSite.copy')}}
			</el-button>
		</div>
		<span slot="footer" class="dialog-footer">
			<el-button size="medium" @click="hideDialog">{{$t('tenantSite.button[0]')}}</el-button>
			<el-button size="medium" type="primary" @click="clickCopy">{{$t('tenantSite.button[1]')}}</el-button>
		</span>
	</el-dialog>
</template>

<script>
import { mapState } from 'vuex'
export default {
	name: 'tenantSite',
	data () {
		return {
			visible: false,
			link: process.env.VUE_APP_BASE_URL
		}
	},
	computed: {
		...mapState("basic", ["token", "userInfo"]),
	},
	methods: {
		hideDialog () {
			this.visible = false
		},
		show () {
			let data = JSON.stringify(this.userInfo)
			this.link = `${process.env.VUE_APP_BASE_URL}?token=${this.token}&data=${data}`
			this.visible = true
		},
		clickCopy () {
			this.$copyText(this.link).then(() => {
				this.$message.success('复制成功')
			}, () => {
				this.$message.success('复制失败')
			})
		}
	}
}
</script>

<style lang="scss">
.tenant-site {
	.el-dialog {
		width: 88%;
		.link {
			.link-text {
				overflow: hidden;
				text-overflow: ellipsis;
				white-space: nowrap;
			}
		}
	}
}
</style>
