(window.webpackJsonp=window.webpackJsonp||[]).push([[184],{874:function(n,e){n.exports="### 单例模式两个条件\n\n* 确保只有一个实例\n* 可以全局访问\n\n### 适用\n\n适用于弹框的实现, 全局缓存\n\n### 实现单例模式\n\n```js\nconst singleton = function(name) {\n  this.name = name\n  this.instance = null\n}\n\nsingleton.prototype.getName = function() {\n  console.log(this.name)\n}\n\nsingleton.getInstance = function(name) {\n  if (!this.instance) { // 关键语句\n    this.instance = new singleton(name)\n  }\n  return this.instance\n}\n\n// test\nconst a = singleton.getInstance('a') // 通过 getInstance 来获取实例\nconst b = singleton.getInstance('b')\nconsole.log(a === b)\n```\n\n### JavaScript 中的单例模式\n\n因为 JavaScript 是无类的语言, 而且 JS 中的全局对象符合单例模式两个条件。很多时候我们把全局对象当成单例模式来使用,\n\n```js\nvar obj = {}\n```\n\n### 弹框层的实践\n\n实现弹框的一种做法是先创建好弹框, 然后使之隐藏, 这样子的话会浪费部分不必要的 DOM 开销, 我们可以在需要弹框的时候再进行创建, 同时结合单例模式实现只有一个实例, 从而节省部分 DOM 开销。下列为登入框部分代码:\n\n```js\nconst createLoginLayer = function() {\n  const div = document.createElement('div')\n  div.innerHTML = '登入浮框'\n  div.style.display = 'none'\n  document.body.appendChild(div)\n  return div\n}\n```\n\n使单例模式和创建弹框代码解耦\n\n```js\nconst getSingle = function(fn) {\n  const result\n  return function() {\n    return result || result = fn.apply(this, arguments)\n  }\n}\n```\n\n```js\nconst createSingleLoginLayer = getSingle(createLoginLayer)\n\ndocument.getElementById('loginBtn').onclick = function() {\n  createSingleLoginLayer()\n}\n```"}}]);