import { ModelConfig } from '@antv/g6'
export default (startPoint: ModelConfig['startPoint'], endPoint: ModelConfig['endPoint']) => {
  if (!startPoint || !endPoint) return { innerPoint3: { x: 0, y: 0 }, xDist: 0 }
  const xDist = endPoint.x - startPoint.x
  const xTextDist = xDist * 0.5

  const innerPoint1 = {
    x: startPoint.x + xDist * 0.3,
    y: startPoint.y,
  }
  const innerPoint2 = {
    x: endPoint.x - xTextDist - xDist * 0.16,
    y: endPoint.y,
  }
  const innerPoint3 = {
    x: endPoint.x - xTextDist,
    y: endPoint.y,
  }
  const controlPoints = [innerPoint1, innerPoint2, innerPoint3]
  let points = [startPoint, { x: startPoint.x + xDist * 0.05, y: startPoint.y }] // 添加起始点
  // 添加控制点
  if (controlPoints) {
    points = points.concat(controlPoints)
  }
  // 添加结束点
  points.push(endPoint)

  const path = [
    ['M', points[0].x, points[0].y],
    ['L', points[1].x, points[1].y],
    ['C', points[2].x, points[2].y, points[3].x, points[3].y, points[4].x, points[4].y],
    ['L', points[4].x, points[4].y],
    ['L', points[5].x, points[5].y],
  ]

  return { path, innerPoint3, xDist }
}
