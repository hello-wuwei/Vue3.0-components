import { IGroup, ModelStyle, IShape } from '@antv/g6'
import NodeModel from './type'
import actionRender, { GetBtnOptions } from './action-render'

export type CustomConfig = {
  options?: ModelStyle
  draw: (cfg: NodeModel, group: INodeGroup) => void
  getBtnOptions?: GetBtnOptions
  r: number
}

export type INodeGroup = IGroup & { addNodeShape: (type: string, cfg: any) => IShape }
export default ({ r, ...config }: CustomConfig) => {
  return {
    options: config.options,
    draw(cfg: NodeModel, group: INodeGroup) {
      if (!cfg || !group) return
      actionRender(cfg, group, {
        getBtnOptions: config.getBtnOptions,
        r,
      })
      group.addNodeShape = (type, cfg) => {
        const shape = group.addShape(type, cfg)
        shape.set('names', ['address-node', ...(shape.get('names') || [])])
        return shape
      }
      const keyShape = config.draw(cfg, group)
      group.sort()
      return keyShape
    },
    getAnchorPoints: () => [
      [0, 0.5],
      [1, 0.5],
    ],
  }
}
