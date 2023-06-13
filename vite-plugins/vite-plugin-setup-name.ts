import { Plugin } from 'vite'

export const setupName = (): Plugin => {
  return {
    name: 'setup-add-name',
    enforce: 'pre',
    transform(code, id) {
      if (!id.endsWith('.vue')) {
        return code
      }

      const match = code.match(/<script\s+.*name=('|")(.+?)('|")/)
      const lang = code.match(/<script\s+.*lang=('|")(.+?)('|")/)
      if (match) {
        return code + `<script lang="${lang?.[2]}">export default {name: "${match[2]}"}</script>`
      }
      return code
    },
  }
}
