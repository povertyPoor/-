export default class background {
  constructor(IMG_SRC, initWidth, initHight, screenWidth, screenHeight) {
    this.img = wx.createImage()
    this.img.src = IMG_SRC
    this.initWidth = initWidth
    this.initHight = initHight
    this.screenWidth = screenWidth
    this.screenHeight = screenHeight
  }
  
  render(ctx) {
    ctx.drawImage(this.img, this.initWidth, this.initHight, this.screenWidth, this.screenHeight)
  }
}