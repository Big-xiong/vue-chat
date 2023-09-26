<template>
	<div class="steps">
		<div class="step" v-for="(item,index) in stepNumber" :key="index" :class="{'active':active >= index}">
			<div v-if="index" class="line"></div>
			<div class="step-item">{{item}}</div>
		</div>
	</div>
</template>

<script>
export default {
	props: {
		stepNumber: {
			type: Number,
			default: 2
		},
		active: {
			type: Number,
			default: 0
		}
	}
}
</script>
<style lang="scss">
.steps {
	display: flex;
	align-items: center;
	.step {
		display: flex;
		align-items: center;
		&.active {
			.line {
				border-top: 1px dashed #3b5ff5;
			}
			.step-item {
				background: #3b5ff5;
				opacity: 1;
				color: #fff;
			}
		}
		.line {
			width: 190px;
			height: 1px;
			border-top: 1px dashed #e7ebf2;
		}
		.step-item {
			width: 30px;
			height: 30px;
			background: #a8afc3;
			opacity: 0.16;
			color: #72798c;
			font-size: 14px;
			display: flex;
			align-items: center;
			justify-content: center;
			border-radius: 50%;
		}
	}
}
@media (max-width: 750px) {
	.steps {
		display: flex;
		align-items: center;
		.step {
			display: flex;
			align-items: center;
			&.active {
				.line {
					border-top: 1px dashed #3b5ff5;
				}
				.step-item {
					background: #3b5ff5;
					opacity: 1;
					color: #fff;
				}
			}
			.line {
				width: 20vw;
				height: 1px;
				border-top: 1px dashed #e7ebf2;
			}
			.step-item {
				width: 30px;
				height: 30px;
				background: #a8afc3;
				opacity: 0.16;
				color: #72798c;
				font-size: 14px;
				display: flex;
				align-items: center;
				justify-content: center;
				border-radius: 50%;
			}
		}
	}
}
</style>