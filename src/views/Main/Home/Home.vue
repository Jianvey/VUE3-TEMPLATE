<template>
  <div
    id="Home"
    class="flex-center text-primary flex h-full w-full items-center text-6xl select-none"
    @click="handleClick"
  >
    {{ $t("Hello") }}
  </div>
</template>

<script setup lang="ts">
import { t } from "@/tools/locale"
import { snackbar } from "@/tools/snackbar"

function handleClick() {
  snackbar.success(t("Hello"))
}
</script>
