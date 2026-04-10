<template>
  <div
    class="editor-toolbar-item"
    :class="{ 'editor-toolbar-item-active': props.editor?.isActive({ textAlign: 'center' }) }"
    @click="props.editor?.chain().focus().setTextAlign('center').run()"
  >
    <v-tooltip activator="parent" text="居中对齐" location="bottom" />
    <v-icon :icon="mdiFormatAlignCenter" />
  </div>
</template>

<script setup lang="ts">
import { mdiFormatAlignCenter } from "@mdi/js"

import type { EditorToolbarProps } from "@/components/Editor/Toolbar/types"

const props = defineProps<EditorToolbarProps>()
</script>
