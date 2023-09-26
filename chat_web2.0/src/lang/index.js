import Vue from 'vue'
import VueI18n from 'vue-i18n'
Vue.use(VueI18n)

import zhLocale from './zh'
import enLocale from './en'
import viLocale from './vi'
import thLocale from './th'
import elementZhLocale from 'element-ui/lib/locale/lang/zh-CN'// element中文包
import elementEnLocale from 'element-ui/lib/locale/lang/en' // element英文包
import elementViLocale from 'element-ui/lib/locale/lang/vi'// element越南包
import elementThLocale from 'element-ui/lib/locale/lang/th'// element越南包

const messages = {
    zh: {
        ...zhLocale,
        ...elementZhLocale
    },
    en: {
        ...enLocale,
        ...elementEnLocale
    },
    vi: {
        ...viLocale,
        ...elementViLocale
    },
    th: {
        ...thLocale,
        ...elementThLocale
    }
}

export function getLanguage() {
    const chooseLanguage = sessionStorageCompatible.getItem('lang')
    if (chooseLanguage) return chooseLanguage

    // if has not choose language
    const language = (navigator.language || navigator.browserLanguage).toLowerCase()
    const locales = Object.keys(messages)
    for (const locale of locales) {
        if (language.indexOf(locale) > -1) {
            return locale
        }
    }
    return 'en'
}

const i18n = new VueI18n({
    locale: getLanguage(),
    messages
})

export default i18n
