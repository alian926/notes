const router = require('koa-router')()

// router.get支持所有的HTTP动词,如GET,POST,PUT,DELETE等
// 第一个参数是是相对于基准路径的相对路径
// 第二个参数是Koa中间件

router.get('/', async (ctx, next) => {
  // 视图渲染
  // render方法是添加了koa-views中间件而绑定到ctx上的
  // index参数, 相对routes文件夹下的index.pug模板
  await ctx.render('index', {
    title: 'Hello Koa 2!'
  })
})

router.get('/string', async (ctx, next) => {
  // 字符串
  ctx.body = 'koa2 string'
})

router.get('/json', async (ctx, next) => {
  // JSON API
  ctx.body = {
    title: 'koa2 json'
  }
})

module.exports = router