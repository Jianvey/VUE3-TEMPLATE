<template>
  <v-app :theme="theme.dark ? 'dark' : 'light'">
    <AppRouterView />

    <AppSnackbar />
  </v-app>
</template>

<script setup lang="ts">
import AppRouterView from "@/components/AppRouterView/AppRouterView.vue"
import useStore from "@/store"

const { theme, locale } = useStore()
locale.setLanguage(locale.language)
</script>
