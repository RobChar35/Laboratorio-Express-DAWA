const http = require('http')
const fs = require('fs')
const url = require('url')
const querystring = require('querystring')

function handleRequest(req, res) {
    var url_parts = url.parse(req.url, true)
    var query = url_parts.query

    var result = ''

    fs.readFile('./views/pages/calculadora.html', function(err, html) {
        if (err) {
            throw err
        }

        switch (query.op) {
            case 'suma':
                result = parseInt(query.num1) + parseInt(query.num2)
                break
            case 'resta':
                result = parseInt(query.num1) - parseInt(query.num2)
                break
            case 'multiplicacion':
                result = parseInt(query.num1) * parseInt(query.num2)
                break
            case 'division':
                result = parseInt(query.num1) / parseInt(query.num2)
                break
        }
        
        html = html.toString().replace('{resultado}', String(result))

        res.writeHead(200, {'Content-type':'text/html'})
        res.write(html)
        res.end()
    })

}

http.createServer(handleRequest).listen(8080, function() {
    console.log('Server listening on port 8080')
})
