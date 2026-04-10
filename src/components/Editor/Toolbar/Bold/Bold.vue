<template>
  <div
    class="editor-toolbar-item"
    :class="{ 'editor-toolbar-item-active': props.editor?.isActive('bold') }"
    @click="props.editor?.chain().focus().toggleBold().run()"
  >
    <v-tooltip activator="parent" text="加粗" location="bottom" />
    <v-icon :icon="mdiFormatBold" />
  </div>
</template>

<script setup lang="ts">
import { mdiFormatBold } from "@mdi/js"

import type { EditorToolbarProps } from "@/components/Editor/Toolbar/types"

const props = defineProps<EditorToolbarProps>()
</script>
