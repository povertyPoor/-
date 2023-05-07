// 图片路径
const IMG_SRC = 'js/images/bg.jpg'
// 屏幕的宽带
const screenWidth = window.innerWidth
// 屏幕的高度
const screenHeight = window.innerHeight

export default class background {
  constructor() {
    this.img = wx.createImage()
    this.img.src = IMG_SRC
  }
  
  render(ctx) {
    ctx.drawImage(this.img, 0, 0, screenWidth, screenHeight)
  }
}