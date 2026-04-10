<template>
  <div id="Layout-Header-User" class="flex items-center">
    <v-menu open-on-hover open-delay="0">
      <template v-slot:activator="{ props }">
        <div v-bind="props">
          <v-icon :icon="mdiAccountOutline" />
          {{ user.info?.userName }}
        </div>
      </template>

      <v-list>
        <v-list-item
          v-for="item in menus"
          :key="item.command"
          :value="item.command"
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
import { mdiAccountOutline } from "@mdi/js"
import { useRouter } from "vue-router"

import useStore from "@/store"
import { snackbar } from "@/tools/snackbar"

const router = useRouter()
const { user } = useStore()
const menus = [
  { label: "用户信息", command: "INFO" },
  { label: "退出登录", command: "LOGOUT" },
]

const handleCommand = (command: string) => {
  if (command === "INFO") {
    snackbar.info("用户信息功能开发中")
  } else if (command === "LOGOUT") {
    user.reset()
    router.replace({ name: "Login" })
  }
}
</script>
