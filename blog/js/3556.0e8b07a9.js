(self.webpackChunkblog=self.webpackChunkblog||[]).push([[3556],{3556:n=>{n.exports="### Canvas\n\n市面上 Web 端图表库基本都是基于 Canvas 进行绘制的, 究其原因: Canvas 相对更加底层, 在处理图像交互上更具优势。\n\n### API\n\n* `线性渐变`\n  * createLinearGradient(x0: number, y0: number, x1: number, y1: number)\n  * addColorStop(offset: number, color: string): void\n* `径向渐变`\n  * createRadialGradient(x0: number, y0: number, r0: number, x1: number, y1: number, r1: number)\n* `路径`\n  * 开始一段新路径: ctx.beginPath()\n  * 开始: ctx.moveTo(x, y)\n  * 经过: ctx.lineTo(x, y)\n  * 路径为线: ctx.stroke()\n  * 设置线的颜色: ctx.strokeStyle = gradient\n  * `曲线`: ctx.bezierCurveTo(cplx, cp1y, cp2x, cp2y, x, y)\n* `圆`\n  * ctx.arc(x, y, radius, startAngle, endAngle [, counterclockwise])\n* `画布的变换`\n  * 注意: 画布变换的操作需要前置。\n  * `画布平移`: ctx.translate(x, y)\n  * `画布旋转`: ctx.rotate(Math.PI / 180 * 10): 旋转 10°\n  * `画布缩放`: ctx.scale(x, y)\n    * 沿原点镜像: ctx.scale(-1, -1)\n    * 沿 x 轴镜像: ctx.scale(1, -1)\n    * 沿 y 轴镜像: ctx.scale(-1, 1)\n* `状态`\n  * ctx.save()\n  * ctx.restore()\n* `文字`\n  * 在 (x, y) 位置绘制文字: ctx.fillText('文字', x, y)\n  * 测量文字: ctx.measureText('文字')\n"}}]);