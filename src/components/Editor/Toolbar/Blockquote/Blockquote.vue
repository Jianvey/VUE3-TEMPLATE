<template>
  <div
    class="editor-toolbar-item"
    :class="{ 'editor-toolbar-item-active': props.editor?.isActive('blockquote') }"
    @click="props.editor?.chain().focus().toggleBlockquote().run()"
  >
    <v-tooltip activator="parent" text="引用块" location="bottom" />
    <v-icon :icon="mdiCommentQuoteOutline" />
  </div>
</template>

<script setup lang="ts">
import { mdiCommentQuoteOutline } from "@mdi/js"

import type { EditorToolbarProps } from "@/components/Editor/Toolbar/types"

const props = defineProps<EditorToolbarProps>()
</script>
