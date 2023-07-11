import { defineConfig } from 'vite'
import Vue from '@vitejs/plugin-vue'
import { resolve } from 'path'
import { svg } from './vite-plugins/vite-plugin-svg'
import { VitePluginFonts } from 'vite-plugin-fonts'
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'
import { setupName } from './vite-plugins/vite-plugin-setup-name'
import allImport from './vite-plugins/vite-plugin-all-import'
// import WindiCSS from 'rollup-plugin-windicss'
// https://vitejs.dev/config/

export default defineConfig((cfg) => {
  let plugins = [
    AutoImport({
      imports: ['vue', 'vue-router'],
    }),
    allImport(),
  ]
  if (cfg.command === 'build') {
    plugins = [
      AutoImport({
        imports: ['vue', 'vue-router'],
        resolvers: [ElementPlusResolver()],
        ignore: ['h'],
      }),
      Components({
        resolvers: [ElementPlusResolver()],
      }),
    ]
  }
  return {
    build: {
      lib: {
        entry: resolve(__dirname, 'src/components/graph/index.ts'),
        // 组件库名字
        name: 'graph',
        fileName: () => `index.js`,
        // 输出格式
        formats: ['es'],
      },
      outDir: resolve(__dirname, 'src/lib/graph'),
      emptyOutDir: false,
      rollupOptions: {
        //忽略打包vue文件
        external: ['@antv/g6'],
      },
    },

    plugins: [
      setupName(),
      Vue(),
      // ...plugins,
      svg({ dir: resolve('src/assets/svg'), prefix: 'svg' }),
      VitePluginFonts({
        google: {
          families: [
            {
              name: 'Poppins',
              styles: 'wght@400',
              defer: true,
            },
            {
              name: 'Poppins',
              styles: 'wght@600',
              defer: true,
            },
            {
              name: 'Poppins',
              styles: 'wght@500',
              defer: true,
            },
          ],
        },
      }),
    ],
  }
})
