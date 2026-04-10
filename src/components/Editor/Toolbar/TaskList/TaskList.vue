<template>
  <div class="editor-toolbar-item" @click="handleClick">
    <v-tooltip activator="parent" text="任务列表" location="bottom" />
    <v-icon :icon="mdiCheckboxMarkedOutline" />
  </div>
</template>

<script setup lang="ts">
import { mdiCheckboxMarkedOutline } from "@mdi/js"

import type { EditorToolbarProps } from "@/components/Editor/Toolbar/types"

const props = defineProps<EditorToolbarProps>()

const handleClick = () => {
  if (props.editor?.isActive("taskList")) {
    props.editor.chain().focus().sinkListItem("taskItem").run()
  } else {
    props.editor?.chain().focus().toggleTaskList().run()
  }
}
</script>
