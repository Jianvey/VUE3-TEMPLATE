<template>
  <div
    class="editor rounded-lg border border-gray-100 bg-white dark:border-gray-700 dark:bg-gray-900"
  >
    <Toolbar
      v-if="!props.readonly"
      :editor="editor"
      :upload-image="props.uploadImage"
      :upload-video="props.uploadVideo"
      :upload-audio="props.uploadAudio"
    />

    <editor-content class="editor-content overflow-y-auto px-4 py-3" :editor="editor" />
  </div>
</template>

<script setup lang="ts">
import type { Content } from "@tiptap/core"

import CodeBlockLowlight from "@tiptap/extension-code-block-lowlight"
import Color from "@tiptap/extension-color"
import { Details, DetailsContent, DetailsSummary } from "@tiptap/extension-details"
import Emoji from "@tiptap/extension-emoji"
import Highlight from "@tiptap/extension-highlight"
import Image from "@tiptap/extension-image"
import Link from "@tiptap/extension-link"
import { TaskItem, TaskList } from "@tiptap/extension-list"
import { Table, TableCell, TableHeader, TableRow } from "@tiptap/extension-table"
import TextAlign from "@tiptap/extension-text-align"
import { TextStyle } from "@tiptap/extension-text-style"
import Youtube from "@tiptap/extension-youtube"
import StarterKit from "@tiptap/starter-kit"
import { EditorContent, useEditor } from "@tiptap/vue-3"
import { common, createLowlight } from "lowlight"

import type { EditorProps } from "@/components/Editor/types"

import Toolbar from "@/components/Editor/Toolbar/Toolbar.vue"
import { AudioNode } from "@/components/Editor/Toolbar/Video/audio-node"
import { VideoNode } from "@/components/Editor/Toolbar/Video/video-node"

const props = defineProps<EditorProps>()
const content = defineModel<Content>()

function normalizeContent(value?: Content) {
  if (!value) return { type: "doc", content: [] }
  if (Array.isArray(value)) return { type: "doc", content: value }

  return value
}

const lowlight = createLowlight(common)

const editor = useEditor({
  content: normalizeContent(content.value),
  editable: !props.readonly,
  autofocus: props.autofocus ?? false,
  editorProps: {
    attributes: { class: "prose dark:prose-invert max-w-none focus:outline-none min-h-40" },
  },
  extensions: [
    StarterKit.configure({ codeBlock: false, link: false }),
    TextAlign.configure({ types: ["heading", "paragraph"] }),
    TextStyle,
    Color,
    CodeBlockLowlight.configure({ lowlight }),
    Emoji.configure({ enableEmoticons: true }),
    Highlight.configure({ multicolor: true }),
    Link.configure({
      openOnClick: false,
      HTMLAttributes: { rel: "noopener noreferrer", target: "_blank" },
    }),
    TaskList,
    TaskItem.configure({ nested: true }),
    Table.configure({ resizable: true }),
    TableRow,
    TableHeader,
    TableCell,
    Details.configure({ persist: true, HTMLAttributes: { class: "details" } }),
    DetailsSummary,
    DetailsContent,
    Youtube.configure({ nocookie: true, width: 640, height: 360 }),
    Image.configure({ resize: { enabled: true, alwaysPreserveAspectRatio: true } }),
    VideoNode,
    AudioNode,
  ],
  onUpdate: () => (content.value = editor.value?.getJSON()),
})

onUnmounted(() => editor.value?.destroy())
watch(
  () => props.readonly,
  value => editor.value?.setEditable(!value),
)
watch(
  content,
  value => {
    const normalized = normalizeContent(value)
    const isSame = JSON.stringify(editor.value?.getJSON()) === JSON.stringify(normalized)
    if (!isSame) editor.value?.commands.setContent(normalized)
  },
  { deep: true, immediate: true },
)
</script>

<style scoped>
@reference "@/assets/styles/css/main.css";

/*
 * prose uses :where() (zero specificity), so Vuetify's .v-application
 * element-level resets win. The rules below only patch the specific
 * structural properties Vuetify overrides; everything else (colors,
 * spacing, typography) is still handled by the prose plugin.
 */
