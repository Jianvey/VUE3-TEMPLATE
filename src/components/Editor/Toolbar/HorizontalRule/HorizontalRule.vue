<template>
  <div class="editor-toolbar-item" @click="props.editor?.chain().focus().setHorizontalRule().run()">
    <v-tooltip activator="parent" text="分割线" location="bottom" />
    <v-icon :icon="mdiMinus" />
  </div>
</template>

<script setup lang="ts">
import { mdiMinus } from "@mdi/js"

import type { EditorToolbarProps } from "@/components/Editor/Toolbar/types"

const props = defineProps<EditorToolbarProps>()
</script>
