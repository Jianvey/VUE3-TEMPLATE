<template>
  <div class="editor-toolbar-item" @click="handleClick">
    <v-tooltip activator="parent" text="无序列表" location="bottom" />
    <v-icon :icon="mdiFormatListBulleted" />
  </div>
</template>

<script setup lang="ts">
import { mdiFormatListBulleted } from "@mdi/js"

import type { EditorToolbarProps } from "@/components/Editor/Toolbar/types"

const props = defineProps<EditorToolbarProps>()

const handleClick = () => {
  if (props.editor?.isActive("bulletList")) {
    props.editor.chain().focus().sinkListItem("listItem").run()
  } else {
    props.editor?.chain().focus().toggleBulletList().run()
  }
}
</script>
