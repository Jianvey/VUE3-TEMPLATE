<template>
  <div
    class="relative m-0 h-full w-full overflow-hidden bg-linear-to-b from-[#a6c1eeb3] to-[#74ebd533] p-0"
  >
    <canvas id="SnowfallBackdrop"></canvas>
    <div class="absolute inset-0 flex items-center justify-center">
      <slot />
    </div>
  </div>
</template>

<script setup lang="ts">
import { random } from "radash"
import { onMounted, ref } from "vue"

const isCanvasSupported = ref(true)

onMounted(() => {
  const canvas = document.querySelector<HTMLCanvasElement>("#SnowfallBackdrop")
  if (!canvas || !canvas.getContext) {
    isCanvasSupported.value = false
    return
  }

  const ctx = canvas.getContext("2d") as CanvasRenderingContext2D
  let X = (canvas.width = window.innerWidth)
  let Y = (canvas.height = window.innerHeight)
  const snowNum = X < 768 ? 25 : 80
  const backSnowNum = X < 768 ? 25 : 80

  const snows: Snow[] = []
  const backSnows: Snow[] = []

  function drawGround() {
    ctx.beginPath()
    ctx.fillStyle = "rgb(255, 255, 255)"
    ctx.rect(0, Y, X, Y - Y * -0.1)
    ctx.fill()
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

  function render() {
    ctx.clearRect(0, 0, X, Y)
    drawGround()
    for (let i = 0; i < backSnows.length; i++) {
      backSnows[i]?.render()
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
    drawGround()
    for (let i = 0; i < backSnows.length; i++) {
      backSnows[i]?.resize()
    }
    for (let i = 0; i < snows.length; i++) {
      snows[i]?.resize()
    }
  }
  window.addEventListener("resize", onResize)
})
</script>
