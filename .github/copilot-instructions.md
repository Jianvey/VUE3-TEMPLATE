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

## Architecture and Conventions

### 1. UI and Styling

- Prefer Vuetify components for standard UI controls and layout structure.
- Prefer Tailwind utility classes for page/component styling.
- Avoid introducing new SCSS module systems for feature development.
- Reuse existing design tokens from `src/assets/styles/css/tailwind/tokens.css`.
- Theme variants must be implemented via `data-theme` and files in `src/assets/styles/css/tailwind/themes/`.

### 2. Component Design

- Use `<script setup lang="ts">` in Vue SFCs.
- Keep page-level logic in `src/views/**`; reusable units in `src/components/**`.
- Keep components focused; extract reusable logic into `src/tools/**` or composables when needed.
- For route rendering wrappers, use `src/components/AppRouterView/AppRouterView.vue`.

### 3. State Management

- Add state in Pinia stores under `src/store/**`.
- Keep store APIs explicit (`open`, `close`, `clear`, `setMode`, `setLanguage`, etc.).
- Do not persist transient UI queues unless explicitly required.

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

## Development Rules

- Use TypeScript types for all new public data structures.
- Prefer small, focused edits over broad refactors unless requested.
- Preserve existing naming and directory patterns.
- Keep imports sorted according to ESLint autofix behavior.
- Use ASCII content by default in code and config files.

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
- Keep theme, locale, and snackbar behavior globally consistent.
- Prefer composable and utility reuse over duplicated logic.

Don't:

- Reintroduce removed legacy UI stack patterns.
- Mix incompatible styling systems inside the same feature.
- Bypass lint/type checks for merged code.
