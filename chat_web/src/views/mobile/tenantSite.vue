<template>
	<el-dialog class="tenant-site" :title="$t('tenantSite.title')" :visible="visible" :close-on-click-modal="true" @close="$emit('update:visible',false)" append-to-body>
		<div class="info">{{$t('tenantSite.info')}}</div>
		<div class="link">
			<span style="color:teal">{{this.link}}</span>
			<el-button style="margin-left:10px;" size="mini" type="text" @click="clickCopy()">
				<i class="el-icon-copy-document"></i>{{$t('tenantSite.copy')}}
			</el-button>
		</div>
		<span slot="footer" class="dialog-footer">
			<el-button size="medium" @click="$emit('update:visible',false)">{{$t('tenantSite.button[0]')}}</el-button>
			<el-button size="medium" type="primary" @click="handleConfirm">{{$t('tenantSite.button[1]')}}</el-button>
		</span>
	</el-dialog>
</template>

<script>
export default {
	name:'tenantSite',
	props: {
		visible: false
	},
	data() {
		return {
			link:'https://im.aichat365.com'
		}
	},
	methods: {
		handleConfirm(){
			let token = window.localStorage.getItem('sellerToken')
			let data = window.btoa(window.localStorage.getItem('sellerData'))
			window.location.href = `${this.link}?token=${token}&data=${data}`
		},
		clickCopy(){
			this.$copyText(this.link).then((e) => {
				this.$message.success('复制成功')
			},(e) => {
				this.$message.success('复制失败')
			})
		}
	}
}
</script>

<style lang="scss">
.el-dialog{
	width: 88%;
}
</style>
