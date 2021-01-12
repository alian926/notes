/** 
 * 写一个 mySetInterVal(fn, a, b),每次间隔 a,a+b,a+2b,...,a+nb 的时间，然后写一个 myClear，停止上面的 mySetInterVal
 */

function mySetInterVal(fn, a, b) {
    this.a = a;
    this.b = b;
    this.time = 0;
    this.counter = -1;
    this.start = () => {
        this.counter = setTimeout(() => {
            fn();
            this.time++;
            this.start();
            console.log('delay:', this.a + this.time * this.b);
        }, this.a + this.time * this.b);
    }

    this.stop = () => {
        clearTimeout(this.counter);
        console.log('mySetInterval is stop')
        this.time = 0;
    }
}

var a = new mySetInterVal(() => {
    console.log('run')
}, 1000, 1000);

a.start();
setTimeout(() => {
    a.stop()
}, 1e4)