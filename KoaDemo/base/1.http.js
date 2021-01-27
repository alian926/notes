// http模块

const http = require('http')

http.createServer(function (req, res) {
    console.log(req)

    if (req.url === '/') {
        res.end('Hello world')
    } else if (req.url === '/2') {
        res.end('Hello 2')
    } else {
        res.end('Hello other')
    }
}).listen(9999)