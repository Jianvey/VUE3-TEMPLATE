<template>
  <div class="editor-toolbar-item" @click="openDialog">
    <v-tooltip activator="parent" text="插入 YouTube 视频" location="bottom" />
    <v-icon :icon="mdiYoutube" />
  </div>

  <v-dialog v-model="dialog" max-width="480">
    <v-card class="rounded-3xl">
      <v-card-title class="pt-6 pb-2 text-lg font-bold">插入 YouTube 视频</v-card-title>
      <v-card-text>
        <v-text-field
          v-model="url"
          label="YouTube 链接"
          placeholder="https://www.youtube.com/watch?v=..."
          variant="outlined"
          density="compact"
          autofocus
          hide-details
          @keydown.enter="insert"
        />
      </v-card-text>
      <v-card-actions class="px-6 pb-6">
        <v-spacer />
        <v-btn variant="text" @click="dialog = false">取消</v-btn>
        <v-btn color="primary" :disabled="!url.trim()" @click="insert">插入</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script setup lang="ts">
import { mdiYoutube } from "@mdi/js"

import type { EditorToolbarProps } from "@/components/Editor/Toolbar/types"

const props = defineProps<EditorToolbarProps>()

const dialog = ref(false)
const url = ref("")

const openDialog = () => {
  url.value = ""
  dialog.value = true
}

const insert = () => {
  const trimmed = url.value.trim()
  if (!trimmed) return
  props.editor?.chain().focus().setYoutubeVideo({ src: trimmed }).run()
  dialog.value = false
}
</script>
