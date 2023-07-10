import { IGroup } from '@antv/g6'
import toContainer from './to-container'
type ActionIconOptions = {
  customNames: string[]
  x: number
  text?: string | number
}
export default (group: IGroup, { customNames, x, text = 0 }: ActionIconOptions, methods?: any) => {
  const contentRender = (group: IGroup) => {
    return group.addShape('text', {
      attrs: {
        text,
        fill: '#000000',
        x,
        y: 0,
        fontWeight: 'normal',
        textAlign: 'center',
        textBaseline: 'middle',
      },
      draggable: true,
    })
  }

  return toContainer(group, { x, contentRender, customNames }, methods)
}
