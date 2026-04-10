<template>
  <component
    :is="props.type === 'audio' ? 'audio' : 'video'"
    ref="playerRef"
    controls
    v-bind="props.type !== 'audio' ? { playsinline: true, 'data-poster': props.poster } : {}"
  />
</template>

<script lang="ts" setup>
import Hls from "hls.js"
import Plyr from "plyr"

import usePlayer from "@/store/player"
import { snackbar } from "@/tools/snackbar"

import type { PlayerProps } from "./types"

const emits = defineEmits(["play"])
const props = withDefaults(defineProps<PlayerProps>(), {
  src: "",
  type: "video",
  poster: "",
  plyrProps: () => ({}),
})

const PlayerInstance = useTemplateRef<HTMLMediaElement>("playerRef")
const { register, unregister, pauseOthers } = usePlayer()
const player = shallowRef<Plyr>()
const hls = shallowRef<Hls>()
const options = reactive<Plyr.Options>({
  i18n: { speed: "速度", normal: "正常" },
  captions: { active: true, language: "auto", update: true },
  ...props.plyrProps,
})

function setupHls(video: HTMLMediaElement) {
  if (!props.src) return

  // 音频直接设置 src，不走 HLS
  if (props.type === "audio") return (video.src = props.src)

  // 销毁旧的 HLS 实例，避免多实例冲突
  if (hls.value) {
    hls.value.destroy()
    hls.value = undefined
  }

  if (Hls.isSupported()) {
    hls.value = new Hls()
    hls.value.loadSource(props.src)
    hls.value.attachMedia(video)
  } else if (video.canPlayType("application/vnd.apple.mpegurl")) {
    video.src = props.src
  } else {
    snackbar.error("不支持本站视频，建议更换谷歌浏览器")
  }
}

watch(
  () => props.src,
  async src => {
    if (!src) return
    await nextTick()
    try {
      const video = PlayerInstance.value
      if (!video) return

      if (!player.value) {
        player.value = new Plyr(video, options)
        register(player.value)
        player.value.on("play", event => {
          pauseOthers(event.detail.plyr)
          emits("play", event.detail.plyr)
        })
      }

      setupHls(video)
    } catch {
      snackbar.error("视频加载失败")
    }
  },
  { immediate: true },
)

onBeforeUnmount(() => {
  hls.value?.destroy()
  hls.value = undefined
  if (player.value) {
    unregister(player.value)
    player.value.destroy()
    player.value = undefined
  }
})
</script>
