<template>
  <div ref="TurnstileRef" class="cf-turnstile" />
</template>

<script setup lang="ts">
import { CLOUDFLARE_TURNSTILE_SITE_KEY } from "@/global/env"
import useStore from "@/store"

const TurnstileInstance = useTemplateRef("TurnstileRef")
const { theme } = useStore()
const token = defineModel<string>()
const widgetId = ref<string>()

onMounted(turnstileRender)

function turnstileRender() {
  widgetId.value = turnstile.render(TurnstileInstance.value!, {
    sitekey: CLOUDFLARE_TURNSTILE_SITE_KEY,
    theme: theme.dark ? "dark" : "light",
    size: "flexible",
    callback: (t: string) => (token.value = t),
  })
}

defineExpose({
  reset() {
    token.value = ""
    nextTick(() => turnstile.reset(widgetId.value!))
  },
})
</script>
