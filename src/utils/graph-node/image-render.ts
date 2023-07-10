import { INodeGroup } from '@/components/graph/with-base-config'

type Options = {
  img: string
  size: number
  x: number
  y: number
  names?: string[]
  zIndex?: number
}
export default (group: INodeGroup, { img, size, x = 0, y = 0, names, zIndex }: Options) => {
  return group.addNodeShape('image', {
    attrs: {
      x, // 图片的圆点在左上角，移动都中间需要平移位置
      y, // 图片的圆点在左上角，移动都中间需要平移位置
      img,
      width: size,
      height: size,
      cursor: 'pointer',
    },
    names,
    draggable: true,
    crossorigin: '*',
    zIndex,
  })
}
