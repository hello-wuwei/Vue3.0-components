import { IGroup } from '@antv/g6'
import toContainer from './to-container'
type ActionIconOptions = {
  customNames: string[]
  x: number
}
export default (group: IGroup, { customNames, x }: ActionIconOptions, methods?: any) => {
  const path = [
    ['M', x - 5, 0],
    ['L', x + 5, 0],
    ['M', x, -5],
    ['L', x, 5],
  ]

  const contentRender = (group: IGroup) => {
    return group.addShape('path', {
      attrs: {
        path,
        cursor: 'pointer',
        stroke: '#000000',
        lineWidth: 1,
        lineAppendWidth: 5,
      },
    })
  }

  return toContainer(group, { x, contentRender, customNames }, methods)
}
