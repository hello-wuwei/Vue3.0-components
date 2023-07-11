import NodeModel from '@/components/graph/type'
import { INodeGroup } from '@/components/graph/with-base-config'
import createNode from './create-node'

const r = 26

const config = {
  r,
  options: {
    // style: { background: '#fff' },
    stateStyles: {
      hover: {
        stroke: 'green',
      },
      selected: {},
    },
  },
  draw(cfg: NodeModel, group: INodeGroup) {
    const keyShape = createNode(cfg, group, { text: cfg.label as string })
    return keyShape
  },
}

export default config
