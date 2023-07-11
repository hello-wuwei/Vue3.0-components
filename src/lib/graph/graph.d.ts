import G6, {
  Item,
  IEdge,
  NodeConfig,
  TreeGraphData,
  LayoutConfig,
  ModelStyle,
  IGroup,
  IShape,
  TreeGraph,
} from '@antv/g6'

export type Direction = 'BACK' | 'FRONT' | 'BOTH'
export type NodeData = {
  id: string
  direction: Direction
  children: NodeData[]
  cacheFrontChildren: NodeData[]
  cacheBackChildren: NodeData[]
  hideFrontChildren: NodeData[]
  hideBackChildren: NodeData[]
  [key: string]: any
}

type NodeModel = NodeConfig & NodeData

export type ButtonName = 'extend-left' | 'hidden-left' | 'extend-right' | 'hidden-right' | 'show-left' | 'show-right'

export type Name = 'address-node' | 'edge-line' | 'action' | 'clip' | ButtonName

export type Names = Name[]

type D = {
  flow: 'FRONT' | 'BACK'
  cacheChildren: 'cacheFrontChildren' | 'cacheBackChildren'
  hideChildren: 'hideFrontChildren' | 'hideBackChildren'
  unFlow: D['flow']
}

type INodeGroup = IGroup & { addNodeShape: (type: string, cfg: any) => IShape }

type GetBtnOptions = (cfg: NodeModel) => {
  left?: { extend?: boolean; hidden?: boolean; show?: boolean }
  right?: { extend?: boolean; hidden?: boolean; show?: boolean }
}

export type CustomConfig = {
  options?: ModelStyle
  draw: (cfg: NodeModel, group: INodeGroup) => void
  getBtnOptions?: GetBtnOptions
  r: number
}

type RegisterNode = (type: string, options: CustomConfig, baseShape?: string) => void

type Options = {
  defaultNodeType?: string
  layout?: LayoutConfig
  beforeCreate?: (options: { registerNode: RegisterNode }, g6: typeof G6) => void
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

export default class Graph {
  constructor(options: Options)
  /**
   * 开始创建树图，返回树图实例
   * @param data 渲染数据
   * @param options 配置项
   */
  createGraph(data: any, options: { el: HTMLDivElement }): TreeGraph
}
