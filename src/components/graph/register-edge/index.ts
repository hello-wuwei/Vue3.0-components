import G6, { IGroup, IShape } from '@antv/g6'
import NodeModel from '../type'
import getEdgePath from './get-edge-path'
import clipButtonRender from '../button/clip-button-render'

export type EdgeOptions = {
  edgeLabelRender?: (model: { targetModel: NodeModel; sourceModel: NodeModel }) => string
  hideClip?: (model: { targetModel: NodeModel; sourceModel: NodeModel }) => boolean
  getEdgeStroke?: (model: { targetModel: NodeModel; sourceModel: NodeModel }) => string
}
export default ({ edgeLabelRender, hideClip = () => false, getEdgeStroke }: EdgeOptions) => {
  return {
    itemType: 'edge',
    draw: (cfg: NodeModel, group: IGroup) => {
      if (!cfg || !group) return
      const startPoint = cfg.startPoint
      const endPoint = cfg.endPoint
      if (!startPoint || !endPoint) return
      const { path, innerPoint3, xDist = 0 } = getEdgePath(startPoint, endPoint)
      if (!cfg.targetNode || !cfg.sourceNode) return
      const targetModel = cfg.targetNode.getModel()
      const sourceModel = cfg.sourceNode.getModel()

      const direction = targetModel.direction
      const stroke = getEdgeStroke ? getEdgeStroke({ targetModel, sourceModel }) : '#CCD0D9'
      const line = group.addShape('path', {
        attrs: {
          path,
          stroke,
          lineWidth: 2,
          lineAppendWidth: 15,
          startArrow: {
            path: direction !== 'BACK' ? G6.Arrow.triangle(10, 10, 0) : false,
            fill: '#CCD0D9',
          },
          endArrow: {
            path: direction === 'BACK' ? G6.Arrow.triangle(10, 10, 0) : false,
            fill: '#CCD0D9',
          },
        },
        names: ['edge-line'],
      })

      if (Math.abs(xDist) < 200) {
        return line
      }

      const x = xDist > 0 ? innerPoint3.x + 12 : endPoint.x + 14

      let textShape: IShape
      if (edgeLabelRender) {
        const text = edgeLabelRender({ targetModel, sourceModel })
        textShape = group.addShape('text', {
          attrs: {
            text,
            x,
            y: endPoint.y - 20,
            fontSize: 12,
            textAlign: 'left',
            textBaseline: 'middle',
            fill: '#000000',
            shapeKey: 'path-text',
            cursor: 'pointer',
          },
          names: ['edge-line'],
        })
      }

      group.cfg.setState = (name: string, value: boolean) => {
        if (name === 'hover') {
          const defaultStyle = {
            line: {
              stroke,
              startArrow: {
                path: direction !== 'BACK' ? G6.Arrow.triangle(10, 10, 0) : false,
                fill: stroke,
              },
            },
            text: { fill: '#000000' },
          }
          const hoverStyle = {
            line: {
              stroke: '#7033FF',
              startArrow: {
                path: direction !== 'BACK' ? G6.Arrow.triangle(10, 10, 0) : false,
                fill: '#7033FF',
              },
            },
            text: { fill: '#7033FF' },
          }

          const style = value ? hoverStyle : defaultStyle
          line.attr(style.line)
          textShape && textShape.attr(style.text)
        }
      }

      group.sort()

      if (!hideClip({ targetModel, sourceModel })) {
        const clipButton = clipButtonRender(group, { x: innerPoint3.x, y: innerPoint3.y }).hide()
        group.cfg.setClipState = (value: boolean) => {
          value ? clipButton.show() : clipButton.hide()
        }
      }
      return group
    },
  }
}
