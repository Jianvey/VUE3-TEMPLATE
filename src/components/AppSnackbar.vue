<template>
  <v-snackbar-queue
    v-model="snackbar.queue"
    location="top right"
    collapsed
    closable
    :total-visible="3"
    display-strategy="overflow"
  />
</template>

<script setup lang="ts">
import useStore from "@/store"

const { snackbar } = useStore()
</script>
