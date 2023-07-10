import { INodeGroup } from '@/components/graph/with-base-config'
import imageRender from './image-render'
import NodeModel from '@/components/graph/type'

type CreateNodeOptions = {
  img?: string
  r?: number
  attrs?: any
  icon?: string
  text?: string
  textAttrs?: any
}

const defaultAttrs = {
  r: 26,
  lineWidth: 2,
  fill: '#fff',
  stroke: '#CCD0D9',
  cursor: 'pointer',
}

const defaultTextAttrs = {
  fill: '#333',
  textAlign: 'center',
  textBaseline: 'middle',
  fontSize: 12,
  fontWeight: 400,
  cursor: 'pointer',
}
export default (
  cfg: NodeModel,
  group: INodeGroup,
  { img, icon, text, textAttrs = {}, attrs = {} }: CreateNodeOptions
) => {
  const imgWidth = cfg.aggregated ? 36 : 26
  const iconWidth = 16
  const nodeAttrs = { ...defaultAttrs, ...attrs }
  const keyShape = group.addNodeShape('circle', { attrs: nodeAttrs })

  if (img) {
    imageRender(group, { img, size: imgWidth, x: -imgWidth / 2, y: -imgWidth / 2 })
  } else {
    group.addNodeShape('text', {
      attrs: { text, ...defaultTextAttrs, ...textAttrs },
      draggable: true,
    })
  }

  icon && imageRender(group, { img: icon, size: iconWidth, x: nodeAttrs.r - iconWidth, y: -nodeAttrs.r })

  return keyShape
}
