<template>
  <div
    class="editor-toolbar-item"
    :class="{ 'editor-toolbar-item-active': props.editor?.isActive('codeBlock') }"
    @click="props.editor?.chain().focus().toggleCodeBlock().run()"
  >
    <v-tooltip activator="parent" text="代码块" location="bottom" />
    <v-icon :icon="mdiCodeBraces" />
  </div>
</template>

<script setup lang="ts">
import { mdiCodeBraces } from "@mdi/js"

import type { EditorToolbarProps } from "@/components/Editor/Toolbar/types"

const props = defineProps<EditorToolbarProps>()
</script>
