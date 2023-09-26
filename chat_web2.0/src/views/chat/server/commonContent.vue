<template>
	<div class="common-content">
		<div v-if="chat.includeImg" :class="['common', chat.type]">
			<template v-for="(item, index) in chat.content">
				<template v-if="item.isImg">
					<viewer :key="index" :images="[item.src]">
						<img v-for="(src, index) in [item.src]" :key="index" :src="item.src" class="img" style="cursor:pointer">
					</viewer>
				</template>
				<span v-else :key="index" v-html="unescape(item)"></span>
			</template>
			<img v-show="chat.avatar" class="avatar" :src="chat.avatar" />
		</div>
		<template v-else>
			<!-- <div :class="['common-lang', chat.type]" v-if="chat.lang && chat.lang !== chat.content && chat.type === 'customer'" v-html="chat.lang" /> -->
			<div :class="['common-lang', chat.type]" v-if="chat.lang && chat.lang !== chat.content" v-html="chat.content" />
			<div :class="['common', chat.type]">
				<!-- <div v-if="chat.type === 'customer'" class="content-word" v-html="chat.content" /> -->
				<div class="content-word" v-html="chat.lang || chat.content" />
				<img v-show="chat.avatar" class="avatar" :src="chat.avatar" />
			</div>
		</template>
	</div>
</template>

<script>
import { unescape } from 'html-escaper'
import { mapState } from 'vuex'
import md5 from 'js-md5';
export default {
	computed: {
		...mapState({
			chatLang: state => state.chatServer.chatLang,
		}),
	},
	props: {
		chat: {
			type: Object,
			default: () => ({})
		},
	},
    data(){
        return {
            langMap: {
				'zh-cn': {
					lang: this.$t('navbar.zh'),
					key: 'zh-cn',
                    bdTranslateKey:'zh'
				},
				en: {
					lang: this.$t('navbar.en'),
					key: 'en',
                    bdTranslateKey:'en'
				},
				vi: {
					lang: this.$t('navbar.vi'),
					key: 'vi',
                    bdTranslateKey:'vie'
				},
				th: {
					lang: this.$t('navbar.th'),
					key: 'th',
                    bdTranslateKey:'th'
				},
        ms: {
            lang: this.$t('navbar.ms'),
					key: 'ms',
                    bdTranslateKey:'ms'
        }
			},
        }
    },
	watch: {
		chat: {
			async handler (v) {
				if (!v.includeImg) {
					v.content = unescape(v.content)
					if (v.type === 'customer') {
						let target = null
						if (this.chatLang !== 'close') {
                const api_key = 'AIzaSyBasriCvTd52vBxq5gXtd5wXuHKnjvtI5U'
                fetch(`https://translation.googleapis.com/language/translate/v2?target=${this.chatLang}&key=${api_key}&q=${v.content}`)
                .then(res => res.json())
                .then(data => {
                    const { data:{translations} } = data
                    target = translations[0].translatedText
                    v.lang = target || null
						        this.$emit('update:chat', v);
                })
                    // target = await this.$translate(v.content, { to: this.chatLang, tld: 'com' })
                    // target = await this.bdTranslate({query:v.content, to: this.langMap[this.chatLang].bdTranslateKey })
						}
					}

					const httpReg = new RegExp("(http(s)?:\/\/)?(www\.)?[a-zA-Z\\.\\-]+\\.([a-zA-Z]{2,4})(:\\d+)?(/[a-zA-Z0-9\\.\\-~!@#$%^&amp;*+?:_/=<>]*)?", "gi");
					const flvReg = /\.(zip|rar|txt|doc|docx|xls|xlsx|mp4|3gp|avi|mkv|flv|mov|MOV|jpg|png|gif|jpeg|wav)/gi
					// 判断聊天内容是否包含链接
					if (httpReg.test(v.content) && !v.content.includes('</a>')) {
						if (v.content.includes('<br>')) v.content = v.content.replace('<br>', ' ')
						if (!flvReg.test(v.content)) {
							v.content = v.content.replace(httpReg, (res) => {
								return `<a href='${res.includes('https') ? res : `https://${res}`}' target='_blank'>${res}</a>`
							})
						}
						// v.content = v.content.replace(httpReg,(res) => {
						//   return `<a href='${res.includes('https')?res:`https://${res}`}' target='_blank'>${res}</a>`
						// })
					}
				}
			},
			immediate: true
		}
	},
    methods:{
      unescape,
        // 百度翻译
        async bdTranslate({query,to}){
            let appid = '20220928001357940';
            let key = "B9Czga1xR0vb40vUD7YO";
            let salt = new Date().getTime();
            let from = "auto";
            let str1 = appid + query + salt + key;
            let sign = md5(str1);
            let data = {
                q: query,
                appid: appid,
                salt: salt,
                from: from,
                to: to,
                sign: sign
            }
            const response = await this.$jsonp('https://api.fanyi.baidu.com/api/trans/vip/translate',{
                q: query,
                appid: appid,
                salt: salt,
                from: from,
                to: to,
                sign: sign
            },{
                callbackQuery:'callbackParam', //一定要加这两个参数
                callbackName:'jsonpCallback' //一定要加这两个参数,要不然会报错 导致代码阻塞
            })
            let res = response.trans_result.map(v => {
                return v.dst
            })
            return res.join('<br>')
        },
    }
}
</script>

<style lang="scss" scoped>
.common-content {
	display: inline-block;
}
.common {
	word-wrap: break-word;
	border-radius: 16px;
	max-width: 452px;
	min-height: 14px;
	padding: 8px 24px;
	position: relative;
	text-align: left;
	&.customer {
		border-radius: 0px 10px 10px 10px;
		color: var(--chat-server-card-input);
		background: var(--chat-server-content-bg);
		.avatar {
			left: -64px;
		}
	}
	&.server {
		background: #28324c;
		border-radius: 10px 0 10px 10px;
		.avatar {
			right: -64px;
		}
	}
	.content-word {
		margin: 0;
		::v-deep a {
			text-decoration: underline !important;
		}
		// color: #fff;
	}
	.avatar {
		position: absolute;
		z-index: 1;
		width: 44px;
		height: 44px;
		border-radius: 50%;
		top: 0;
	}
}

.common-lang {
	background: var(--chat-server-content-bg);
	border-radius: 10px 10px 10px 0;
	color: var(--chat-server-card-input);
	word-wrap: break-word;
	color: #466ac9;
	max-width: 452px;
	min-height: 14px;
	padding: 8px 24px;
	position: relative;
	text-align: left;
	margin-bottom: 4px;
  &.server{
    border-radius: 10px 10px 0 10px;
  }
}
</style>
