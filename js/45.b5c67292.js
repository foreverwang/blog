(window.webpackJsonp=window.webpackJsonp||[]).push([[45],{735:function(n,t){n.exports="### 事件类型\n\n* load: window/img/script\n\n> img 标签上设置 src 属性, 就开始请求资源; script 设置完 src 要加载到 dom 上才开始请求资源。\n\n### 事件委托\n\n在 `document` 上使用事件委托, 好处如下:\n\n* 添加时机不受限(在 dom 任何生命周期的里都可添加)\n* 添加事件更快\n* 内存消耗也更小\n* 减少事件的垃圾回收(如果绑定在低层级的标签上, 标签内容消失时, 还需要手动执行清空事件内存)\n\n> [事件机制优化](https://github.com/MuYunyun/cpreact/issues/13)\n\n#### 区分 target 和 currentTarget\n\n* `currentTarget` 可以用于确定是`具体元素`上触发的事件;\n* `target` 用于事件委托;\n\n具体差异可以看以下 `demo`, 当点击 `你好` 时, 控制台输出两个 `true`; 当点击 `muyunyun` 时, 控制台输出一个 `true` 和一个 `false`。\n\n```html\n<body>\n\t<p id=\"test\">你好, <span>muyunyun</span></p>\n\t<script>\n\t\tconst content = document.getElementById('test')\n\t\tcontent.addEventListener('click', function(e) {\n\t\t\tconsole.log('currentTarget', e.currentTarget, 'target', e.target)\n\t\t\tconsole.log(this === e.currentTarget) // true\n\t\t\tconsole.log(this === e.target)        // false\n\t\t})\n\t<\/script>\n</body>\n```\n\n### 自定义事件\n\n(笔者认为)自定义事件可以归类到发布订阅模式下。\n\n```html\n<input id=\"sec\" />\n<script>\n  // 订阅\n  document.getElementById('sec').addEventListener('custom', function (obj) {\n    console.log(obj.detail) // { demo: this ia a demo }\n  })\n\n  // 发布\n  var ev = new CustomEvent('custom', { detail: { demo: 'this is a demo' } })\n  document.getElementById('sec').dispatchEvent(ev)\n<\/script>\n```\n\n### stopPropagation vs stopImmediatePropagation\n\n* stopPropagation: stop propagation `from child element to parent element`;\n* stopImmediatePropagation: stop propagation `the remaining same event type in one element`;"}}]);