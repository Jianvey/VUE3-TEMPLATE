<template>
  <node-view-wrapper class="my-4">
    <Player type="audio" :src="props.node.attrs.src" />
  </node-view-wrapper>
</template>

<script setup lang="ts">
import { nodeViewProps, NodeViewWrapper } from "@tiptap/vue-3"

import Player from "@/components/Player/Player.vue"

const props = defineProps(nodeViewProps)
</script>
