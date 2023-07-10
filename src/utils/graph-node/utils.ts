import NodeModel from '@/components/graph/type'

export const fixed = (val?: number | null, n = 6) => {
  if (val === undefined || val === null) {
    return 0
  }
  return +val.toFixed(n)
}

export const toShortAddr = (s: string, n = 7) => {
  if (!s) return ''
  return s.substring(0, n - 2) + '...'
}

const typeMap: Record<string, string> = {
  wallet: 'User',
  deposit: 'User',
  token_address: 'Contract',
}

// 节点hover显示逻辑(type-tag)
export const getHoverTagText = (tagName: string, tagType: string) => {
  if (tagType === 'normal_address') return ''
  const type = typeMap[tagType.toLowerCase()] || tagType || ''
  const splitLine = type && tagName ? ': ' : ''
  return type + splitLine + tagName
}

// 节点文案显示逻辑(tag、type显示其一，优先显示tag)
export const getNodeText = (tagName: string, tagType: string) => {
  if (tagType === 'normal_address') return ''
  if (tagType === 'Black List') return tagName || tagType || ''
  return tagName ? tagName : typeMap[tagType] || tagType || ''
}

export const getPercent = (source: NodeModel, target: NodeModel) => {
  const total = target.direction === 'FRONT' ? source.frontTotalValue : source.backTotalValue
  if (!total) return '100%'
  const v = (target.value * 100) / total
  if (v < 0.01) return '<0.01%'
  return `${fixed(v, 2)}%`
}
