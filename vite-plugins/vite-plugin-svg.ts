import * as fs from 'fs'
import { resolve } from 'path'
import { Plugin } from 'vite'
type Options = {
  prefix: string
  dir: string
}

export const svg = ({ prefix = 'svg', dir }: Options): Plugin => {
  const idPrefix = 'virtual:' + Math.random()

  const toSameName = (id: string) => {
    // 首字母大写，-x转换为X
    id = id.replace(/-[a-z]/g, (v) => {
      return v[1]?.toUpperCase() || ''
    })
    return id[0].toUpperCase() + id.substring(1)
  }
  prefix = toSameName(prefix)
  const svgMap = new Map<string, string>()
  const loadSvg = (svgId) => {
    const svg = svgMap.get(svgId)
    if (!svg) console.error('not found svg:' + svg)
    return `<template>
        ${svg}
        </template>
        <script>
        export default {
            name: ${JSON.stringify(svgId)},
        }
        </script>`
  }

  const getSvgs = () => {
    const svgs = fs.readdirSync(dir)
    svgs.forEach((it) => {
      if (it.endsWith('.svg')) {
        const str = fs
          .readFileSync(resolve(dir, it), 'utf8')
          .replace(
            /(^.*?(?=<svg)|<style[\s\S]*<\/style>|<script[\s\S]*<\/script>|<title[\s\S]*<\/title>|<\?xml.+)/gi,
            ''
          )
        svgMap.set(toSameName(it.replace(/\.svg$/, '')), str)
      }
    })
  }
  getSvgs()

  return {
    configResolved(cfg) {
      if (cfg.command === 'serve') {
        fs.watch(resolve(dir), () => {
          svgMap.clear()
          getSvgs()
        })
      }
    },
    name: 'svg:transform',
    resolveId(id: string) {
      // console.log('resolve', id)
      if (id.startsWith(idPrefix)) {
        return id
      }
    },
    load(id: string) {
      if (!id.startsWith(idPrefix)) return
      // console.log('load', id)

      const svgId = id.replace(idPrefix + ':', '').replace(/\.vue$/, '')

      if (svgMap.has(svgId)) {
        return loadSvg(svgId)
      }
    },
    transform(code, id) {
      if (!id) return code

      if (!id.endsWith('.vue') && !id.endsWith('.tsx') && !id.endsWith('.jsx') && !id.endsWith('lang.ts')) return code
      const set = new Set<string>()
      let imports = ''
      code = code.replace(/_resolveComponent\("(.+?)"\)/g, (v, c) => {
        let s = toSameName(c)
        if (!s.startsWith(prefix)) return v
        s = s.replace(prefix, '')
        if (!set.has(s)) {
          imports += `\nimport ${s} from "${idPrefix}:${s}.vue"`
          set.add(s)
        }
        return s
      })
      return code + imports
    },
  }
}
