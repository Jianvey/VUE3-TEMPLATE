<template>
  <div class="m-0 h-screen w-full overflow-hidden bg-linear-to-b from-[#acb6e5] to-[#74ebd5] p-0">
    <canvas
      v-if="isCanvasSupported"
      id="NotFound-Canvas"
      class="h-screen w-screen tracking-[1.25rem]"
    ></canvas>
    <div v-else class="flex h-full w-full items-center justify-center text-3xl text-white">
      对不起! 您访问的页面不存在
    </div>
  </div>
</template>

<script setup lang="ts">
import { random } from "radash"
import { ref } from "vue"

import useCanvasAnimation from "@/hooks/useCanvasAnimation"
import { createSnowParticles } from "@/tools/snowfall"
import { getStyleVariable } from "@/tools/style"

const isCanvasSupported = ref(true)

useCanvasAnimation(
  "#NotFound-Canvas",
  (canvas, ctx) => {
    const fontFamily = getStyleVariable("font-family")
    let width = (canvas.width = window.innerWidth)
    let height = (canvas.height = window.innerHeight)
    const snowCount = width < 768 ? 25 : 80
    const backSnowCount = width < 768 ? 25 : 80
    const treeCount = width < 768 ? 15 : 30
    const backTreeCount = width < 768 ? 8 : 16
    const radius = 150
    const trees: Tree[] = []
    const backTrees: Tree[] = []
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

    function drawMoon() {
      ctx.save()
      ctx.beginPath()
      ctx.font = `5rem ${fontFamily}`
      ctx.strokeStyle = "gray"
      ctx.textAlign = "center"
      ctx.strokeText("404", width / 2 + 10, height / 3 + 30)

      const gradient = ctx.createRadialGradient(
        width / 2,
        height / 3,
        radius,
        width / 3,
        height / 3,
        0,
      )
      gradient.addColorStop(0, "rgba(255, 255, 255, 1)")
      gradient.addColorStop(0.5, "rgba(255, 255, 255, 0.2)")
      gradient.addColorStop(1, "rgba(255, 255, 255, 0)")
      ctx.fillStyle = gradient
      ctx.arc(width / 2, height / 3, radius, Math.PI * 2, 0)
      ctx.fill()
      ctx.restore()
    }

    class Tree {
      ctx: CanvasRenderingContext2D
      x = 0
      y = 0
      t = 0
      w = 0
      c = ""
      splitNum = 0
      tSplit = 0
      bSplit = 0

      constructor(
        ctx: CanvasRenderingContext2D,
        x: number,
        y: number,
        t: number,
        w: number,
        c: string,
      ) {
        this.ctx = ctx
        this.init(x, y, t, w, c)
      }

      init(x: number, y: number, t: number, w: number, c: string) {
        this.x = x
        this.y = y
        this.t = t
        this.w = w
        this.c = c
        this.splitNum = random(10, 30)
        this.tSplit = this.t / this.splitNum
        this.bSplit = this.w / this.splitNum
      }

      draw() {
        const { ctx } = this
        ctx.lineCap = "round"
        ctx.lineWidth = 3
        ctx.strokeStyle = this.c
        ctx.beginPath()
        ctx.moveTo(this.x, this.y)
        ctx.lineTo(this.x, this.y - this.t)
        ctx.stroke()
        ctx.lineWidth = 1
        for (let i = 1, j = this.splitNum; i < this.splitNum; i++, j--) {
          const bX1 = this.x + this.bSplit * j
          const bX2 = this.x - this.bSplit * j
          const branchRad = Math.PI / 8 // assuming a 45 degree angle for branches
          const bY = this.y - Math.tan(branchRad) * this.bSplit * j - this.tSplit * i
          ctx.moveTo(this.x, this.y - this.tSplit * i)
          ctx.lineTo(bX1, bY)
          ctx.stroke()
          ctx.moveTo(this.x, this.y - this.tSplit * i)
          ctx.lineTo(bX2, bY)
          ctx.stroke()
        }
      }

      resize() {
        this.x = random(0, width)
        this.y = height
      }

      render() {
        this.draw()
      }
    }

    for (let i = 0; i < backTreeCount; i++) {
      const tree = new Tree(
        ctx,
        random(0, width),
        height,
        random(200, 400),
        random(50, 100),
        "rgb(126, 158, 209)",
      )
      backTrees.push(tree)
    }
    for (let i = 0; i < treeCount; i++) {
      const tree = new Tree(
        ctx,
        random(0, width),
        height,
        random(100, 300),
        random(20, 100),
        "rgb(255, 255, 255)",
      )
      trees.push(tree)
    }

    return {
      render() {
        ctx.clearRect(0, 0, width, height)
        drawMoon()
        drawGround()
        backSnows.forEach(snow => snow.render())
        backTrees.forEach(tree => tree.render())
        trees.forEach(tree => tree.render())
        snows.forEach(snow => snow.render())
      },
      resize() {
        width = canvas.width = window.innerWidth
        height = canvas.height = window.innerHeight
        drawMoon()
        drawGround()
        backSnows.forEach(snow => snow.resize())
        backTrees.forEach(tree => tree.resize())
        trees.forEach(tree => tree.resize())
        snows.forEach(snow => snow.resize())
      },
    }
  },
  () => {
    isCanvasSupported.value = false
  },
)
</script>
