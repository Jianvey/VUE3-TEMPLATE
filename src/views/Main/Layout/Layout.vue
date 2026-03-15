<template>
  <div id="Layout" class="flex h-screen w-screen">
    <div class="h-full w-full">
      <Header />

      <div class="h-[calc(100%-var(--layout-header-height))] w-full">
        <AppRouterView />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import AppRouterView from "@/components/AppRouterView/AppRouterView.vue"
import Header from "@/views/Main/Layout/Header/Header.vue"
</script>

<style lang="scss">
#Layout {
  --layout-header-height: 3.5rem;
}
</style>
