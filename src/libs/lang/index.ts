import { App, getCurrentInstance, ref, Ref } from 'vue'
import { LanguageEnum } from '@/constants/language'
import Lang from './Lang.vue'
import json from './lang.json'

type Objects = { [key: string]: string }
export type LangMapProps = Partial<Record<LanguageEnum, string>>
type LangProps = (text: any, formats?: Objects) => string

const map: { [key: string]: LangMapProps } = json

export const useLang = () => {
  const instance = getCurrentInstance()
  const language: Ref<LanguageEnum> = instance?.appContext.config.globalProperties.language
  const languages: OptionsProps['languages'] = instance?.appContext.config.globalProperties.languages
  const lg = instance?.appContext.config.globalProperties.$lg as LangProps
  return { language, lg, languages }
}

type OptionsProps = {
  default?: LanguageEnum
  languages: { label: string; value: string }[]
}

// 替换占位变量函数

const replaceKeys = (text: string, formats?: Objects) => {
  if (!formats) return text
  const keys = Object.keys(formats)
  for (let i = 0; i < keys.length; i++) {
    text = text.replace(`{${keys[i]}}`, formats[keys[i]])
  }
  return text
}

const createLang = (options: OptionsProps) => {
  const { languages } = options
  return {
    install(app: App) {
      app.config.globalProperties.language = ref(options.default || 'en-US') as Ref<LanguageEnum>
      app.config.globalProperties.languages = languages as OptionsProps['languages']
      app.config.globalProperties.$lg = ((text, formats?: Objects) => {
        if (typeof text !== 'string') return ''
        text = text.trim()
        const language: Ref<LanguageEnum> = app.config.globalProperties.language
        // if (langs && langs[language.value]) return langs[language.value]
        if (!map[text] || !language.value) return replaceKeys(text, formats)
        return replaceKeys(map[text][language.value] || text, formats)
      }) as LangProps

      // eslint-disable-next-line vue/multi-word-component-names, vue/component-definition-name-casing
      app.component('lang', Lang)
    },
  }
}

declare module 'vue' {
  export interface ComponentCustomProperties {
    $lg: LangProps
  }
}

export default createLang
