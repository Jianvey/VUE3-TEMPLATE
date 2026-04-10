<template>
  <div class="editor-toolbar-item" @click="props.editor?.chain().focus().setDetails().run()">
    <v-tooltip activator="parent" text="折叠块" location="bottom" />
    <v-icon :icon="mdiChevronRightBoxOutline" />
  </div>
</template>

<script setup lang="ts">
import { mdiChevronRightBoxOutline } from "@mdi/js"

import type { EditorToolbarProps } from "@/components/Editor/Toolbar/types"

const props = defineProps<EditorToolbarProps>()
</script>
