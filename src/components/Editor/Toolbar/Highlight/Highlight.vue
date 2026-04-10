<template>
  <v-menu :close-on-content-click="false" open-delay="0">
    <template #activator="{ props: menuProps }">
      <div
        class="editor-toolbar-item"
        :class="{ 'editor-toolbar-item-active': props.editor?.isActive('highlight') }"
        v-bind="menuProps"
      >
        <v-tooltip activator="parent" text="高亮" location="bottom" />
        <div class="flex flex-col items-center gap-0.5">
          <v-icon :icon="mdiFormatColorHighlight" size="16" />
          <span
            class="h-0.75 w-4 rounded-full transition-colors"
            :style="{ backgroundColor: currentColor ?? '#ffd43b' }"
          />
        </div>
      </div>
    </template>

    <div
      class="overflow-hidden rounded-xl border border-gray-100 bg-white shadow-lg dark:border-gray-700 dark:bg-[#2a2a2a]"
    >
      <v-color-picker
        :model-value="currentColor ?? '#ffd43b'"
        mode="hex"
        hide-inputs
        elevation="0"
        @update:model-value="setHighlight"
      />
      <div class="border-t border-gray-100 px-2 py-1.5 text-gray-400 dark:border-gray-700">
        <v-btn
          variant="tonal"
          size="small"
          color="default"
          rounded="lg"
          block
          @click="props.editor?.chain().focus().unsetHighlight().run()"
        >
          <template #prepend>
            <span
              class="mr-1 inline-block h-3 w-3 rounded-full border border-gray-400 bg-white bg-[linear-gradient(135deg,transparent_45%,#f87171_45%,#f87171_55%,transparent_55%)]"
            />
          </template>
          清除高亮
        </v-btn>
      </div>
    </div>
  </v-menu>
</template>

<script setup lang="ts">
import { mdiFormatColorHighlight } from "@mdi/js"
import { computed } from "vue"

import type { EditorToolbarProps } from "@/components/Editor/Toolbar/types"

const props = defineProps<EditorToolbarProps>()

const currentColor = computed(
  () => props.editor?.getAttributes("highlight").color as string | undefined,
)

function setHighlight(color: string) {
  if (currentColor.value === color) {
    props.editor?.chain().focus().unsetHighlight().run()
  } else {
    props.editor?.chain().focus().setHighlight({ color }).run()
  }
}
</script>
