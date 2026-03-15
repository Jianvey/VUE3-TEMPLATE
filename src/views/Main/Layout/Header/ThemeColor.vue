<template>
  <div id="Layout-Header-ThemeColor" class="flex items-center">
    <v-menu open-on-hover open-delay="0">
      <template v-slot:activator="{ props }">
        <v-icon v-bind="props" :icon="mdiPalette" />
      </template>

      <v-list>
        <v-list-item
          v-for="item in menus"
          :key="item.command"
          :value="item.command"
          :disabled="theme.colorTheme === item.command"
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
import { mdiPalette } from "@mdi/js"

import useStore from "@/store"
import { ColorTheme } from "@/store/theme/types"

const { theme } = useStore()

const menus = [
  { label: "极光青", command: ColorTheme.DEFAULT },
  { label: "薰衣草", command: ColorTheme.LAVENDER },
]

const handleCommand = (colorTheme: ColorTheme) => theme.setColorTheme(colorTheme)
</script>
