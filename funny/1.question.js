/* let a = ?
if(a==1&&a==2&&a==3) {
   console.log('success')
} */


// 函数式,其实和对象没区别
/* let a = function () {
    console.log(a)
}
a._i = 1;
a.toString = function () {
    return a._i++
}
if(a==1&&a==2&&a==3) {
    console.log('success')
} else {
    console.log('fail')
} */

// 对象式
/* let a = {
    i: 1,
    toString() {
        return this.i++
    }
}
if(a==1&&a==2&&a==3) {
    console.log('success')
} else {
    console.log('fail')
} */

// 数组式
let a = [1, 2, 3]
a.join = a.shift
if(a==1&&a==2&&a==3) {
    console.log('success')
} else {
    console.log('fail')
}