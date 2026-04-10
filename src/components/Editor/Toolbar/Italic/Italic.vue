<template>
  <div
    class="editor-toolbar-item"
    :class="{ 'editor-toolbar-item-active': props.editor?.isActive('italic') }"
    @click="props.editor?.chain().focus().toggleItalic().run()"
  >
    <v-tooltip activator="parent" text="斜体" location="bottom" />
    <v-icon :icon="mdiFormatItalic" />
  </div>
</template>

<script setup lang="ts">
import { mdiFormatItalic } from "@mdi/js"

import type { EditorToolbarProps } from "@/components/Editor/Toolbar/types"

const props = defineProps<EditorToolbarProps>()
</script>
