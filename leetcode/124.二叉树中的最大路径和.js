/**
 * 给定一个非空二叉树，返回其最大路径和。

本题中，路径被定义为一条从树中任意节点出发，沿父节点-子节点连接，达到任意节点的序列。该路径至少包含一个节点，且不一定经过根节点。
输入：[1,2,3]

       1
      / \
     2   3

输出：6
输入：[-10,9,20,null,null,15,7]

   -10
   / \
  9  20
    /  \
   15   7

输出：42
 */

/**
 * Definition for a binary tree node.
 * function TreeNode(val, left, right) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.left = (left===undefined ? null : left)
 *     this.right = (right===undefined ? null : right)
 * }
 */
function TreeNode(val, left, right) {
    this.val = (val === undefined ? 0 : val)
    this.left = (left === undefined ? null : left)
    this.right = (right === undefined ? null : right)
}

/**
 * @param {TreeNode} root
 * @return {number}
 */
var maxPathSum = function (root) {
    let max = -Infinity;
    function dfs(root) {
        // 空值处理
        if (!root) return 0;
        // 左节点的贡献值,负数不如不选
        let left = Math.max(0, dfs(root.left));
        // 右节点的贡献值,负数不如不选
        let right = Math.max(0, dfs(root.right));
        // 计算路最大径和, 对于二叉树中的一个节点，该节点的最大路径和取决于该节点的值与该节点的左右子节点的最大贡献值
        max = Math.max(max, left + right + root.val);
        // 返回节点的最大贡献值,非空节点的最大贡献值等于节点值与其子节点中的最大贡献值之和, 叶结点的最大贡献值就是本身
        return Math.max(left, right) + root.val;
    }
    dfs(root);
    return max;
};