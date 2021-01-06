function unique(arr) {
    // 无重复内容的长度
    let len = arr.length - 1
    for (let i = len; i >= 0; i--) {
        if (arr.indexOf(arr[i]) !== i) {
            // 如果当前位是重复的, 则把无重复的最后一项内容移动到这里
            arr[i] = arr[len--]
        }
    }
    arr.splice(len + 1)
    // 不能直接返回arr.splice(), 起返回值是已经删除的内容
    return arr
}

let arr = [1, 2, 2, 3, 5, 3, 6, 5];

console.log(unique(arr))