import html2canvas from 'html2canvas'

import JsPDF from 'jspdf'

const clip = (canvas: HTMLCanvasElement, { x = 0, y, height }: any) => {
  const newCanvas = document.createElement('canvas')
  const context = newCanvas.getContext('2d')

  // context = '#ffffff'
  newCanvas.width = canvas.width
  newCanvas.height = height

  context!.drawImage(canvas, x, y, canvas.width, height, 0, y, canvas.width, height)
  return newCanvas
}

const marginTop = 0
const marginBottom = 0
const html2pdf = (el: HTMLElementEventMap) => {
  html2canvas(el, { allowTaint: true, scale: 2 }).then((canvas) => {
    // a4纸的正常尺寸是宽592.28，高是841.89，这里针对我自己的项目将宽高调换了
    const pageWidth = 595
    const pageHeight = 842
    const ratio = pageHeight / pageWidth
    const pageCanvasHeight = canvas.width * ratio
    const pageCanvasMarginTop = marginTop * (canvas.width / pageWidth)
    // 默认的偏移量
    const position = marginTop
    // 设置生成图片的宽高
    const imgCanvasWidth = pageWidth
    const imgCanvasHeight = (pageWidth / canvas.width) * canvas.height
    let imageHeight = imgCanvasHeight
    // 生成canvas截图，1表示生成的截图质量（0-1）
    const pageData = canvas.toDataURL('image/jpeg', 1)
    // new JsPDF接收三个参数，landscape表示横向，（默认不填是纵向），打印单位和纸张尺寸
    const PDF = new JsPDF('p', 'pt', 'a4')

    let clipCanvasStartY = 0
    // 当内容不超过a4纸一页的情况下
    if (imageHeight < pageHeight) {
      PDF.addImage(pageData, 'JPEG', 0, position, imgCanvasWidth, imgCanvasHeight)
    } else {
      // 当内容超过a4纸一页的情况下，需要增加一页
      while (imageHeight > 0) {
        const pageCanvas = clip(canvas, {
          y: clipCanvasStartY,
          height: pageCanvasHeight - pageCanvasMarginTop,
        })
        const pageImgCanvasHeight = (pageWidth / pageCanvas.width) * pageCanvas.height
        const pageData = pageCanvas!.toDataURL('image/jpeg', 1)
        PDF.addImage(pageData, 'JPEG', 0, position, imgCanvasWidth, pageImgCanvasHeight)
        imageHeight -= pageHeight - marginTop
        clipCanvasStartY = clipCanvasStartY + pageCanvasHeight - pageCanvasMarginTop
        // position -= pageHeight
        // 避免添加空白页
        if (imageHeight > 0) {
          PDF.addPage()
        }
      }
    }
    // 调用save方法生成pdf文件
    PDF.save('导出pdf' + '.pdf')
  })
}

export default html2pdf
