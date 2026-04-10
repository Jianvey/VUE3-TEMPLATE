<template>
  <div
    class="editor-toolbar-item"
    :class="{ 'editor-toolbar-item-active': props.editor?.isActive('underline') }"
    @click="props.editor?.chain().focus().toggleUnderline().run()"
  >
    <v-tooltip activator="parent" text="下划线" location="bottom" />
    <v-icon :icon="mdiFormatUnderline" />
  </div>
</template>

<script setup lang="ts">
import { mdiFormatUnderline } from "@mdi/js"

import type { EditorToolbarProps } from "@/components/Editor/Toolbar/types"

const props = defineProps<EditorToolbarProps>()
</script>
