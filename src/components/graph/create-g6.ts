import G6 from '@antv/g6'

import registerEdge, { EdgeOptions } from './register-edge'
import createTooltip, { TooltipOptions } from './create-tooltip'

export type CreateG6Options = {
  el: HTMLDivElement
  edgeLabelRender?: EdgeOptions['edgeLabelRender']
  hideClip?: EdgeOptions['hideClip']
  nodeTooltipRender?: TooltipOptions['nodeTooltipRender']
  edgeTooltipRender?: TooltipOptions['edgeTooltipRender']
  getEdgeStroke?: EdgeOptions['getEdgeStroke']
  defaultNodeType?: string
}
const createG6 = (
  data: any,
  { el, edgeLabelRender, nodeTooltipRender, edgeTooltipRender, hideClip, getEdgeStroke, defaultNodeType }: CreateG6Options
) => {
  const height = el.offsetHeight || 800
  const width = el.offsetWidth || 1000
  // 定制线
  G6.registerEdge('default-edge', registerEdge({ edgeLabelRender, hideClip, getEdgeStroke }) as any)
  // 小地图
  const minimap = new G6.Minimap({
    size: [220, 120],
  })
  // 点提示框交互工具的配置
  const tooltip = new G6.Tooltip(createTooltip({ nodeTooltipRender, edgeTooltipRender }))
  const graph = new G6.TreeGraph({
    container: el,
    width,
    height,
    modes: {
      default: ['drag-canvas', 'zoom-canvas'],
    },
    defaultNode: {
      type: defaultNodeType,
    },
    defaultEdge: {
      type: 'default-edge',
    },
    layout: {
      type: 'compactBox',
      direction: 'H',
      getHeight: () => {
        return 25
      },
      getWidth: () => {
        return 25
      },
      getVGap: () => {
        return 35
      },
      getHGap: () => {
        return 150
      },
      getSide: (d: any) => {
        // 设置方向
        return {
          BACK: 'right',
          FRONT: 'left',
        }[d.data.direction as 'BACK' | 'FRONT']
      },
    },
    plugins: [minimap, tooltip],
  })

  graph.data(data)
  graph.render()

  graph.fitCenter()

  return graph
}

export default createG6
