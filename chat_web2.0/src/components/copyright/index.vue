<template>
	<el-drawer :title="$t('navbar.versionInfo.title')" class="copyright" size="300px" :visible="visible" :modal-append-to-body="false" @close="$emit('update:visible',false)">
		<div class="inner">
			<div class="version">{{ $t('navbar.versionInfo.curVersion') }}</div>
			<div class="mt20">{{ $t('navbar.versionInfo.versionTitle') }}</div>
			<div class="content" v-html="$t('navbar.versionInfo.versionContent')" />
			<div class="bottom">© 2020 <a href="https://www.aichating.com" target="_blank">www.aichating.com</a> {{ $t('navbar.versionInfo.reserved') }}</div>
		</div>
	</el-drawer>
</template>

<script>
export default {
	props: {
		visible: {
			type: Boolean,
			default: false
		}
	}
}
</script>

<style lang="scss" scoped>
.copyright {
	.inner {
		padding: 15px 20px 20px;
		line-height: 22px;
		font-size: 14px;
		color: var(--navbar-copyright-title);
		.version {
			margin-bottom: 24px;
			// color: var(--navbar-copyright-content);
			color: #5fca8b;
		}
		::v-deep.content {
			// padding: 15px;
			margin: 10px 0;
			line-height: 22px;
			border-radius: 2px;
			background-color: var(--navbar-copyright-bg);
			color: var(--navbar-copyright-content);
			> div {
				margin-bottom: 16px;
				text-align: justify;
			}
		}
		.bottom {
			color: var(--navbar-copyright-content);
			a {
				color: #01aaed;
			}
		}
	}
	::v-deep.el-drawer__body {
		overflow-y: scroll;
		.mt20 {
			border-bottom: 1px solid var(--navbar-copyright-border);
			padding-bottom: 14px;
			margin-bottom: 20px;
		}
	}
	::v-deep.el-drawer__header {
		padding: 15px 20px 10px;
		// border-bottom: 1px solid var(--navbar-copyright-border);
		margin-bottom: 0;
		color: var(--navbar-copyright-title);
		font-size: 16px;
	}
}
::v-deep :focus {
	outline: 0;
}
</style>
