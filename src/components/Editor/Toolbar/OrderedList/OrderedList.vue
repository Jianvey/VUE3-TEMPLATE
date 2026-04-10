<template>
  <div class="editor-toolbar-item" @click="handleClick">
    <v-tooltip activator="parent" text="有序列表" location="bottom" />
    <v-icon :icon="mdiFormatListNumbered" />
  </div>
</template>

<script setup lang="ts">
import { mdiFormatListNumbered } from "@mdi/js"

import type { EditorToolbarProps } from "@/components/Editor/Toolbar/types"

const props = defineProps<EditorToolbarProps>()

const handleClick = () => {
  if (props.editor?.isActive("orderedList")) {
    props.editor.chain().focus().sinkListItem("listItem").run()
  } else {
    props.editor?.chain().focus().toggleOrderedList().run()
  }
}
</script>
