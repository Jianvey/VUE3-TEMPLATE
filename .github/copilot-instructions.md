# Copilot Instructions

## Project Overview

This repository is a Vue 3 enterprise template using:

- Vite 8 + TypeScript
- Vuetify 4 as the UI component library
- Tailwind CSS v4 for utility-first styling and design tokens
- Pinia for state management
- Vue Router for route management and auth guard
- Vue I18n for internationalization
- Axios for API communication
- Tiptap 3 for rich text editing
- Plyr + HLS.js for media playback
- Cloudflare Turnstile for human verification

## Architecture and Conventions

### 1. UI and Styling

- Prefer Vuetify components for standard UI controls and layout structure.
- Prefer Tailwind utility classes for page/component styling.
- Avoid introducing new SCSS module systems for feature development.
- Reuse existing design tokens from `src/assets/styles/css/tailwind/tokens.css`.
- Theme variants must be implemented via `data-theme` and files in `src/assets/styles/css/tailwind/themes/`.
- Editor surface styling should stay within `src/components/Editor/**` and continue to rely on Tailwind utilities and existing tokens.

### 2. Component Design

- Use `<script setup lang="ts">` in Vue SFCs.
- Keep page-level logic in `src/views/**`; reusable units in `src/components/**`.
- Keep components focused; extract reusable logic into `src/tools/**` or composables when needed.
- For route rendering wrappers, use `src/components/AppRouterView/AppRouterView.vue`.
- Rich text editing lives in `src/components/Editor/**`; keep toolbar buttons and custom nodes inside `src/components/Editor/Toolbar/**`.
- `src/components/Editor/Toolbar/**` is internal implementation detail and excluded from global component auto-registration.
- Use `src/components/Player/Player.vue` for audio/video playback instead of creating feature-local media wrappers.
- Use `src/components/Turnstile/Turnstile.vue` for Cloudflare verification instead of embedding raw widget markup in page components.

### 3. State Management

- Add state in Pinia stores under `src/store/**`.
- Keep store APIs explicit (`open`, `close`, `clear`, `setMode`, `setLanguage`, etc.).
- Do not persist transient UI queues unless explicitly required.
- Keep the player registry in `src/store/player/**` transient and non-persistent.

### 4. Router and Permission

- Route declarations live under `src/router/routes/**`.
- Permission declarations live under `src/router/permissions/**`.
- In navigation guards, return values directly; do not use deprecated `next()` style.

### 5. Internationalization

- Add app messages under `src/locale/languages/*.json`.
- Keep keys stable and consistent across locales.
- Ensure Vuetify locale integration remains connected through `src/plugins/vuetify.ts`.

### 6. Network and Error Handling

- Use centralized axios instance and interceptors in `src/server/axios/index.ts`.
- Surface user-facing errors through the snackbar queue tooling.
- Avoid ad hoc per-page request wrappers unless domain-specific.
- Upload handlers passed into `Editor` should stay domain-specific and resolve to final asset URLs; keep transport details outside the component.

### 7. Rich Text, Media, and Verification

- `src/components/Editor/Editor.vue` stores Tiptap document JSON through `v-model`; keep saved content compatible with Tiptap JSON schema.
- Optional editor hooks are `uploadImage`, `uploadVideo`, and `uploadAudio`, each returning a `Promise<string>`.
- Prefer extending the existing Tiptap-based editor instead of introducing a second rich text stack.
- `src/components/Player/Player.vue` supports both native media and HLS playback; coordinate multiple instances through `src/store/player/index.ts`.
- `src/components/Turnstile/Turnstile.vue` depends on `VITE_APP_CLOUDFLARE_TURNSTILE_SITE_KEY`, `src/global/env.ts`, `src/typings/env.d.ts`, `src/typings/turnstile.d.ts`, and the script include in `index.html`; keep them in sync.

## Development Rules

- Use TypeScript types for all new public data structures.
- Prefer small, focused edits over broad refactors unless requested.
- Preserve existing naming and directory patterns.
- Keep imports sorted according to ESLint autofix behavior.
- Use ASCII content by default in code and config files.
- When adding environment variables, update runtime exports, env typings, and README documentation in the same change.

## Commands

Use the existing scripts:

- `npm run start`
- `npm run build`
- `npm run type-check`
- `npm run lint`
- `npm run prettier`

Before finalizing major changes, run at least `npm run build`.

## Commit and Quality Gate

- Follow conventional commit style via `npm run commit`.
- Keep one logical change per commit when possible.
- Update README/README.zh_CN when stack, scripts, or architecture changes.

## Do and Don't

Do:

- Reuse existing plugin setup in `src/plugins/index.ts`.
- Keep theme, locale, player, and snackbar behavior globally consistent.
- Prefer composable and utility reuse over duplicated logic.
- Reuse `Editor`, `Player`, and `Turnstile` before creating feature-specific wrappers.

Don't:

- Reintroduce removed legacy UI stack patterns.
- Mix incompatible styling systems inside the same feature.
- Bypass lint/type checks for merged code.
- Persist `src/store/player` state or duplicate player coordination elsewhere.
- Inject Cloudflare Turnstile scripts from feature pages unless the shared integration is being replaced intentionally.
