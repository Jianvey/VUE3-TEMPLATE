<template>
  <div
    class="editor-toolbar flex flex-wrap items-center gap-1 border-b border-gray-100 px-3 py-2 dark:border-gray-700"
  >
    <UndoRedo :editor="props.editor" />

    <div class="toolbar-divider" />

    <Heading :editor="props.editor" />
    <Bold :editor="props.editor" />
    <Italic :editor="props.editor" />
    <Strike :editor="props.editor" />
    <Underline :editor="props.editor" />

    <div class="toolbar-divider" />

    <Color :editor="props.editor" />
    <Highlight :editor="props.editor" />

    <div class="toolbar-divider" />

    <BulletList :editor="props.editor" />
    <OrderedList :editor="props.editor" />
    <TaskList :editor="props.editor" />

    <div class="toolbar-divider" />

    <AlignLeft :editor="props.editor" />
    <AlignCenter :editor="props.editor" />
    <AlignRight :editor="props.editor" />
    <AlignJustify :editor="props.editor" />

    <div class="toolbar-divider" />

    <Code :editor="props.editor" />
    <CodeBlock :editor="props.editor" />
    <Blockquote :editor="props.editor" />
    <Details :editor="props.editor" />

    <div class="toolbar-divider" />

    <Link :editor="props.editor" />
    <Table :editor="props.editor" />
    <HorizontalRule :editor="props.editor" />

    <div class="toolbar-divider" />

    <Image :editor="props.editor" :upload-image="props.uploadImage" />
    <Video :editor="props.editor" :upload-video="props.uploadVideo" />
    <Audio :editor="props.editor" :upload-audio="props.uploadAudio" />
    <Youtube :editor="props.editor" />
  </div>
</template>

<script setup lang="ts">
import type { EditorToolbarProps } from "@/components/Editor/Toolbar/types"

import AlignCenter from "@/components/Editor/Toolbar/AlignCenter/AlignCenter.vue"
import AlignJustify from "@/components/Editor/Toolbar/AlignJustify/AlignJustify.vue"
import AlignLeft from "@/components/Editor/Toolbar/AlignLeft/AlignLeft.vue"
import AlignRight from "@/components/Editor/Toolbar/AlignRight/AlignRight.vue"
import Blockquote from "@/components/Editor/Toolbar/Blockquote/Blockquote.vue"
import Bold from "@/components/Editor/Toolbar/Bold/Bold.vue"
import BulletList from "@/components/Editor/Toolbar/BulletList/BulletList.vue"
import Code from "@/components/Editor/Toolbar/Code/Code.vue"
import CodeBlock from "@/components/Editor/Toolbar/CodeBlock/CodeBlock.vue"
import Color from "@/components/Editor/Toolbar/Color/Color.vue"
import Details from "@/components/Editor/Toolbar/Details/Details.vue"
import Heading from "@/components/Editor/Toolbar/Heading/Heading.vue"
import Highlight from "@/components/Editor/Toolbar/Highlight/Highlight.vue"
import HorizontalRule from "@/components/Editor/Toolbar/HorizontalRule/HorizontalRule.vue"
import Image from "@/components/Editor/Toolbar/Image/Image.vue"
import Italic from "@/components/Editor/Toolbar/Italic/Italic.vue"
import Link from "@/components/Editor/Toolbar/Link/Link.vue"
import OrderedList from "@/components/Editor/Toolbar/OrderedList/OrderedList.vue"
import Strike from "@/components/Editor/Toolbar/Strike/Strike.vue"
import Table from "@/components/Editor/Toolbar/Table/Table.vue"
import TaskList from "@/components/Editor/Toolbar/TaskList/TaskList.vue"
import Underline from "@/components/Editor/Toolbar/Underline/Underline.vue"
import UndoRedo from "@/components/Editor/Toolbar/UndoRedo/UndoRedo.vue"
import Audio from "@/components/Editor/Toolbar/Video/Audio.vue"
import Video from "@/components/Editor/Toolbar/Video/Video.vue"
import Youtube from "@/components/Editor/Toolbar/Youtube/Youtube.vue"

interface ToolbarProps extends EditorToolbarProps {
  uploadImage?: (file: File) => Promise<string>
  uploadVideo?: (file: File) => Promise<string>
  uploadAudio?: (file: File) => Promise<string>
}

const props = defineProps<ToolbarProps>()
</script>

<style scoped>
@reference "@/assets/styles/css/main.css";

:deep(.editor-toolbar-item) {
  @apply flex-center h-8 w-8 cursor-pointer rounded-md p-1 text-sm text-gray-600 duration-300 hover:bg-gray-200 dark:text-gray-300 dark:hover:bg-gray-700;
}

:deep(.editor-toolbar-item-active) {
  @apply bg-gray-200 text-gray-900 dark:bg-gray-700 dark:text-white;
}

.toolbar-divider {
  @apply mx-0.5 h-5 w-px shrink-0 bg-gray-200 dark:bg-gray-700;
}
</style>
