import { IGroup } from '@antv/g6'
import clip from '../assets/clip.png'
import toContainer from './to-container'

type ClipOptions = { x: number; y: number; r?: number }
export default (group: IGroup, { x, y, r = 9 }: ClipOptions) => {
  const contentRender = (group: IGroup) => {
    return group.addShape('image', {
      attrs: {
        x: x - r, // 图片的圆点在左上角，移动都中间需要平移位置
        y: y - r, // 图片的圆点在左上角，移动都中间需要平移位置
        img: clip,
        width: r * 2,
        height: r * 2,
        cursor: 'pointer',
      },
      names: ['clip'],
      draggable: true,
      crossorigin: '*',
    })
  }

  return toContainer(group, { x, y, customNames: ['clip'], contentRender })
}
