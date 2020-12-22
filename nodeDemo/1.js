const http = require('http')

http.createServer(function (req, res) {
    let postData = '';
    req.setEncoding('utf-8')
    req.on('data', function (chunk) {
        postData += chunk
    })
    req.on('end', function () {
        res.end(postData)
    })
}).listen(8090)

console.log('http start')

// fetch('/', { body:JSON.stringify({name:"李白"}), method:'POST'}).then(res => console.log('end:',res))