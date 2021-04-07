(self.webpackChunkblog=self.webpackChunkblog||[]).push([[227],{80227:n=>{n.exports="### 343. Integer Break\n\nGiven an integer n, break it into the sum of k `positive integers`, where k >= 2, and `maximize` the product of those integers.\n\nReturn the maximum product you can get.\n\nExample 1:\n\n```js\nInput: n = 2\nOutput: 1\nExplanation: 2 = 1 + 1, 1 × 1 = 1.\n```\n\nExample 2:\n\n```js\nInput: n = 10\nOutput: 36\nExplanation: 10 = 3 + 3 + 4, 3 × 3 × 4 = 36.\n```\n\n* Constraints:\n  * 2 <= n <= 58\n\n### Analyze\n\nn 拆分若干数后的乘积可拆分为: `1 * integerBreak(n - 1)`、`2 * integerBreak(n - 2)` ...,  `x * integerBreak(n - x)`。\n\n```js\nn === 2\n1 * 1\n\nn === 3\n1 * integerBreak(2)\n\nn === 4\n1 * integerBreak(3)\n2 * integerBreak(2)\n\nn === 5\n1 * integerBreak(4)\n2 * integerBreak(3)\n```\n\n* 递归思路(自顶向下)如下\n\n```js\n/**\n * @param {number} n\n * @return {number}\n */\nvar cache = {}\nvar integerBreak = function(n) {\n  if (n === 1) return 1\n  if (cache[n]) return cache[n]\n  let result = 0\n  // here the i means for the value to be subtracted\n  for (let i = 1; i < n; i++) {\n    if (i > n - i) {\n      break\n    }\n    result = Math.max(result, i * Math.max(integerBreak(n - i), n - i))\n  }\n  return cache[n] = result\n}\n```\n\n* 接着使用动态规划(自底向上)思路实现:\n\n```js\n/**\n * @param {number} n\n * @return {number}\n */\nvar cache = {\n  1: 1\n}\nvar integerBreak = function(n) {\n  if (n === 1) return 1\n\n  let result = 0\n  // here the i means for the value to calc\n  for (let i = 2; i <= n; i++) {\n    // here the m means for the value to be subtracted\n    for (let m = 1; m < i; m++) {\n      result = Math.max(result, m * Math.max(cache[i - m], i - m))\n    }\n    cache[i] = result\n  }\n\n  return result\n}\n```"}}]);