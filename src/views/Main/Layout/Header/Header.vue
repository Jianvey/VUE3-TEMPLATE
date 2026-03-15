<template>
  <div
    id="Layout-Header"
    class="flex h-(--layout-header-height) items-center justify-between border-b border-gray-200 px-3 text-base"
  >
    <v-icon size="3rem" class="text-primary">
      <LogoIcon />
    </v-icon>

    <div class="flex gap-5">
      <Language />
      <Theme />
      <ThemeColor />
      <User />
    </div>
  </div>
</template>

<script setup lang="ts">
import LogoIcon from "@/assets/icons/logo.svg"

import Language from "./Language.vue"
import Theme from "./Theme.vue"
import ThemeColor from "./ThemeColor.vue"
import User from "./User.vue"
</script>
