<template>
    <el-dialog :title="$t('google.title')" :visible.sync="dialogVisible" class="google-dialog">
        <div class="google-content">
            <div class="label">{{$t('google.label')}}</div>
            <div class="input-content" @click="$refs.inputRef.focus()">
                <span class="input-items" :class="{'active': codeValue.length == index || (codeValue.length == 6 && index == 5)}" v-for="(item,index) in 6" :key="index">{{codeValue.split('')[index]}}</span>
            </div>
            <el-input ref="inputRef" @input="codeValue=codeValue.replace(/[^\d]/g,'')" maxlength="6" v-model="codeValue"></el-input>
        </div>
         <div slot="footer" class="dialog-footer">
            <el-button type="primary" @click="handleSubmit">{{$t('google.btn')}}</el-button>
        </div>
    </el-dialog>
</template>
<script>
import { checkGoogle } from '@/api/auth'
import { mapMutations } from 'vuex'
import { setTheme } from '@/utils/theme'
export default {
    name:'GoogleModal',
    data(){
        return {
            codeValue: '',
            dialogVisible:false,
            token:'',
            userInfo:null,
            secret:'',
            from:''
        }
    },
    created(){
        setTheme('light')
    },
    methods:{
        ...mapMutations({
			setToken: 'auth/setToken',
			setSeller: 'auth/setSeller',
            setServerToken: 'auth/setServerToken',
			setServer: 'auth/setServer'
		}),
        show(obj){
            const { token, userInfo, from } = obj
            this.token = token
            this.userInfo = userInfo
            this.secret = userInfo.secret
            this.from = from
            this.dialogVisible = true
            this.$nextTick(() => {
                this.$refs.inputRef.focus()
            })
        },
        handleSubmit(){
            if(!this.codeValue){
                this.$message.error(this.$t('sellerLogin.tips.captcha'))
                return
            }
            let params = {
                secret:this.secret,
                code:this.codeValue
            }
            checkGoogle(params).then(res => {
                const { code, data } = res
                if(code === 0 && data == 'SUCCESS'){
                    this.dialogVisible = false
                    if(this.from == 'seller'){
                        // 商户端
                        this.setToken(this.token)
                        this.setSeller(this.userInfo)
                        this.$router.push({ path: '/' })
                    }else if(this.from == 'server'){
                        // 客服端
                        this.setServerToken(this.token)
						this.setServer(this.userInfo)
                        this.$router.push({ path: `/chat/server/${this.userInfo.seller_code}` })
                        // 保存 会话设置
                        this.$store.commit('chatServer/setSessionConfig', {
                            sort: this.userInfo.sort,
                            retain: this.userInfo.retain
                        })
                    }
                }else{
                    this.$message.error(data)
                }
            })
        }
    }
}
</script>

<style lang="scss">
.google-dialog{
    .el-dialog{
        width: 30%;
    }
}
.google-content{
    display: flex;
    flex-direction: column;
    align-items: center;
    .el-input{
        position: fixed;
        left: -2000px;
        top: -2000px;
    }
    .label{
        margin-bottom: 20px;
    }
    .input-content{
        width: 100%;
        display: flex;
        align-items: center;
        .input-items{
            font-size: 24px;
            border-bottom: 1px solid var(--el-input-border);
            height: 30px;
            flex: 1;
            margin: 0 5px;
            display: flex;
            align-items: center;
            justify-content: center;
            &.active{
                border-color:var(--el-btn-primary-bg)
            }
        }
    }
}
@media screen and (max-width: 600px) {
    .google-dialog{
        .el-dialog{
            width: 80%;
        }
    }
}
</style>