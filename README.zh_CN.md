# VUE3-TEMPLATE

[English](README.md) | 简体中文

面向企业级项目的 Vue 3 初始化模板，当前版本已完成 UI 体系迁移：

- Vue 3 + Vite 8 + TypeScript
- Vuetify 4 组件库
- Tailwind CSS v4（设计令牌 + 原子化样式）
- Pinia + 持久化
- Vue Router + 路由守卫 + 权限模型
- Vue I18n + Vuetify 多语言适配
- Axios 统一请求封装
- ESLint + Prettier + Husky + Commitlint + Commitizen

## 本次升级重点

- 替换旧 UI 依赖，统一为 `Vuetify 4`。
- 样式体系由 SCSS 主导迁移为 `Tailwind v4 + CSS Token`。
- 深色模式、主题色切换、全局变量联动完成统一。
- 全局消息升级为 `v-snackbar-queue` 队列模式。
- 路由守卫改为 Vue Router 推荐的 `return` 风格（移除 `next()` 弃用写法）。

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
	plugins/                  # i18n/router/pinia/vuetify 注册
	router/                   # 路由与权限配置
	server/                   # axios 实例与 API 模块
	store/                    # pinia 状态（theme/locale/user/snackbar）
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
