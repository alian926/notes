// Koa 异步流程控制,解决回调地狱问题

/**
 * 开发Koa,需要掌握以下几个要点
 * 1. Koa中间件
 * 2. ES6语法
 * 3. HTTP基础
 * 4. 异步流程控制: async -> Promise -> Generator
 * 5. 数据库操作
 * 6. API接口开发
 */

/**
 * 流程
 * 1. npm init -y初始化Node.js模块,创建package.json配置文件
 * 2. npm i -S koa@2 安装 Koa 2版本 为依赖模块
 * 3. 创建入口文件,如app.js
 */

const Koa = require('koa')
// 版本2中 通过对Koa的实例化后得到app对象
// Koa v2对外导出的是class ,无法通过"()"函数调用,只能通过new调用
const app = new Koa()

// 日志中间件
app.use(async (ctx, next) => {
    // ctx为显示上下文, 用以替代this, 因为回调函数使用async箭头函数的方式,无法得到正确运行时this,而是箭头函数的外部 
    // 通过 await next() 将执行权交给下一个中间件
    const start = new Date()
    console.log('[logger middleware] before await...')
    await next()
    console.log('[logger middleware] after await...')
    const ms = new Date() - start
    console.log(`${ctx.method} ${ctx.url} - ${ms}ms`)
})

// 响应
app.use(async ctx => {
    console.log('[response middleware] response...')

    ctx.body = ' Hello Koa 2 '
})

app.listen(3000)