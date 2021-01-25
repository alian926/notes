# koa-generator

## 目录分析
> app.js 入口
> bin/www 启动入口
> 支持静态服务器, public
> 支持routes路由目录
> 支持views视图目录,Pug为模板引擎

## package.json
> npm start 开发阶段使用的脚本,代码变动时,需要重启Node.js进程
> npm run dev 也是开发阶段使用的脚本,代码变动时,nodemon会自动重启Node.js进程
> npm run prd 产品环境的脚本,通过pm2启动工程,默认按照CUP核数来启动对应的进程数
> npm test 只会打印出未实现日志,和Express里的用法相同,(package.json中写入的内容)

## 模块说明
> debug 根据Debug环境变量输出调试日志
> pug 用于视图渲染,是一款模板引擎
> koa Koa v2核心模块,用于提供中间件机制
> koa-bodyparser 用于解析和处理body,主要针对Post类的请求
> koa-convert 将Koa v1中间件转换为 Koa v2可兼容的中间件
> koa-json 提供对JSON的更好支持
> koa-logger 开发阶段使用的日志模块
> koa-onerror 异常捕获模块
> koa-router 路由模块
> koa-static HTTP静态服务模块
> koa-views 视图配置模块.只有通过koa-views配置了具体模板引擎,Koa才能使用并解析相关模板.其基于consolidate.js模块,支持40种模板引擎

