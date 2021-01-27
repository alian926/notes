const connect = require('connect')
const http = require('http')
const compression = require('compression')
const cookieSession = require('cookie-session')
const bodyParser = require('body-parser')

const app = connect()
// connect 中间件有顺序
// 中间件分成全局的和局部的
// 中间件的定义方法是function(req, res){}

// 对响应进行gzip压缩
app.use(compression())
// 在浏览器缓存里读取会话状态
app.use(cookieSession({
    keys: ['secret1', 'secret2']
}))
// 解析urlencoded的请求体,并赋值给req.body
app.use(bodyParser.urlencoded({
    extended: true
}))

app.use('/2', function fooMiddleware(req, res, next) {
    res.end('Hello from Connect 2!! \n')
})

app.use(function (req, res) {
    res.end('Hello from Connect \n')
})

http.createServer(app).listen(9999)