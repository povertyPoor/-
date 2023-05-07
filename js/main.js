import Ball from "./ball"
import Lollipop from "./lollipop"
import { randomHexColor } from "./util"
import Background from "./background"
const ctx = canvas.getContext('2d')


// 屏幕的宽带
const screenWidth = window.innerWidth
// 大圆的半径
const R = 100
// 小圆的半径
const r = 10
// 速度，每次移动一弧度
const slowSpeed = Math.PI / 180
// 速度，全部插入完成后的速度
const faseSpeed = 3 * slowSpeed
// 上面小球的数量
const lollipopCount = 6
// 下面小球的数量
const shootCount = 6
// 下方小球发射区距离圆心的位置
const offsetY = 300
// 判断是否结束游戏
let isGameOver = false
// 默认为慢速旋转
let speed = slowSpeed

/**
 * 游戏主函数
 */
export default class Main {
  constructor() {
    this.beginGame()
    this.init()
  }
  init() {
    // 上面小球的集合
    this.lollipopArray = []
    // 发射区的集合
    this.shootArray = []

    for (let i = 0; i < lollipopCount; i++) {
      // 上面小球的起始角度
      let angle = Math.PI * 2 / lollipopCount * i
      let centerX = R * Math.cos(angle)
      let centerY = R * Math.sin(angle)

      let lollipop = new Lollipop(centerX, centerY, r, randomHexColor(), angle)
      this.lollipopArray.push(lollipop)
    }
    
    for (let i = 0; i < shootCount; i++) {
      let centerX = 0
      let centerY = offsetY + i * 2 * r
      let shoot = new Ball(centerX, centerY, r, randomHexColor())
      this.shootArray.push(shoot)
    }

    this.bg = new Background()
  }

  beginGame() {
    canvas.removeEventListener(
      "touchstart",
      e => this.touchHandler(e)
    )

    canvas.addEventListener("touchstart", e => this.touchHandler(e))

    window.cancelAnimationFrame(this.aniId)
    this.aniId = window.requestAnimationFrame(
      () => this.loop(),
      canvas
    )
  }

  touchHandler(e) {
    // 如果失败，停止发射小球
    if (isGameOver) {
      return
    }

    this.shootBall()
  }

  shootBall() {
    if(!this.shootArray.length) return
    // shift，删除第一个小球
    const shootItem = this.shootArray.shift()
    // 更新位置
    this.updateShootPosition()
    // 碰撞检测
    this.isCollide(0, R)
    // 插入到正下方
    const lollipop = new Lollipop(0, R, r, shootItem.color, Math.PI / 2)
    this.lollipopArray.push(lollipop)
  }

  isCollide(x, y) {
    this.lollipopArray.forEach(item => {
      const distance = Math.sqrt((item.centerX - x) * (item.centerX - x) + (item.centerY - y) * (item.centerY - y))
      if(distance < 2 * item.radius) {
        isGameOver = true
      }
    })
  }

  updateShootPosition() {
    this.shootArray.forEach((item, index) => {
      item.update(0, offsetY + 2 * r * index)
    })
  }

  loop() {
    // 更新
    this.update()
    // 渲染
    this.render()
    this.aniId = window.requestAnimationFrame(
      () => this.loop(),
      canvas
    )
  }

  update() {
    // 如果失败了结束转动
    if (isGameOver) {
      return
    }

    // 如果全部发射玩下面的小球加速转动
    if (!isGameOver && this.shootArray.length === 0) {
      speed = faseSpeed
    }

    this.lollipopArray.forEach(item => {
      // 小球每次累加1°
      item.angle += speed

      // 获取当前的坐标
      let centerX = R * Math.cos(item.angle)
      let centerY = R * Math.sin(item.angle)

      // 更新小球的位置
      item.update(centerX, centerY)
    })
  }

  render() {
    // Canvas 2D API 的方法，这个方法通过把像素设置为透明以达到擦除一个矩形区域的目的
    ctx.clearRect(0, 0, canvas.width, canvas.height)

    // 是 Canvas 2D API 使用内部方式描述颜色和样式的属性。默认值是 #000 （黑色）
    ctx.fillStyle = "#fff"
    // 是 Canvas 2D API 绘制填充矩形的方法。当前渲染上下文中的fillStyle 属性决定了对这个矩形对的填充样式
    ctx.fillRect(0, 0, canvas.width, canvas.height)
    // 是 Canvas 2D API 描述画笔（绘制图形）颜色或者样式的属性。默认值是 #000 (black)
    ctx.strokeStyle = "black"

    this.bg.render(ctx)

    // 是 Canvas 2D API 通过将当前状态放入栈中，保存 canvas 全部状态的方法
    ctx.save()
    // 对当前网格添加平移变换的方法
    ctx.translate(screenWidth / 2, 200)

    this.lollipopArray.forEach(item => {
      item.render(ctx)
    })

    this.shootArray.forEach(item => {
      item.render(ctx)
    })

    // 绘制大圆
    ctx.beginPath();
    ctx.fillStyle = "pink"
    ctx.strokeStyle = "pink"
    ctx.arc(0, 0, 30, 0, 2 * Math.PI)
    ctx.fill()
    ctx.stroke()

    // 大圆中的小球数量
    ctx.font = "30px Georgia"
    ctx.fillStyle = "#fff"
    ctx.fillText(this.shootArray.length, -8, 8)

    // 是 Canvas 2D API 通过在绘图状态栈中弹出顶端的状态，将 canvas 恢复到最近的保存状态的方法。如果没有保存状态，此方法不做任何改变
    ctx.restore()

    // 失败后弹出文字
    if (isGameOver) {
      ctx.font = "30px Georgia"
      ctx.fillStyle = "red"
      ctx.fillText("Game Over", 10, 50)
    }
  }
}
