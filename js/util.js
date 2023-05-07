export function randomHexColor() {
  // 随机生成十六进制颜色
  let color = Math.floor(Math.random() * 16777216).toString(16)
  // 生成ffffff以内的16进制数
  while (color.length < 6) {
    // while循环判断color位数，少于6位前面加0凑够6位
    color = "0" + color
  }
  // 返回"#"开头16进制颜色
  return "#" + color
}