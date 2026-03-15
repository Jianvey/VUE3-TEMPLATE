# VUE3-TEMPLATE

English | [简体中文](README.zh_CN.md)

An enterprise-oriented Vue 3 starter template, now migrated to a modern UI stack:

- Vue 3 + Vite 8 + TypeScript
- Vuetify 4 (component system)
- Tailwind CSS v4 (design tokens and utility styling)
- Pinia + persisted state
- Vue Router + route guard + permission model
- Vue I18n + Vuetify locale adapter
- Axios + request/response unified handling
- ESLint + Prettier + Husky + Commitlint + Commitizen

## Highlights

- Replaced legacy UI dependencies with `Vuetify 4`.
- Reworked styling pipeline from SCSS-centered approach to `Tailwind v4 + CSS tokens`.
- Unified dark mode, theme color switching, and global CSS variables.
- Added queue-based global snackbar via `v-snackbar-queue`.
- Updated router guard to Vue Router return style (no deprecated `next()` API).

## Requirements

- Node.js `>= 24.14.0`
- npm or pnpm

## Quick Start

```bash
# install dependencies
npm install

# start dev server
npm run start

# type check + build
npm run build
```

## Scripts

```bash
npm run start        # run dev server
npm run preview      # preview production build
npm run build        # type-check and build
npm run build-only   # build only
npm run type-check   # run vue-tsc
npm run lint         # run eslint --fix
npm run prettier     # format all files
npm run commit       # commit with commitizen prompt
```

## Project Structure

```text
src/
	assets/styles/css/        # Tailwind v4, tokens, theme layers, vendor styles
	components/               # reusable UI components
	components/AppRouterView/ # router-view + transition + keep-alive wrapper
	plugins/                  # app plugin registration (i18n, router, pinia, vuetify)
	router/                   # route declarations + permission config
	server/                   # axios instance and API modules
	store/                    # pinia stores (theme, locale, user, snackbar)
	tools/                    # common runtime utilities
	views/                    # page-level views
```

## Theme and Styling

- Tailwind entry: `src/assets/styles/css/tailwind/tailwind.css`
- Token definition: `src/assets/styles/css/tailwind/tokens.css`
- Custom themes: `src/assets/styles/css/tailwind/themes/*`
- Vuetify config: `src/plugins/vuetify.ts`

The template supports:

- light / dark mode switching
- theme color switching via `data-theme`
- token-driven color usage across Tailwind and app-level custom CSS

## i18n

- App i18n setup: `src/plugins/locale.ts`
- Locale messages: `src/locale/languages/*.json`
- Vuetify locale is bridged to Vue I18n in `src/plugins/vuetify.ts`

## Git Commit Workflow

```bash
git add .
npm run commit
```

Commit format is validated by Commitlint and Husky hooks.
