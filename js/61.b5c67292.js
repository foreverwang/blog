(window.webpackJsonp=window.webpackJsonp||[]).push([[61],{751:function(n,e){n.exports="### 文本属性\n\n* `text-indent`: 文本缩进。\n  * 注意只能用于块级元素;\n  * 子元素使用百分数等相关声明值的时候孙子元素继承的是具体值;\n* `text-align`: 对齐方式。\n  * 有 `left、center、right、justify` 这几个属性;\n  * justify 的含义是两边缘对齐, 中间用空格填补;\n* `line-height`: 行高。\n  * 行高与 `font-size` 之差为行间距;\n  * 文本垂直居中可以这样写:\n\n```css\n.demo {\n  font-size: 13px;\n  line-height: 13px;\n}\n\n/* 效果等于 */\n\n.demo {\n  font-size: 13px;\n  line-height: 1;\n}\n```\n\n* `vertical-align`: 垂直对齐文本。\n  * 适用于`行内元素`以及表格元素;\n  * 后面跟百分数是相对使用该属性节点本身 `line-height` 计算的;\n\n![](http://with.muyunyun.cn/0183be5dea65edfa32a0fc5e7b0b3d12.jpg)\n\n解答: vertical-align 默认属性是 baseline, 多出的高度是「幽灵空白节点」的 line-height 的占位。详细解答可见 [CSS深入理解vertical-align和line-height的基友关系](https://www.zhangxinxu.com/wordpress/2015/08/css-deep-understand-vertical-align-and-line-height/)\n\n* `text-transform`: 文本转换。\n  * `uppercase`、`lowercase`、`capitalize`\n* `text-decration`: 文本装饰。\n  * `underline`、`outerline`、`line-through`;\n  * 该属性不会继承;\n* `white-space`: 处理换行符。\n  * 其属性值见下列表格, 不太好记忆, 用得最多的是 normal(默认) 以及 nowrap, 大体知道带 pre 的是会保留换行符的, 用到的时候查表。\n\n| 值       | 空白符 | 换行符 | 自动换行 |\n| :------- | :----- | :----- | :------- |\n| normal   | 合并   | 忽略   | 允许     |\n| nowrap   | 合并   | 忽略   | 不允许   |\n| pre      | 保留   | 保留   | 不允许   |\n| pre-line | 合并   | 保留   | 允许     |\n| pre-wrap | 保留   | 保留   | 允许     |\n\n阅读完第 6 章"}}]);