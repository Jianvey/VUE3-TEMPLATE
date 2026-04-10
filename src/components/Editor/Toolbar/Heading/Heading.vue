<template>
  <v-menu open-delay="0">
    <template v-slot:activator="{ props: menuProps }">
      <div
        class="editor-toolbar-item"
        :class="{ 'editor-toolbar-item-active': props.editor?.isActive('heading') }"
        v-bind="menuProps"
      >
        <v-tooltip activator="parent" text="标题" location="bottom" />
        <v-icon :icon="mdiFormatHeaderPound" />
      </div>
    </template>

    <v-list>
      <v-list-item
        v-for="item in levels"
        :key="item.command"
        :value="item.command"
        :class="{
          'bg-gray-200 dark:bg-gray-700': props.editor?.isActive('heading', {
            level: item.command,
          }),
        }"
        @click="handleCommand(item.command)"
      >
        <v-list-item-title>
          <v-icon class="text-base" :icon="getHeaderIcon(item.command)" />
          <span class="ml-2 text-sm">{{ item.label }}</span>
        </v-list-item-title>
      </v-list-item>
    </v-list>
  </v-menu>
</template>

<script setup lang="ts">
import {
  mdiFormatHeader1,
  mdiFormatHeader2,
  mdiFormatHeader3,
  mdiFormatHeader4,
  mdiFormatHeader5,
  mdiFormatHeader6,
  mdiFormatHeaderPound,
} from "@mdi/js"

import type { Level, Levels } from "@/components/Editor/Toolbar/Heading/types"
import type { EditorToolbarProps } from "@/components/Editor/Toolbar/types"

const props = defineProps<EditorToolbarProps>()
const levels: Levels[] = [
  { label: "标题一", command: 1 },
  { label: "标题二", command: 2 },
  { label: "标题三", command: 3 },
  { label: "标题四", command: 4 },
  { label: "标题五", command: 5 },
  { label: "标题六", command: 6 },
]

function getHeaderIcon(command: Level) {
  if (command === 1) return mdiFormatHeader1
  else if (command === 2) return mdiFormatHeader2
  else if (command === 3) return mdiFormatHeader3
  else if (command === 4) return mdiFormatHeader4
  else if (command === 5) return mdiFormatHeader5
  else if (command === 6) return mdiFormatHeader6
}
function handleCommand(command: Level) {
  props.editor?.chain().focus().toggleHeading({ level: command }).run()
}
</script>
