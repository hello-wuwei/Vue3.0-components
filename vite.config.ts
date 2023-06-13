import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { resolve } from 'path'
import { svg } from './vite-plugins/vite-plugin-svg'
import { VitePluginFonts } from 'vite-plugin-fonts'
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'
import { setupName } from './vite-plugins/vite-plugin-setup-name'
import allImport from './vite-plugins/vite-plugin-all-import'
// https://vitejs.dev/config/

export default defineConfig((cfg) => {
  console.log(cfg.command)
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
      }),
      Components({
        resolvers: [ElementPlusResolver()],
      }),
    ]
  }
  return {
    resolve: {
      alias: {
        '@': resolve('src'),
      },
    },
    build: {
      rollupOptions: {
        // https://rollupjs.org/guide/en/#outputmanualchunks
        output: {
          manualChunks(id) {
            if (id.includes('node_modules')) {
              // Return the directory name following the last `node_modules`.
              // Usually this is the package, but it could also be the scope.
              const dirs = id.split('/')
              return dirs[dirs.lastIndexOf('node_modules') + 1]
            }
            if (
              ['search-results-view/tx-index.vue', 'search-results-view/index.vue', 'kyt/index.vue'].find((it) =>
                id.includes(it)
              )
            ) {
              return 'group-kyt'
            }
            if (id.toLowerCase().includes('/index.vue')) {
              return /[^/]+(?=\/index.vue)/i.exec(id)[0]
            }
          },
          chunkFileNames: 'js/[name]-[hash].js', // 引入文件名的名称
          entryFileNames: 'js/[name]-[hash].js', // 包的入口文件名称
          assetFileNames: '[ext]/[name]-[hash].[ext]', // 资源文件像 字体，图片等

          terserOptions: {
            compress: {
              //生产环境时移除console
              drop_console: true,
              drop_debugger: true,
            },
          },
          //   关闭文件计算
          reportCompressedSize: false,
          //   关闭生成map文件 可以达到缩小打包体积
          sourcemap: false, // 这个生产环境一定要关闭，不然打包的产物会很大
        },
      },
    },
    server: {
      host: 'localhost',
      port: 5173,
      proxy: {
        '/network': {
          target: 'https://beosin.obs.cn-east-3.myhuaweicloud.com',
          changeOrigin: true,
          rewrite(path) {
            return 'https://beosin.obs.cn-east-3.myhuaweicloud.com' + path.split('network')[1]
          },
          ws: true,
        },
      },
    },
    plugins: [
      setupName(),
      vue(),
      ...plugins,
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
    css: {
      preprocessorOptions: {
        scss: {
          additionalData: `
        @import "@/assets/styles/variables.scss";
      `,
          charset: false,
        },
      },
    },
  }
})
