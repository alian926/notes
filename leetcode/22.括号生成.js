/*
数字 n 代表生成括号的对数，请你设计一个函数，用于能够生成所有可能的并且 有效的 括号组合。
输入：n = 3
输出：[
       "((()))",
       "(()())",
       "(())()",
       "()(())",
       "()()()"
     ]
*/

/**
 * @param {number} n
 * @return {string[]}
 */
// 回溯法
var generateParenthesis = function (n) {
    const L = '(',
        R = ')';
    const ret = [];
    function gFunc(model,left,right) {
        if (model.length == n * 2) {
            ret.push(model.join(''))
        }
        if (left < n) {
            model.push(L);
            gFunc(model, left + 1, right)
            model.pop()
        }
        if (right < left) {
            model.push(R)
            gFunc(model, left, right + 1)
            model.pop()
        }
    }
    gFunc([], 0, 0)
    return ret;
}

console.log(generateParenthesis(3))