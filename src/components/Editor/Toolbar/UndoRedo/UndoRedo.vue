<template>
  <div class="flex">
    <div class="editor-toolbar-item" @click="props.editor?.chain().focus().undo().run()">
      <v-tooltip activator="parent" text="撤销" location="bottom" />
      <v-icon :icon="mdiUndo" />
    </div>
    <div class="editor-toolbar-item" @click="props.editor?.chain().focus().redo().run()">
      <v-tooltip activator="parent" text="重做" location="bottom" />
      <v-icon :icon="mdiRedo" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { mdiRedo, mdiUndo } from "@mdi/js"

import type { EditorToolbarProps } from "@/components/Editor/Toolbar/types"

const props = defineProps<EditorToolbarProps>()
</script>
