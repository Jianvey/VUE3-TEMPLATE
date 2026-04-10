# VUE3-TEMPLATE

English | [简体中文](README.zh_CN.md)

An enterprise-oriented Vue 3 starter template with a modern UI stack and several production-ready building blocks out of the box:

- Vue 3 + Vite 8 + TypeScript
- Vuetify 4 (component system)
- Tailwind CSS v4 (design tokens and utility styling)
- Pinia + persisted state
- Vue Router + route guard + permission model
- Vue I18n + Vuetify locale adapter
- Axios + request/response unified handling
- Tiptap 3 rich text editor
- Plyr + HLS.js media player
- Cloudflare Turnstile integration
- ESLint + Prettier + Husky + Commitlint + Commitizen

## Highlights

- Token-driven theming built on `Vuetify 4 + Tailwind v4`.
- Built-in rich text editor with headings, task lists, tables, code blocks, details, links, highlight, and media embedding.
- Shared media player component for audio/video playback, HLS streams, and coordinated pause across multiple player instances.
- Theme-aware Cloudflare Turnstile component with token binding and reset support.
- Queue-based global snackbar and Vue Router return-style guards.

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

## Environment Variables

| Variable | Description |
| --- | --- |
| `VITE_APP_BASE_API` | Base URL used by the shared axios instance. |
| `VITE_APP_CLOUDFLARE_TURNSTILE_SITE_KEY` | Site key used by the built-in Turnstile component. |

`index.html` already injects the Turnstile script from `https://challenges.cloudflare.com`, so local and production environments only need to provide the site key.

## Built-in Components

### Editor

`src/components/Editor/Editor.vue` is a Tiptap-based editor component with a built-in toolbar.

- `v-model` stores Tiptap JSON content.
- `readonly` and `autofocus` are supported.
- `uploadImage`, `uploadVideo`, and `uploadAudio` are optional async hooks that must resolve to a final asset URL.
- Supported blocks include headings, lists, task lists, blockquotes, code blocks, tables, details, images, video, audio, and YouTube embeds.

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

`src/components/Player/Player.vue` wraps Plyr and HLS.js for unified media playback.

- Use the default mode for video.
- Set `type="audio"` for audio playback.
- HLS streams such as `.m3u8` are supported.
- A shared Pinia store pauses other players when a new instance starts playing.

```vue
<template>
  <Player src="https://example.com/stream.m3u8" />
  <Player type="audio" src="https://example.com/audio.mp3" />
</template>
```

### Turnstile

`src/components/Turnstile/Turnstile.vue` exposes Cloudflare Turnstile as a reusable component.

- Bind the verification token with `v-model`.
- Use the exposed `reset()` method when verification fails or the form is retried.
- Theme mode is derived from the shared theme store.

```vue
<script setup lang="ts">
const token = ref("")
const turnstileRef = useTemplateRef("turnstileRef")
</script>

<template>
  <Turnstile ref="turnstileRef" v-model="token" />
</template>
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
	components/Editor/        # Tiptap editor and toolbar internals
	components/Player/        # shared audio/video player
	components/Turnstile/     # Cloudflare Turnstile wrapper
	plugins/                  # app plugin registration (i18n, router, pinia, vuetify)
	router/                   # route declarations + permission config
	server/                   # axios instance and API modules
	store/                    # pinia stores (theme, locale, user, player, snackbar)
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
