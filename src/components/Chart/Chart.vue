<template>
  <v-chart
    id="Chart"
    ref="ChartRef"
    :theme="theme.dark ? 'dark' : 'light'"
    :option="$props.option"
    :loading="$props.loading"
    :init-options="initOptions"
    :loading-options="loadingOptions"
    autoresize
  />
</template>

<script setup lang="ts">
import "@/components/Chart/theme"

import type { EChartsInitOpts } from "echarts"
import { useTemplateRef } from "vue"
import VChart from "vue-echarts"

import echarts from "@/components/Chart/echarts"
import type { ChartProps } from "@/components/Chart/types"
import useStore from "@/store"
import { toPX } from "@/tools/fit"

defineProps<ChartProps>()
const { theme } = useStore()
const chart = ref<echarts.ECharts>()
const instance = useTemplateRef("ChartRef")
const initOptions: EChartsInitOpts = { renderer: "svg", locale: "ZH" }
const loadingOptions = {
  text: "",
  spinnerRadius: toPX(16),
  lineWidth: toPX(2),
  color: `var(--color-primary-500)`,
  maskColor: `var(--color-mask)`,
}

defineExpose({ chart, instance: instance.value as InstanceType<typeof VChart> })
</script>

<style lang="scss">
#Chart {
  width: 100%;
  height: 100%;
}
</style>
