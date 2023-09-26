<template>
	<el-dialog :title="$t('sound.title')" :visible.sync="dialogVisible" class="sound-dialog">
		<div class="content-top">
			<span>{{ $t('sound.current') }}</span>
			<span class="name">{{value}}</span>
            <span v-if="!play" class="material-icons-round" @click="playSound">play_circle</span>
            <span v-if="play" class="material-icons-round" @click="stopSound">stop_circle</span>
		</div>
		<el-select v-model="value" :placeholder="$t('sound.placeholder')" @change="handleChange">
			<el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value"></el-option>
		</el-select>
		<span slot="footer">
			<el-button @click="dialogVisible = false">{{ $t('action.type.cancel') }}</el-button>
			<el-button type="primary" @click="submitHandler">{{ $t('action.type.confirm') }}</el-button>
		</span>
        <audio ref="sound" :src="`/audio/${value}`"></audio>
	</el-dialog>
</template>

<script>
import { setKfsound } from "@/api/chatServer";
import { eventBus } from './eventBus.js'
export default {
    data(){
        return {
            eventBus,
            play:false,
            dialogVisible:false,
            value:'',
            options:[
                {
                    label:this.$t('sound.audios[0]'),
                    value:'default.wav'
                },
                {
                    label:this.$t('sound.audios[1]'),
                    value:'sound1.wav'
                },
                {
                    label:this.$t('sound.audios[2]'),
                    value:'sound2.wav'
                },
                {
                    label:this.$t('sound.audios[3]'),
                    value:'sound3.wav'
                },
                {
                    label:this.$t('sound.audios[4]'),
                    value:'sound4.wav'
                },
                {
                    label:this.$t('sound.audios[5]'),
                    value:'sound5.mp3'
                },
                {
                    label:this.$t('sound.audios[6]'),
                    value:'sound6.mp3'
                }
            ]
        }
    },
    methods:{
        show(params){
            this.value = params.sound || 'default.wav'
            this.dialogVisible = true
        },
        playSound(){
            this.play = true;
            this.$refs.sound.play()
            this.$refs.sound.addEventListener('ended', () => {  
                this.play = false;
            }, false);
        },
        stopSound(){
            this.play = false;
            this.$refs.sound.pause()
        },
        handleChange(){
            this.play = false;
            this.$refs.sound.pause()
        },
        submitHandler(){
            let params = {
                sound:this.value
            }
            setKfsound(params).then(res => {
                const success = res.code === 0
				this.$notify({
					title: success ? this.$t('notify.success') : this.$t('notify.fail'),
					type: success ? 'success' : 'error',
					message: success ? this.$t('chatServer.userInfo.update.success') : this.$t('chatServer.userInfo.update.fail')
				})
				if (success) {
                    eventBus.$emit('changeSound',this.value)
					this.dialogVisible = false
				}
            })
        }
    }
}
</script>

<style lang="scss">
.sound-dialog{
    .el-dialog{
        width: 60%;
        max-width: 500px;
    }
    .content-top{
        display: flex;
        align-items: center;
        margin-bottom: 20px;
        .name{
            margin-right: 10px;
        }
        .material-icons-round{
            cursor: pointer;
            color: var(--el-btn-primary-bg);
        }
    }
}
@media screen and (max-width: 600px) {
    .sound-dialog{
        .el-dialog{
            width: 80%;
        }
    }
}
</style>
