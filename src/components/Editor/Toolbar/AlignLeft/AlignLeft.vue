<template>
  <div
    class="editor-toolbar-item"
    :class="{ 'editor-toolbar-item-active': props.editor?.isActive({ textAlign: 'left' }) }"
    @click="props.editor?.chain().focus().setTextAlign('left').run()"
  >
    <v-tooltip activator="parent" text="左对齐" location="bottom" />
    <v-icon :icon="mdiFormatAlignLeft" />
  </div>
</template>

<script setup lang="ts">
import { mdiFormatAlignLeft } from "@mdi/js"

import type { EditorToolbarProps } from "@/components/Editor/Toolbar/types"

const props = defineProps<EditorToolbarProps>()
</script>
