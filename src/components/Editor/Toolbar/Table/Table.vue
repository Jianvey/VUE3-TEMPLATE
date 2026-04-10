<template>
  <div class="editor-toolbar-item" @click="openDialog">
    <v-tooltip activator="parent" text="插入表格" location="bottom" />
    <v-icon :icon="mdiTable" />
  </div>

  <v-dialog v-model="dialog" max-width="400">
    <v-card class="rounded-3xl">
      <v-card-title class="pt-6 pb-2 text-lg font-bold">插入表格</v-card-title>
      <v-card-text>
        <!-- 可视化格子选择器 -->
        <div
          class="mb-3 grid w-full cursor-pointer gap-0.5"
          style="grid-template-columns: repeat(8, 1fr)"
          @mouseleave="hover = null"
        >
          <button
            v-for="(_, i) in 48"
            :key="i"
            type="button"
            class="aspect-square rounded-sm border transition-colors duration-75"
            :class="
              isCellHighlighted(Math.floor(i / 8) + 1, (i % 8) + 1)
                ? 'border-primary-400 bg-primary-100 dark:border-primary-600 dark:bg-primary-900/40'
                : 'border-gray-200 dark:border-gray-700'
            "
            @mouseenter="hover = { r: Math.floor(i / 8) + 1, c: (i % 8) + 1 }"
            @click="selectGrid(Math.floor(i / 8) + 1, (i % 8) + 1)"
          />
        </div>
        <p class="mb-3 text-center text-xs text-gray-400">
          <span class="font-medium text-gray-600 dark:text-gray-300">
            {{ hover ? `${hover.r} × ${hover.c}` : `${rows} × ${cols}` }}
          </span>
          &nbsp;表格
        </p>
        <div class="flex items-center gap-3">
          <v-text-field
            v-model.number="rows"
            label="行数"
            type="number"
            :min="1"
            :max="20"
            variant="outlined"
            density="compact"
            hide-details
          />
          <span class="text-gray-400">×</span>
          <v-text-field
            v-model.number="cols"
            label="列数"
            type="number"
            :min="1"
            :max="10"
            variant="outlined"
            density="compact"
            hide-details
          />
        </div>
      </v-card-text>
      <v-card-actions class="px-6 pb-6">
        <v-spacer />
        <v-btn variant="text" @click="dialog = false">取消</v-btn>
        <v-btn color="primary" @click="confirm">插入</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script setup lang="ts">
import { mdiTable } from "@mdi/js"
import { ref } from "vue"

import type { EditorToolbarProps } from "@/components/Editor/Toolbar/types"

const props = defineProps<EditorToolbarProps>()

const dialog = ref(false)
const rows = ref(3)
const cols = ref(3)
const hover = ref<{ r: number; c: number } | null>(null)

function openDialog() {
  rows.value = 3
  cols.value = 3
  hover.value = null
  dialog.value = true
}

function isCellHighlighted(r: number, c: number) {
  const target = hover.value ?? { r: rows.value, c: cols.value }
  return r <= target.r && c <= target.c
}

function selectGrid(r: number, c: number) {
  rows.value = r
  cols.value = c
  confirm()
}

function confirm() {
  props.editor
    ?.chain()
    .focus()
    .insertTable({ rows: rows.value, cols: cols.value, withHeaderRow: true })
    .run()
  dialog.value = false
}
</script>
