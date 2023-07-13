import G6, { TreeGraph, Item, IEdge, IG6GraphEvent, TreeGraphData, LayoutConfig } from '@antv/g6'
import createG6 from './create-g6'
import NodeModel from './type'
import withBaseConfig, { CustomConfig } from './with-base-config'
import { GetBtnOptions } from './action-render'
import './style.css'

type D = {
  flow: 'FRONT' | 'BACK'
  cacheChildren: 'cacheFrontChildren' | 'cacheBackChildren'
  hideChildren: 'hideFrontChildren' | 'hideBackChildren'
  unFlow: D['flow']
}

type Props = {
  defaultNodeType: string
  layout: LayoutConfig
  beforeCreate: (options: { registerNode: RegisterNode }, g6: typeof G6) => void
  onNodeClick: (model: NodeModel, item: Item) => void
  onEdgeClick: (model: { targetModel: NodeModel; sourceModel: NodeModel }, item: IEdge) => void
  extendMethod: (model: NodeModel, dic: D, names: string[]) => TreeGraphData[] | Promise<TreeGraphData[]>
  edgeLabelRender: (model: { targetModel: NodeModel; sourceModel: NodeModel }) => string
  onClipClick: (model: { targetModel: NodeModel; sourceModel: NodeModel }) => void
  hideClip: (model: { targetModel: NodeModel; sourceModel: NodeModel }) => boolean
  getEdgeStroke: (model: { targetModel: NodeModel; sourceModel: NodeModel }) => string
  nodeTooltipRender: (model: NodeModel) => string
  edgeTooltipRender: (model: { targetModel: NodeModel; sourceModel: NodeModel }) => string
  getBtnOptions: GetBtnOptions
}

type RegisterNode = (type: string, options: CustomConfig, baseShape?: string) => void

class Graph {
  props?: Partial<Props>
  constructor(props?: Partial<Props>) {
    this.props = props
  }

  registerNode = (type: string, options: CustomConfig, baseShape?: string) => {
    G6.registerNode(type, withBaseConfig({ ...options, getBtnOptions: this.props?.getBtnOptions }) as any, baseShape)
  }

  createGraph = (data: any, options: { el: HTMLDivElement }) => {
    const { registerNode } = this
    const props = this.props
    props?.beforeCreate && props.beforeCreate({ registerNode }, G6)
    const graph = createG6(data, {
      ...options,
      defaultNodeType: props?.defaultNodeType,
      layout: props?.layout,
      edgeLabelRender: props?.edgeLabelRender,
      hideClip: props?.hideClip,
      getEdgeStroke: props?.getEdgeStroke,
      nodeTooltipRender: props?.nodeTooltipRender,
      edgeTooltipRender: props?.edgeLabelRender,
    })
    props && this.onEventListener(graph, props)
    return graph
  }

  interactive = (names: string[], model: NodeModel, graph: TreeGraph, e: IG6GraphEvent) => {
    const props = this.props
    const direction = names[1].split('-')[1]

    const dic = {
      left: { flow: 'FRONT', unFlow: 'BACK', cacheChildren: 'cacheFrontChildren', hideChildren: 'hideFrontChildren' },
      right: { flow: 'BACK', unFlow: 'FRONT', cacheChildren: 'cacheBackChildren', hideChildren: 'hideBackChildren' },
    }[direction] as D

    // 判断点击的时哪一个按钮以及方向
    if (names.includes(`extend-${direction}`)) {
      if (!props?.extendMethod) return
      const children = props?.extendMethod(model, dic, names) || []
      if (children instanceof Promise) {
        children.then((res) => {
          graph.updateChildren(res, model.id)
        })
      } else {
        graph.updateChildren(children, model.id)
      }
    }
    if (names.includes(`hidden-${direction}`)) {
      model[dic.hideChildren] = model.children.filter((item) => item.direction === dic.flow) as NodeModel[]
      const children = model.children.filter((item) => item.direction === dic.unFlow)
      graph.updateChildren(children, model.id)
      const methods = e.target.get('methods')
      methods.getButton(`extend-${direction}`).hide()
      methods.getButton(`hidden-${direction}`).hide()
      methods.getButton(`show-${direction}`).cfg.setText(model[dic.hideChildren].length).show()
    }
    if (names.includes(`show-${direction}`)) {
      const children = model.children.concat(model[dic.hideChildren])
      model[dic.hideChildren] = []
      graph.updateChildren(children, model.id)
      const methods = e.target.get('methods')
      methods.getButton(`extend-${direction}`).show()
      methods.getButton(`hidden-${direction}`).show()
      methods.getButton(`show-${direction}`).hide()
    }
  }

  onEventListener = (graph: TreeGraph, props: Partial<Props>) => {
    graph.on('node:click', (e) => {
      const names = e.target.get('names')
      if (!names) return
      if (names.includes('address-node')) {
        const model = e.item!.getModel() as NodeModel
        props.onNodeClick && props.onNodeClick(model, e.item!)
        return
      }
      const model = e.item!.getModel() as NodeModel

      this.interactive(names, model, graph, e)
    })

    graph.on('edge:click', (e) => {
      const names = e.target.get('names')
      const item = e.item as IEdge
      // 清除线上的效果
      const targetModel = item.getTarget().getModel() as NodeModel
      const sourceModel = item.getSource().getModel() as NodeModel
      if (names.includes('edge-line')) {
        props.onEdgeClick && props.onEdgeClick({ targetModel, sourceModel }, item)
        return
      }
      if (names.includes('clip')) {
        graph.removeChild(targetModel.id!)
        props.onClipClick && props.onClipClick({ targetModel, sourceModel })
      }
    })

    graph.on('node:mouseenter', (e) => {
      const names = e.target.get('names')
      if (!names) return
      if (names.includes('address-node')) graph.setItemState(e.item!, 'hover', true)
      if (names.includes('action')) {
        e.target.cfg.setHover!()
      }
    })

    graph.on('node:mouseleave', (e) => {
      if (e.item?.hasState('hover')) {
        graph.clearItemStates(e.item, 'hover')
        return
      }
    })

    graph.on('mouseleave', (e) => {
      const names = e.target.get('names')
      if (names && names.includes('action')) {
        e.target.cfg.clearHover()
      }
    })

    graph.on('edge:mouseenter', (e) => {
      if (!e.item) return
      const group = e.item.getKeyShape()
      group.cfg.setState && group.cfg.setState('hover', true)
      group.cfg.setClipState && group.cfg.setClipState(true)
    })

    graph.on('edge:mouseleave', (e) => {
      if (!e.item) return
      const group = e.item.getKeyShape()
      group.cfg.setState && group.cfg.setState('hover', false)
      group.cfg.setClipState && group.cfg.setClipState(false)
    })
  }
}

export default Graph
