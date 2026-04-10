<template>
  <div
    class="editor-toolbar-item"
    :class="{ 'editor-toolbar-item-active': props.editor?.isActive('strike') }"
    @click="props.editor?.chain().focus().toggleStrike().run()"
  >
    <v-tooltip activator="parent" text="删除线" location="bottom" />
    <v-icon :icon="mdiFormatStrikethroughVariant" />
  </div>
</template>

<script setup lang="ts">
import { mdiFormatStrikethroughVariant } from "@mdi/js"

import type { EditorToolbarProps } from "@/components/Editor/Toolbar/types"

const props = defineProps<EditorToolbarProps>()
</script>
