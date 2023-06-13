/// <reference types="vite/client" />
/// <reference types="element-plus/global" />
declare module '*.vue' {
  import type { DefineComponent } from 'vue'
  const component: DefineComponent<{}, {}, any>
  export default component
}

declare interface ImportMetaEnv {
  readonly VITE_BASE: string
  readonly VITE_API_BASEURL: string
  readonly VITE_APP_TITLE: string
  // 更多环境变量...
}

declare interface ImportMeta {
  readonly env: ImportMetaEnv
}
// declare interface Window {
// extend the window
// }
