<template>
  <div class="editor-toolbar-item" @click="openDialog">
    <v-tooltip activator="parent" text="插入音频" location="bottom" />
    <v-icon :icon="mdiMusicNote" />
  </div>

  <v-dialog v-model="dialog" max-width="440">
    <v-card class="rounded-3xl">
      <v-card-title class="pt-6 pb-0 text-lg font-bold">插入音频</v-card-title>

      <v-card-text class="pb-2">
        <!-- upload/url tabs — only when uploadAudio is provided -->
        <v-tabs v-if="props.uploadAudio" v-model="tab" class="-mx-1 mb-4" density="compact">
          <v-tab value="upload">本地上传</v-tab>
          <v-tab value="url">网络链接</v-tab>
        </v-tabs>

        <!-- url panel -->
        <template v-if="tab === 'url'">
          <v-text-field
            v-model="urlInput"
            label="音频地址"
            placeholder="https://"
            variant="outlined"
            density="compact"
            hide-details
            autofocus
            @keydown.enter.prevent="confirm"
          />
        </template>

        <!-- upload panel -->
        <template v-else>
          <div
            class="hover:border-primary-400 dark:hover:border-primary-500 flex cursor-pointer flex-col items-center justify-center gap-2 rounded-xl border-2 border-dashed border-gray-200 py-8 transition-colors dark:border-gray-700"
            :class="{ 'border-primary-400 dark:border-primary-500': isDragging }"
            @click="fileInputRef?.click()"
            @dragover.prevent="isDragging = true"
            @dragleave.prevent="isDragging = false"
            @drop.prevent="onDrop"
          >
            <v-icon :icon="mdiUpload" size="32" class="text-gray-400" />
            <p class="text-sm text-gray-500">点击选择或拖拽音频到此处</p>
            <p
              v-if="uploadFile"
              class="text-primary-600 dark:text-primary-400 max-w-full truncate text-xs"
            >
              {{ uploadFile.name }}
            </p>
          </div>
          <input
            ref="fileInputRef"
            type="file"
            accept="audio/*"
            class="hidden"
            @change="onFileChange"
          />
        </template>

        <v-alert v-if="errorMsg" type="error" density="compact" class="mt-2" :text="errorMsg" />
      </v-card-text>

      <v-card-actions class="px-6 pb-6">
        <v-spacer />
        <v-btn variant="text" :disabled="uploading" @click="dialog = false">取消</v-btn>
        <v-btn color="primary" :loading="uploading" :disabled="!canConfirm" @click="confirm">
          插入
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script setup lang="ts">
import { mdiMusicNote, mdiUpload } from "@mdi/js"
import { computed, ref } from "vue"

import type { EditorToolbarProps } from "@/components/Editor/Toolbar/types"

interface AudioToolbarProps extends EditorToolbarProps {
  uploadAudio?: (file: File) => Promise<string>
}

const props = defineProps<AudioToolbarProps>()

const dialog = ref(false)
const tab = ref<"upload" | "url">("url")
const urlInput = ref("")
const uploadFile = ref<File | null>(null)
const fileInputRef = ref<HTMLInputElement | null>(null)
const uploading = ref(false)
const isDragging = ref(false)
const errorMsg = ref("")

const canConfirm = computed(() => {
  if (tab.value === "url") return !!urlInput.value.trim()
  return !!uploadFile.value
})

function openDialog() {
  tab.value = props.uploadAudio ? "upload" : "url"
  urlInput.value = ""
  uploadFile.value = null
  if (fileInputRef.value) fileInputRef.value.value = ""
  errorMsg.value = ""
  uploading.value = false
  dialog.value = true
}

function onFileChange(e: Event) {
  const file = (e.target as HTMLInputElement).files?.[0]
  if (file) {
    uploadFile.value = file
    errorMsg.value = ""
  }
}

function onDrop(e: DragEvent) {
  isDragging.value = false
  const file = e.dataTransfer?.files?.[0]
  if (file?.type.startsWith("audio/")) {
    uploadFile.value = file
    errorMsg.value = ""
  }
}

async function confirm() {
  if (!canConfirm.value) return
  errorMsg.value = ""

  if (tab.value === "url") {
    insert(urlInput.value.trim())
    return
  }

  if (!uploadFile.value || !props.uploadAudio) return
  uploading.value = true
  try {
    const url = await props.uploadAudio(uploadFile.value)
    insert(url)
  } catch {
    errorMsg.value = "上传失败，请重试"
  } finally {
    uploading.value = false
  }
}

function insert(src: string) {
  props.editor?.chain().focus().insertContent({ type: "audio", attrs: { src } }).run()
  dialog.value = false
}
</script>
