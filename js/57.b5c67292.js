(window.webpackJsonp=window.webpackJsonp||[]).push([[57],{747:function(s,e){s.exports="### [css-loader](https://github.com/webpack-contrib/css-loader)\n\n来看下面这一组 webpack 的配置项，\n\n```js\n{\n  test: /\\.less$/,\n  use: [\n    require.resolve('style-loader'),\n    {\n      loader: require.resolve('css-loader'),\n      options: {\n        modules: true,  // 开启 css 模块化\n        importLoaders: 2,\n      },\n    },\n    {\n      loader: require.resolve('postcss-loader'),\n      options: {...},\n    },\n    {\n      loader: require.resolve('less-loader'),\n      options: {...},\n    },\n  ],\n},\n```\n\n它们执行顺序是 `less-loader`、`postcss-loader`、`css-loader`、`style-loader`。我们来理一下各 module 的作用：\n\n* `less-loader`: 将 less 解析为 css\n* `postcss-loader`: 将 css 兼容各浏览器加上相应前缀\n* `css-loader`: 将 css 转化为 common.js 模块\n* `style-loader`: 将 common.js 模块注入 `style` 标签中\n\n> [Link issue](https://github.com/MuYunyun/reactSPA/issues/52)"}}]);