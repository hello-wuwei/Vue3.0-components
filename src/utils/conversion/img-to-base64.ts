const imageToBase64 = (src: string) => {
  return new Promise((resolve, reject) => {
    try {
      const image = new Image()
      // 解决跨域问题
      image.setAttribute('crossOrigin', 'anonymous')
      image.src = src
      // image.onload为异步加载
      image.onload = () => {
        const canvas = document.createElement('canvas')
        canvas.width = image.width
        canvas.height = image.height
        const context: any = canvas.getContext('2d')
        context.drawImage(image, 0, 0, image.width, image.height)
        const quality = 0.8
        // 这里的dataurl就是base64类型
        // 使用toDataUrl将图片转换成jpeg的格式,不要把图片压缩成png，因为压缩成png后base64的字符串可能比不转换前的长！
        const dataurl = canvas.toDataURL('image/png', quality)
        resolve(dataurl)
      }
      image.onerror = (error) => {
        reject(error)
      }
    } catch (e) {
      reject(e)
    }
  })
}

export default imageToBase64
