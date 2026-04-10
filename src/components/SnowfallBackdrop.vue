<template>
  <div
    class="relative m-0 h-full w-full overflow-hidden bg-linear-to-b from-[#a6c1eeb3] to-[#74ebd533] p-0"
  >
    <canvas v-if="isCanvasSupported" id="SnowfallBackdrop"></canvas>
    <div class="absolute inset-0 flex items-center justify-center">
      <slot />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue"

import useCanvasAnimation from "@/hooks/useCanvasAnimation"
import { createSnowParticles } from "@/tools/snowfall"

const isCanvasSupported = ref(true)

useCanvasAnimation(
  "#SnowfallBackdrop",
  (canvas, ctx) => {
    let width = (canvas.width = window.innerWidth)
    let height = (canvas.height = window.innerHeight)
    const snowCount = width < 768 ? 25 : 80
    const backSnowCount = width < 768 ? 25 : 80
    const snows = createSnowParticles(ctx, snowCount, {
      radiusRange: [10, 15],
      speedRange: [0.3, 1.3],
    })
    const backSnows = createSnowParticles(ctx, backSnowCount, {
      radiusRange: [1, 5],
      speedRange: [0, 1],
    })

    function drawGround() {
      ctx.save()
      ctx.beginPath()
      ctx.fillStyle = "rgb(255, 255, 255)"
      ctx.rect(0, height, width, height - height * -0.1)
      ctx.fill()
      ctx.restore()
    }

    return {
      render() {
        ctx.clearRect(0, 0, width, height)
        drawGround()
        backSnows.forEach(snow => snow.render())
        snows.forEach(snow => snow.render())
      },
      resize() {
        width = canvas.width = window.innerWidth
        height = canvas.height = window.innerHeight
        drawGround()
        backSnows.forEach(snow => snow.resize())
        snows.forEach(snow => snow.resize())
      },
    }
  },
  () => {
    isCanvasSupported.value = false
  },
)
</script>
