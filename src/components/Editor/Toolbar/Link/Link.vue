<template>
  <div class="editor-toolbar-item" @click="openDialog">
    <v-tooltip activator="parent" text="链接" location="bottom" />
    <v-icon :icon="mdiLink" />
  </div>

  <v-dialog v-model="dialog" max-width="420">
    <v-card class="rounded-3xl">
      <v-card-title class="pt-6 pb-2 text-lg font-bold">插入链接</v-card-title>
      <v-card-text class="flex flex-col gap-3">
        <v-text-field
          v-model="url"
          label="链接地址"
          placeholder="https://"
          variant="outlined"
          density="compact"
          hide-details
          autofocus
          @keydown.enter.prevent="confirm"
        />
        <v-text-field
          v-model="text"
          label="链接文字（可选，有选区时无效）"
          variant="outlined"
          density="compact"
          hide-details
          @keydown.enter.prevent="confirm"
        />
      </v-card-text>
      <v-card-actions class="px-6 pb-6">
        <v-spacer />
        <v-btn variant="text" @click="dialog = false">取消</v-btn>
        <v-btn color="primary" :disabled="!url.trim() || !text.trim()" @click="confirm">确定</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script setup lang="ts">
import { mdiLink } from "@mdi/js"
import { ref } from "vue"

import type { EditorToolbarProps } from "@/components/Editor/Toolbar/types"

const props = defineProps<EditorToolbarProps>()

const dialog = ref(false)
const url = ref("")
const text = ref("")

function openDialog() {
  url.value = ""
  text.value = ""
  dialog.value = true
}

function confirm() {
  const href = url.value.trim()
  const label = text.value.trim()
  if (!href || !label) return
  props.editor?.chain().focus().setLink({ href, target: "_blank" }).insertContent(label).run()
  dialog.value = false
}
</script>
