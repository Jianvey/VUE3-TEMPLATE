<template>
  <div
    id="Layout-Header"
    class="flex h-(--layout-header-height) items-center justify-between border-b border-gray-200 px-3 text-base"
  >
    <div class="flex items-center gap-3">
      <v-icon size="3rem" class="text-primary">
        <LogoIcon />
      </v-icon>

      <div class="flex items-center gap-2">
        <v-btn
          v-for="item in menus"
          variant="text"
          :key="item.path"
          :color="isActive(item.path) ? 'primary' : undefined"
          @click="handleNavigate(item.path)"
        >
          {{ item.label }}
        </v-btn>
      </div>
    </div>

    <div class="flex gap-5">
      <Language />
      <Theme />
      <ThemeColor />
      <User />
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from "vue"
import { useRoute, useRouter } from "vue-router"

import LogoIcon from "@/assets/icons/logo.svg"
import permissions from "@/router/permissions"
import { getMenuPermissions } from "@/tools/permission"

import Language from "./Language.vue"
import Theme from "./Theme.vue"
import ThemeColor from "./ThemeColor.vue"
import User from "./User.vue"

const route = useRoute()
const router = useRouter()
const menus = computed(() => getMenuPermissions(permissions))

function isActive(path: string) {
  return route.path === path || route.path.startsWith(`${path}/`)
}

function handleNavigate(path: string) {
  if (!isActive(path)) {
    router.push(path)
  }
}
</script>
