<template>
  <div id="Layout-Header-Theme" class="flex items-center">
    <v-menu open-on-hover open-delay="0">
      <template v-slot:activator="{ props }">
        <v-icon v-bind="props" :icon="mdiThemeLightDark" />
      </template>

      <v-list>
        <v-list-item
          v-for="item in menus"
          :key="item.command"
          :value="item.command"
          :disabled="theme.mode === item.command"
          @click="handleCommand(item.command)"
        >
          <v-list-item-title>
            {{ item.label }}
          </v-list-item-title>
        </v-list-item>
      </v-list>
    </v-menu>
  </div>
</template>

<script setup lang="ts">
import { mdiThemeLightDark } from "@mdi/js"

import useStore from "@/store"
import { Mode } from "@/store/theme/types"

const { theme } = useStore()
const menus = [
  { label: "亮色模式", command: Mode.LIGHT },
  { label: "暗黑模式", command: Mode.DARK },
  { label: "跟随系统", command: Mode.SYSTEM },
]

const handleCommand = (mode: Mode) => theme.setMode(mode)
</script>
