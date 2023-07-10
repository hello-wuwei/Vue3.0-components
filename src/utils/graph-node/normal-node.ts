import NodeModel from '@/components/graph/type'
import { INodeGroup } from '@/components/graph/with-base-config'
import createNode from './create-node'
import exchangeUrl from '@/assets/svg/exchange-r.svg'
import nodeUserUrl from '@/assets/svg/node-user.svg'
import tokenUrl from '@/assets/svg/heyue.svg'
import { getNodeText, toShortAddr } from './utils'
const imgURL = import.meta.env.VITE_TAG_IMGURL

const r = 26

const getImage = (cfg: NodeModel) => {
  // 合约，显示本地图片
  if (cfg.tagType === 'token_address') {
    return tokenUrl
    // 合约，显示本地图片
  }
  if (cfg.imageName) {
    // 交易所，钱包地址，显示后端给的图片
    return imgURL + '/' + cfg.imageName
  }
}
const getIcon = (cfg: NodeModel) => {
  if (cfg.tagType === 'Exchange') {
    return exchangeUrl
  }
  if (cfg.tagType === 'Deposit') {
    return nodeUserUrl
  }
}

const getText = (cfg: NodeModel) => {
  const label = getNodeText(cfg.tagName, cfg.tagType)
  const text = toShortAddr(label.trim() || cfg.address)
  return text
}

export const getContent = (cfg: NodeModel) => {
  const img = getImage(cfg)
  const icon = getIcon(cfg)
  const text = getText(cfg)
  return { img, icon, text }
}

const config = {
  r,
  options: {
    // style: { background: '#fff' },
    stateStyles: {
      hover: {
        stroke: 'green',
      },
      selected: {},
    },
  },
  draw(cfg: NodeModel, group: INodeGroup) {
    const { img, icon, text } = getContent(cfg)
    const keyShape = createNode(cfg, group, { img, icon, text })
    return keyShape
  },
}

export default config
