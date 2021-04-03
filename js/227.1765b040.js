(self.webpackChunkblog=self.webpackChunkblog||[]).push([[227],{80227:n=>{n.exports="### 343. Integer Break\n\nGiven an integer n, break it into the sum of k positive integers, where k >= 你2, and `maximize` the product of those integers.\n\nReturn the maximum product you can get.\n\nExample 1:\n\n```js\nInput: n = 2\nOutput: 1\nExplanation: 2 = 1 + 1, 1 × 1 = 1.\n```\n\nExample 2:\n\n```js\nInput: n = 10\nOutput: 36\nExplanation: 10 = 3 + 3 + 4, 3 × 3 × 4 = 36.\n```\n\n* Constraints:\n  * 2 <= n <= 58\n\n### Analyze\n\nn 可拆分为: `1 * integerBreak(n - 1)`、`2 * integerBreak(n - 2)` ...,  `x * integerBreak(n - x)`。直到 x 刚好大于等于 n - x 过。\n\n```js\n/**\n * @param {number} n\n * @return {number}\n */\nvar integerBreak = function(n) {\n\n};\n```"}}]);