:deep(.ProseMirror) {
  /* ── image ───────────────────────────────────────── */
  img {
    @apply m-0 max-h-60 max-w-full rounded;
  }

  [data-resize-container] {
    @apply flex justify-center;

    &.ProseMirror-selectednode [data-resize-handle] {
      @apply block;
    }
  }

  [data-resize-wrapper] {
    @apply inline-block;
  }

  [data-resize-handle] {
    @apply bg-primary-500 absolute z-10 hidden h-2.5 w-2.5 rounded-sm border border-white;

    &[data-resize-handle="top-left"] {
      @apply top-0 left-0 cursor-nwse-resize;
    }
    &[data-resize-handle="top-right"] {
      @apply top-0 right-0 cursor-nesw-resize;
    }
    &[data-resize-handle="bottom-left"] {
      @apply bottom-0 left-0 -translate-y-1/2 transform cursor-nesw-resize;
    }
    &[data-resize-handle="bottom-right"] {
      @apply right-0 bottom-0 -translate-y-1/2 transform cursor-nwse-resize;
    }
  }

  /* ── link ───────────────────────────────────────── */
  a {
    @apply text-primary-700 dark:text-primary-400 decoration-primary-500 underline underline-offset-2 duration-150;

    &:hover {
      @apply text-primary-500 dark:text-primary-300 decoration-primary-500;
    }
  }

  /* ── inline code + code block ───────────────────── */
  code:not(pre > code) {
    @apply rounded bg-gray-100 px-1 py-0.5 font-mono text-sm text-orange-600 dark:bg-gray-800 dark:text-orange-400;

    &::before,
    &::after {
      content: none;
    }
  }

  pre {
    @apply my-4 overflow-x-auto rounded-lg bg-gray-100 p-4 font-mono text-sm wrap-break-word whitespace-pre-wrap text-gray-900 dark:bg-gray-900 dark:text-gray-100;
  }

  /* ── table ─────────────────────────────────────── */
  table {
    @apply my-4 w-full border-collapse text-sm;

    td,
    th {
      @apply border border-gray-300 px-3 py-2 align-top dark:border-gray-600;
    }

    th {
      @apply bg-gray-100 font-semibold dark:bg-gray-700;
    }

    /* selected-cell overlay (table extension) */
    .selectedCell {
      @apply relative;

      &::after {
        content: "";
        @apply pointer-events-none absolute inset-0 bg-blue-200/30 dark:bg-blue-800/20;
      }
    }

    /* column-resize handle (table extension) */
    .column-resize-handle {
      @apply bg-primary-400 pointer-events-auto absolute top-0 -right-px bottom-0 w-0.5 cursor-col-resize;
    }
  }

  &.resize-cursor {
    @apply cursor-col-resize;
  }

  /* ── blockquote ─────────────────────────────────── */
  blockquote {
    @apply my-4 border-l-4 border-gray-300 pl-4 text-gray-500 not-italic dark:border-gray-600 dark:text-gray-400;

    p {
      &::after,
      &::before {
        content: "";
      }
    }
  }

  /* ── task list ──────────────────────────────────── */
  ul[data-type="taskList"] {
    @apply my-2 list-none pl-0;

    > li {
      @apply flex items-start gap-2;

      > label {
        @apply mt-0.5 shrink-0 select-none;

        input[type="checkbox"] {
          @apply m-0 cursor-pointer;
        }
      }

      > div {
        @apply flex-1;

        > p {
          @apply my-0;
        }

        > ul[data-type="taskList"] {
          @apply mt-1;
        }
      }
    }
  }

  /* ── horizontal rule ────────────────────────────── */
  hr {
    @apply my-4 border-gray-100/35 dark:border-gray-600;
  }

  /* ── details ────────────────────────────────────── */
  .details {
    @apply my-4 flex overflow-hidden rounded-lg border border-gray-200 dark:border-gray-700;

    /* left toggle button column */
    > button {
      all: unset;
      box-sizing: border-box;
      @apply flex w-10 shrink-0 cursor-pointer items-start justify-center border-r border-gray-200 bg-gray-50 pt-3 duration-150 select-none hover:bg-gray-100 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700;

      /* chevron via background-image svg — avoids ::after Vuetify conflicts */
      background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 12 12'%3E%3Cpolyline points='2,4 6,8 10,4' fill='none' stroke='%239ca3af' stroke-width='1.8' stroke-linecap='round' stroke-linejoin='round'/%3E%3C/svg%3E");
      background-repeat: no-repeat;
      background-position: center 0.75rem;
      background-size: 0.75rem 0.75rem;
    }

    &.is-open > button {
      background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 12 12'%3E%3Cpolyline points='2,8 6,4 10,8' fill='none' stroke='%236b7280' stroke-width='1.8' stroke-linecap='round' stroke-linejoin='round'/%3E%3C/svg%3E");
    }

    /* right side: summary + content */
    > div {
      @apply min-w-0 flex-1;

      /* editable summary / title row */
      > summary {
        @apply block list-none px-4 py-2.5 text-sm font-medium text-gray-800 dark:text-gray-100;

        &::-webkit-details-marker {
          display: none;
        }
      }

      /* collapsible content area */
      > div[data-type="detailsContent"] {
        @apply border-t border-gray-200 px-4 py-3 text-sm dark:border-gray-700;
      }
    }
  }

  /* ── video node ─────────────────────────────────── */
  div[data-node-view-wrapper]:has(video) {
    video {
      @apply max-h-120 w-full rounded-lg object-contain;
    }
  }

  /* ── youtube ─────────────────────────────────────── */
  div[data-youtube-video] {
    @apply my-4;

    iframe {
      @apply aspect-video h-auto w-full rounded-lg;
    }
  }
}
</style>
