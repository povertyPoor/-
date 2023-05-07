import Ball from "./ball"

export default class Lollipop extends Ball {
  constructor(centerX, centerY, radius, color = "#000", angle) {
    super(centerX, centerY, radius, color)
    // 当前小球的角度
    this.angle = angle
  }

  render(ctx) {
    super.render(ctx)
    // 是 Canvas 2D API 通过清空子路径列表开始一个新路径的方法
    ctx.beginPath()
    // 是 Canvas 2D API 将一个新的子路径的起始点移动到 (x，y) 坐标的方法
    ctx.moveTo(0, 0)
    // 是 Canvas 2D API 使用直线连接子路径的终点到 x，y 坐标的方法（并不会真正地绘制）
    ctx.lineTo(this.centerX, this.centerY)
    // 是 Canvas 2D API 使用非零环绕规则，根据当前的画线样式，绘制当前或已经存在的路径的方法
    ctx.stroke()
  }
}