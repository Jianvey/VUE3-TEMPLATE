import { onMounted, onUnmounted } from "vue"

interface CanvasAnimation {
  render: () => void
  resize?: () => void
  destroy?: () => void
}

export default function useCanvasAnimation(
  selector: string,
  setup: (canvas: HTMLCanvasElement, ctx: CanvasRenderingContext2D) => CanvasAnimation | void,
  onUnsupported?: () => void,
) {
  let frameId: number | null = null
  let resizeHandler: (() => void) | null = null
  let destroy: (() => void) | void

  onMounted(() => {
    const canvas = document.querySelector<HTMLCanvasElement>(selector)
    if (!canvas) {
      onUnsupported?.()
      return
    }

    const ctx = canvas.getContext("2d")
    if (!ctx) {
      onUnsupported?.()
      return
    }

    const animation = setup(canvas, ctx)
    if (!animation) {
      return
    }

    if (animation.resize) {
      resizeHandler = animation.resize
      window.addEventListener("resize", resizeHandler)
    }

    const render = () => {
      animation.render()
      frameId = window.requestAnimationFrame(render)
    }

    destroy = animation.destroy
    render()
  })

  onUnmounted(() => {
    if (frameId !== null) {
      window.cancelAnimationFrame(frameId)
    }

    if (resizeHandler) {
      window.removeEventListener("resize", resizeHandler)
    }

    destroy?.()
  })
}
