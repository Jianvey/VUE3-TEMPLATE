<template>
  <node-view-wrapper class="my-4">
    <Player :src="props.node.attrs.src" :poster="props.node.attrs.poster ?? ''" />
  </node-view-wrapper>
</template>

<script setup lang="ts">
import { nodeViewProps, NodeViewWrapper } from "@tiptap/vue-3"

import Player from "@/components/Player/Player.vue"

const props = defineProps(nodeViewProps)
</script>
