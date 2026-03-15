<template>
  <div id="Layout-Header-Language" class="flex items-center">
    <v-menu open-on-hover open-delay="0">
      <template v-slot:activator="{ props }">
        <v-icon v-bind="props" :icon="mdiTranslate" />
      </template>

      <v-list>
        <v-list-item
          v-for="item in locales"
          :key="item.language"
          :value="item.language"
          :disabled="locale.language === item.language"
          @click="handleCommand(item.language)"
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
import { mdiTranslate } from "@mdi/js"

import locales from "@/locale"
import type { Language } from "@/locale/types"
import useStore from "@/store"

const { locale } = useStore()
const handleCommand = (language: Language) => locale.setLanguage(language)
</script>
