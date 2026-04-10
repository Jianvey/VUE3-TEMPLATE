<template>
  <v-menu :close-on-content-click="false" open-delay="0">
    <template #activator="{ props: menuProps }">
      <div class="editor-toolbar-item" v-bind="menuProps">
        <v-tooltip activator="parent" text="文字颜色" location="bottom" />
        <div class="flex flex-col items-center gap-0.5">
          <v-icon :icon="mdiFormatColorText" size="16" />
          <span
            class="h-0.75 w-4 rounded-full transition-colors"
            :style="{ backgroundColor: currentColor ?? '#1a1a1a' }"
          />
        </div>
      </div>
    </template>

    <div
      class="overflow-hidden rounded-xl border border-gray-100 bg-white shadow-lg dark:border-gray-700 dark:bg-[#2a2a2a]"
    >
      <v-color-picker
        :model-value="currentColor ?? '#1a1a1a'"
        mode="hex"
        hide-inputs
        elevation="0"
        @update:model-value="setColor"
      />
      <div class="border-t border-gray-100 px-2 py-1.5 text-gray-400 dark:border-gray-700">
        <v-btn
          variant="tonal"
          size="small"
          color="default"
          rounded="lg"
          block
          @click="props.editor?.chain().focus().unsetColor().run()"
        >
          <template #prepend>
            <span
              class="mr-1 inline-block h-3 w-3 rounded-full border border-gray-400 bg-white bg-[linear-gradient(135deg,transparent_45%,#f87171_45%,#f87171_55%,transparent_55%)]"
            />
          </template>
          清除颜色
        </v-btn>
      </div>
    </div>
  </v-menu>
</template>

<script setup lang="ts">
import { mdiFormatColorText } from "@mdi/js"
import { computed } from "vue"

import type { EditorToolbarProps } from "@/components/Editor/Toolbar/types"

const props = defineProps<EditorToolbarProps>()

const currentColor = computed(
  () => props.editor?.getAttributes("textStyle").color as string | undefined,
)

function setColor(color: string) {
  props.editor?.chain().focus().setColor(color).run()
}
</script>
