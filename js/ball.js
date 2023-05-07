export default class Ball {
  constructor(centerX, centerY, radius, color = "#000") {
    // x坐标
    this.centerX = centerX
    // y坐标
    this.centerY = centerY
    // 半径
    this.radius = radius
    // 小球颜色
    this.color = color
  }
  
  // 绘制小球
  render(ctx) {
    // 是 Canvas 2D API 通过清空子路径列表开始一个新路径的方法
    ctx.beginPath()
    // 是 Canvas 2D API 使用内部方式描述颜色和样式的属性
    ctx.fillStyle = this.color
    // 是 Canvas 2D API 描述画笔（绘制图形）颜色或者样式的属性
    ctx.strokeStyle = this.color
    // void ctx.arc(x, y, radius, startAngle, endAngle, anticlockwise)
    // 是 Canvas 2D API 绘制圆弧路径的方法。圆弧路径的圆心在 (x, y) 位置，半径为 r，根据anticlockwise （默认为顺时针）指定的方向从 startAngle 开始绘制，到 endAngle 结束
    ctx.arc(this.centerX, this.centerY, this.radius, 0, 2 * Math.PI)
    // 是 Canvas 2D API 根据当前的填充样式，填充当前或已存在的路径的方法
    ctx.fill()
    // 是 Canvas 2D API 使用非零环绕规则，根据当前的画线样式，绘制当前或已经存在的路径的方法
    ctx.stroke()
  }

  // 更新小球位置
  update(x, y) {
    this.centerX = x
    this.centerY = y
  }
}