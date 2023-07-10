import { IGroup, IShape } from '@antv/g6'
type ActionIconOptions = {
  customNames: string[]
  contentRender: (group: IGroup) => IShape
  x: number
  y?: number
}

export default (group: IGroup, { x, y = 0, customNames, contentRender }: ActionIconOptions, methods = {}) => {
  const buttonGroup = group.addGroup({
    name: customNames[0],
    setText: (text: string | number) => {
      content.attr({ text })
      return buttonGroup
    },
  })
  const names = ['action', ...customNames]
  const button = buttonGroup.addShape('circle', {
    attrs: {
      x,
      y,
      r: 9,
      fill: '#FAFBFD',
      cursor: 'pointer',
      stroke: '#CCD0D9',
    },
    zIndex: 1,
  })
  const content = contentRender(buttonGroup)
  content.set('zIndex', 2)
  const type = content.get('type')
  // 添加一个容器形状，设置为透明（不设置其他样式），将zIndex设置为最高级，以便于mouseleave时捕捉到整个按钮元素
  const options = {
    attrs: {
      ...button.attr(),
      fillOpacity: 0,
      strokeOpacity: 0,
    },
    names,
    type: 'button',
    name: '',
    zIndex: 10,
    setHover() {
      if (type === 'image') return
      button.attr({ stroke: '#7033FF' })
      const text = content.attr('text')
      content.attr(text ? { fill: '#7033FF' } : { stroke: '#7033FF', fill: '#7033FF' })
    },
    clearHover() {
      if (type === 'image') return
      button.attr({ stroke: '#CCD0D9' })
      const text = content.attr('text')
      content.attr(text ? { fill: '#000000' } : { stroke: '#000000', fill: '#000000' })
    },
    methods,
  }

  buttonGroup.addShape('circle', options)

  buttonGroup.sort()

  return buttonGroup
}
