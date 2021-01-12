/** 
 * 实现获取 下一个排列 的函数，算法需要将给定数字序列重新排列成字典序中下一个更大的排列。

如果不存在下一个更大的排列，则将数字重新排列成最小的排列（即升序排列）。

必须 原地 修改，只允许使用额外常数空间。

 
示例 1：
输入：nums = [1,2,3]
输出：[1,3,2]

示例 2：
输入：nums = [3,2,1]
输出：[1,2,3]

示例 3：
输入：nums = [1,1,5]
输出：[1,5,1]

示例 4：
输入：nums = [1]
输出：[1]
 
错误示例 
输入: [1,3,2]
期待: [2,1,3] 

错误示例
输入: [4,2,0,2,3,2,0]
期待: [4,2,0,3,0,2,2]

错误提示 
输入: [2,3,0,2,4,1]
期待: [2,3,0,4,1,2]

提示：
1 <= nums.length <= 100
0 <= nums[i] <= 100

*/

/**
 * @param {number[]} nums
 * @return {void} Do not return anything, modify nums in-place instead.
 */
var nextPermutation = function (nums) {
    let i = nums.length - 2
    // 从右向找到左边尽可能小的数,相邻比较
    while (i >= 0 && nums[i] >= nums[i + 1]) {
        i -= 1
    }
    if (i >= 0) {
        j = nums.length - 1
        // 根据上面找到的左边尽可能小的数, 找到右边向左比nums[i]小的数
        while (j >= 0 && nums[i] >= nums[j]) {
            j -= 1
        }
        // 交换
        [nums[i], nums[j]] = [nums[j], nums[i]]
    }
    let left = i + 1;
    let right = nums.length - 1;
    while (left < right) {
        // 在i+1到右侧的值
        [nums[left], nums[right]] = [nums[right], nums[left]]
        left++
        right--
    }
    return nums
};
console.log(nextPermutation([1, 2, 3]))
console.log(nextPermutation([3, 2, 1]))
console.log(nextPermutation([1, 1, 5]))
console.log(nextPermutation([1, 3, 2]))
console.log(nextPermutation([4, 2, 0, 2, 3, 2, 0]))
console.log(nextPermutation([2, 3, 0, 2, 4, 1]))