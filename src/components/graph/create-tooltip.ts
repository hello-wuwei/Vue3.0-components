import { IEdge, IG6GraphEvent } from '@antv/g6'
import NodeModel from './type'

export type TooltipOptions = {
  nodeTooltipRender?: (model: NodeModel) => string
  edgeTooltipRender?: (model: { targetModel: NodeModel; sourceModel: NodeModel }) => string
}
const tooltipNames = ['address-node', 'edge-line', 'action']
export default ({ nodeTooltipRender, edgeTooltipRender }: TooltipOptions) => {
  return {
    offsetX: 10,
    offsetY: 10,
    // 允许出现 tooltip 的 item 类型
    itemTypes: ['node', 'edge'],
    className: 'tooltip-container',
    // 自定义 tooltip 内容
    getContent: (e: IG6GraphEvent | undefined) => {
      if (!e) return ''
      const getContainer = () => {
        const container = document.createElement('div')
        container.style.width = 'fit-content'
        return container
      }

      const container = getContainer()
      const model = e.item!.getModel() as NodeModel
      const names = e.target.get('names')
      if (!names) return ''
      if (names.includes('address-node') && nodeTooltipRender) {
        container.innerHTML = nodeTooltipRender(model)
        return container
      }

      if (names.includes('edge-line') && edgeTooltipRender) {
        const item = e.item as IEdge
        const targetModel = item.getTarget().getModel() as NodeModel
        const sourceModel = item.getSource().getModel() as NodeModel
        container.innerHTML = edgeTooltipRender({ targetModel, sourceModel })
        return container
      }

      const btnTips = {
        clip: 'Hide Node',
        'extend-left': 'Extend',
        'extend-right': 'Extend',
        'show-left': 'Show',
        'show-right': 'Show',
        'hidden-left': 'Hide',
        'hidden-right': 'Hide',
      }

      container.innerHTML = btnTips[names[1] as keyof typeof btnTips]

      return container
    },
    shouldBegin: (e: any) => {
      const names = e.target.get('names')
      if (names && tooltipNames.includes(names[0])) {
        return true
      }
      return false
    },
  }
}
