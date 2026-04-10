<template>
  <div class="flex">
    <div class="editor-toolbar-item" :class="{ 'opacity-30': !canSink }" @click="sink">
      <v-tooltip activator="parent" text="增加缩进（嵌套）" location="bottom" />
      <v-icon :icon="mdiFormatIndentIncrease" />
    </div>
    <div class="editor-toolbar-item" :class="{ 'opacity-30': !canLift }" @click="lift">
      <v-tooltip activator="parent" text="减少缩进" location="bottom" />
      <v-icon :icon="mdiFormatIndentDecrease" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { mdiFormatIndentDecrease, mdiFormatIndentIncrease } from "@mdi/js"

import type { EditorToolbarProps } from "@/components/Editor/Toolbar/types"

const props = defineProps<EditorToolbarProps>()

const itemType = computed(() => {
  if (props.editor?.isActive("taskList")) return "taskItem"
  return "listItem"
})

const canSink = computed(() => props.editor?.can().sinkListItem(itemType.value) ?? false)
const canLift = computed(() => props.editor?.can().liftListItem(itemType.value) ?? false)

const sink = () => props.editor?.chain().focus().sinkListItem(itemType.value).run()
const lift = () => props.editor?.chain().focus().liftListItem(itemType.value).run()
</script>
