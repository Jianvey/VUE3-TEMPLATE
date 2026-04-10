# VUE3-TEMPLATE

[English](README.md) | 简体中文

面向企业级项目的 Vue 3 初始化模板，内置现代 UI 体系以及一组可直接复用的业务基础能力：

- Vue 3 + Vite 8 + TypeScript
- Vuetify 4 组件库
- Tailwind CSS v4（设计令牌 + 原子化样式）
- Pinia + 持久化
- Vue Router + 路由守卫 + 权限模型
- Vue I18n + Vuetify 多语言适配
- Axios 统一请求封装
- Tiptap 3 富文本编辑器
- Plyr + HLS.js 音视频播放器
- Cloudflare Turnstile 人机验证
- ESLint + Prettier + Husky + Commitlint + Commitizen

## 功能亮点

- 基于 `Vuetify 4 + Tailwind v4` 的令牌化主题体系。
- 内置富文本编辑器，支持标题、任务列表、表格、代码块、折叠块、链接、高亮和多媒体插入。
- 统一音视频播放器，支持音频、视频、HLS 流和多播放器自动互斥暂停。
- 主题联动的 Cloudflare Turnstile 组件，支持 token 双向绑定和重置。
- 队列式全局消息与 Vue Router 推荐的 `return` 风格路由守卫。

## 环境要求

- Node.js `>= 24.14.0`
- npm 或 pnpm

## 快速开始

```bash
# 安装依赖
npm install

# 启动开发环境
npm run start

# 类型检查并打包
npm run build
```

## 环境变量

| 变量名 | 说明 |
| --- | --- |
| `VITE_APP_BASE_API` | 统一 axios 实例使用的服务端基础地址。 |
| `VITE_APP_CLOUDFLARE_TURNSTILE_SITE_KEY` | 内置 Turnstile 组件使用的站点 Key。 |

`index.html` 已经预置了 `https://challenges.cloudflare.com` 的脚本注入，开发和生产环境只需要提供站点 Key 即可。

## 内置组件

### Editor

`src/components/Editor/Editor.vue` 是基于 Tiptap 封装的富文本编辑器，内置工具栏。

- `v-model` 存储 Tiptap 的 JSON 内容。
- 支持 `readonly` 和 `autofocus`。
- `uploadImage`、`uploadVideo`、`uploadAudio` 是可选异步钩子，返回最终可访问的资源 URL。
- 支持标题、列表、任务列表、引用块、代码块、表格、折叠块、图片、视频、音频和 YouTube 嵌入。

```vue
<script setup lang="ts">
const content = ref()

async function uploadImage(file: File) {
  return await Promise.resolve(URL.createObjectURL(file))
}
</script>

<template>
  <Editor v-model="content" :upload-image="uploadImage" />
</template>
```

### Player

`src/components/Player/Player.vue` 对 Plyr 和 HLS.js 做了统一封装。

- 默认用于视频播放。
- 设置 `type="audio"` 可切换为音频播放。
- 支持 `.m3u8` 等 HLS 流。
- 通过共享 Pinia store，在一个播放器开始播放时自动暂停其他实例。

```vue
<template>
  <Player src="https://example.com/stream.m3u8" />
  <Player type="audio" src="https://example.com/audio.mp3" />
</template>
```

### Turnstile

`src/components/Turnstile/Turnstile.vue` 将 Cloudflare Turnstile 封装成了可复用组件。

- 通过 `v-model` 绑定校验 token。
- 校验失败或提交后重试时，可以调用暴露出来的 `reset()`。
- 组件主题自动跟随全局主题 store。

```vue
<script setup lang="ts">
const token = ref("")
const turnstileRef = useTemplateRef("turnstileRef")
</script>

<template>
  <Turnstile ref="turnstileRef" v-model="token" />
</template>
```

## 脚本说明

```bash
npm run start        # 启动开发服务
npm run preview      # 预览产物
npm run build        # 类型检查 + 构建
npm run build-only   # 仅构建
npm run type-check   # 运行 vue-tsc
npm run lint         # eslint --fix
npm run prettier     # 格式化全项目
npm run commit       # 使用 commitizen 交互式提交
```

## 目录结构

```text
src/
	assets/styles/css/        # Tailwind v4、tokens、主题层、三方样式
	components/               # 可复用组件
	components/AppRouterView/ # 路由出口、过渡与 keep-alive 封装
	components/Editor/        # 富文本编辑器与工具栏内部实现
	components/Player/        # 统一音视频播放器
	components/Turnstile/     # Cloudflare Turnstile 封装
	plugins/                  # i18n/router/pinia/vuetify 注册
	router/                   # 路由与权限配置
	server/                   # axios 实例与 API 模块
	store/                    # pinia 状态（theme/locale/user/player/snackbar）
	tools/                    # 公共工具函数
	views/                    # 页面组件
```

## 主题与样式

- Tailwind 入口：`src/assets/styles/css/tailwind/tailwind.css`
- Token 定义：`src/assets/styles/css/tailwind/tokens.css`
- 主题扩展：`src/assets/styles/css/tailwind/themes/*`
- Vuetify 配置：`src/plugins/vuetify.ts`

支持能力：

- 亮色 / 暗色模式切换
- 基于 `data-theme` 的主题色切换
- Tailwind 与全局样式共用颜色令牌

## 国际化

- 应用 i18n 初始化：`src/plugins/locale.ts`
- 语言包：`src/locale/languages/*.json`
- Vuetify 文案适配：`src/plugins/vuetify.ts`

## 提交流程

```bash
git add .
npm run commit
```

提交信息将由 Husky + Commitlint 自动校验。
