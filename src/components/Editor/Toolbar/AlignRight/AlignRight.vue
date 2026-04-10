<template>
  <div
    class="editor-toolbar-item"
    :class="{ 'editor-toolbar-item-active': props.editor?.isActive({ textAlign: 'right' }) }"
    @click="props.editor?.chain().focus().setTextAlign('right').run()"
  >
    <v-tooltip activator="parent" text="右对齐" location="bottom" />
    <v-icon :icon="mdiFormatAlignRight" />
  </div>
</template>

<script setup lang="ts">
import { mdiFormatAlignRight } from "@mdi/js"

import type { EditorToolbarProps } from "@/components/Editor/Toolbar/types"

const props = defineProps<EditorToolbarProps>()
</script>
