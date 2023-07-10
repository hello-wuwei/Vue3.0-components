import { IGroup } from '@antv/g6'
import NodeModel from './type'
import extendButtonRender from './button/extend-button-render'
import hideButtonRender from './button/hide-button-render'
import numberButtonRender from './button/number-button-render'
import { ButtonName } from './type'

export type GetBtnOptions = (cfg: NodeModel) => {
  left?: { extend?: boolean; hidden?: boolean; show?: boolean }
  right?: { extend?: boolean; hidden?: boolean; show?: boolean }
}
const defaultBtnOptions = {
  left: { extend: false, hidden: false, show: false },
  right: { extend: false, hidden: false, show: false },
}

const defaultOptions = { r: 26 }
type Options = Partial<typeof defaultOptions> & { getBtnOptions?: GetBtnOptions }

const actionRender = (cfg: NodeModel, group: IGroup, options: Options = {}) => {
  // console.log(cfg)
  const { r, getBtnOptions = () => ({ left: undefined, right: undefined }) } = {
    ...defaultOptions,
    ...options,
  }
  const buttonOffset0 = 12
  const buttonOffset1 = 34
  const btnOptions = getBtnOptions(cfg) || {}

  const left = { ...defaultBtnOptions.left, ...btnOptions.left }
  const right = { ...defaultBtnOptions.right, ...btnOptions.right }

  const getButton: (name: ButtonName) => IGroup = (name) => {
    const map = {
      'extend-left': extendLeftButton,
      'hidden-left': hideLeftButton,
      'extend-right': extendRightButton,
      'hidden-right': hideRightButton,
      'show-left': showLeftButton,
      'show-right': showRightButton,
    }

    return map[name]
  }

  const extendLeftButton =
    left &&
    left.extend &&
    extendButtonRender(
      group,
      {
        customNames: ['extend-left'],
        x: -(r + buttonOffset0),
      },
      { getButton }
    )

  const hideLeftButton =
    left &&
    left.hidden &&
    hideButtonRender(
      group,
      {
        customNames: ['hidden-left'],
        x: -(r + buttonOffset1),
      },
      { getButton }
    )

  const showLeftButton =
    left &&
    left.show &&
    numberButtonRender(group, { customNames: ['show-left'], x: -(r + buttonOffset0) }, { getButton }).hide()

  const extendRightButton =
    right &&
    right.extend &&
    extendButtonRender(
      group,
      {
        customNames: ['extend-right'],
        x: r + buttonOffset0,
      },
      { getButton }
    )

  const hideRightButton =
    right &&
    right.hidden &&
    hideButtonRender(group, { customNames: ['hidden-right'], x: r + buttonOffset1 }, { getButton })

  const showRightButton =
    right &&
    right.show &&
    numberButtonRender(group, { customNames: ['show-right'], x: r + buttonOffset0 }, { getButton }).hide()
}

export type ActionRender = typeof actionRender

export default actionRender
