<template>
	<div class="common-footer clearfix">
		<h2 class="title">{{$t('commonFooter.title')}}</h2>
		<div class="subTitle">{{$t('commonFooter.desc')}}</div>
		<router-link class="btn" to="/register">{{$t('commonFooter.btns[0]')}}</router-link>
	</div>
</template>

<script>
export default {
	name: 'ContactCustomerService'
}
</script>
<style lang="scss" scoped>
.common-footer {
	// height: 200px;
	background-size: 100%;
	background-position: center;
	background-image: url("/images/home/home_blue_bg.png");
	display: flex;
	flex-direction: column;
	align-items: center;
	padding: 16px 30px;
	.title {
		font-size: 30px;
		font-weight: bold;
		color: #fff;
	}
	.subTitle {
		font-weight: 500;
		color: #ffffff;
		font-size: 16px;
		line-height: 28px;
		margin: 16px 0 24px;
	}
	.btn {
		border: none;
		outline: none;
		width: 200px;
		height: 48px;
		background: #5fd28e;
		border-radius: 24px;
		display: flex;
		align-items: center;
		justify-content: center;
		font-size: 16px;
		color: #ffffff !important;
	}
}
@media (max-width: 750px) {
	.common-footer {
		// height: 200px;
		background-size: cover;
		background-position: center;
		background-image: url("/images/home/home_blue_bg.png");
		display: flex;
		flex-direction: column;
		align-items: center;
		padding: 16px 30px;
		.title {
			font-size: 20px;
			font-weight: bold;
			color: #fff;
			margin-top: 16px;
		}
		.subTitle {
			font-weight: 500;
			color: #ffffff;
			font-size: 14px;
			line-height: 28px;
			margin: 16px 0 24px;
		}
		.btn {
			border: none;
			outline: none;
			width: 200px;
			height: 40px;
			background: #5fd28e;
			border-radius: 24px;
			display: flex;
			align-items: center;
			justify-content: center;
			font-size: 14px;
			color: #ffffff !important;
		}
	}
}
</style>
