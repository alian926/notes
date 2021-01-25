const router = require('koa-router')()

router.get('/', async (ctx, next) => {
  // 视图渲染
  // render方法是添加了koa-views中间件而绑定到ctx上的
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