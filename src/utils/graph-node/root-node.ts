import NodeModel from '@/components/graph/type'
import { INodeGroup } from '@/components/graph/with-base-config'
import createNode from './create-node'
import { getContent } from './normal-node'

const r = 26

const config = {
  r: r + 5,
  options: {},
  draw(cfg: NodeModel, group: INodeGroup) {
    const { img, icon, text } = getContent(cfg)
    createNode(cfg, group, {
      img,
      icon,
      text,
      attrs: { fill: '#7033FF', lineWidth: 0 },
      textAttrs: { fill: '#fff' },
    })
    const keyShape = group.addNodeShape('circle', {
      attrs: {
        r: r + 5,
        lineWidth: 2,
        stroke: '#7033FF',
        cursor: 'pointer',
      },
      names: ['root-node'],
    })
    return keyShape
  },
}
export default config
