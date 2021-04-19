(self.webpackChunkblog=self.webpackChunkblog||[]).push([[2391],{82391:n=>{n.exports="### 110. Balanced Binary Tree\n\nGiven a binary tree, determine if it is height-balanced.\n\nFor this problem, a height-balanced binary tree is defined as:\n\n> a binary tree in which the left and right subtrees of every node differ in height by no more than 1.\n\nExample 1:\n\nGiven the following tree [3,9,20,null,null,15,7]:\n\n```js\n    3\n   / \\\n  9  20\n    /  \\\n   15   7\n```\n\nReturn true.\n\nExample 2:\n\nGiven the following tree [1,2,2,3,3,null,null,4,4]:\n\n```js\n       1\n      / \\\n     2   2\n    / \\\n   3   3\n  / \\\n 4   4\n```\n\nReturn false.\n\n### Analyze\n\n* 自顶向下\n  * 终止条件: 当前访问节点为 null;\n  * 循环逻辑: 当前节点的左、右子节点都为 height-balanced;\n\n```js\n/**\n * Definition for a binary tree node.\n * function TreeNode(val) {\n *     this.val = val;\n *     this.left = this.right = null;\n * }\n */\n/**\n * @param {TreeNode} root\n * @return {boolean}\n */\nvar isBalanced = function(root) {\n  if (!root) return true\n  return isBalanced(root.left) && isBalanced(root.right) && Math.abs(deep(root.left) - deep(root.right)) <= 1\n};\n\n// the thought is same as [104.Maximum Depth of Binary Tree](https://github.com/MuYunyun/blog/blob/master/LeetCode/104.Maximum_Depth_of_Binary_Tree.md)\nvar deep = (node) => {\n  if (!node) return 0\n  return Math.max(deep(node.left), deep(node.right)) + 1\n}\n```\n\n* 自底向上\n  * 策略: 提前终止\n\n```js\n       1\n      / \\\n     2   2\n    / \\\n   3   3\n  / \\\n 4   4\n```\n\n```js\n/**\n * Definition for a binary tree node.\n * function TreeNode(val) {\n *     this.val = val;\n *     this.left = this.right = null;\n * }\n */\n/**\n * @param {TreeNode} root\n * @return {boolean}\n */\nvar isBalanced = function(root) {\n  return deep(root) === -1 ? false : true\n};\n\nvar deep = (node) => {\n  if (!node) return 0\n  const leftNode = deep(node.left)\n  if (leftNode === -1) return -1\n  const rightNode = deep(node.right)\n  if (rightNode === -1) return -1\n  return Math.abs(leftNode - rightNode) <= 1 ? Math.max(leftNode, rightNode) + 1 : -1\n}\n```\n"}}]);