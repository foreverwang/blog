(window.webpackJsonp=window.webpackJsonp||[]).push([[292],{982:function(n,e){n.exports="### 46.Permutations\n\nGiven an array nums of distinct integers, return all the possible permutations. You can return the answer in any order.\n\nExample 1:\n\n```js\nInput: nums = [1,2,3]\nOutput: [[1,2,3],[1,3,2],[2,1,3],[2,3,1],[3,1,2],[3,2,1]]\n```\n\nExample 2:\n\n```js\nInput: nums = [0,1]\nOutput: [[0,1],[1,0]]\n```\n\nExample 3:\n\n```js\nInput: nums = [1]\nOutput: [[1]]\n```\n\nConstraints:\n* 1 <= nums.length <= 6\n* -10 <= nums[i] <= 10\n* `All the integers of nums are unique`\n\n### analyze\n\n该问题可以看成为一道排列问题, 排列问题的一种常见解法是回溯法:\n\n```bash\n* 1\n  * 2\n    * 3\n  * 3\n    * 2\n* 2\n  * 1\n    * 3\n  * 3\n    * 1\n* 3\n  * 1\n    * 2\n  * 2\n    * 1\n```\n\n```js\n/**\n * @param {number[]} nums\n * @return {number[][]}\n */\nvar permute = function (nums) {\n  const res = []\n  backtracking(nums, [], res)\n  return res\n};\n\nvar backtracking = function(nums, temp, res) {\n  if (temp.length === nums.length) {\n    res.push([...temp])\n    return\n  }\n\n  for (let i = 0; i < nums.length; i++) {\n    if (!temp.includes(nums[i])) {\n      temp.push(nums[i])\n      backtracking(nums, temp, res)\n      temp.pop(nums[i])\n    } else {\n      continue\n    }\n  }\n}\n```"}}]);