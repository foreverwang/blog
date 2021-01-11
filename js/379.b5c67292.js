(window.webpackJsonp=window.webpackJsonp||[]).push([[379],{1069:function(n,e){n.exports="### 组件即函数\n\n在上一篇 [JSX 和 Virtual DOM](https://github.com/MuYunyun/blog/issues/24) 中, 解释了 JSX 渲染到界面的过程并实现了相应代码, 代码调用如下所示:\n\n```js\nimport React from 'react'\nimport ReactDOM from 'react-dom'\n\nconst element = (\n  <div className=\"title\">\n    hello<span className=\"content\">world!</span>\n  </div>\n)\n\nReactDOM.render(\n  element,\n  document.getElementById('root')\n)\n```\n\n本小节, 我们接着探究组件渲染到界面的过程。在此我们引入组件的概念, `组件本质上就是一个函数`, 如下就是一段标准组件代码:\n\n```jsx\nimport React from 'react'\n\n// 写法 1:\nclass A {\n  render() {\n    return <div>I'm componentA</div>\n  }\n}\n\n// 写法 2: 无状态组件\nconst A = () => <div>I'm componentA</div>\n\nReactDOM.render(<A />, document.body)\n```\n\n`<A name=\"componentA\" />` 是 JSX 的写法, 和[上一篇](https://github.com/MuYunyun/blog/issues/24)同理, babel 将其转化为 React.createElement() 的形式, [转化结果](https://babeljs.io/en/repl#?babili=false&browsers=&build=&builtIns=false&spec=false&loose=false&code_lz=MYGwhgzhAECC0FMAeAXBA7AJjAwgewFsAHPdDFaAbwCgBIAJw0wXoAoBKKuhhFAV3rpoAHkwBLAG4A-AJIByAlRQALMRAB0ReniIb0YAggC-wgPTjpAbjpHqt6sPj7DAXgBEwQiTLoUsN9CmUtRAA&debug=false&forceAllTransforms=false&shippedProposals=false&circleciRepo=&evaluate=false&fileSize=false&sourceType=module&lineWrap=true&presets=react&prettier=false&targets=&version=6.26.0&envVersion=)如下所示:\n\n```js\nReact.createElement(A, null)\n```\n\n可以看到当 JSX 中是自定义组件的时候, createElement 后接的第一个参数变为了函数, 在 [repl](https://preactjs.com/repl) 打印 `<A name=\"componentA\" />`, 结果如下:\n\n```\n{\n  attributes: undefined,\n  children: [],\n  key: undefined,\n  nodeName: ƒ A()\n}\n```\n\n注意这时返回的 Virtual DOM 中的 nodeName 也变为了函数。根据这些线索, 我们对之前的 `render` 函数进行改造。\n\n```js\nfunction render(vdom, container) {\n  if (_.isFunction(vdom.nodeName)) { // 如果 JSX 中是自定义组件\n    let component, returnVdom\n    if (vdom.nodeName.prototype.render) {\n      component = new vdom.nodeName()\n      returnVdom = component.render()\n    } else {\n      returnVdom = vdom.nodeName() // 针对无状态组件: const A = () => <div>I'm componentsA</div>\n    }\n    render(returnVdom, container)\n    return\n  }\n}\n```\n\n至此, 我们完成了对组件的处理逻辑。\n\n### props 和 state 的实现\n\n在上个小节组件 A 中, 是没有引入任何属性和状态的, 我们希望组件间能进行属性的传递(props)以及组件内能进行状态的记录(state)。\n\n```jsx\nimport React, { Component } from 'react'\n\nclass A extends Component {\n  render() {\n    return <div>I'm {this.props.name}</div>\n  }\n}\n\nReactDOM.render(<A name=\"componentA\" />, document.body)\n```\n\n在上面这段代码中, 看到 A 函数继承自 Component。我们来构造这个父类 Component, 并在其添加 state、props、setState 等属性方法, 从而让子类继承到它们。\n\n```js\nfunction Component(props) {\n  this.props = props\n  this.state = this.state || {}\n}\n```\n\n首先, 我们将组件外的 props 传进组件内, 修改 render 函数中以下代码:\n\n```js\nfunction render(vdom, container) {\n  if (_.isFunction(vdom.nodeName)) {\n    let component, returnVdom\n    if (vdom.nodeName.prototype.render) {\n      component = new vdom.nodeName(vdom.attributes) // 将组件外的 props 传进组件内\n      returnVdom = component.render()\n    } else {\n      returnVdom = vdom.nodeName(vdom.attributes) \t// 处理无状态组件: const A = (props) => <div>I'm {props.name}</div>\n    }\n    ...\n  }\n  ...\n}\n```\n\n实现完组件间 props 的传递后, 再来聊聊 state, 在 react 中是通过 setState 来完成组件状态的改变的, 在后面的 [setState 优化](https://github.com/MuYunyun/blog/blob/master/从0到1实现React/5.setState.md) 中会实现 setState 的异步逻辑, 此处简单实现如下:\n\n```js\nfunction Component(props) {\n  this.props = props\n  this.state = this.state || {}\n}\n\nComponent.prototype.setState = function() {\n  this.state = Object.assign({}, this.state, updateObj) // 这里简单实现, 后续篇章会深入探究\n  const returnVdom = this.render() // 重新渲染\n  document.getElementById('root').innerHTML = null\n  render(returnVdom, document.getElementById('root'))\n}\n```\n\n此时虽然已经实现了 setState 的功能, 但是 `document.getElementById('root')` 节点写死在 setState 中显然不是我们希望的, 我们将 dom 节点相关转移到 _render 函数中:\n\n```js\nComponent.prototype.setState = function(updateObj) {\n  this.state = Object.assign({}, this.state, updateObj)\n  _render(this) // 重新渲染\n}\n```\n\n自然地, 重构与之相关的 render 函数:\n\n```js\nfunction render(vdom, container) {\n  let component\n  if (_.isFunction(vdom.nodeName)) {\n    if (vdom.nodeName.prototype.render) {\n      component = new vdom.nodeName(vdom.attributes)\n    } else {\n      component = vdom.nodeName(vdom.attributes) // 处理无状态组件: const A = (props) => <div>I'm {props.name}</div>\n    }\n  }\n  component ? _render(component, container) : _render(vdom, container)\n}\n```\n\n在 render 函数中分离出 _render 函数的目的是为了让 setState 函数中也能调用 _render 逻辑。完整 _render 函数如下:\n\n```js\nfunction _render(component, container) {\n  const vdom = component.render ? component.render() : component\n  if (_.isString(vdom) || _.isNumber(vdom)) {\n    container.innerText = container.innerText + vdom\n    return\n  }\n  const dom = document.createElement(vdom.nodeName)\n  for (let attr in vdom.attributes) {\n    setAttribute(dom, attr, vdom.attributes[attr])\n  }\n  vdom.children.forEach(vdomChild => render(vdomChild, dom))\n  if (component.container) {  // 注意: 调用 setState 方法时是进入这段逻辑, 从而实现我们将 dom 的逻辑与 setState 函数分离的目标；知识点: new 出来的同一个实例\n    component.container.innerHTML = null\n    component.container.appendChild(dom)\n    return\n  }\n  component.container = container\n  container.appendChild(dom)\n}\n```\n\n让我们用下面这个用例跑下写好的 react 吧！\n\n```js\nclass A extends Component {\n  constructor(props) {\n    super(props)\n    this.state = {\n      count: 1\n    }\n  }\n\n  click() {\n    this.setState({\n      count: ++this.state.count\n    })\n  }\n\n  render() {\n    return (\n      <div>\n        <button onClick={this.click.bind(this)}>Click Me!</button>\n        <div>{this.props.name}:{this.state.count}</div>\n      </div>\n    )\n  }\n}\n\nReactDOM.render(\n  <A name=\"count\" />,\n  document.getElementById('root')\n)\n```\n\n效果图如下:\n\n![](http://with.muyunyun.cn/reactsetstate.gif)\n\n至此, 我们实现了 props 和 state 部分的逻辑。\n\n### forceUpdate 的实现\n\n> 声明: 这部分为补充章节, 可以选择性阅读。涉及到后文[生命周期](https://github.com/MuYunyun/blog/blob/master/BasicSkill/从0到1实现React/3.生命周期.md)、[setState](https://github.com/MuYunyun/blog/blob/master/BasicSkill/从0到1实现React/5.setState.md) 章节的知识点。\n\n当没有使用 setState 更新 state 状态时, 通常要结合 forceUpdate 一起使用, 例子如下:\n\n```js\nclass B extends Component {\n  constructor(props) {\n    super(props)\n    this.state = {\n      count: {\n        value: 1\n      }\n    }\n  }\n\n  shouldComponentUpdate() { // 当使用 forceUpdate() 时, shouldComponentUpdate() 会失效\n    return false\n  }\n\n  click() {\n    this.state.count.value = ++this.state.count.value // 没有使用 setState 更新 state 状态时, 通常要结合 forceUpdate 一起使用\n    this.forceUpdate()\n  }\n\n  render() {\n    return (\n      <div>\n        <button onClick={this.click.bind(this)}>Click Me!</button>\n        <div>{this.state.count.value}</div>\n      </div>\n    )\n  }\n}\n```\n\n这里要注意一个点`当使用 forceUpdate() 时, shouldComponentUpdate() 会失效`, 下面我们来补充 forceUpdate() 的代码逻辑:\n\n```js\n// force to update\nComponent.prototype.forceUpdate = function(cb) {\n  this.allowShouldComponentUpdate = false // 不允许 allowShouldComponentUpdate 执行\n  asyncRender({}, this, cb)\n}\n```\n\n相应的在 render.js 中加上 allowShouldComponentUpdate 的判断条件:\n\n```js\nfunction renderComponent(component) {\n  if (component.base && component.shouldComponentUpdate && component.allowShouldComponentUpdate !== false) { // 加上 allowShouldComponentUpdate 的判断条件\n    const bool = component.shouldComponentUpdate(component.props, component.state)\n    if (!bool && bool !== undefined) {\n      return false // shouldComponentUpdate() 返回 false, 则生命周期终止\n    }\n  }\n  ...\n}\n```\n\n### 小结\n\n组件即函数；当 JSX 中是自定义组件时, 经过 babel 转化后的 React.createElement(fn, ..) 后中的第一个参数变为了函数, 除此之外其它逻辑与 JSX 中为 html 元素的时候相同；\n\n此外我们将 state/props/setState 等 api 封装进了父类 React.Component 中, 从而在子类中能调用这些属性和方法。\n\n在下篇, 我们会继续实现生命周期机制, 如有疏漏, 欢迎斧正。\n\n[项目地址](https://github.com/MuYunyun/cpreact)"}}]);