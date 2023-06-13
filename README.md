# Vue 3 + TypeScript + Vite

This template should help get you started developing with Vue 3 and TypeScript in Vite. The template uses Vue 3 `<script setup>` SFCs, check out the [script setup docs](https://v3.vuejs.org/api/sfc-script-setup.html#sfc-script-setup) to learn more.

## Recommended IDE Setup

- [VS Code](https://code.visualstudio.com/) + [Volar](https://marketplace.visualstudio.com/items?itemName=Vue.volar)

## Type Support For `.vue` Imports in TS

Since TypeScript cannot handle type information for `.vue` imports, they are shimmed to be a generic Vue component type by default. In most cases this is fine if you don't really care about component prop types outside of templates. However, if you wish to get actual prop types in `.vue` imports (for example to get props validation when using manual `h(...)` calls), you can enable Volar's Take Over mode by following these steps:

1. Run `Extensions: Show Built-in Extensions` from VS Code's command palette, look for `TypeScript and JavaScript Language Features`, then right click and select `Disable (Workspace)`. By default, Take Over mode will enable itself if the default TypeScript extension is disabled.
2. Reload the VS Code window by running `Developer: Reload Window` from the command palette.

You can learn more about Take Over mode [here](https://github.com/johnsoncodehk/volar/discussions/471).

# 埋点事件名称说明

### 登录

| 事件 | 事件名 | 参数 |
| :--: | :----: | :--: |
| 登录 | login  |  -   |
| 登出 | logout |  -   |

### 首页

|     事件     |     事件名     | 参数 |
| :----------: | :------------: | :--: |
|  去告警列表  | alert_overview |  -   |
| 更多告警按钮 |   more_alert   |  -   |

### kyt

|          事件           |        事件名         |                参数                 |
| :---------------------: | :-------------------: | :---------------------------------: |
|          搜索           |      kyt_search       | type: address(地址)/tx(交易); chain |
|     评分页切换币种      |   kyt_switch_token    |                token                |
| 评分页跳转 path_tracing | kyt_view_path_tracing |                  -                  |

### monitor

|      事件      |     事件名     | 参数 |
| :------------: | :------------: | :--: |
|    删除监控    | monitor_delete |  -   |
| 激活、禁用监控 | monitor_switch |  -   |
|    创建监控    | monitor_create |  -   |
|    编辑监控    |  monitor_edit  |  -   |

### alert

|   事件   |    事件名    | 参数 |
| :------: | :----------: | :--: |
| 切换 tab |  alert_tab   | tab  |
| 删除告警 | alert_delete |  -   |
| 忽略告警 | alert_ignore |  -   |
| 编辑告警 |  alert_edit  |  -   |

### path-tracing

|   事件   |          事件名           | 参数  |
| :------: | :-----------------------: | :---: |
|   搜索   |    path_tracing_search    | chain |
| 切换币种 | path_tracing_switch_token | token |

### sanction-list

|      事件      |      事件名       | 参数 |
| :------------: | :---------------: | :--: |
|    删除制裁    |  sanction_delete  |  -   |
| 激活，禁用制裁 |  sanction_switch  |  -   |
|  下载制裁模板  | sanction_download |  -   |
|    上传制裁    |  sanction_upload  |  -   |
|  编辑制裁地址  |   sanction_edit   |  -   |

### score-rule

|   事件   |      事件名       | 参数 |
| :------: | :---------------: | :--: |
| 规则改动 | score_rule_change |  -   |
