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
import { onMounted, ref } from "vue"

import { getStyleVariable } from "@/tools/style"

const isCanvasSupported = ref(true)

onMounted(() => {
  const canvas = document.querySelector<HTMLCanvasElement>("#NotFound-Canvas")
  if (!canvas || !canvas.getContext) {
    isCanvasSupported.value = false
    return
  }

  const ctx = canvas.getContext("2d") as CanvasRenderingContext2D
  const fontFamily = getStyleVariable("font-family")
  let X = (canvas.width = window.innerWidth)
  let Y = (canvas.height = window.innerHeight)
  const snowNum = X < 768 ? 25 : 80
  const backSnowNum = X < 768 ? 25 : 80
  const treeNum = X < 768 ? 15 : 30
  const backTreeNum = X < 768 ? 8 : 16
  const trees: Tree[] = []
  const backTrees: Tree[] = []
  const radius = 150
  const snows: Snow[] = []
  const backSnows: Snow[] = []

  function drawGround() {
    ctx.beginPath()
    ctx.fillStyle = "rgb(255, 255, 255)"
    ctx.rect(0, Y, X, Y - Y * -0.1)
    ctx.fill()
  }
  function drawMoon() {
    ctx.save()
    ctx.beginPath()
    ctx.font = `5rem ${fontFamily}`
    ctx.strokeStyle = "gray"
    ctx.textAlign = "center"
    ctx.strokeText("404", X / 2 + 10, Y / 3 + 30)

    const col = "255, 255, 255"
    const g = ctx.createRadialGradient(X / 2, Y / 3, radius, X / 3, Y / 3, 0)
    g.addColorStop(0, `rgba(${col}, ${1 * 1})`)
    g.addColorStop(0.5, `rgba(${col}, ${1 * 0.2})`)
    g.addColorStop(1, `rgba(${col}, ${1 * 0})`)
    ctx.fillStyle = g
    ctx.arc(X / 2, Y / 3, radius, Math.PI * 2, 0)
    ctx.fill()
    ctx.restore()
  }

  class Snow {
    private ctx: CanvasRenderingContext2D
    private x = 0
    private y = 0
    private r = 0
    private c = ""
    private v = { x: 0, y: 0 }

    constructor(ctx: CanvasRenderingContext2D, x: number, y: number, r: number, g: number) {
      this.ctx = ctx
      this.init(x, y, r, g)
    }

    private init(x: number, y: number, r: number, g: number): void {
      this.x = x
      this.y = y
      this.r = r
      this.c = "255, 255, 255"
      this.v = {
        x: 0,
        y: g,
      }
    }

    private updatePosition(): void {
      this.y += this.v.y
    }

    private wrapPosition(): void {
      const X = this.ctx.canvas.width
      const Y = this.ctx.canvas.height

      if (this.x - this.r > X) {
        this.x = 0
      }
      if (this.x + this.r < 0) {
        this.x = X
      }
      if (this.y - this.r > Y) {
        this.y = 0
      }
      if (this.y + this.r < 0) {
        this.y = Y
      }
    }

    private draw(): void {
      const { ctx } = this
      ctx.save()
      ctx.beginPath()
      ctx.fillStyle = this.gradient()
      ctx.arc(this.x, this.y, this.r, Math.PI * 2, 0)
      ctx.fill()
      ctx.closePath()
      ctx.restore()
    }

    private gradient(): CanvasGradient {
      const col = this.c
      const g = this.ctx.createRadialGradient(this.x, this.y, 0, this.x, this.y, this.r)
      g.addColorStop(0, `rgba(${col}, ${1 * 1})`)
      g.addColorStop(0.5, `rgba(${col}, ${1 * 0.2})`)
      g.addColorStop(1, `rgba(${col}, ${1 * 0})`)
      return g
    }

    public resize(): void {
      const X = this.ctx.canvas.width
      const Y = this.ctx.canvas.height
      this.x = random(0, X)
      this.y = random(0, Y)
    }

    public render(): void {
      this.updatePosition()
      this.wrapPosition()
      this.draw()
    }
  }

  for (let i = 0; i < backSnowNum; i++) {
    const snow = new Snow(ctx, random(0, X), random(0, Y), random(1, 5), Math.random())
    backSnows.push(snow)
  }
  for (let i = 0; i < snowNum; i++) {
    const snow = new Snow(ctx, random(0, X), random(0, Y), random(10, 15), Math.random() + 0.3)
    snows.push(snow)
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
      this.x = random(0, X)
      this.y = Y
    }

    render() {
      this.draw()
    }
  }
  for (let i = 0; i < backTreeNum; i++) {
    const tree = new Tree(
      ctx,
      random(0, X),
      Y,
      random(200, 400),
      random(50, 100),
      "rgb(126, 158, 209)",
    )
    backTrees.push(tree)
  }
  for (let i = 0; i < treeNum; i++) {
    const tree = new Tree(
      ctx,
      random(0, X),
      Y,
      random(100, 300),
      random(20, 100),
      "rgb(255, 255, 255)",
    )
    trees.push(tree)
  }

  function render() {
    ctx.clearRect(0, 0, X, Y)
    drawMoon()
    drawGround()
    for (let i = 0; i < backSnows.length; i++) {
      backSnows[i]?.render()
    }
    for (let i = 0; i < backTrees.length; i++) {
      backTrees[i]?.render()
    }
    for (let i = 0; i < trees.length; i++) {
      trees[i]?.render()
    }
    for (let i = 0; i < snows.length; i++) {
      snows[i]?.render()
    }
    requestAnimationFrame(render)
  }
  render()

  function onResize() {
    X = canvas!.width = window.innerWidth
    Y = canvas!.height = window.innerHeight
    drawMoon()
    drawGround()
    for (let i = 0; i < backSnows.length; i++) {
      backSnows[i]?.resize()
    }
    for (let i = 0; i < backTrees.length; i++) {
      backTrees[i]?.resize()
    }
    for (let i = 0; i < trees.length; i++) {
      trees[i]?.resize()
    }
    for (let i = 0; i < snows.length; i++) {
      snows[i]?.resize()
    }
  }
  window.addEventListener("resize", onResize)
})
</script>
