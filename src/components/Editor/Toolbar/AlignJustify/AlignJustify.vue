<template>
  <div
    class="editor-toolbar-item"
    :class="{ 'editor-toolbar-item-active': props.editor?.isActive({ textAlign: 'justify' }) }"
    @click="props.editor?.chain().focus().setTextAlign('justify').run()"
  >
    <v-tooltip activator="parent" text="两端对齐" location="bottom" />
    <v-icon :icon="mdiFormatAlignJustify" />
  </div>
</template>

<script setup lang="ts">
import { mdiFormatAlignJustify } from "@mdi/js"

import type { EditorToolbarProps } from "@/components/Editor/Toolbar/types"

const props = defineProps<EditorToolbarProps>()
</script>
