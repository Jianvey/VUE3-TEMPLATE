interface SnowOptions {
  radiusRange: [number, number]
  speedRange: [number, number]
}

function randomBetween(min: number, max: number) {
  return Math.random() * (max - min) + min
}

export class SnowParticle {
  private x: number
  private y: number
  private radius: number
  private speed: number

  constructor(
    private readonly ctx: CanvasRenderingContext2D,
    x: number,
    y: number,
    radius: number,
    speed: number,
  ) {
    this.x = x
    this.y = y
    this.radius = radius
    this.speed = speed
  }

  private draw() {
    const gradient = this.ctx.createRadialGradient(this.x, this.y, 0, this.x, this.y, this.radius)
    gradient.addColorStop(0, "rgba(255, 255, 255, 1)")
    gradient.addColorStop(0.5, "rgba(255, 255, 255, 0.2)")
    gradient.addColorStop(1, "rgba(255, 255, 255, 0)")

    this.ctx.save()
    this.ctx.beginPath()
    this.ctx.fillStyle = gradient
    this.ctx.arc(this.x, this.y, this.radius, Math.PI * 2, 0)
    this.ctx.fill()
    this.ctx.closePath()
    this.ctx.restore()
  }

  private wrap() {
    const { width, height } = this.ctx.canvas

    if (this.x - this.radius > width) this.x = 0
    if (this.x + this.radius < 0) this.x = width
    if (this.y - this.radius > height) this.y = 0
    if (this.y + this.radius < 0) this.y = height
  }

  resize() {
    this.x = randomBetween(0, this.ctx.canvas.width)
    this.y = randomBetween(0, this.ctx.canvas.height)
  }

  render() {
    this.y += this.speed
    this.wrap()
    this.draw()
  }
}

export function createSnowParticles(
  ctx: CanvasRenderingContext2D,
  count: number,
  options: SnowOptions,
) {
  const { radiusRange, speedRange } = options

  return Array.from(
    { length: count },
    () =>
      new SnowParticle(
        ctx,
        randomBetween(0, ctx.canvas.width),
        randomBetween(0, ctx.canvas.height),
        randomBetween(radiusRange[0], radiusRange[1]),
        randomBetween(speedRange[0], speedRange[1]),
      ),
  )
}
