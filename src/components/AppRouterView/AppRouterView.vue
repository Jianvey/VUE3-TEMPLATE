<template>
  <router-view v-slot="{ Component }">
    <transition name="page" mode="out-in" v-bind="$props.transition">
      <keep-alive :include="getKeepAliveNames()" v-bind="$props.keepAlive">
        <component :is="Component" />
      </keep-alive>
    </transition>
  </router-view>
</template>

<script setup lang="ts">
import { getKeepAliveNames } from "@/tools/router"

import type { AppRouterViewProps } from "./types"

defineProps<AppRouterViewProps>()
</script>
