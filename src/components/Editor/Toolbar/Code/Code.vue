<template>
  <div
    class="editor-toolbar-item"
    :class="{ 'editor-toolbar-item-active': props.editor?.isActive('code') }"
    @click="props.editor?.chain().focus().toggleCode().run()"
  >
    <v-tooltip activator="parent" text="行内代码" location="bottom" />
    <v-icon :icon="mdiCodeTags" />
  </div>
</template>

<script setup lang="ts">
import { mdiCodeTags } from "@mdi/js"

import type { EditorToolbarProps } from "@/components/Editor/Toolbar/types"

const props = defineProps<EditorToolbarProps>()
</script>
