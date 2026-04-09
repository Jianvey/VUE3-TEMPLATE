import type { ComposeOption } from "echarts/core"

import {
  BarChart,
  type BarSeriesOption,
  LineChart,
  type LineSeriesOption,
  PieChart,
  type PieSeriesOption,
} from "echarts/charts"
import {
  DatasetComponent,
  type DatasetComponentOption,
  GridComponent,
  type GridComponentOption,
  LegendComponent,
  type LegendComponentOption,
  TitleComponent,
  type TitleComponentOption,
  ToolboxComponent,
  type ToolboxComponentOption,
  TooltipComponent,
  type TooltipComponentOption,
  TransformComponent,
} from "echarts/components"
import * as echarts from "echarts/core"
import { LabelLayout, UniversalTransition } from "echarts/features"
import { SVGRenderer } from "echarts/renderers"

export type ECOption = ComposeOption<
  | BarSeriesOption
  | LineSeriesOption
  | PieSeriesOption
  | TitleComponentOption
  | TooltipComponentOption
  | ToolboxComponentOption
  | GridComponentOption
  | LegendComponentOption
  | DatasetComponentOption
>

echarts.use([
  TitleComponent,
  TooltipComponent,
  ToolboxComponent,
  GridComponent,
  DatasetComponent,
  LegendComponent,
  TransformComponent,
  BarChart,
  LineChart,
  PieChart,
  LabelLayout,
  UniversalTransition,
  SVGRenderer,
])

export default echarts
