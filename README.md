## 见缝插针

### 新建项目

打开微信开发者工具，选择小游戏，后端服务选择不使用云服务，模板选择默认的纯gl模式，点击确定新建项目。

<img src="C:/Users/Administrator/AppData/Roaming/Typora/typora-user-images/image-20230428105009073.png" alt="image-20230428105009073" style="zoom:67%;" />

新建完成后，默认的是项目自带的飞机大战小游戏，现在需要删除一些文件，使项目为初始状态。

```t
// main.js
const ctx = canvas.getContext('2d')

/**
 * 游戏主函数
 */
export default class Main {
  constructor() {

  }
}
```

