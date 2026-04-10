<template>
  <div class="editor-toolbar-item" @click="openDialog">
    <v-tooltip activator="parent" text="插入图片" location="bottom" />
    <v-icon :icon="mdiImage" />
  </div>

  <v-dialog v-model="dialog" max-width="440">
    <v-card class="rounded-3xl">
      <v-card-title class="pt-6 pb-0 text-lg font-bold">插入图片</v-card-title>

      <v-card-text class="pb-2">
        <!-- tabs — only shown when uploadImage is provided -->
        <v-tabs v-if="props.uploadImage" v-model="tab" class="-mx-1 mb-4" density="compact">
          <v-tab value="upload">本地上传</v-tab>
          <v-tab value="url">网络链接</v-tab>
        </v-tabs>

        <!-- url tab (or only panel when no uploadImage) -->
        <template v-if="tab === 'url'">
          <v-text-field
            v-model="urlInput"
            label="图片地址"
            placeholder="https://"
            variant="outlined"
            density="compact"
            hide-details
            autofocus
            @keydown.enter.prevent="confirm"
          />
        </template>

        <!-- upload tab -->
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
            <p class="text-sm text-gray-500">点击选择或拖拽图片到此处</p>
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
            accept="image/*"
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
import { mdiImage, mdiUpload } from "@mdi/js"
import { computed, ref } from "vue"

import type { EditorToolbarProps } from "@/components/Editor/Toolbar/types"

interface ImageToolbarProps extends EditorToolbarProps {
  uploadImage?: (file: File) => Promise<string>
}

const props = defineProps<ImageToolbarProps>()

const dialog = ref(false)
const tab = ref<"url" | "upload">("url")
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
  tab.value = props.uploadImage ? "upload" : "url"
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
  if (file?.type.startsWith("image/")) {
    uploadFile.value = file
    errorMsg.value = ""
  }
}

async function confirm() {
  if (!canConfirm.value) return
  errorMsg.value = ""

  if (tab.value === "url") {
    insertImage(urlInput.value.trim())
    return
  }

  if (!uploadFile.value || !props.uploadImage) return
  uploading.value = true
  try {
    const url = await props.uploadImage(uploadFile.value)
    insertImage(url)
  } catch {
    errorMsg.value = "上传失败，请重试"
  } finally {
    uploading.value = false
  }
}

function insertImage(src: string) {
  props.editor?.chain().focus().setImage({ src }).run()
  dialog.value = false
}
</script>
